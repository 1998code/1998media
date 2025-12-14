import en from '../data/i18n/en.json';
import zh from '../data/i18n/zh.json';
import zhHK from '../data/i18n/zh-HK.json';
import ko from '../data/i18n/ko.json';
import ja from '../data/i18n/ja.json';

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
      case 'en': localeData = en; break;
      case 'zh': localeData = zh; break;
      case 'zh-HK': localeData = zhHK; break;
      case 'ko': localeData = ko; break;
      case 'ja': localeData = ja; break;
      default: localeData = null;
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
    const response = await fetch('https://post.1998.media/rss/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
    });
    const xml = await response.text();
    
    // Parse RSS XML manually
    const items = [];
    const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
    
    for (const itemXml of itemMatches) {
      const getTag = (tag) => {
        const match = itemXml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
        return match ? (match[1] || match[2] || '').trim() : '';
      };
      
      const title = getTag('title');
      const link = getTag('link');
      const pubDate = getTag('pubDate');
      
      // Get image from media:content tag (Ghost RSS format)
      const mediaMatch = itemXml.match(/<media:content[^>]*url=["']([^"']*)["'][^>]*>/);
      const imageUrl = mediaMatch ? mediaMatch[1] : '';
      
      // Get categories
      const categoryMatches = itemXml.match(/<category[^>]*><!?\[?CDATA\[?([^\]<]*)\]?\]?<\/category>|<category[^>]*>([^<]*)<\/category>/g) || [];
      const categories = categoryMatches.map(cat => {
        const match = cat.match(/><!?\[?CDATA\[?([^\]<]*)\]?\]?<\/|>([^<]*)<\//);
        return match ? (match[1] || match[2] || '').trim() : '';
      }).filter(Boolean);
      
      if (title && link) {
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
