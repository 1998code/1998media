import Head from 'next/head'

import Header from './section/header'
import About from './section/about'
import Achievements from './section/achievements'
import Skills from './section/skills'
import Experience from './section/experience'
import Project from './section/project'
import Blog from './section/blog'
import Faq from './section/faq'
import Contact from './section/contact'
import Credits from './section/credits'
import Footer from './section/footer'

export default function Home() {
  return (
    <div>
      <Head>
        <title>1998 MEDIA (官方網站)</title>
        <meta name="description" content="1998 MEDIA 唯一官方網站。" />
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdn.1998.media/css/fontawesome.css" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1941913120815371"></script>
        <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet" />
        <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
      </Head>
      <script>
        AOS.init();
      </script>
      <main className="darkmode-ignore overflow-hidden">
        <Header />
        <About />
        <Achievements />
        <Skills />
        <Experience />
        <Project />
        <Blog />
        <Faq />
        <Contact />
        <Credits />
        <Footer />
      </main>
    </div>
  )
}
