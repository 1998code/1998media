/**
 * Portfolio holdings and stock-fetching logic.
 *
 * This module is intentionally dependency-free (no i18n JSON or other heavy
 * imports) so it can be shared by both the Node pages and the edge API route
 * (pages/api/stocks-portfolio.js) without bloating the edge bundle.
 */

export const MY_PORTFOLIO = {
  current:
    'AAPL,NVDA,GOOGL,JPM,MC.PA,3033.HK,0P0001GZ0U.HK,0P00000ANE,0P0001C16K,0P00000SBX',
  future: '',
  previous: 'MSFT,AMZN,MA,JD',
};

/**
 * Fetch stock data from Yahoo Finance (no API key required)
 * @param {string} symbols - Comma-separated list of stock symbols (e.g., "AAPL,MSFT,GOOGL")
 */
export async function fetchStocks(symbols = 'AAPL,MSFT,GOOGL') {
  try {
    const symbolList = symbols
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (symbolList.length === 0) {
      return [];
    }

    // Fetch each symbol separately (Yahoo Finance doesn't reliably support multiple symbols in one call)
    const promises = symbolList.map(async (symbol) => {
      try {
        // Fetch 1 month of data for chart
        const response = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1mo`,
          {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
          }
        );

        if (!response.ok) {
          return null;
        }

        const data = await response.json();

        if (
          !data.chart ||
          !data.chart.result ||
          data.chart.result.length === 0
        ) {
          return null;
        }

        const result = data.chart.result[0];
        const meta = result.meta || {};
        const quote = result.indicators?.quote?.[0] || {};
        const timestamps = result.timestamp || [];

        // Get the latest price - prefer regularMarketPrice from meta, fallback to quote close
        const latestIndex = timestamps.length > 0 ? timestamps.length - 1 : 0;
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

        // Determine market state - check if market is currently open based on trading period
        const tradingPeriod = meta.currentTradingPeriod?.regular || {};
        const now = Math.floor(Date.now() / 1000);
        const marketOpen =
          tradingPeriod.start &&
          tradingPeriod.end &&
          now >= tradingPeriod.start &&
          now <= tradingPeriod.end;
        const marketState = marketOpen ? 'REGULAR' : 'CLOSED';

        // Extract chart data (closing prices and timestamps)
        const chartData =
          quote.close?.filter(
            (price, idx) => price != null && timestamps[idx] != null
          ) || [];
        const chartTimestamps =
          timestamps.filter((ts, idx) => quote.close?.[idx] != null) || [];
        // Take last 30 data points for the chart
        const chartPoints = chartData.slice(-30);
        const chartTimes = chartTimestamps.slice(-30);

        return {
          symbol: meta.symbol || symbol,
          name: meta.longName || meta.shortName || symbol,
          price: currentPrice,
          change: change,
          changePercent: changePercent,
          currency: meta.currency || 'USD',
          exchange: meta.exchangeName || meta.fullExchangeName || '',
          marketState: marketState,
          chartData: chartPoints,
          chartTimestamps: chartTimes,
          chartPreviousClose: previousClose,
        };
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Error fetching stock ${symbol}:`, error);
        }
        return null;
      }
    });

    const results = await Promise.all(promises);
    return results.filter((stock) => stock !== null); // Filter out failed requests
  } catch (error) {
    // Only log error in development, silently fail in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching stocks:', error);
    }
    return [];
  }
}
