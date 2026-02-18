export const runtime = 'edge';

export default async function handler(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const clientId = process.env.SPOTIFY_Client_ID;
  const clientSecret = process.env.SPOTIFY_Client_Secret;
  const origin = url.origin;
  const redirectUri = `${origin}/api/spotify/callback`;

  if (!code) {
    return new Response(JSON.stringify({ error: 'No code provided' }), {
      status: 400,
    });
  }

  try {
    const authHeader = btoa(`${clientId}:${clientSecret}`);
    const tokenResponse = await fetch(
      'https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authHeader}`,
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUri,
        }),
      }
    );

    const data = await tokenResponse.json();

    if (data.error) {
      return new Response(JSON.stringify(data), { status: 400 });
    }

    // Construct the redirect response manually to avoid immutable header error
    const headers = new Headers();
    headers.append('Location', `${origin}/music`);

    // Set cookies for access and refresh tokens
    // Max age for access token is usually 1 hour (3600s), refresh token is longer.
    headers.append(
      'Set-Cookie',
      `spotify_personal_token=${data.access_token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`
    );
    headers.append(
      'Set-Cookie',
      `spotify_personal_refresh=${data.refresh_token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`
    );

    return new Response(null, {
      status: 302,
      headers: headers,
    });
  } catch (error) {
    console.error('Spotify callback error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
