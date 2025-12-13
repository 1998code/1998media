export const runtime = 'edge';

export default async function handler(req) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const url = new URL(req.url);
  const locale = url.searchParams.get('locale') || 'en';
  const user = url.searchParams.get('user') || 'chakmingea';
  const week = url.searchParams.get('week') || 'OpenBetaWeekend2';

  // Map locale codes to EA API locale format
  const localeMap = {
    'zh-TW': 'zh-hant',
    'zh-CN': 'zh-hans',
    en: 'en',
    ja: 'ja',
    ko: 'ko',
  };

  const apiLocale = localeMap[locale] || 'en';

  try {
    const response = await fetch(
      `https://drop-api.ea.com/player/${user}/stats?gameSlug=battlefield-6&eventName=${week}&locale=${apiLocale}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          Accept: 'application/json',
          'Accept-Language': `${apiLocale},${locale};q=0.9,en;q=0.8`,
          'Cache-Control': 'no-cache',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching BF6 data:', error);
    return new Response(JSON.stringify({
      message: 'Failed to fetch Battlefield 6 data',
      error: error.message,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
