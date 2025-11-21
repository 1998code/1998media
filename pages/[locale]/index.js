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

export default function Home({ i18nData, blogData, projectsData, locale }) {
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
                <Gallery i18n={I18n} />
                <Experience i18n={I18n} />
                <Skills i18n={I18n} />
                <Projects i18n={I18n} projectsData={projectsData} />
                {/* <OpenAPI i18n={I18n} /> */}
                <AI i18n={I18n} />
                <Blog i18n={I18n} blogData={blogData} locale={locale} />
                <Faq i18n={I18n} />
                <Contact i18n={I18n} />
                <Credits i18n={I18n} />
                <Footer i18n={I18n} />
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

  try {
    // Fetch all data in parallel for better performance
    const [i18nData, blogPosts, medals, moments, githubProjects] =
      await Promise.all([
        fetchI18nData(locale),
        fetchBlogPosts(),
        fetchTripMedals(locale),
        fetchTripMoments(locale),
        fetchGithubProjects(),
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
        locale: 'en',
      },
    };
  }
}
