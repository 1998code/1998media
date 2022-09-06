import Head from 'next/head'

export default function Home() {
  fetch ('/api/newrelic')
    .then (res => res.json())
    .then (data => {
      // console.log(data)
    }).catch (err => {
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
      </Head>
      <main className="select-none overflow-hidden w-screen h-screen flex justify-center items-center">
        <div class="text-center">
          <h1 className="text-black text-4xl">这个网站还不支持你的语言，你想重定向到中文吗？</h1>
          <br/ >
          <a href="/zh" className="text-black text-5xl text-center">
            <i className="fas fa-globe-asia mr-3"></i>
            好的，立即跳转
            <i className="fas fa-rotate-left ml-3"></i>
          </a>
        </div>
      </main>
    </div>
  )
}
