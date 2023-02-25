import { useEffect } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    if (window.location.hostname !== 'localhost') {
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
    }
  }, []);

  return <Component {...pageProps} />
}

import Darkmode from 'darkmode-js';
const options = {
  bottom: '95vh',
  right: '15px',
  time: '1.5s',
  mixColor: '#fff',
  backgroundColor: '#fff6eb',
  buttonColorDark: '#000',
  buttonColorLight: '#fff6eb',
  saveInCookies: true,
  label: '<i class="fa fa-moon-over-sun text-orange-300 dark:text-orange-500" />',
  autoMatchOsTheme: true
}
const darkmode = new Darkmode(options);
darkmode.showWidget();

export default MyApp
