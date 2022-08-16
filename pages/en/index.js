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
  fetch ('/api/newrelic')
    .then (res => res.json())
    .then (data => {
      console.log(data)
    }).catch (err => {
      console.log(err)
    }
  )
  return (
    <div>
      <Head>
        <title>1998 MEDIA (Official Website)</title>
        <meta name="description" content="The Official Website of 1998 MEDIA." />
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdn.1998.media/css/sfprodisplay.css" />
        <link rel="stylesheet" href="https://cdn.1998.media/css/fontawesome.css" />
      </Head>
      <main>
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
      </main>
      <Footer />
    </div>
  )
}
