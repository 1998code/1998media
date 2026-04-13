import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import LocaleSwitcher from '../../components/LocaleSwitcher';

export const runtime = 'experimental-edge';
import WhatsAppChat from '../../components/WhatsAppChat';
import { fetchI18nData } from '../../lib/fetchData';
import aiData from '../../data/ai.json';

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
// const Music = dynamic(() => import('./music'), { ssr: false });

export default function Home({ i18nData, ipData, locale }) {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('header');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [headerCompleted, setHeaderCompleted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [darkmodeReady, setDarkmodeReady] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [isScrollingToTop, setIsScrollingToTop] = useState(false);
  const [bgType, setBgType] = useState('colorbends');
  const [bgDirection, setBgDirection] = useState(0);
  const [deferredData, setDeferredData] = useState({
    blogData: { posts: [], medals: [], moments: [] },
    stocksData: { current: [], future: [], previous: [] },
    projectsData: [],
    unsplashData: { stats: null, photos: [] },
  });
  const [deferredLoading, setDeferredLoading] = useState(false);

  const changeBg = (type, dir) => {
    setBgDirection(dir);
    setBgType(type);
  };

  useEffect(() => {
    const types = [
      'aurora',
      'colorbends',
      'galaxy',
      'gridscan',
      'orb',
      'prism',
      'prismaticburst',
      'iridescence',
    ];
    setBgType(types[Math.floor(Math.random() * types.length)]);
  }, []);

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

  const hasInitialScrolled = useRef(false);

  // Wait the page loaded, if url contains #, scroll to the section
  useEffect(() => {
    if (window.location.hash && !hasInitialScrolled.current) {
      const hash = window.location.hash.replace('#', '');
      if (sections.includes(hash) && hash !== 'header') {
        hasInitialScrolled.current = true;
        // Immediately show the content if navigating to a specific section
        setIsReady(true);
        setHeaderCompleted(true);
        setLoading(false);

        // Wait longer for full rendering of dynamically imported components
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element && containerRef.current) {
            // Temporarily disable snap to prevent scroll interference
            const originalSnap = containerRef.current.className;
            containerRef.current.className = originalSnap
              .replace('lg:snap-y', '')
              .replace('lg:snap-mandatory', '');

            containerRef.current.style.scrollBehavior = 'auto';
            element.scrollIntoView({
              behavior: 'auto',
              block: 'start',
            });

            // Restore snap and smooth behavior after a short delay
            setTimeout(() => {
              if (containerRef.current) {
                containerRef.current.className = originalSnap;
                containerRef.current.style.scrollBehavior = 'smooth';
                setActiveSection(hash);
              }
            }, 100);
          }
        }, 1500); // Increased wait time for full layout stability
      }
    }
  }, [loading]);

  // Watch hash changed, set the active section
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (sections.includes(hash)) {
        setActiveSection(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Pre-load section JS chunks in background after hero is ready
  useEffect(() => {
    if (!headerCompleted) return;
    const preload = () => {
      import('./about');
      import('./achievements');
      import('./gallery');
      import('./experience');
      import('./skills');
      import('./projects');
      import('./ai');
      import('./blog');
      import('./stocks');
      import('./faq');
      import('./contact');
      import('./credits');
      import('./footer');
    };
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(preload, { timeout: 2000 });
    } else {
      setTimeout(preload, 100);
    }
  }, [headerCompleted]);

  // Fetch non-critical data in background after hero is ready
  useEffect(() => {
    if (!headerCompleted) return;
    const run = async () => {
      setDeferredLoading(true);
      const [blogRes, stocksRes, githubRes, unsplashRes] =
        await Promise.allSettled([
          fetch(`/api/blog?locale=${locale}`).then((r) => r.json()),
          fetch('/api/stocks-portfolio').then((r) => r.json()),
          fetch('/api/github').then((r) => r.json()),
          fetch('/api/unsplash').then((r) => r.json()),
        ]);
      setDeferredData({
        blogData:
          blogRes.status === 'fulfilled'
            ? blogRes.value
            : { posts: [], medals: [], moments: [] },
        stocksData:
          stocksRes.status === 'fulfilled'
            ? stocksRes.value
            : { current: [], future: [], previous: [] },
        projectsData:
          githubRes.status === 'fulfilled' ? githubRes.value.items ?? [] : [],
        unsplashData:
          unsplashRes.status === 'fulfilled'
            ? unsplashRes.value
            : { stats: null, photos: [] },
      });
      setDeferredLoading(false);
    };
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(run, { timeout: 3000 });
    } else {
      setTimeout(run, 200);
    }
  }, [headerCompleted]);

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

    const timer = setTimeout(
      () => {
        setupObserver();
      },
      headerCompleted ? 100 : 3000
    );

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
    setInteracted(true);
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
        if (
          rect.top <= containerRect.top + 100 &&
          rect.bottom >= containerRect.top
        ) {
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
              className={`${sidebarOpen && 'pl-6 lg:pl-0'} h-full w-full overflow-x-hidden ${isReady || headerCompleted ? 'overflow-y-auto' : 'overflow-hidden'} lg:snap-y lg:snap-mandatory scroll-smooth`}
            >
              <section
                id="header"
                className="snap-start h-dvh w-full flex-shrink-0 overflow-x-hidden"
              >
                <Header
                  i18n={I18n}
                  onComplete={scrollToNext}
                  onReady={() => setIsReady(true)}
                  darkmodeReady={darkmodeReady}
                  bgType={bgType}
                  direction={bgDirection}
                  setBg={changeBg}
                />
              </section>

              {(headerCompleted || isReady) && (
                <>
                  <section
                    id="about"
                    className="snap-start lg:h-dvh min-h-dvh w-full flex-shrink-0 overflow-x-hidden"
                  >
                    <About i18n={I18n} />
                  </section>

                  <section
                    id="achievements"
                    className="snap-start lg:h-dvh min-h-dvh w-full flex-shrink-0 overflow-x-hidden"
                  >
                    <Achievements i18n={I18n} />
                  </section>

                  <section
                    id="gallery"
                    className="snap-start lg:h-dvh min-h-dvh w-full flex-shrink-0 overflow-x-hidden"
                  >
                    <Gallery
                      i18n={I18n}
                      unsplashData={deferredData.unsplashData}
                      locale={locale}
                      isLoading={deferredLoading}
                    />
                  </section>

                  <section
                    id="experience"
                    className="snap-start lg:h-dvh min-h-dvh w-full flex-shrink-0 overflow-x-hidden"
                  >
                    <Experience i18n={I18n} />
                  </section>

                  <section
                    id="skills"
                    className="snap-start lg:h-dvh min-h-dvh w-full flex-shrink-0 overflow-x-hidden"
                  >
                    <Skills i18n={I18n} />
                  </section>

                  <section
                    id="projects"
                    className="snap-start lg:h-dvh min-h-dvh w-full flex-shrink-0 overflow-x-hidden"
                  >
                    <Projects
                      i18n={I18n}
                      projectsData={deferredData.projectsData}
                      isLoading={deferredLoading}
                    />
                  </section>

                  <section
                    id="ai"
                    className="snap-start lg:h-dvh lg:min-h-dvh w-full flex-shrink-0 overflow-x-hidden"
                  >
                    <AI i18n={I18n} dalle={aiData} />
                  </section>

                  <section
                    id="blog"
                    className="snap-start lg:h-dvh lg:min-h-dvh w-full flex-shrink-0 overflow-x-hidden"
                  >
                    <Blog
                      i18n={I18n}
                      blogData={deferredData.blogData}
                      locale={locale}
                      isLoading={deferredLoading}
                    />
                  </section>

                  <section
                    id="stocks"
                    className="snap-start lg:h-dvh min-h-dvh w-full flex-shrink-0 overflow-x-hidden"
                  >
                    <Stocks
                      i18n={I18n}
                      stocksData={deferredData.stocksData}
                      isLoading={deferredLoading}
                    />
                  </section>

                  <section
                    id="faq"
                    className="snap-start lg:h-dvh lg:min-h-dvh w-full flex-shrink-0 overflow-x-hidden"
                  >
                    <Faq i18n={I18n} />
                  </section>

                  <section
                    id="contact"
                    className="snap-start lg:h-dvh min-h-dvh w-full flex-shrink-0 flex flex-col justify-between overflow-x-hidden overflow-y-auto scrollbar-hide pt-24"
                  >
                    <div className="flex-1 flex flex-col justify-center">
                      <Contact i18n={I18n} />
                    </div>

                    <div className="w-full">
                      <Credits i18n={I18n} />

                      <Footer i18n={I18n} ipData={ipData} />
                    </div>
                  </section>

                  {/* Duplicate header for infinite scroll effect */}
                  <section
                    id="header-loop"
                    className="snap-start h-dvh w-full flex-shrink-0 overflow-x-hidden"
                  >
                    <Header
                      i18n={I18n}
                      onComplete={scrollToNext}
                      onReady={() => setIsReady(true)}
                      darkmodeReady={darkmodeReady}
                      bgType={bgType}
                      direction={bgDirection}
                      setBg={changeBg}
                    />
                  </section>

                  {/* <Music i18n={I18n} interacted={interacted} locale={locale} /> */}
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
  const normalizedLocale = locale?.includes('en')
    ? 'en'
    : locale?.includes('ja') || locale?.includes('jp')
      ? 'ja'
      : locale?.includes('ko') || locale?.includes('kr')
        ? 'ko'
        : locale?.includes('zh-TW') || locale?.includes('zh-MO')
          ? 'zh-HK'
          : locale?.includes('zh-CN')
            ? 'zh'
            : locale;

  if (!supportedLocales.includes(normalizedLocale)) {
    locale = 'en'; // Fallback to English
  } else {
    locale = normalizedLocale;
  }

  try {
    const [i18nData, ipData] = await Promise.all([
      fetchI18nData(locale),
      fetchIPData(locale, req),
    ]);

    return {
      props: {
        i18nData,
        ipData,
        locale,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        i18nData: {},
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
    const latitude =
      req.headers['cf-iplatitude'] ||
      req.headers['x-vercel-ip-latitude'] ||
      null;
    const longitude =
      req.headers['cf-iplongitude'] ||
      req.headers['x-vercel-ip-longitude'] ||
      null;

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
            city:
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              '?',
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
      geo:
        geo.city && geo.state
          ? `${geo.city}, ${geo.state}`
          : geo.city || geo.state || 'Unknown',
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
