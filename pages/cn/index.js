import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [ip, setIP] = useState([])
  const [geo, setGeo] = useState([])
  const [latitude, setLatitude] = useState([])
  const [longitude, setLongitude] = useState([])
  axios.get('/api/ip')
    .then(res => {
      setIP(res.data.ip);
      setGeo(res.data.geo && res.data.geo.city + '，' + res.data.geo.country || '未知');
      setLatitude(res.data.latitude || '未知');
      setLongitude(res.data.longitude || '未知');
    }).catch(err => {
      console.log(err)
    }
  )
  return (
    <div>
      <Head>
        <title>1998 MEDIA (官方网站)</title>
        <meta name="description" content="1998 MEDIA 唯一官方网站。" />
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
          <h1 data-aos="zoom-in" data-aos-delay="250" data-aos-duration="250" className="text-black dark:text-white text-4xl">这个网站还不支持你的语言，你想重定向到中文吗？</h1>
          <br/ >
          <a href="/zh" data-aos="zoom-in" data-aos-delay="500" data-aos-duration="250" className="text-black dark:text-white text-5xl text-center">
            <i className="fas fa-globe-asia mr-3"></i>
            好的，立即跳转
            <i className="fas fa-rotate-left ml-3"></i>
          </a>
          <br />
          <p data-aos="zoom-in" data-aos-delay="750" data-aos-duration="250" className="mt-5 text-center text-xs text-gray-400 pt-3">{geo} | {ip} ({latitude}，{longitude})</p>
        </div>
      </main>
    </div>
  )
}
