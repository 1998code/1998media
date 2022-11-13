/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[class="darkmode--activated"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      lineClamp: {
        9: '9',
      },
      cursor: {
        "cell": "cell",
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp')
  ],
}
