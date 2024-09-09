import { useEffect, useState } from 'react';
import Head from 'next/head';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
      '/ai',
      '/blog',
      '/connect',
      '/contact',
      '/experience',
      '/faq',
      '/openAPI',
      '/paywall',
      '/projects',
      '/skills',
    ];

    if (pages.some((page) => window.location.pathname.includes(page))) {
      setNotHome(true);
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
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1941913120815371"
        ></script> */}
        <link
          rel="stylesheet"
          href="https://cdn.1998.media/css/fontawesome.css"
        />
      </Head>
      {notHome && (
        <a
          href={`/`}
          className="absolute top-5 left-5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 z-[1]"
        >
          <i className="fa fa-arrow-left mr-2" />
          <i className="fa fa-home" />
        </a>
      )}
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

import Darkmode from 'darkmode-js';
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
darkmode.showWidget();

export default MyApp;
