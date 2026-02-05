export const runtime = 'edge';

export default async function handler(req) {
  const url = new URL(req.url);
  const domain = url.searchParams.get('domain');

  if (!domain) {
    return new Response(JSON.stringify({ error: 'Domain is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Use DNS-over-HTTPS (Cloudflare) for edge-compatible DNS resolution
    const response = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=A`,
      {
        headers: {
          Accept: 'application/dns-json',
        },
      }
    );

    const data = await response.json();
    const addresses = data.Answer?.map((record) => record.data) || [];

    return new Response(JSON.stringify({ addresses }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
