import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blogs, setBlogs] = useState([]); 
  
  useEffect(() => {
    fetch("https://api.allorigins.win/raw?url=https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@1998design")
      .then(res => res.json())
      .then(
            (data) => {
                setIsLoaded(true)
                setBlogs(data.items)
            },
            (error) => {
               console.log(error)
            }
      )
  }, [])

  return (
    <div>
      <Head>
        <meta charset="utf-8" />
        <meta name="theme-color" media="(prefers-color-scheme:light)" content="#b3c9ff" key="Light" />
        <meta name="theme-color" media="(prefers-color-scheme:dark)" content="#000237" key="Dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        <title>1998 MEDIA (Official Website)</title>
        <meta name="twitter:description" content="The Official Website of 1998 MEDIA." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content="https://1998.media/assets/img/54872601.jpeg" />
        <meta name="description" content="The Official Website of 1998 MEDIA." />
        <meta property="og:type" content="website" />
        <meta name="twitter:image" content="https://1998.media/assets/img/54872601.jpeg" />
        <meta name="twitter:title" content="1998 MEDIA (Official Website)" />
        <link rel="icon" type="image/jpeg" sizes="460x460" href="assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b" />
        <link rel="icon" type="image/jpeg" sizes="460x460" href="assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b" />
        <link rel="icon" type="image/jpeg" sizes="460x460" href="assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b" />
        <link rel="icon" type="image/jpeg" sizes="460x460" href="assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b" />
        <link rel="icon" type="image/jpeg" sizes="460x460" href="assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" />
        <link rel="manifest" href="manifest.json?h=aee7c9c304330f1166f5a351f0604634" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" />
        <link rel="stylesheet" href="assets/css/BackTop.css?h=9512ee751dbc980e699f6b5cf9d05e1e" />
        <link rel="stylesheet" href="assets/css/Brands.css?h=55b208e77be2b9e84508696669ca8fbb" />
        <link rel="stylesheet" href="assets/css/FooterBasic.css?h=ac709030f0fa208ad851c35779cb4154" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" />
        <link rel="stylesheet" href="assets/css/NavigationClean.css?h=bdc5f2fa516741f2812cd4e1b8886c6e" />
        <link rel="stylesheet" href="assets/css/styles.css?h=392a8a145ca0b3b44664542d7e027717"></link>
        <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Montserrat:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic"></link>
      </Head>

      <body class="monstserrat">

        <section data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" data-aos-once="true" id="post">
            <div class="container" id="postContainer">
                <h1 id="postHeadingE"><strong>Latest Posts</strong></h1>
                <ul class="list-group" id="postList">
                    { blogs.map(item => (
                        <Link href={item.link} >
                            <li class="list-group-item d-lg-flex d-xl-flex d-xxl-flex justify-content-between align-items-lg-center align-items-xl-center align-items-xxl-center" id="postItem" >
                                <span>{item.pubDate.slice(0, 10)}<h5>{item.title}</h5></span>
                                <small class="text-end">
                                    #{item.categories[0].charAt(0).toUpperCase() + item.categories[0].slice(1)} &nbsp;
                                    #{item.categories[1].charAt(0).toUpperCase() + item.categories[1].slice(1)} &nbsp;
                                    #{item.categories[2].charAt(0).toUpperCase() + item.categories[2].slice(1)}
                                </small>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </section>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="assets/js/bs-init.js?h=02a8f8d0119ea38ce4670281c1438789"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
        <Script src="https://static.cdn-apple.com/businesschat/start-chat-button/2/index.js" strategy="lazyOnload" />
        <Script src="assets/js/backTop.js?h=25fe335c21086050d7d683aa1d563dd6" />
      </body>
    </div>
  )
}
