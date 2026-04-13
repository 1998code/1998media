export const runtime = 'edge';

export default async function handler() {
  try {
    const response = await fetch(
      'https://api.github.com/search/repositories?q=1998code/&sort=stars',
      { headers: { 'User-Agent': '1998media/1.0' } }
    );
    const data = await response.json();
    const items =
      data.documentation_url?.includes('rate-limiting') ? [] : data.items || [];

    return new Response(JSON.stringify({ items }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ items: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
