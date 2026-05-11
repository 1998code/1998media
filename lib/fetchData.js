import en from '../data/i18n/en.json';
import zh from '../data/i18n/zh.json';
import zhHK from '../data/i18n/zh-HK.json';
import ko from '../data/i18n/ko.json';
import ja from '../data/i18n/ja.json';

export const MY_PORTFOLIO = {
  current: 'AAPL,NVDA,MC.PA,3033.HK,MA,JD',
  future: '',
  previous: 'MSFT,AMZN',
};

/**
 * Translate text using Google Translate API directly
 */
async function translateText(text, from, to) {
  try {
    // Map language codes to Google Translate format
    const langMap = {
      zh: 'zh-CN',
      'zh-HK': 'zh-TW',
      'zh-TW': 'zh-TW',
      'zh-CN': 'zh-CN',
    };

    const sourceLang = langMap[from] || from;
    const targetLang = langMap[to] || to;

    // Call Google Translate API directly
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&hl=${targetLang}&dt=t&dt=bd&dj=1&source=icon&q=${encodeURIComponent(text)}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      return text; // Return original if translation fails
    }

    const data = await response.json();

    // Extract translated text from response
    let translatedText = '';
    if (data.sentences && data.sentences.length > 0) {
      translatedText = data.sentences.map((s) => s.trans).join('');
    } else if (Array.isArray(data) && data[0] && Array.isArray(data[0])) {
      translatedText = data[0].map((item) => item[0]).join('');
    }

    return translatedText || text;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original if translation fails
  }
}

/**
 * Fetch i18n translations from local JSON files, with fallback to translation API for unsupported languages
 */
export async function fetchI18nData(locale) {
  try {
    const availableLangs = ['en', 'zh', 'zh-HK', 'ko', 'ja'];

    const selectedLang = (lang) => {
      if (lang.includes('en')) return 'en';
      else if (lang.includes('ja') || lang.includes('jp')) return 'ja';
      else if (lang.includes('ko') || lang.includes('kr')) return 'ko';
      else if (lang.includes('zh-TW') || lang.includes('zh-MO')) return 'zh-HK';
      else if (lang.includes('zh-CN')) return 'zh';
      else return lang;
    };

    const normalizedLocale = selectedLang(locale);

    // Get data directly from bundled JSONs
    let localeData = null;
    switch (normalizedLocale) {
      case 'en':
        localeData = en;
        break;
      case 'zh':
        localeData = zh;
        break;
      case 'zh-HK':
        localeData = zhHK;
        break;
      case 'ko':
        localeData = ko;
        break;
      case 'ja':
        localeData = ja;
        break;
      default:
        localeData = null;
    }

    // If language is in database (bundled JSON), return directly
    if (localeData && availableLangs.includes(normalizedLocale)) {
      return localeData;
    }

    // Language not in database - translate from English
    const englishData = en;

    // If we just fell back to English because the target lang file was missing/error
    // but the target lang is theoretically supported, we might want to return English
    // However, if the target lang is NOT in availableLangs, we translate.

    // Translate all English strings to the target language in parallel batches
    const translatedData = {};
    const translationPromises = [];

    for (const [position, keys] of Object.entries(englishData)) {
      translatedData[position] = {};
      for (const [key, value] of Object.entries(keys)) {
        if (value) {
          // Batch translations to avoid overwhelming the API
          translationPromises.push(
            translateText(value, 'en', normalizedLocale).then((translated) => {
              translatedData[position][key] = translated;
            })
          );
        } else {
          translatedData[position][key] = value;
        }
      }
    }

    // Wait for all translations to complete (in batches of 10 to avoid rate limits)
    const batchSize = 10;
    for (let i = 0; i < translationPromises.length; i += batchSize) {
      await Promise.all(translationPromises.slice(i, i + batchSize));
    }

    return translatedData;
  } catch (error) {
    console.error('Error fetching i18n data:', error);
    return {};
  }
}

/**
 * Fetch blog posts from RSS feed (parse XML directly)
 */
export async function fetchBlogPosts() {
  try {
    const response = await fetch('https://blog.1998.media/feed', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Accept: 'application/rss+xml, application/xml, text/xml',
      },
      redirect: 'follow',
    });
    const xml = await response.text();

    const items = [];
    const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];

    for (const itemXml of itemMatches) {
      const getTag = (tag) => {
        const match = itemXml.match(
          new RegExp(
            `<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`
          )
        );
        return match ? (match[1] || match[2] || '').trim() : '';
      };

      const title = getTag('title');
      const link = getTag('link');
      const pubDate = getTag('pubDate');

      // Medium puts the image inside <description> HTML — extract first <img src>
      const description = getTag('description');
      const imgMatch = description.match(/<img[^>]+src=["']([^"']+)["']/);
      const imageUrl = imgMatch ? imgMatch[1] : '';

      // Get categories
      const categoryMatches =
        itemXml.match(
          /<category[^>]*><!?\[?CDATA\[?([^\]<]*)\]?\]?<\/category>|<category[^>]*>([^<]*)<\/category>/g
        ) || [];
      const categories = categoryMatches
        .map((cat) => {
          const match = cat.match(
            /><!?\[?CDATA\[?([^\]<]*)\]?\]?<\/|>([^<]*)<\//
          );
          return match ? (match[1] || match[2] || '').trim() : '';
        })
        .filter(Boolean);

      // Filter out monthly newsletter posts (e.g. "2026年3月精選推介(下)")
      const isNewsletter = /\d{4}年\d{1,2}月.{0,10}推介/.test(title);

      if (title && link && !isNewsletter) {
        items.push({
          title,
          link,
          pubDate,
          enclosure: { link: imageUrl },
          categories,
        });
      }
    }

    return items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Fetch Trip.com medals
 */
export async function fetchTripMedals(locale) {
  try {
    // Normalize locale for Trip.com API (requires full locale codes like ja-JP, not just ja)
    // Fallback to English if language not found
    const tripLocale =
      locale === 'ja'
        ? 'ja-JP'
        : locale === 'ko'
          ? 'ko-KR'
          : locale === 'zh'
            ? 'zh-CN'
            : locale === 'zh-HK'
              ? 'zh-TW'
              : locale === 'en'
                ? 'en-US'
                : 'en-US';

    const response = await fetch(
      'https://www.trip.com/restapi/soa2/18066/getAllMedal',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientAuth:
            'E1B9A703A2E3FEF984D86D1D507FB324B4A7CBA7500F0E62A0BFA68DCC95C09E',
          source: 'medal_sort',
          head: {
            cver: '1.0',
            cid: '09031029418990699836',
            locale: tripLocale,
            extension: [
              {
                name: 'locale',
                value: tripLocale,
              },
              {
                name: 'platform',
                value: 'Online',
              },
            ],
          },
        }),
      }
    );

    // Check if response is OK and has JSON content
    if (!response.ok) {
      console.warn(
        'Trip.com medals API returned non-OK status:',
        response.status
      );
      return [];
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('Trip.com medals API returned non-JSON response');
      return [];
    }

    // Check if response is HTML (error page) before parsing JSON
    const text = await response.text();
    if (
      text.trim().startsWith('<!DOCTYPE') ||
      text.trim().startsWith('<html')
    ) {
      console.warn('Trip.com medals API returned HTML instead of JSON');
      return [];
    }

    try {
      const data = JSON.parse(text);
      return data.medalList || [];
    } catch (parseError) {
      console.warn('Failed to parse Trip.com medals API response as JSON');
      return [];
    }
  } catch (error) {
    // Only log error in development, silently fail in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching medals:', error);
    }
    return [];
  }
}

/**
 * Fetch Trip.com moments
 */
export async function fetchTripMoments(locale) {
  try {
    // Normalize locale for Trip.com API (requires full locale codes like ja-JP, not just ja)
    // Fallback to English if language not found
    const tripLocale =
      locale === 'ja'
        ? 'ja-JP'
        : locale === 'ko'
          ? 'ko-KR'
          : locale === 'zh'
            ? 'zh-CN'
            : locale === 'zh-HK'
              ? 'zh-TW'
              : locale === 'en'
                ? 'en-US'
                : 'en-US';

    const response = await fetch(
      'https://www.trip.com/restapi/soa2/18066/searchMomentList',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bizType: 'personalList',
          clientAuthList: [
            'E1B9A703A2E3FEF984D86D1D507FB324B4A7CBA7500F0E62A0BFA68DCC95C09E',
          ],
          source: 'pc_h5',
          pageNo: 1,
          pageSize: 50,
          head: {
            cver: '1.0',
            cid: '09031029418990699836',
            locale: tripLocale,
            extension: [
              {
                name: 'locale',
                value: tripLocale,
              },
              {
                name: 'platform',
                value: 'Online',
              },
            ],
          },
        }),
      }
    );

    // Check if response is OK and has JSON content
    if (!response.ok) {
      console.warn(
        'Trip.com moments API returned non-OK status:',
        response.status
      );
      return [];
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('Trip.com moments API returned non-JSON response');
      return [];
    }

    // Check if response is HTML (error page) before parsing JSON
    const text = await response.text();
    if (
      text.trim().startsWith('<!DOCTYPE') ||
      text.trim().startsWith('<html')
    ) {
      console.warn('Trip.com moments API returned HTML instead of JSON');
      return [];
    }

    try {
      const data = JSON.parse(text);
      return data.resourceBlockList || [];
    } catch (parseError) {
      console.warn('Failed to parse Trip.com moments API response as JSON');
      return [];
    }
  } catch (error) {
    // Only log error in development, silently fail in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching moments:', error);
    }
    return [];
  }
}

/**
 * Fetch GitHub projects
 */
export async function fetchGithubProjects() {
  try {
    const response = await fetch(
      'https://api.github.com/search/repositories?q=1998code/&sort=stars'
    );
    const data = await response.json();
    if (
      data.documentation_url !==
      'https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting'
    ) {
      return data.items || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
}

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
