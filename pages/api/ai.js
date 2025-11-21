// GET: /api/ai?text=your+query+here&debug=true

import { streamText } from 'ai';

export default async function (req, res) {
  const maxRetries = 3;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const input = decodeURIComponent(req.query.text);

      const result = streamText({
        model: 'meituan/longcat-flash-chat',
        prompt: input,
      });

      // Collect the full text from the stream
      let fullText = '';
      for await (const chunk of result.textStream) {
        fullText += chunk;
      }

      const debug = req.query.debug === 'true' || req.query.debug === '1';
      const response = {
        input,
        text: fullText,
      };

      if (debug) {
        response.result = await result;
      }

      res.status(200).json(response);

      // If the code reaches this point, it means it was successful, so we break the loop
      break;
    } catch (err) {
      console.error(err);
      attempts++;

      // If we've reached the maximum number of retries, send a response with an error
      if (attempts === maxRetries) {
        res.status(500).json({
          error: 'An error occurred',
        });
      }
    }
  }
}
