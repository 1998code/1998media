export const runtime = 'edge';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    locale = 'en',
    user = 'chakmingea',
    week = 'OpenBetaWeekend2',
  } = req.query;

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
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching BF6 data:', error);
    res.status(500).json({
      message: 'Failed to fetch Battlefield 6 data',
      error: error.message,
    });
  }
}
