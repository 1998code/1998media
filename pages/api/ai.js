// GET: /api/ai?text=your+query+here&debug=true

import { streamText } from 'ai';

export const runtime = 'edge';

export default async function handler(req) {
  const url = new URL(req.url);
  const maxRetries = 3;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const input = decodeURIComponent(url.searchParams.get('text') || '');

      const result = streamText({
        model: 'meituan/longcat-flash-chat',
        prompt: input,
      });

      // Collect the full text from the stream
      let fullText = '';
      for await (const chunk of result.textStream) {
        fullText += chunk;
      }

      const debug = url.searchParams.get('debug') === 'true' || url.searchParams.get('debug') === '1';
      const response = {
        input,
        text: fullText,
      };

      if (debug) {
        response.result = await result;
      }

      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error(err);
      attempts++;

      // If we've reached the maximum number of retries, send a response with an error
      if (attempts === maxRetries) {
        return new Response(JSON.stringify({ error: 'An error occurred' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
  }
}
