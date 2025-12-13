export const runtime = 'edge';

export default async function handler(req) {
  const url = new URL(req.url);
  const provider = url.searchParams.get('provider');
  const path = url.searchParams.get('path');

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
      return new Response(JSON.stringify({ error: 'Apple Music credentials not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
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
          return new Response(JSON.stringify({ result: 500, errMsg: 'key is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
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
          return new Response(JSON.stringify({ result: 500, errMsg: 'key is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        apiUrl = `https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?key=${encodeURIComponent(key)}&g_tk=5381`;
        break;

      case 'singer':
        // Singer info
        if (!singermid) {
          return new Response(JSON.stringify({ result: 500, errMsg: 'singermid is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        apiUrl = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?singermid=${singermid}&num=${pageSize}&begin=${(parseInt(pageNo) - 1) * parseInt(pageSize)}&g_tk=5381&format=json`;
        break;

      case 'album':
        // Album info
        if (!albummid) {
          return new Response(JSON.stringify({ result: 500, errMsg: 'albummid is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        apiUrl = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid=${albummid}&g_tk=5381&format=json`;
        break;

      case 'song':
        // Song info
        if (!songmid) {
          return new Response(JSON.stringify({ result: 500, errMsg: 'songmid is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        apiUrl = `https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid=${songmid}&g_tk=5381&format=json`;
        break;

      case 'lyric':
        // Lyrics - use alternative endpoint that's more reliable
        if (!songmid) {
          return new Response(JSON.stringify({ result: 500, errMsg: 'songmid is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        // Try the newer API endpoint which is more reliable
        try {
          const lyricResponse = await fetch(`https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?songmid=${songmid}&g_tk=5381&format=json&nobase64=1`, {
            headers: {
              'Referer': 'https://y.qq.com/portal/player.html',
              'Host': 'c.y.qq.com',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
          });
          let lyricResult = await lyricResponse.text();
          // Remove JSONP callback
          lyricResult = lyricResult.replace(/^(MusicJsonCallback\(|\)$)/g, '');
          
          try {
            const lyricData = JSON.parse(lyricResult);
            // If the API returns an error, try a fallback
            if (lyricData.retcode !== 0 && lyricData.code !== 0) {
              // Try fallback - use NetEase or return empty
              return new Response(JSON.stringify({ lyric: '', trans: '', retcode: lyricData.retcode || lyricData.code }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
              });
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
          return new Response(JSON.stringify({ lyric: '', trans: '', error: error.message }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }

      case 'recommend':
        // Recommendations
        apiUrl = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&format=json';
        break;

      case 'top':
        // Top charts
        const topid = url.searchParams.get('topid') || '26';
        apiUrl = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?topid=${topid}&num=${pageSize}&page=${pageNo}&g_tk=5381&format=json`;
        break;

      default:
        return new Response(JSON.stringify({ result: 500, errMsg: `Unknown path: ${path}` }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
    }

    const response = await fetch(apiUrl, {
      headers: {
        'Referer': 'https://y.qq.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    let result = await response.text();
    
    // Remove JSONP callback wrapper if present
    result = result.replace(/^(callback\(|MusicJsonCallback\(|jsonCallback\(|\)$)/g, '');
    
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
    return new Response(JSON.stringify({ result: 500, errMsg: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
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
  
  const binaryKey = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));
  
  const key = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    { name: 'ECDSA', namedCurve: 'P-256' },
    false,
    ['sign']
  );

  // Create the signing input
  const encoder = new TextEncoder();
  const headerB64 = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const payloadB64 = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
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
