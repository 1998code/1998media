export const runtime = 'edge';

export default async function handler(req) {
  const reqUrl = new URL(req.url);
  const type = reqUrl.searchParams.get('type');
  const url = reqUrl.searchParams.get('url');

  if (type === 'apple') {
    try {
      // Modify URL, say https://www.apple.com to https://apple.com
      const modURL = url.replace('www.', '');

      const response = await fetch(
        'https://tools.applemediaservices.com/api/short-link/shorten',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-csrf-token': process.env.APPLE_SHORTEN_CSRF_TOKEN || '',
            cookie: process.env.APPLE_SHORTEN_COOKIE || '',
            pragma: 'no-cache',
          },
          body: JSON.stringify({ url: modURL }),
        }
      );
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } else {
    return new Response(JSON.stringify({ error: 'Invalid type' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
