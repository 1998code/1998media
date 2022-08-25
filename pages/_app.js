import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

import Darkmode from 'darkmode-js';
const options = {
  mixColor: '#fff',
  backgroundColor: '#fff6eb',
  buttonColorDark: '#000',
  buttonColorLight: '#fff6eb',
  saveInCookies: true,
  label: '🌓',
  autoMatchOsTheme: true
}

const darkmode = new Darkmode(options);
darkmode.showWidget();

export default MyApp
