import { sql } from '@vercel/postgres';

/**
 * Fetch i18n translations from database
 */
export async function fetchI18nData(locale) {
  try {
    const { rows } = await sql`SELECT * from i18n`;
    const availableLangs = ['en', 'zh', 'zh-HK', 'ko', 'ja'];
    const i18nRaw = availableLangs.reduce((acc, lang) => {
      acc[lang] = {};
      rows.forEach((row) => {
        if (!acc[lang][row.position]) acc[lang][row.position] = {};
        acc[lang][row.position][row.key] = row[lang];
      });
      return acc;
    }, {});

    const selectedLang = (lang) => {
      if (lang.includes('en')) return 'en';
      else if (lang.includes('ja') || lang.includes('jp')) return 'ja';
      else if (lang.includes('ko') || lang.includes('kr')) return 'ko';
      else if (lang.includes('zh-TW') || lang.includes('zh-MO')) return 'zh-HK';
      else if (lang.includes('zh-CN')) return 'zh';
      else return lang;
    };

    return i18nRaw[selectedLang(locale)];
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
