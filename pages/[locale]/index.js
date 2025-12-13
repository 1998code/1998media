import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import LocaleSwitcher from '../../components/LocaleSwitcher';
import CursorPointer from '../../components/CursorPointer';
import WhatsAppChat from '../../components/WhatsAppChat';
import { RoomProvider } from '../../liveblocks.config';
import {
  fetchI18nData,
  fetchBlogPosts,
  fetchTripMedals,
  fetchTripMoments,
  fetchGithubProjects,
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
        <RoomProvider id="1998-MEDIA" initialPresence={{ cursor: null }}>
          <CursorPointer />
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
                <Faq i18n={I18n} />
                <Contact i18n={I18n} />
                <Credits i18n={I18n} />
                <Footer i18n={I18n} ipData={ipData} />
                {interacted && <Music i18n={I18n} />}
              </div>
            </div>
          )}
        </RoomProvider>
        <WhatsAppChat i18n={I18n} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { locale } = context.params;
  const { req } = context;

  try {
    // Fetch all data in parallel for better performance
    const [
      i18nData,
      blogPosts,
      medals,
      moments,
      githubProjects,
      dalleData,
      unsplashData,
      ipData,
    ] = await Promise.all([
      fetchI18nData(locale),
      fetchBlogPosts(),
      fetchTripMedals(locale),
      fetchTripMoments(locale),
      fetchGithubProjects(),
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
    // Replicate IP API logic server-side using request headers
    const NodeGeocoder = (await import('node-geocoder')).default;

    // Get IP from headers (same as API route)
    const ip =
      req.headers['x-forwarded-for'] || req.socket?.remoteAddress || null;

    // Get latitude/longitude from Vercel headers
    const latitude = req.headers['x-vercel-ip-latitude'] || null;
    const longitude = req.headers['x-vercel-ip-longitude'] || null;

    let geo;
    try {
      if (latitude && longitude) {
        const options = {
          provider: 'openstreetmap',
          language: locale || 'en',
        };
        const geoCoder = NodeGeocoder(options);
        const result = await geoCoder.reverse({
          lat: parseFloat(latitude),
          lon: parseFloat(longitude),
        });
        geo = {
          city: result[0]?.city || '?',
          state: result[0]?.state || '?',
        };
      } else {
        geo = {
          city: 'Local',
          state: 'Local',
        };
      }
    } catch (error) {
      console.log('Geocoding error:', error);
      geo = {
        city: '?',
        state: '?',
      };
    }

    return {
      ip,
      geo: geo.city && geo.state ? `${geo.city}, ${geo.state}` : 'Unknown',
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
    // Determine the environment - in production, we can't easily read local files in getStaticProps/getServerSideProps 
    // depending on deployment (e.g. Vercel vs self-hosted). 
    // For self-hosted Node.js, we can use fs.
    
    // However, since we are in getServerSideProps (which runs on server), we can try to read the file.
    // Note: importing 'fs' inside a function is tricky if the bundler doesn't handle it, 
    // but in Next.js getServerSideProps, it's fine if we use process.cwd()
    
    const fs = (await import('fs')).default;
    const path = (await import('path')).default;
    
    const filePath = path.join(process.cwd(), 'data', 'ai.json');
    if (fs.existsSync(filePath)) {
       const fileContent = fs.readFileSync(filePath, 'utf8');
       return JSON.parse(fileContent);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching AI data:', error);
    return [];
  }
}
