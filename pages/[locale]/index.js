import { useState, useEffect } from 'react'

import Head from 'next/head'

import axios from 'axios'
import { DocSearch } from '@docsearch/react'
import '@docsearch/css'

import dynamic from 'next/dynamic'
const Loading = dynamic(() => import('./section/loading'))
const Header = dynamic(() => import('./section/header'))
const About = dynamic(() => import('./section/about'))
const Achievements = dynamic(() => import('./section/achievements'))
const Skills = dynamic(() => import('./section/skills'))
const Experience = dynamic(() => import('./section/experience'))
const Projects = dynamic(() => import('./section/projects'))
const Blog = dynamic(() => import('./section/blog'))
const Connect = dynamic(() => import('./section/connect'))
const AI = dynamic(() => import('./section/ai'))
const Faq = dynamic(() => import('./section/faq'))
const Contact = dynamic(() => import('./section/contact'))
const Credits = dynamic(() => import('./section/credits'))
const Footer = dynamic(() => import('./section/footer'))

import Cursor from "../../components/Cursor";
import { RoomProvider, useOthers, useMyPresence } from "../../liveblocks.config";
const COLORS = [
  "#0EA293",
  "#576CBC",
  "#19A7CE"
];
function CursorPointer() {
  const [{ cursor }, updateMyPresence] = useMyPresence();

  const users = useOthers();

  const [privateId, setPrivateId] = useState(0);

  useEffect(() => {
    setPrivateId(Math.floor(Math.random() * 100000));
  }, []);

  return (
    <a href="#about" className="absolute w-screen h-[95vh] z-[1] cursor-pointer" onPointerMove={(event) => { event.preventDefault(); updateMyPresence({ cursor: { x: Math.round(event.clientX), y: Math.round(event.clientY), }, }); }} onPointerLeave={() => updateMyPresence({ cursor: null, })} >
      {
        users.map(({ connectionId, presence }) => {
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
        })
      }
    </a>
  );
}

export default function Home() {

  useEffect(() => {
    const path = window.location.pathname.replace('/', '')
    getI18nData(path)
  }, [])

  const [loading, setLoading] = useState(true)
  const [i18n, setI18n] = useState({})
  function getI18nData(path) {
    axios.get(`/api/i18n?lang=${path}`).then((res) => {
      setI18n(res.data)
      setLoading(false)
    }).catch((err) => {
      alert('Error Occured: ' + err)
      window.location.reload()
    })
  }

  const sections = ['header', 'about', 'achievements', 'skills', 'experience', 'projects', 'blog', 'connect', 'ai', 'faq', 'contact']
  // When arrow up/down keys are pressed, scroll to the next/previous section
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        let currentSection = sections.indexOf(window.location.hash.replace('#', ''))
        if (e.key === 'ArrowUp') {
          currentSection = currentSection > 0 ? currentSection - 1 : sections.length - 1
        } else {
          currentSection = currentSection < sections.length - 1 ? currentSection + 1 : 0
        }
        window.location.hash = sections[currentSection]
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  return (
    <div>
      <Head>
        <title>1998 MEDIA (Official Website)</title>
        <meta name="description" content="The Official Website of 1998 MEDIA." />
        <link rel="icon" href="https://cdn.1998.media/favicon23.jpg" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff6eb" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000914" />
        <link rel="stylesheet" href="https://cdn.1998.media/css/fontawesome.css" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1941913120815371"></script>
        <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet" />
        <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
        <script type="module" src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js" defer></script>
        <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
      </Head>
      <script>
        AOS.init();
      </script>
      <main className="darkmode-ignore overflow-hidden">
        <RoomProvider id="1998-MEDIA" initialPresence={{ cursor: null, }} >
          <CursorPointer />
          {loading ?
            <Loading /> : (
              <div>
                <Header i18n={i18n} />
                <About i18n={i18n} />
                <Achievements i18n={i18n} />
                <Skills i18n={i18n} />
                <Experience i18n={i18n} />
                <Projects i18n={i18n} />
                <Blog i18n={i18n} />
                <Connect i18n={i18n} />
                <AI i18n={i18n} />
                <Faq i18n={i18n} />
                <Contact i18n={i18n} />
                <Credits i18n={i18n} />
                <Footer i18n={i18n} />
                <DocSearch
                  appId="01IRDDJXZ4"
                  indexName="1998"
                  apiKey="a8c97c33f935922cf3fa01ff8ea67f10"
                  placeholder="Search & Learn More..."
                />
                <div class="elfsight-app-d9c75342-d244-4ae0-91fd-78feae7b7d90" data-elfsight-app-lazy></div>
              </div>
            )}
        </RoomProvider>
      </main>
    </div>
  )
}
