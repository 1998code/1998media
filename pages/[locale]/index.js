import { useState, useEffect } from 'react';

import Head from 'next/head';

import axios from 'axios';
import { DocSearch } from '@docsearch/react';
import '@docsearch/css';

import dynamic from 'next/dynamic';
const Loading = dynamic(() => import('./loading'));
const Header = dynamic(() => import('./header'));
const About = dynamic(() => import('./about'));
const Achievements = dynamic(() => import('./achievements'));
const Skills = dynamic(() => import('./skills'));
const Experience = dynamic(() => import('./experience'));
const Projects = dynamic(() => import('./projects'));
const Blog = dynamic(() => import('./blog'));
const Connect = dynamic(() => import('./connect'));
const AI = dynamic(() => import('./ai'));
const OpenAPI = dynamic(() => import('./openAPI'));
const Faq = dynamic(() => import('./faq'));
const Contact = dynamic(() => import('./contact'));
const Credits = dynamic(() => import('./credits'));
const Footer = dynamic(() => import('./footer'));

import Cursor from '../../components/Cursor';
import {
  RoomProvider,
  useOthers,
  useMyPresence,
} from '../../liveblocks.config';
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
    'impacts',
    'skills',
    'experience',
    'projects',
    'blog',
    'connect',
    'ai',
    'openAPI',
    'faq',
    'contact',
  ];
  // When arrow up/down keys are pressed, scroll to the next/previous section
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        let currentSection = sections.indexOf(
          window.location.hash.replace('#', '')
        );
        if (e.key === 'ArrowUp') {
          currentSection =
            currentSection > 0 ? currentSection - 1 : sections.length - 1;
        } else {
          currentSection =
            currentSection < sections.length - 1 ? currentSection + 1 : 0;
        }
        window.location.hash = sections[currentSection];
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  function i18n(key) {
    if (I18n && I18n['index'] && !I18n['index'][key]) {
      console.log('Index Missing Translation: ' + key);
    }
    return I18n && I18n['index'] && I18n['index'][key]
      ? I18n['index'][key]
      : key;
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
        <link rel="icon" href="https://cdn.1998.media/favicon23.jpg" />
        <link
          href="https://unpkg.com/aos@2.3.4/dist/aos.css"
          rel="stylesheet"
        />
        <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
        <script
          type="module"
          src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js"
          defer
        ></script>
        <script
          src="https://static.elfsight.com/platform/platform.js"
          data-use-service-core
          defer
        ></script>
      </Head>
      <script>AOS.init();</script>
      <main className="darkmode-ignore overflow-hidden">
        <RoomProvider id="1998-MEDIA" initialPresence={{ cursor: null }}>
          <CursorPointer />
          {loading ? (
            <Loading />
          ) : (
            <div>
              <Header i18n={I18n} />
              <About i18n={I18n} />
              <Achievements i18n={I18n} />
              <Skills i18n={I18n} />
              <Experience i18n={I18n} />
              <Projects i18n={I18n} />
              <Blog i18n={I18n} />
              <Connect i18n={I18n} />
              <AI i18n={I18n} />
              <OpenAPI i18n={I18n} />
              <Faq i18n={I18n} />
              <Contact i18n={I18n} />
              <Credits i18n={I18n} />
              <Footer i18n={I18n} />
              <DocSearch
                appId="01IRDDJXZ4"
                indexName="1998"
                apiKey="a8c97c33f935922cf3fa01ff8ea67f10"
                placeholder="Search & Learn More..."
              />
              <div
                className="elfsight-app-d9c75342-d244-4ae0-91fd-78feae7b7d90"
                data-elfsight-app-lazy
              ></div>
            </div>
          )}
        </RoomProvider>
      </main>
    </div>
  );
}
