import en from '../../data/i18n/en.json';
import zh from '../../data/i18n/zh.json';
import zhHK from '../../data/i18n/zh-HK.json';
import ko from '../../data/i18n/ko.json';
import ja from '../../data/i18n/ja.json';
import ru from '../../data/i18n/ru.json';
import fr from '../../data/i18n/fr.json';
import es from '../../data/i18n/es.json';

export const runtime = 'edge';

export default async function handler(req) {
  const url = new URL(req.url);
  const lang = url.searchParams.get('lang');

  if (!lang) {
    return new Response(JSON.stringify({ error: 'Language is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const selectedLang = (lang) => {
    if (lang.includes('en')) return 'en';
    else if (lang.includes('ja') || lang.includes('jp')) return 'ja';
    else if (lang.includes('ko') || lang.includes('kr')) return 'ko';
    else if (lang.includes('zh-TW') || lang.includes('zh-MO')) return 'zh-HK';
    else if (lang.includes('zh-CN')) return 'zh';
    else if (lang.includes('ru')) return 'ru';
    else if (lang.includes('fr')) return 'fr';
    else if (lang.includes('es')) return 'es';
    else return lang;
  };

  const normalizedLocale = selectedLang(lang);

  let data;
  switch (normalizedLocale) {
    case 'en':
      data = en;
      break;
    case 'zh':
      data = zh;
      break;
    case 'zh-HK':
      data = zhHK;
      break;
    case 'ko':
      data = ko;
      break;
    case 'ja':
      data = ja;
      break;
    case 'ru':
      data = ru;
      break;
    case 'fr':
      data = fr;
      break;
    case 'es':
      data = es;
      break;
    default:
      data = en;
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
