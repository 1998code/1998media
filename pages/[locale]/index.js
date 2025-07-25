import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Cursor from '../../components/Cursor';
import {
  RoomProvider,
  useOthers,
  useMyPresence,
} from '../../liveblocks.config';

const Loading = dynamic(() => import('./loading'));
const Navigation = dynamic(() => import('./navigation'));
const Header = dynamic(() => import('./header'));
const About = dynamic(() => import('./about'));
const Achievements = dynamic(() => import('./achievements'));
const Skills = dynamic(() => import('./skills'));
const Experience = dynamic(() => import('./experience'));
const Projects = dynamic(() => import('./projects'));
const Blog = dynamic(() => import('./blog'));
const AI = dynamic(() => import('./ai'));
const OpenAPI = dynamic(() => import('./openAPI'));
const Faq = dynamic(() => import('./faq'));
const Contact = dynamic(() => import('./contact'));
const Credits = dynamic(() => import('./credits'));
const Footer = dynamic(() => import('./footer'));
const Music = dynamic(() => import('./music'));

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
    axios
      .get(`/api/i18n?lang=${path}`)
      .then((res) => {
        setI18n(res.data);
        setLoading(false);
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
    const handleInteracted = () => {
      setInteracted(true);
    };
    window.addEventListener('click', handleInteracted);
    return () => {
      window.removeEventListener('click', handleInteracted);
    };
  });

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
        <script
          type="module"
          src="https://cdn.jsdelivr.net/npm/@splinetool/viewer@1.9.79/build/spline-viewer.min.js"
          defer
        ></script>
        <script
          src="https://static.elfsight.com/platform/platform.js"
          data-use-service-core
          defer
        ></script>
      </Head>
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
