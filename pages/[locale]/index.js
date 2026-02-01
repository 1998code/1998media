import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import LocaleSwitcher from '../../components/LocaleSwitcher';

export const runtime = 'experimental-edge';
import WhatsAppChat from '../../components/WhatsAppChat';
import {
  fetchI18nData,
  fetchBlogPosts,
  fetchTripMedals,
  fetchTripMoments,
  fetchGithubProjects,
  fetchStocks,
} from '../../lib/fetchData';

// Critical components - load with SSR
const Loading = dynamic(() => import('./loading'));
const Navigation = dynamic(() => import('./navigation'));
const Header = dynamic(() => import('./header'));

// Above-the-fold content - SSR enabled for better SEO and performance
const About = dynamic(() => import('./about'));
const Achievements = dynamic(() => import('./achievements'));

// Below-the-fold components - SSR enabled, lazy load for code splitting
const Gallery = dynamic(() => import('./gallery'));
const Skills = dynamic(() => import('./skills'));
const Experience = dynamic(() => import('./experience'));
const Projects = dynamic(() => import('./projects'));
const Blog = dynamic(() => import('./blog'));
const Stocks = dynamic(() => import('./stocks'));
const AI = dynamic(() => import('./ai'));
// const OpenAPI = dynamic(() => import('./openAPI'));
const Faq = dynamic(() => import('./faq'));
const Contact = dynamic(() => import('./contact'));
const Credits = dynamic(() => import('./credits'));
const Footer = dynamic(() => import('./footer'));

// Music player - keep client-side only (requires user interaction)
const Music = dynamic(() => import('./music'), { ssr: false });

export default function Home({
  i18nData,
  blogData,
  stocksData,
  projectsData,
  dalleData,
  unsplashData,
  ipData,
  locale,
}) {
  const [loading, setLoading] = useState(true);
  const I18n = i18nData;

  // Hide loading screen after mount
  useEffect(() => {
    setLoading(false);
  }, []);


  const sections = [
    'header',
    'about',
    'achievements',
    'gallery',
    'experience',
    'skills',
    'projects',
    // 'openAPI',
    'ai',
    'blog',
    'trip',
    'stocks',
    'faq',
    'contact',
  ];
  const [activeSection, setActiveSection] = useState('header');

  function i18n(key) {
    if (I18n && I18n['index'] && !I18n['index'][key]) {
      console.log('Index Missing Translation: ' + key);
    }
    return I18n && I18n['index'] && I18n['index'][key]
      ? I18n['index'][key]
      : key;
  }

  // useEffect to watch if the user interacts with the page, then show music player
  const [interacted, setInteracted] = useState(false);
  useEffect(() => {
    let scrollTimeout;
    const handleInteracted = () => {
      setInteracted(true);
    };

    const handleScroll = () => {
      // Debounce to differentiate manual scroll from programmatic scroll (hash navigation)
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setInteracted(true);
      }, 100);
    };

    // Use { once: true } so it doesn't interfere with navigation clicks
    window.addEventListener('click', handleInteracted, { once: true });
    window.addEventListener('keydown', handleInteracted, { once: true });
    window.addEventListener('touchstart', handleInteracted, { once: true });
    window.addEventListener('wheel', handleScroll, {
      once: true,
      passive: true,
    });

    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('click', handleInteracted);
      window.removeEventListener('keydown', handleInteracted);
      window.removeEventListener('touchstart', handleInteracted);
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  // Wait the page loaded, if url contains #, scroll to the section
  useEffect(() => {
    setTimeout(() => {
      if (window.location.hash) {
        const hash = window.location.hash.replace('#', '');
        if (sections.includes(hash)) {
          setActiveSection(hash);
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          } else {
            console.log('Element not found');
          }
        } else {
          console.log('Hash is not in sections');
        }
      } else {
        console.log('window.location.hash is empty');
      }
    }, 2000);
  }, [loading]);

  // Watch hash changed, set the active section
  useEffect(() => {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (sections.includes(hash)) {
        setActiveSection(hash);
      }
    });
  });

  // IntersectionObserver to watch the section, set the active section
  useEffect(() => {
    setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
              // Change the url hash
              if (window.location.hash !== '#' + entry.target.id) {
                window.history.pushState(
                  '',
                  '',
                  window.location.pathname + '#' + entry.target.id
                );
              }
            }
          });
        },
        { threshold: 0.5 }
      );

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          observer.observe(element);
        }
      });

      return () => {
        sections.forEach((section) => {
          const element = document.getElementById(section);
          if (element) {
            observer.unobserve(element);
          }
        });
      };
    }, 3000);
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <div>
      <Head>
        <title>{i18n('1998 MEDIA (Official Website)')}</title>
        <meta
          name="description"
          content={i18n(
            'Experience the Art of Design - Your Vision, My Craftsmanship.'
          )}
        />
        <link rel="icon" href="https://cdn.1998.media/favicon24.jpg" />
      </Head>
      {/* Load heavy 3D viewer after page is interactive */}
      <Script
        type="module"
        src="https://cdn.jsdelivr.net/npm/@splinetool/viewer@1.9.79/build/spline-viewer.min.js"
        strategy="lazyOnload"
      />
      {/* <script>AOS.init();</script> */}
      <main className="darkmode-ignore overflow-hidden">
        <LocaleSwitcher />
        {loading ? (
          <Loading />
        ) : (
          <div>
            <Navigation
              i18n={I18n}
              sections={sections}
              activeSection={activeSection}
              sidebarOpen={sidebarOpen}
              toggleSidebar={toggleSidebar}
            />
            <div className={`${sidebarOpen && 'pl-6 lg:pl-0'}`}>
              <Header i18n={I18n} />
              <About i18n={I18n} />
              <Achievements i18n={I18n} />
              <Gallery
                i18n={I18n}
                unsplashData={unsplashData}
                locale={locale}
              />
              <Experience i18n={I18n} />
              <Skills i18n={I18n} />
              <Projects i18n={I18n} projectsData={projectsData} />
              {/* <OpenAPI i18n={I18n} /> */}
              <AI i18n={I18n} dalle={dalleData} />
              <Blog i18n={I18n} blogData={blogData} locale={locale} />
              <Stocks i18n={I18n} stocksData={stocksData} />
              <Faq i18n={I18n} />
              <Contact i18n={I18n} />
              <Credits i18n={I18n} />
              <Footer i18n={I18n} ipData={ipData} />
              {interacted && <Music i18n={I18n} />}
            </div>
          </div>
        )}
        <WhatsAppChat i18n={I18n} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  let { locale } = context.params;
  const { req } = context;
  
  // Fallback to English if locale is not supported
  const supportedLocales = ['en', 'zh', 'zh-HK', 'ko', 'ja'];
  const normalizedLocale = locale?.includes('en') ? 'en' :
                          locale?.includes('ja') || locale?.includes('jp') ? 'ja' :
                          locale?.includes('ko') || locale?.includes('kr') ? 'ko' :
                          locale?.includes('zh-TW') || locale?.includes('zh-MO') ? 'zh-HK' :
                          locale?.includes('zh-CN') ? 'zh' :
                          locale;
  
  if (!supportedLocales.includes(normalizedLocale)) {
    locale = 'en'; // Fallback to English
  } else {
    locale = normalizedLocale;
  }

  try {
    // Fetch all data in parallel for better performance
    const [
      i18nData,
      blogPosts,
      medals,
      moments,
      githubProjects,
      stocksData,
      dalleData,
      unsplashData,
      ipData,
    ] = await Promise.all([
      fetchI18nData(locale),
      fetchBlogPosts(),
      fetchTripMedals(locale),
      fetchTripMoments(locale),
      fetchGithubProjects(),
      fetchStocks('NVDA,MC.PA,3033.HK'), // Add your stock symbols here
      fetchDalleData(),
      fetchUnsplashData(),
      fetchIPData(locale, req),
    ]);

    return {
      props: {
        i18nData,
        blogData: {
          posts: blogPosts,
          medals,
          moments,
        },
        stocksData,
        projectsData: githubProjects,
        dalleData,
        unsplashData,
        ipData,
        locale,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        i18nData: {},
        blogData: {
          posts: [],
          medals: [],
          moments: [],
        },
        stocksData: [],
        projectsData: [],
        dalleData: [],
        unsplashData: { stats: null, photos: [] },
        ipData: {
          ip: null,
          geo: 'Unknown',
          latitude: 'Unknown',
          longitude: 'Unknown',
        },
        locale: 'en',
      },
    };
  }
}

async function fetchUnsplashData() {
  try {
    const unsplashPublicKey = 'hjm0tzh_dDQx2REubp1NiT1P4jxE5wmnCbKQLbD-BZ8';
    const [statsResponse, photosResponse] = await Promise.all([
      fetch(
        `https://api.unsplash.com/users/1998media/statistics?client_id=${unsplashPublicKey}`
      ),
      fetch(
        `https://api.unsplash.com/users/1998media/photos?client_id=${unsplashPublicKey}`
      ),
    ]);

    const stats = statsResponse.ok ? await statsResponse.json() : null;
    const photos = photosResponse.ok ? await photosResponse.json() : [];

    return {
      stats: stats ? { totalViews: stats.views?.total || 0 } : null,
      photos,
    };
  } catch (error) {
    console.error('Error fetching Unsplash data:', error);
    return { stats: null, photos: [] };
  }
}

async function fetchIPData(locale, req) {
  try {
    // Get IP from headers
    const ip =
      req.headers['x-forwarded-for'] || 
      req.headers['cf-connecting-ip'] || // Cloudflare
      req.socket?.remoteAddress || 
      null;

    // Get location from Cloudflare headers (available on Cloudflare Pages)
    const cfCity = req.headers['cf-ipcity'] || null;
    const cfCountry = req.headers['cf-ipcountry'] || null;
    const latitude = req.headers['cf-iplatitude'] || req.headers['x-vercel-ip-latitude'] || null;
    const longitude = req.headers['cf-iplongitude'] || req.headers['x-vercel-ip-longitude'] || null;

    let geo;
    if (cfCity || cfCountry) {
      geo = {
        city: cfCity || null,
        state: cfCountry || null,
      };
    } else if (latitude && longitude) {
      // Fallback: use a simple reverse geocoding API that works on edge
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=${locale || 'en'}`,
          { headers: { 'User-Agent': '1998media/1.0' } }
        );
        if (response.ok) {
          const data = await response.json();
          geo = {
            city: data.address?.city || data.address?.town || data.address?.village || '?',
            state: data.address?.state || data.address?.country || '?',
          };
        } else {
          geo = { city: '?', state: '?' };
        }
      } catch {
        geo = { city: '?', state: '?' };
      }
    } else {
      geo = {
        city: 'Local',
        state: 'Local',
      };
    }

    return {
      ip,
      geo: geo.city && geo.state ? `${geo.city}, ${geo.state}` : (geo.city || geo.state || 'Unknown'),
      latitude: latitude || 'Unknown',
      longitude: longitude || 'Unknown',
    };
  } catch (error) {
    console.error('Error fetching IP data:', error);
    return {
      ip: null,
      geo: 'Unknown',
      latitude: 'Unknown',
      longitude: 'Unknown',
    };
  }
}

async function fetchDalleData() {
  try {
    // Import JSON directly - Next.js will bundle this
    const aiData = (await import('../../data/ai.json')).default;
    return aiData;
  } catch (error) {
    console.error('Error fetching AI data:', error);
    return [];
  }
}
