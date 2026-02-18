export const runtime = 'edge';

export default async function handler(req) {
    const url = new URL(req.url);
    const clientId = process.env.SPOTIFY_Client_ID;

    // Use the origin from the request or a default
    const origin = url.origin;
    const redirectUri = `${origin}/api/spotify/callback`;

    const scope = [
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-modify-playback-state',
        'user-read-playback-state',
        'user-top-read'
    ].join(' ');

    const state = Math.random().toString(36).substring(7);

    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('client_id', clientId);
    authUrl.searchParams.append('scope', scope);
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('state', state);

    return Response.redirect(authUrl.toString());
}
