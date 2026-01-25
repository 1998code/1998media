export const runtime = 'edge';

export default async function handler(req) {
  const url = new URL(req.url);
  const symbols = url.searchParams.get('symbols') || 'AAPL,MSFT,GOOGL';

  // Split symbols by comma and filter empty strings
  const symbolList = symbols.split(',').map(s => s.trim()).filter(s => s.length > 0);

  if (symbolList.length === 0) {
    return new Response(JSON.stringify({ error: 'No symbols provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Fetch stock data from Yahoo Finance unofficial API (no key required)
    // Using query1.finance.yahoo.com which is publicly accessible
    const promises = symbolList.map(async (symbol) => {
      try {
        const response = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
          {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
          }
        );

        if (!response.ok) {
          return { symbol, error: `HTTP ${response.status}` };
        }

        const data = await response.json();
        
        if (!data.chart || !data.chart.result || data.chart.result.length === 0) {
          return { symbol, error: 'No data found' };
        }

        const result = data.chart.result[0];
        const meta = result.meta || {};
        const quote = result.indicators?.quote?.[0] || {};
        const timestamps = result.timestamp || [];
        
        // Get the latest price
        const latestIndex = timestamps.length - 1;
        const currentPrice = quote.close?.[latestIndex] || meta.regularMarketPrice || meta.previousClose || 0;
        const previousClose = meta.previousClose || currentPrice;
        const change = currentPrice - previousClose;
        const changePercent = previousClose !== 0 ? ((change / previousClose) * 100) : 0;

        return {
          symbol: meta.symbol || symbol,
          name: meta.longName || meta.shortName || symbol,
          price: currentPrice,
          change: change,
          changePercent: changePercent,
          currency: meta.currency || 'USD',
          exchange: meta.exchangeName || '',
          marketState: meta.marketState || 'REGULAR',
        };
      } catch (error) {
        return { symbol, error: error.message };
      }
    });

    const results = await Promise.all(promises);
    
    return new Response(JSON.stringify({ stocks: results }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
