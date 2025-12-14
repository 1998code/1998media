import { useEffect, useState } from 'react';
import Head from 'next/head';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [notHome, setNotHome] = useState(false);

  useEffect(() => {
    if (window.location.hostname !== 'localhost') {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        alert('For security reasons, right-click is disabled.');
      });
    }

    const pages = [
      '/about',
      '/achievements',
      '/gallery',
      '/ai',
      '/blog',
      '/connect',
      '/contact',
      '/experience',
      '/faq',
      '/openAPI',
      '/projects',
      '/skills',
    ];

    if (pages.some((page) => window.location.pathname.includes(page))) {
      setNotHome(true);
    }

    // Initialize darkmode after component mounts and DOM is ready
    const initDarkmode = () => {
      // Ensure DOM is ready
      if (typeof window === 'undefined' || !document.body) {
        setTimeout(initDarkmode, 100);
        return;
      }

      import('darkmode-js')
        .then((module) => {
          try {
            const Darkmode = module.default;
            const options = {
              bottom: '93.5vh',
              right: '25px',
              time: '1.5s',
              mixColor: '#fff',
              backgroundColor: '#fff6eb',
              buttonColorDark: '#000',
              buttonColorLight: '#fff6eb',
              saveInCookies: true,
              label:
                '<i class="fa fa-moon-over-sun text-orange-300 dark:text-orange-500" />',
              autoMatchOsTheme: true,
            };
            const darkmode = new Darkmode(options);
            // Add error handling for showWidget
            try {
              darkmode.showWidget();
            } catch (widgetError) {
              console.error('Error showing darkmode widget:', widgetError);
            }
          } catch (error) {
            console.error('Error initializing darkmode:', error);
          }
        })
        .catch((error) => {
          console.error('Error loading darkmode-js:', error);
        });
    };

    // Wait for DOM to be fully ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initDarkmode);
    } else {
      // DOM is already ready, but wait a bit for React to hydrate
      setTimeout(initDarkmode, 100);
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff6eb"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000914"
        />
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://cdn.1998.media" />
        <link rel="dns-prefetch" href="https://cdn.1998.media" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1941913120815371"
        ></script> */}
      </Head>
      {notHome && (
        <div className="relative max-w-7xl mx-auto mt-6 -mb-10 z-[99] px-6 xl:px-0">
          <a
            href={`/`}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <i className="fa fa-arrow-left mr-2" />
            <i className="fa fa-home" />
          </a>
        </div>
      )}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
