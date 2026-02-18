export const runtime = 'edge';

export default async function handler(req) {
  const url = new URL(req.url);
  const provider = url.searchParams.get('provider');
  const path = url.searchParams.get('path');

  // Spotify API - direct calls to Spotify endpoints
  if (provider === 'spotify') {
    return handleSpotify(req, url);
  }

  // QQ Music API - direct calls to QQ Music endpoints
  if (provider === 'qq') {
    return handleQQMusic(url);
  }

  const origin = req.headers.get('referer');

  if (
    origin &&
    origin.includes('www.1998.media/api/origin') &&
    path?.includes('me/')
  ) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Generate JWT token using Web Crypto API (edge-compatible)
    const p8 = (process.env.APPLE_MUSIC_p8 || '').replace(/\\n/g, '\n');
    const teamId = process.env.APPLE_MUSIC_TEAM_ID;
    const keyId = process.env.APPLE_MUSIC_KEY_ID;
    const userToken = process.env.APPLE_MUSIC_USER_TOKEN;

    if (!p8 || !teamId || !keyId) {
      return new Response(
        JSON.stringify({ error: 'Apple Music credentials not configured' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Create JWT using Web Crypto API
    const token = await createAppleMusicJWT(p8, teamId, keyId);

    const response = await fetch(`https://api.music.apple.com/v1/${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Music-User-Token': userToken || '',
      },
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Spotify API handler - direct HTTP calls (edge-compatible)
async function handleSpotify(req, url) {
  const path = url.searchParams.get('path');

  // Try to get personal token from cookie first
  const cookieHeader = req.headers.get('cookie') || '';
  const personalToken = cookieHeader.match(
    /spotify_personal_token=([^;]+)/
  )?.[1];
  const personalRefresh = cookieHeader.match(
    /spotify_personal_refresh=([^;]+)/
  )?.[1];

  let spotifyToken = personalToken || process.env.SPOTIFY_TOKEN;

  // If no manually configured token, try to get one using client credentials or refresh personal token
  if (
    !spotifyToken &&
    process.env.SPOTIFY_Client_ID &&
    process.env.SPOTIFY_Client_Secret
  ) {
    try {
      spotifyToken = await getSpotifyToken(personalRefresh);
    } catch (error) {
      console.error('Failed to get Spotify token:', error);
    }
  }

  if (!spotifyToken) {
    return new Response(
      JSON.stringify({ error: 'Spotify token not configured' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    let apiUrl;

    // Check if the path requested requires a user token (Client Credentials doesn't support /me/)
    // If it's a /me/ path and we only have Client Credentials (likely, if SPOTIFY_TOKEN is missing),
    // we should point to a public alternative as a fallback.
    let effectivePath = path;
    if (
      path.startsWith('me/') &&
      !process.env.SPOTIFY_TOKEN &&
      !process.env.SPOTIFY_REFRESH_TOKEN
    ) {
      // Fallback for me/top/tracks to top/us if using client credentials
      if (path === 'me/top/tracks') {
        effectivePath = 'top/us';
      }
    }

    switch (effectivePath) {
      case 'me/top/tracks':
        // User's top tracks (requires user-top-read scope)
        const timeRange = url.searchParams.get('time_range') || 'medium_term';
        apiUrl = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=20`;
        break;

      case 'top/us':
        // Top 50 USA playlist (public, no user scope needed)
        apiUrl =
          'https://api.spotify.com/v1/playlists/37i9dQZEVXbLRQDuF5jeBp/tracks?limit=20';
        break;

      case 'search':
        // Search tracks
        const query = url.searchParams.get('q') || 'newjeans';
        apiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=20`;
        break;

      case 'track':
        // Get single track info
        const trackId = url.searchParams.get('id');
        apiUrl = `https://api.spotify.com/v1/tracks/${trackId}`;
        break;

      case 'token':
        // Return token for Web Playback SDK
        return new Response(
          JSON.stringify({
            access_token: spotifyToken,
            isPersonal: !!personalToken || !!personalRefresh,
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        );

      default:
        return new Response(
          JSON.stringify({ error: `Unknown or unauthorized path: ${path}` }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
    }

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return new Response(
        JSON.stringify({
          error: errorData.error?.message || 'Spotify API error',
          data: [],
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await response.json();

    // Transform Spotify response to match Apple Music format
    let items = data.tracks?.items || data.items || [];

    // If it's a single track result (no items but has name/id)
    if (items.length === 0 && data.id && data.name) {
      items = [data];
    }

    if (items.length > 0) {
      // Create partial transformation first
      const transformedItems = items.map((item) => {
        const track = item.track || item;
        return {
          id: track.id,
          type: 'songs',
          attributes: {
            name: track.name,
            artistName:
              track.artists?.map((a) => a.name).join(', ') || 'Unknown Artist',
            artwork: {
              url:
                track.album?.images?.[0]?.url || track.images?.[0]?.url || '',
            },
            durationInMillis: track.duration_ms || 0,
            url: track.external_urls?.spotify || '',
            previews: track.preview_url ? [{ url: track.preview_url }] : [],
          },
        };
      });

      // Attempt to resolve missing previews via Embed API for top 10 items (to avoid rate limits/slowdown)
      const tracksToResolve = transformedItems.slice(0, 10);
      await Promise.all(
        tracksToResolve.map(async (item) => {
          if (item.attributes.previews.length === 0) {
            const previewUrl = await getSpotifyPreviewFromEmbed(item.id);
            if (previewUrl) {
              item.attributes.previews = [{ url: previewUrl }];
            }
          }
        })
      );

      return new Response(JSON.stringify({ data: transformedItems }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ data: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Spotify API error:', error);
    return new Response(JSON.stringify({ error: error.message, data: [] }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// QQ Music API handler - direct HTTP calls (edge-compatible)
async function handleQQMusic(url) {
  const path = url.searchParams.get('path');
  const key = url.searchParams.get('key');
  const t = url.searchParams.get('t') || '0'; // 0: song, 2: playlist, 7: lyric, 8: album, 9: singer, 12: mv
  const pageNo = url.searchParams.get('pageNo') || '1';
  const pageSize = url.searchParams.get('pageSize') || '20';
  const singermid = url.searchParams.get('singermid');
  const albummid = url.searchParams.get('albummid');
  const songmid = url.searchParams.get('songmid');

  try {
    let apiUrl;
    let data = {};

    switch (path) {
      case 'search':
        // Search endpoint
        if (!key) {
          return new Response(
            JSON.stringify({ result: 500, errMsg: 'key is required' }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }

        if (t === '2') {
          // Playlist search
          apiUrl = `https://c.y.qq.com/soso/fcgi-bin/client_music_search_songlist?remoteplace=txt.yqq.playlist&page_no=${parseInt(pageNo) - 1}&num_per_page=${pageSize}&query=${encodeURIComponent(key)}`;
        } else {
          // Default search (songs, albums, etc.)
          apiUrl = `http://c.y.qq.com/soso/fcgi-bin/client_search_cp?format=json&n=${pageSize}&p=${pageNo}&w=${encodeURIComponent(key)}&cr=1&g_tk=5381&t=${t}`;
        }
        break;

      case 'search/hot':
        // Hot search keywords
        apiUrl = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
        break;

      case 'search/quick':
        // Quick search suggestions
        if (!key) {
          return new Response(
            JSON.stringify({ result: 500, errMsg: 'key is required' }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
        apiUrl = `https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?key=${encodeURIComponent(key)}&g_tk=5381`;
        break;

      case 'singer':
        // Singer info
        if (!singermid) {
          return new Response(
            JSON.stringify({ result: 500, errMsg: 'singermid is required' }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
        apiUrl = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?singermid=${singermid}&num=${pageSize}&begin=${(parseInt(pageNo) - 1) * parseInt(pageSize)}&g_tk=5381&format=json`;
        break;

      case 'album':
        // Album info
        if (!albummid) {
          return new Response(
            JSON.stringify({ result: 500, errMsg: 'albummid is required' }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
        apiUrl = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid=${albummid}&g_tk=5381&format=json`;
        break;

      case 'song':
        // Song info
        if (!songmid) {
          return new Response(
            JSON.stringify({ result: 500, errMsg: 'songmid is required' }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
        apiUrl = `https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid=${songmid}&g_tk=5381&format=json`;
        break;

      case 'lyric':
        // Lyrics - use alternative endpoint that's more reliable
        if (!songmid) {
          return new Response(
            JSON.stringify({ result: 500, errMsg: 'songmid is required' }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
        // Try the newer API endpoint which is more reliable
        try {
          const lyricResponse = await fetch(
            `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?songmid=${songmid}&g_tk=5381&format=json&nobase64=1`,
            {
              headers: {
                Referer: 'https://y.qq.com/portal/player.html',
                Host: 'c.y.qq.com',
                'User-Agent':
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              },
            }
          );
          let lyricResult = await lyricResponse.text();
          // Remove JSONP callback
          lyricResult = lyricResult.replace(/^(MusicJsonCallback\(|\)$)/g, '');

          try {
            const lyricData = JSON.parse(lyricResult);
            // If the API returns an error, try a fallback
            if (lyricData.retcode !== 0 && lyricData.code !== 0) {
              // Try fallback - use NetEase or return empty
              return new Response(
                JSON.stringify({
                  lyric: '',
                  trans: '',
                  retcode: lyricData.retcode || lyricData.code,
                }),
                {
                  status: 200,
                  headers: { 'Content-Type': 'application/json' },
                }
              );
            }
            return new Response(JSON.stringify(lyricData), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            });
          } catch {
            return new Response(JSON.stringify({ lyric: '', trans: '' }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            });
          }
        } catch (error) {
          return new Response(
            JSON.stringify({ lyric: '', trans: '', error: error.message }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }

      case 'recommend':
        // Recommendations
        apiUrl =
          'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&format=json';
        break;

      case 'top':
        // Top charts
        const topid = url.searchParams.get('topid') || '26';
        apiUrl = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?topid=${topid}&num=${pageSize}&page=${pageNo}&g_tk=5381&format=json`;
        break;

      default:
        return new Response(
          JSON.stringify({ result: 500, errMsg: `Unknown path: ${path}` }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
    }

    const response = await fetch(apiUrl, {
      headers: {
        Referer: 'https://y.qq.com',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    let result = await response.text();

    // Remove JSONP callback wrapper if present
    result = result.replace(
      /^(callback\(|MusicJsonCallback\(|jsonCallback\(|\)$)/g,
      ''
    );

    try {
      const jsonData = JSON.parse(result);
      return new Response(JSON.stringify(jsonData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch {
      return new Response(result, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('QQ Music API error:', error);
    return new Response(
      JSON.stringify({ result: 500, errMsg: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// Edge-compatible JWT creation using Web Crypto API
async function createAppleMusicJWT(privateKeyPem, teamId, keyId) {
  const now = Math.floor(Date.now() / 1000);

  const header = {
    alg: 'ES256',
    kid: keyId,
  };

  const payload = {
    iss: teamId,
    iat: now,
    exp: now + 3600,
  };

  // Import the private key
  const pemContents = privateKeyPem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, '');

  const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    { name: 'ECDSA', namedCurve: 'P-256' },
    false,
    ['sign']
  );

  // Create the signing input
  const encoder = new TextEncoder();
  const headerB64 = btoa(JSON.stringify(header))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  const payloadB64 = btoa(JSON.stringify(payload))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  const signingInput = encoder.encode(`${headerB64}.${payloadB64}`);

  // Sign
  const signature = await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' },
    key,
    signingInput
  );

  // Convert signature to base64url
  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${headerB64}.${payloadB64}.${signatureB64}`;
}

async function getSpotifyToken(personalRefresh) {
  const clientId = process.env.SPOTIFY_Client_ID;
  const clientSecret = process.env.SPOTIFY_Client_Secret;
  const refreshToken = personalRefresh || process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret) return null;

  const auth = btoa(`${clientId}:${clientSecret}`);

  // Use refresh token if available to get user-scoped token
  if (refreshToken) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${auth}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }).toString(),
    });

    const data = await response.json();
    if (data.access_token) {
      return data.access_token;
    }
    console.error('Spotify Refresh Token Error:', data);
  }

  // Fallback to client credentials
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

async function getSpotifyPreviewFromEmbed(trackId) {
  try {
    const response = await fetch(
      `https://open.spotify.com/embed/track/${trackId}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      }
    );

    if (!response.ok) return null;

    const html = await response.text();

    // Extract JSON from __NEXT_DATA__ script tag
    const match = html.match(
      /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/
    );
    if (match && match[1]) {
      const data = JSON.parse(match[1]);
      return (
        data.props?.pageProps?.state?.data?.entity?.audioPreview?.url || null
      );
    }
    return null;
  } catch (error) {
    console.error('Error scraping Spotify preview:', error);
    return null;
  }
}
