export const runtime = 'edge';

export default async function handler(req) {
  try {
    const response = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%401998design'
    );
    const feed = await response.json();
    return new Response(JSON.stringify(feed), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch the Medium feed' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
