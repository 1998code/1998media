import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Cursor from '../../components/Cursor';
import {
  RoomProvider,
  useOthers,
  useMyPresence,
} from '../../liveblocks.config';

// Critical components - load with SSR
const Loading = dynamic(() => import('./loading'));
const Navigation = dynamic(() => import('./navigation'));
const Header = dynamic(() => import('./header'));

// Above-the-fold content
const About = dynamic(() => import('./about'), { ssr: false });

// Below-the-fold components - lazy load without SSR
const Achievements = dynamic(() => import('./achievements'), { ssr: false });
const Gallery = dynamic(() => import('./gallery'), { ssr: false });
const Skills = dynamic(() => import('./skills'), { ssr: false });
const Experience = dynamic(() => import('./experience'), { ssr: false });
const Projects = dynamic(() => import('./projects'), { ssr: false });
const Blog = dynamic(() => import('./blog'), { ssr: false });
const AI = dynamic(() => import('./ai'), { ssr: false });
const OpenAPI = dynamic(() => import('./openAPI'), { ssr: false });
const Faq = dynamic(() => import('./faq'), { ssr: false });
const Contact = dynamic(() => import('./contact'), { ssr: false });
const Credits = dynamic(() => import('./credits'), { ssr: false });
const Footer = dynamic(() => import('./footer'), { ssr: false });
const Music = dynamic(() => import('./music'), { ssr: false });

const COLORS = ['#0EA293', '#576CBC', '#19A7CE'];
function CursorPointer() {
  const [{ cursor }, updateMyPresence] = useMyPresence();

  const users = useOthers();

  const [privateId, setPrivateId] = useState(0);

  useEffect(() => {
    setPrivateId(Math.floor(Math.random() * 100000));
  }, []);

  return (
    <a
      href="#about"
      className="absolute w-screen h-[95vh] z-[1] cursor-pointer"
      onPointerMove={(event) => {
        event.preventDefault();
        updateMyPresence({
          cursor: {
            x: Math.round(event.clientX),
            y: Math.round(event.clientY),
          },
        });
      }}
      onPointerLeave={() => updateMyPresence({ cursor: null })}
    >
      {users.map(({ connectionId, presence }) => {
        if (presence.cursor === null) {
          return null;
        }
        return (
          <Cursor
            key={`cursor-${connectionId}`}
            id={connectionId * privateId}
            color={COLORS[connectionId % COLORS.length]}
            x={presence.cursor.x}
            y={presence.cursor.y}
          />
        );
      })}
    </a>
  );
}

export default function Home() {
  useEffect(() => {
    const path = window.location.pathname.replace('/', '');
    getI18nData(path);
  }, []);

  const [loading, setLoading] = useState(true);
  const [I18n, setI18n] = useState({});
  function getI18nData(path) {
    // Check if data is cached in sessionStorage
    const cacheKey = `i18n_${path}`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      try {
        setI18n(JSON.parse(cached));
        setLoading(false);
        return;
      } catch (e) {
        // If parsing fails, proceed with API call
      }
    }

    axios
      .get(`/api/i18n?lang=${path}`)
      .then((res) => {
        setI18n(res.data);
        setLoading(false);
        // Cache the response
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(res.data));
        } catch (e) {
          // Ignore storage errors
        }
      })
      .catch((err) => {
        alert('Error Occured: ' + err);
        window.location.reload();
      });
  }

  const sections = [
    'header',
    'about',
    'achievements',
    'gallery',
    'experience',
    'skills',
    'projects',
    'openAPI',
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
    window.addEventListener('wheel', handleScroll, { once: true, passive: true });

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
        {/* Preload critical assets */}
        <link rel="preconnect" href="https://static.elfsight.com" />
      </Head>
      {/* Load heavy 3D viewer after page is interactive */}
      <Script
        type="module"
        src="https://cdn.jsdelivr.net/npm/@splinetool/viewer@1.9.79/build/spline-viewer.min.js"
        strategy="lazyOnload"
      />
      {/* Load Elfsight widget after page is interactive */}
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        data-use-service-core
        strategy="lazyOnload"
      />
      {/* <script>AOS.init();</script> */}
      <main className="darkmode-ignore overflow-hidden">
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
                <Projects i18n={I18n} />
                <OpenAPI i18n={I18n} />
                <AI i18n={I18n} />
                <Blog i18n={I18n} />
                <Faq i18n={I18n} />
                <Contact i18n={I18n} />
                <Credits i18n={I18n} />
                <Footer i18n={I18n} />
                {interacted && <Music i18n={I18n} />}
                <div
                  className="elfsight-app-d9c75342-d244-4ae0-91fd-78feae7b7d90"
                  data-elfsight-app-lazy
                ></div>
              </div>
            </div>
          )}
        </RoomProvider>
      </main>
    </div>
  );
}
