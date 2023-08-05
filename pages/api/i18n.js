import { sql } from "@vercel/postgres";

export default async function (req, res) {
    if (!req.query.lang) {
        res.status(400).json({ error: "Language is required" });
        return;
    };

    const lang = req.query.lang;

    const { rows } = await sql`SELECT * from i18n`;
    const availableLangs = ['en', 'zh', 'zh-HK', 'ko', 'ja'];
    const i18nRaw = availableLangs.reduce((acc, lang) => {
        acc[lang] = {};
        rows.forEach(row => {
            if (!acc[lang][row.position]) acc[lang][row.position] = {};
            acc[lang][row.position][row.key] = row[lang];
        });
        return acc;
    }, {});

    const selectedLang = lang => {
        if (lang.includes('en')) return 'en'
        else if (lang.includes('ja') || lang.includes('jp')) return 'ja'
        else if (lang.includes('ko') || lang.includes('kr')) return 'ko'
        else if (lang.includes('zh-TW') || lang.includes('zh-MO')) return 'zh-HK'
        else if (lang.includes('zh-CN')) return 'zh'
        else return lang
    }
    res.status(200).json(i18nRaw[selectedLang(lang)])
}