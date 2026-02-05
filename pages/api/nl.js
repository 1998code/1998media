import { franc } from 'franc-min';

export const runtime = 'edge';

export default function handler(req) {
  const url = new URL(req.url);
  const text = url.searchParams.get('text') || '';
  const lang = franc(text);

  return new Response(
    JSON.stringify({
      text,
      lang,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
