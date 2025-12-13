import fs from 'fs';
import path from 'path';

// NOT Edge Runtime because it uses fs
// export const runtime = 'edge';

export default async function (req, res) {
  if (!req.query.lang) {
    res.status(400).json({ error: 'Language is required' });
    return;
  }

  const lang = req.query.lang;

  const selectedLang = (lang) => {
    if (lang.includes('en')) return 'en';
    else if (lang.includes('ja') || lang.includes('jp')) return 'ja';
    else if (lang.includes('ko') || lang.includes('kr')) return 'ko';
    else if (lang.includes('zh-TW') || lang.includes('zh-MO')) return 'zh-HK';
    else if (lang.includes('zh-CN')) return 'zh';
    else return lang;
  };

  const normalizedLocale = selectedLang(lang);
  const filePath = path.join(process.cwd(), 'data', 'i18n', `${normalizedLocale}.json`);

  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContent);
      res.status(200).json(data);
    } else {
      // Fallback to English if file doesn't exist
      const enFilePath = path.join(process.cwd(), 'data', 'i18n', 'en.json');
      if (fs.existsSync(enFilePath)) {
        const fileContent = fs.readFileSync(enFilePath, 'utf8');
        const data = JSON.parse(fileContent);
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: 'Language data not found' });
      }
    }
  } catch (error) {
    console.error(`Error reading i18n file for ${normalizedLocale}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
