import { useEffect } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  useEffect(() => {

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    console.log("Glad that you found here. Are you looking for job? Contact hire+web@1998.media");

    const year = new Date().getFullYear() - 2000 + 2;

    console.log(`
           #
          # #
        # # # #
      # # # # # #
    # # # Y${ year } # # #
      # # # # # #
        # # # #
          # #
           #
           *
           *
           * 
           * *
           * * *
           * *
           * 
           
    `);

  }, []);

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
