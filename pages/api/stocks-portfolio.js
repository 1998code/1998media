import { MY_PORTFOLIO, fetchStocks } from '../../lib/portfolio';

export const runtime = 'edge';

export default async function handler() {
  const [current, previous] = await Promise.allSettled([
    fetchStocks(MY_PORTFOLIO.current),
    fetchStocks(MY_PORTFOLIO.previous),
  ]);

  return new Response(
    JSON.stringify({
      current: current.status === 'fulfilled' ? current.value : [],
      future: [],
      previous: previous.status === 'fulfilled' ? previous.value : [],
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    }
  );
}
