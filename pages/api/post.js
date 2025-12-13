export const runtime = 'edge';

export default async function handler(req) {
  try {
    const response = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://post.1998.media/rss/'
    );
    const feed = await response.json();
    return new Response(JSON.stringify(feed), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch the feed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
