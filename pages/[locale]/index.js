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
  const [activeSection, setActiveSection] = useState('header');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [headerCompleted, setHeaderCompleted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [darkmodeReady, setDarkmodeReady] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [isScrollingToTop, setIsScrollingToTop] = useState(false);

  const containerRef = useRef(null);
  const loggedMissingKeys = useRef(new Set());

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


  function i18n(key) {
    if (I18n && I18n['index'] && !I18n['index'][key]) {
      if (!loggedMissingKeys.current.has(key)) {
        console.log('Index Missing Translation: ' + key);
        loggedMissingKeys.current.add(key);
      }
    }
    return I18n && I18n['index'] && I18n['index'][key]
      ? I18n['index'][key]
      : key;
  }

  // useEffect to watch if the user interacts with the page, then show music player

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
    let observer;

    const setupObserver = () => {
      observer = new IntersectionObserver(
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
    };

    const timer = setTimeout(() => {
      setupObserver();
    }, headerCompleted ? 100 : 3000);

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [headerCompleted]);



  useEffect(() => {
    const handleDarkmodeInit = () => {
      setDarkmodeReady(true);
    };
    window.addEventListener('darkmode-init', handleDarkmodeInit);

    // Fallback timeout in case darkmode-js fails or takes too long
    const timer = setTimeout(() => {
      setDarkmodeReady(true);
    }, 1000);

    // Check if it's already initialized (for direct navigation/refresh)
    if (document.querySelector('.darkmode-toggle')) {
      setDarkmodeReady(true);
    }

    return () => {
      window.removeEventListener('darkmode-init', handleDarkmodeInit);
      clearTimeout(timer);
    };
  }, []);



  function toggleSidebar() {

    setSidebarOpen(!sidebarOpen);

  }



  const scrollToNext = () => {
    setIsReady(true);
    setHeaderCompleted(true);
    // Use a short delay to allow components to mount before scrolling
    setTimeout(() => {
      const element = document.getElementById('about');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };



  const handleScroll = (e) => {

    if (!headerCompleted && e.target.scrollTop > 10) {

      setHeaderCompleted(true);

    }

    // Infinite scroll: seamlessly loop from footer back to header
    if (!isScrollingToTop && containerRef.current) {
      const container = containerRef.current;
      const headerLoopElement = document.getElementById('header-loop');

      if (headerLoopElement) {
        const rect = headerLoopElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // Check if the duplicate header is in view (scrolled to it)
        if (rect.top <= containerRect.top + 100 && rect.bottom >= containerRect.top) {
          setIsScrollingToTop(true);

          // Instantly jump back to the real header
          const headerElement = document.getElementById('header');
          if (headerElement && container) {
            // Disable smooth scrolling for instant jump
            container.style.scrollBehavior = 'auto';
            headerElement.scrollIntoView({ behavior: 'auto', block: 'start' });

            // Re-enable smooth scrolling
            setTimeout(() => {
              container.style.scrollBehavior = 'smooth';
              setIsScrollingToTop(false);
            }, 50);
          }
        }
      }
    }

  };



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

      {/* <script>AOS.init();</script> */}

      <main className="darkmode-ignore h-dvh w-full overflow-hidden overflow-x-hidden">

        <LocaleSwitcher />

        {loading ? (

          <Loading />

        ) : (

          <div className="h-full w-full relative">

            {(headerCompleted || isReady) && (

              <Navigation

                i18n={I18n}

                sections={sections}

                activeSection={activeSection}

                sidebarOpen={sidebarOpen}

                toggleSidebar={toggleSidebar}

              />

            )}

            <div

              ref={containerRef}

              onScroll={handleScroll}

              className={`${sidebarOpen && 'pl-6 lg:pl-0'} h-full w-full ${(isReady || headerCompleted) ? 'overflow-y-auto' : 'overflow-hidden'} lg:snap-y lg:snap-mandatory scroll-smooth`}

            >

              <section id="header" className="snap-start h-dvh w-full flex-shrink-0">

                <Header

                  i18n={I18n}

                  onComplete={scrollToNext}

                  onReady={() => setIsReady(true)}

                  darkmodeReady={darkmodeReady}

                />

              </section>

              {(headerCompleted || isReady) && (

                <>

                  <section id="about" className="snap-start lg:h-dvh min-h-dvh w-full flex-shrink-0">

                    <About i18n={I18n} />

                  </section>

                  <section id="achievements" className="snap-start lg:h-dvh min-h-dvh w-full flex-shrink-0">

                    <Achievements i18n={I18n} />

                  </section>

                  <section id="gallery" className="snap-start lg:h-dvh min-h-dvh w-full flex-shrink-0">

                    <Gallery

                      i18n={I18n}

                      unsplashData={unsplashData}

                      locale={locale}

                    />

                  </section>

                  <section id="experience" className="snap-start lg:h-dvh min-h-dvh w-full flex-shrink-0">

                    <Experience i18n={I18n} />

                  </section>

                  <section id="skills" className="snap-start lg:h-dvh min-h-dvh w-full flex-shrink-0">

                    <Skills i18n={I18n} />

                  </section>

                  <section id="projects" className="snap-start lg:h-dvh min-h-dvh w-full flex-shrink-0">

                    <Projects i18n={I18n} projectsData={projectsData} />

                  </section>

                  <section id="ai" className="snap-start lg:h-dvh min-h-dvh w-full flex-shrink-0">

                    <AI i18n={I18n} dalle={dalleData} />

                  </section>

                  <section id="blog" className="snap-start lg:h-dvh min-h-dvh w-full flex-shrink-0">

                    <Blog i18n={I18n} blogData={blogData} locale={locale} />

                  </section>

                  <section id="stocks" className="snap-start lg:h-dvh min-h-dvh w-full flex-shrink-0">

                    <Stocks i18n={I18n} stocksData={stocksData} />

                  </section>

                  <section id="faq" className="snap-start lg:h-dvh min-h-dvh w-full flex-shrink-0">

                    <Faq i18n={I18n} />

                  </section>

                  <section id="contact" className="snap-start lg:h-dvh min-h-dvh w-full flex-shrink-0 flex flex-col justify-between overflow-y-auto scrollbar-hide pt-24">

                    <div className="flex-1 flex flex-col justify-center">

                      <Contact i18n={I18n} />

                    </div>

                    <div className="w-full">

                      <Credits i18n={I18n} />

                      <Footer i18n={I18n} ipData={ipData} />

                    </div>

                  </section>

                  {/* Duplicate header for infinite scroll effect */}
                  <section id="header-loop" className="snap-start h-dvh w-full flex-shrink-0">
                    <Header
                      i18n={I18n}
                      onComplete={scrollToNext}
                      onReady={() => setIsReady(true)}
                      darkmodeReady={darkmodeReady}
                    />
                  </section>

                  {interacted && <Music i18n={I18n} />}

                </>

              )}

            </div>

          </div>

        )}

        {isReady && <WhatsAppChat i18n={I18n} />}

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
      currentStocks,
      previousStocks,
      dalleData,
      unsplashData,
      ipData,
    ] = await Promise.all([
      fetchI18nData(locale),
      fetchBlogPosts(),
      fetchTripMedals(locale),
      fetchTripMoments(locale),
      fetchGithubProjects(),
      fetchStocks('AAPL,NVDA,MC.PA,3033.HK'),
      fetchStocks('MSFT,AMZN'),
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
        stocksData: {
          current: currentStocks,
          previous: previousStocks
        },
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
