export const runtime = 'edge';

export default async function handler(req) {
  const origin = Object.fromEntries(req.headers.entries());

  return new Response(JSON.stringify({ origin }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
