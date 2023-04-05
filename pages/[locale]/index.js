import Head from 'next/head'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { DocSearch } from '@docsearch/react';
import '@docsearch/css';

import Loading from './section/loading'
import Header from './section/header'
import About from './section/about'
import Achievements from './section/achievements'
import Skills from './section/skills'
import Experience from './section/experience'
import Projects from './section/projects'
import Blog from './section/blog'
import AI from './section/ai'
import Faq from './section/faq'
import Contact from './section/contact'
import Credits from './section/credits'
import Footer from './section/footer'

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
    <div className="absolute w-screen h-screen z-[1]" onPointerMove={(event) => { event.preventDefault(); updateMyPresence({ cursor: { x: Math.round(event.clientX), y: Math.round(event.clientY), }, }); }} onPointerLeave={() => updateMyPresence({ cursor: null, }) } >
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
    </div>
  );
}

export default function Home() {

  useEffect(() => {
      getI18nData()
  }, [])

  const [loading, setLoading] = useState(true)
  const [i18n, setI18n] = useState({})
  function getI18nData() {
    const path = window.location.pathname.replace('/', '')

    axios.get(`/api/i18n?lang=${path}`).then((res) => {
        setI18n(res.data)
        setLoading(false)
    }).catch((err) => {
        alert('Error Occured: ' + err)
        window.location.reload()
    })
  }

  return (
    <div>
      <Head>
        <title>1998 MEDIA (Official Website)</title>
        <meta name="description" content="The Official Website of 1998 MEDIA." />
        <link rel="icon" href="https://cdn.1998.media/favicon.png" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff6eb" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000914" />
        <link rel="stylesheet" href="https://cdn.1998.media/css/fontawesome.css" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1941913120815371"></script>
        <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet" />
        <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
        <script type="module" src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js"></script>
      </Head>
      <script>
        AOS.init();
      </script>
      <main className="select-none darkmode-ignore overflow-hidden">
        <RoomProvider id="1998-MEDIA" initialPresence={{ cursor: null, }} >
          <CursorPointer />
          { loading ? <Loading /> : (<div>
            <Header i18n={i18n} />
            <About i18n={i18n} />
            <Achievements i18n={i18n} />
            <Skills i18n={i18n} />
            <Experience i18n={i18n} />
            <Projects i18n={i18n} />
            <Blog i18n={i18n} />
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
          </div>)}
        </RoomProvider>
      </main>
    </div>
  )
}
