export const runtime = 'edge';

// YouTube channel to feature. Handle without the leading "@".
const CHANNEL_HANDLE = 'MingsExplorer';

// A Short is a vertical (portrait) video. The public Data API has no official
// isShort flag, but when we request the `player` part with maxHeight, it returns
// the video's embed dimensions, which reflect its true aspect ratio. So we
// classify by shape: portrait (height > width) = Short, landscape = long video.
// Duration is only a fallback when embed dimensions are missing (Shorts are
// capped at 3 min, so anything longer than that can't be a Short).
const SHORT_MAX_SECONDS = 180;

function classifyShort(video, seconds) {
  let w = Number(video.player?.embedWidth || 0);
  let h = Number(video.player?.embedHeight || 0);
  if ((!w || !h) && video.player?.embedHtml) {
    const wm = /width="?(\d+)/.exec(video.player.embedHtml);
    const hm = /height="?(\d+)/.exec(video.player.embedHtml);
    w = wm ? Number(wm[1]) : 0;
    h = hm ? Number(hm[1]) : 0;
  }
  if (w > 0 && h > 0) return h > w; // portrait = Short
  // Fallback: no dimensions available — assume Short only if within 3 min.
  return seconds > 0 && seconds <= SHORT_MAX_SECONDS;
}

// Upper bound on how many uploads to pull (keeps quota + latency bounded).
const MAX_VIDEOS = 120;

// Parse an ISO 8601 duration (e.g. "PT1M30S") into seconds.
function parseDuration(iso) {
  const m = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(iso || '');
  if (!m) return 0;
  const [, h, min, s] = m;
  return (Number(h) || 0) * 3600 + (Number(min) || 0) * 60 + (Number(s) || 0);
}

function pickThumbnail(thumbnails = {}) {
  return (
    thumbnails.maxres?.url ||
    thumbnails.standard?.url ||
    thumbnails.high?.url ||
    thumbnails.medium?.url ||
    thumbnails.default?.url ||
    ''
  );
}

const YT = 'https://www.googleapis.com/youtube/v3';

async function getJson(url) {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    const reason = data?.error?.message || `HTTP ${res.status}`;
    throw new Error(reason);
  }
  return data;
}

const empty = {
  channel: null,
  longVideos: [],
  shorts: [],
};

export default async function handler() {
  const key = process.env.YOUTUBE_API_KEY;

  if (!key) {
    return new Response(
      JSON.stringify({ ...empty, error: 'Missing YOUTUBE_API_KEY' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // 1. Resolve the channel: stats + the "uploads" playlist that holds every video.
    const channelRes = await getJson(
      `${YT}/channels?part=snippet,statistics,contentDetails&forHandle=${CHANNEL_HANDLE}&key=${key}`
    );
    const channel = channelRes.items?.[0];
    if (!channel) throw new Error(`Channel @${CHANNEL_HANDLE} not found`);

    const uploadsId = channel.contentDetails.relatedPlaylists.uploads;

    // 2. Walk the uploads playlist to collect video IDs (50 per page).
    const videoIds = [];
    let pageToken = '';
    do {
      const page = await getJson(
        `${YT}/playlistItems?part=contentDetails&playlistId=${uploadsId}&maxResults=50${
          pageToken ? `&pageToken=${pageToken}` : ''
        }&key=${key}`
      );
      for (const item of page.items || []) {
        const id = item.contentDetails?.videoId;
        if (id) videoIds.push(id);
      }
      pageToken = page.nextPageToken || '';
    } while (pageToken && videoIds.length < MAX_VIDEOS);

    // 3. Fetch full details (stats + duration) in batches of 50.
    const videos = [];
    for (let i = 0; i < videoIds.length; i += 50) {
      const batch = videoIds.slice(i, i + 50);
      const details = await getJson(
        `${YT}/videos?part=snippet,statistics,contentDetails,player&maxHeight=480&id=${batch.join(
          ','
        )}&key=${key}`
      );
      for (const v of details.items || []) {
        const seconds = parseDuration(v.contentDetails?.duration);
        const isShort = classifyShort(v, seconds);
        videos.push({
          id: v.id,
          title: v.snippet?.title || '',
          thumbnail: pickThumbnail(v.snippet?.thumbnails),
          publishedAt: v.snippet?.publishedAt || '',
          durationSeconds: seconds,
          viewCount: Number(v.statistics?.viewCount || 0),
          likeCount: Number(v.statistics?.likeCount || 0),
          commentCount: Number(v.statistics?.commentCount || 0),
          isShort,
          url: isShort
            ? `https://www.youtube.com/shorts/${v.id}`
            : `https://www.youtube.com/watch?v=${v.id}`,
        });
      }
    }

    // Newest first.
    videos.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

    // Estimated watch time (minutes): sum of duration x views across fetched
    // videos. The public Data API has no real watch-time metric (that needs the
    // Analytics API with OAuth), so this mirrors the estimate used elsewhere.
    const watchTimeMinutes = Math.round(
      videos.reduce((sum, v) => sum + v.durationSeconds * v.viewCount, 0) / 60
    );

    const payload = {
      channel: {
        id: channel.id,
        title: channel.snippet?.title || '',
        description: channel.snippet?.description || '',
        thumbnail: pickThumbnail(channel.snippet?.thumbnails),
        handle: `@${CHANNEL_HANDLE}`,
        url: `https://www.youtube.com/@${CHANNEL_HANDLE}`,
        subscriberCount: Number(channel.statistics?.subscriberCount || 0),
        viewCount: Number(channel.statistics?.viewCount || 0),
        videoCount: Number(channel.statistics?.videoCount || 0),
        watchTimeMinutes,
      },
      longVideos: videos.filter((v) => !v.isShort),
      shorts: videos.filter((v) => v.isShort),
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ ...empty, error: String(error.message || error) }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
