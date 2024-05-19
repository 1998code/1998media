import { initializeApp } from 'firebase/app'
import { getVertexAI, getGenerativeModel } from "firebase/vertexai-preview"
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check"

export default async function (req, res) {
    try {
        const firebaseConfig = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
            measurementId: process.env.FIREBASE_MEASUREMENT_ID
        }

        const app = initializeApp(firebaseConfig)

        global.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.APPCHECK_TOKEN
        // Initialize App Check with reCAPTCHA v3
        initializeAppCheck(app, {
            provider: new ReCaptchaV3Provider(process.env.RECAPTCHA_SITE_KEY),
        })

        // Get VertexAI instance
        const vertexAI = getVertexAI(app)
        // Get a Gemini model
        const model = getGenerativeModel(
            vertexAI,
            { model: "gemini-1.5-pro-preview-0409" }
        )
        // Call generateContent with a string or Content(s)
        const generateContentResult = await model.generateContent(req.query.text)

        res.status(200).json({ generateContentResult })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
}