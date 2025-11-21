import { sql } from '@vercel/postgres';

/**
 * Translate text using Google Translate API directly
 */
async function translateText(text, from, to) {
  try {
    // Map language codes to Google Translate format
    const langMap = {
      'zh': 'zh-CN',
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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      return text; // Return original if translation fails
    }

    const data = await response.json();
    
    // Extract translated text from response
    let translatedText = '';
    if (data.sentences && data.sentences.length > 0) {
      translatedText = data.sentences.map(s => s.trans).join('');
    } else if (Array.isArray(data) && data[0] && Array.isArray(data[0])) {
      translatedText = data[0].map(item => item[0]).join('');
    }

    return translatedText || text;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original if translation fails
  }
}

/**
 * Fetch i18n translations from database, with fallback to translation API for unsupported languages
 */
export async function fetchI18nData(locale) {
  try {
    const { rows } = await sql`SELECT * from i18n`;
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
    
    // If language is in database, return directly
    if (availableLangs.includes(normalizedLocale)) {
      const i18nRaw = availableLangs.reduce((acc, lang) => {
        acc[lang] = {};
        rows.forEach((row) => {
          if (!acc[lang][row.position]) acc[lang][row.position] = {};
          acc[lang][row.position][row.key] = row[lang];
        });
        return acc;
      }, {});
      
      return i18nRaw[normalizedLocale];
    }

    // Language not in database - translate from English
    const englishData = availableLangs.reduce((acc, lang) => {
      acc[lang] = {};
      rows.forEach((row) => {
        if (!acc[lang][row.position]) acc[lang][row.position] = {};
        acc[lang][row.position][row.key] = row[lang];
      });
      return acc;
    }, {})['en'];

    // Translate all English strings to the target language in parallel batches
    const translatedData = {};
    const translationPromises = [];
    
    for (const [position, keys] of Object.entries(englishData)) {
      translatedData[position] = {};
      for (const [key, value] of Object.entries(keys)) {
        if (value) {
          // Batch translations to avoid overwhelming the API
          translationPromises.push(
            translateText(value, 'en', normalizedLocale).then(translated => {
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
 * Fetch blog posts from RSS feed
 */
export async function fetchBlogPosts() {
  try {
    const response = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://post.1998.media/rss/'
    );
    const data = await response.json();
    return data.items || [];
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
            locale: locale,
            extension: [
              {
                name: 'locale',
                value: locale,
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
    const data = await response.json();
    return data.medalList || [];
  } catch (error) {
    console.error('Error fetching medals:', error);
    return [];
  }
}

/**
 * Fetch Trip.com moments
 */
export async function fetchTripMoments(locale) {
  try {
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
            locale: locale,
            extension: [
              {
                name: 'locale',
                value: locale,
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
    const data = await response.json();
    return data.resourceBlockList || [];
  } catch (error) {
    console.error('Error fetching moments:', error);
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
