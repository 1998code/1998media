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

export default function Home() {

  useEffect(() => {
      getI18nData()
  }, [])

  const [loading, setLoading] = useState(true)
  const [i18n, setI18n] = useState({})
  function getI18nData() {
    const path = window.location.pathname.replace('/', '')

    axios.get(`https://edge-config.vercel.com/ecfg_q7yd5f5h35awid45o3p6roxirwjh?token=983e3f47-9a89-4095-a2a6-658990cd1835`).then((res) => {
        setI18n(res.data.items[path])
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
        <link rel="icon" href="/favicon.png" />
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
      </main>
    </div>
  )
}
