// GET: /api/translate?text=Hello&from=en&to=zh

/**
 * Direct Google Translate API implementation
 * Uses translate.googleapis.com/translate_a/single endpoint
 * This is the same endpoint used by translate.google.com web interface
 */
export const runtime = 'edge';

export default async function (req, res) {
  const { text, from = 'auto', to = 'en' } = req.query;

  if (!text) {
    return res.status(400).json({ error: 'Text parameter is required' });
  }

  try {
    // Map language codes to Google Translate format
    const langMap = {
      zh: 'zh-CN',
      'zh-HK': 'zh-TW',
      'zh-TW': 'zh-TW',
      'zh-CN': 'zh-CN',
    };

    const sourceLang = langMap[from] || from === 'auto' ? 'auto' : from;
    const targetLang = langMap[to] || to;

    // Call Google Translate API directly
    // Endpoint: translate.googleapis.com/translate_a/single
    // This is the public endpoint used by Google Translate web interface
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&hl=${targetLang}&dt=t&dt=bd&dj=1&source=icon&q=${encodeURIComponent(text)}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Translation API returned ${response.status}`);
    }

    const data = await response.json();

    // Extract translated text from response
    let translatedText = '';
    if (data.sentences && data.sentences.length > 0) {
      translatedText = data.sentences.map((s) => s.trans).join('');
    } else if (Array.isArray(data) && data[0] && Array.isArray(data[0])) {
      translatedText = data[0].map((item) => item[0]).join('');
    }

    res.status(200).json({
      input: text,
      output: translatedText || text,
      from: data.src || from,
      to,
    });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({
      error: 'Translation failed',
      message: error.message,
    });
  }
}
