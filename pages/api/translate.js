// GET: /api/translate?text=Hello&from=en&to=zh

/**
 * Direct Google Translate API implementation
 * Uses translate.googleapis.com/translate_a/single endpoint
 * This is the same endpoint used by translate.google.com web interface
 */
export const runtime = 'edge';

export default async function handler(req) {
  const url = new URL(req.url);
  const text = url.searchParams.get('text');
  const from = url.searchParams.get('from') || 'auto';
  const to = url.searchParams.get('to') || 'en';

  if (!text) {
    return new Response(
      JSON.stringify({ error: 'Text parameter is required' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // Map language codes to Google Translate format
    const langMap = {
      zh: 'zh-CN',
      'zh-HK': 'zh-TW',
      'zh-TW': 'zh-TW',
      'zh-CN': 'zh-CN',
    };

    const sourceLang = langMap[from] || (from === 'auto' ? 'auto' : from);
    const targetLang = langMap[to] || to;

    // Call Google Translate API directly
    const translateUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&hl=${targetLang}&dt=t&dt=bd&dj=1&source=icon&q=${encodeURIComponent(text)}`;

    const response = await fetch(translateUrl, {
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

    return new Response(
      JSON.stringify({
        input: text,
        output: translatedText || text,
        from: data.src || from,
        to,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Translation error:', error);
    return new Response(
      JSON.stringify({
        error: 'Translation failed',
        message: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
