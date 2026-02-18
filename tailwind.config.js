import tailwindcssAspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[class="darkmode--activated"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      lineClamp: {
        9: '9',
      },
      cursor: {
        cell: 'cell',
      },
    },
  },
  plugins: [tailwindcssAspectRatio],
};
