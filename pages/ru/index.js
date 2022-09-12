import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  fetch ('/api/newrelic')
    .then (res => res.json())
    .then (data => {
      // console.log(data)
    }).catch (err => {
      console.log(err)
    });
  const [ip, setIP] = useState([])
  const [geo, setGeo] = useState([])
  fetch('/api/ip')
    .then(response => response.json())
    .then(data => {
      setIP(data.ip);
      setGeo(data.geo && data.geo.country + ' - ' + data.geo.city || 'Unknown');
    });
  return (
    <div>
      <Head>
        <title>1998 MEDIA (Официальный сайт)</title>
        <meta name="description" content="1998 MEDIA Единственный официальный сайт." />
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdn.1998.media/css/sfprodisplay.css" />
        <link rel="stylesheet" href="https://cdn.1998.media/css/fontawesome.css" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1941913120815371"></script>
        <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet" />
        <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
      </Head>
      <script>
        AOS.init();
      </script>
      <main className="select-none darkmode-ignore overflow-hidden">
        <div className="text-center w-screen h-screen flex flex-col justify-center items-center">
          <h1 data-aos="zoom-in" data-aos-delay="250" data-aos-duration="250" className="text-black dark:text-white text-4xl">Этот сайт еще не доступен на вашем языке, вы хотите перенаправить на английский язык?</h1>
          <br/ >
          <a href="/en" data-aos="zoom-in" data-aos-delay="500" data-aos-duration="250" className="text-black dark:text-white text-5xl text-center">
            <i className="fas fa-globe-asia mr-3"></i>
            хорошо, прыгай сейчас
            <i className="fas fa-rotate-left ml-3"></i>
          </a>
          <br />
          <p data-aos="zoom-in" data-aos-delay="750" data-aos-duration="250" className="mt-5 text-center text-xs text-gray-400 pt-3">{ip} | {geo}</p>
        </div>
      </main>
    </div>
  )
}
