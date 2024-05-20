import { initializeApp } from 'firebase/app';
import { getVertexAI, getGenerativeModel } from 'firebase/vertexai-preview';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

export default async function (req, res) {
  const maxRetries = 3;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const input = decodeURIComponent(req.query.text);

      const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      };

      const app = initializeApp(firebaseConfig);

      global.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.APPCHECK_TOKEN;
      // Initialize App Check with reCAPTCHA v3
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(process.env.RECAPTCHA_SITE_KEY),
      });

      // Get VertexAI instance
      const vertexAI = getVertexAI(app);
      // Get a Gemini model
      const model = getGenerativeModel(vertexAI, {
        model: 'gemini-1.5-pro-preview-0409',
      });
      // Call generateContent with a string or Content(s)
      const generateContentResult = await model.generateContent(input);

      res.status(200).json({
        input,
        generateContentResult,
      });

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
