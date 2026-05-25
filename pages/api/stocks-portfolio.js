export const runtime = 'edge';

const CURRENT = 'AAPL,NVDA,GOOGL,MC.PA,3033.HK,MA,JD,0P0001GZ0U.HK';
const PREVIOUS = 'MSFT,AMZN';

async function fetchStocks(symbols) {
  if (!symbols) return [];
  const symbolList = symbols
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (symbolList.length === 0) return [];

  const results = await Promise.all(
    symbolList.map(async (symbol) => {
      try {
        const res = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1mo`,
          {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
          }
        );
        if (!res.ok) return null;
        const data = await res.json();
        if (!data.chart?.result?.length) return null;

        const result = data.chart.result[0];
        const meta = result.meta || {};
        const quote = result.indicators?.quote?.[0] || {};
        const timestamps = result.timestamp || [];

        const latestIndex = timestamps.length - 1;
        const currentPrice =
          meta.regularMarketPrice ||
          quote.close?.[latestIndex] ||
          meta.chartPreviousClose ||
          0;
        const previousClose =
          meta.chartPreviousClose || meta.previousClose || currentPrice;
        const change = currentPrice - previousClose;
        const changePercent =
          previousClose !== 0 ? (change / previousClose) * 100 : 0;

        const tradingPeriod = meta.currentTradingPeriod?.regular || {};
        const now = Math.floor(Date.now() / 1000);
        const marketOpen =
          tradingPeriod.start &&
          tradingPeriod.end &&
          now >= tradingPeriod.start &&
          now <= tradingPeriod.end;

        const chartData =
          quote.close?.filter((p, i) => p != null && timestamps[i] != null) ||
          [];
        const chartTimestamps =
          timestamps.filter((_, i) => quote.close?.[i] != null) || [];

        return {
          symbol: meta.symbol || symbol,
          name: meta.longName || meta.shortName || symbol,
          price: currentPrice,
          change,
          changePercent,
          currency: meta.currency || 'USD',
          exchange: meta.exchangeName || meta.fullExchangeName || '',
          marketState: marketOpen ? 'REGULAR' : 'CLOSED',
          chartData: chartData.slice(-30),
          chartTimestamps: chartTimestamps.slice(-30),
          chartPreviousClose: previousClose,
        };
      } catch {
        return null;
      }
    })
  );

  return results.filter(Boolean);
}

export default async function handler() {
  const [current, previous] = await Promise.allSettled([
    fetchStocks(CURRENT),
    fetchStocks(PREVIOUS),
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
