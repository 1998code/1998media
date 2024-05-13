import Head from 'next/head'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { franc } from 'franc-min'

export default function Paywall() {
  const [loading, setLoading] = useState(true)
  const [I18n, setI18n] = useState({})
  function getI18nData(path) {
    axios.get(`/api/i18n?lang=${path}`).then((res) => {
      setI18n(res.data)
      setLoading(false)
    }).catch((err) => {
      alert('Error Occured: ' + err)
      window.location.reload()
    })
  }
  function i18n(key) {
    if (I18n && I18n['blog'] && !I18n['blog'][key]) {
      console.log('Blog Missing Translation: ' + key)
    }
    return I18n && I18n['blog'] && I18n['blog'][key] ? I18n['blog'][key] : key
  }
  useEffect(() => {
    const path = window.location.pathname.replace('/', '')
    getI18nData(path)
  }, [])
  
  const [loadingBlog, setLoadingBlog] = useState(true)
  const [blogs, setBlogs] = useState([])
  const [offset, setOffset] = useState(0)
  function getBlogData() {
    setLoadingBlog(true)
    axios.get(`/api/paywall?status=public&offset=${offset}`)
      .then(res => {
        setBlogs(prevBlogs => {
          const newBlogs = res.data.filter(
            (newBlog) => !prevBlogs.some((prevBlog) => prevBlog.id === newBlog.id)
          );
          return prevBlogs.concat(newBlogs);
        })
        setLoadingBlog(false)
        scrollToBottom()
        setOffset(prevOffset => prevOffset + 10)
      }).catch(err => {
        console.log(err)
      })
  }

  function nextPage() {
    setOffset(prevOffset => prevOffset + 10);
  }

  function languageCheck(text) {
    const lang = franc(text);
    if (lang === 'cmn' || lang === 'yue' || lang === 'wuu' || lang === 'nan' || lang === 'zul' || lang === 'und') { 
      return 'zh';
    }
    else {
      return 'en';
    }
  }

  function scrollToBottom() {
    const anchor = blogs[blogs.length - 1].title
    const element = document.getElementById(anchor)
    element.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    getBlogData()
  }, [offset])

  return (
    <div>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        <title>Paywall - Blog</title>
        <meta name="description"
          content="Free themes for students, teachers, and public use in learning purpose. Made with Bootstrap 5." />
        <link rel="stylesheet" href="https://cdn.1998.media/css/fontawesome.css" />
      </Head>
      <main>
        <div id="blog" data-aos="zoom-in" data-aos-once className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-7xl mx-auto">
            <div className="text-left flex flex-wrap">
              <a className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl grow" href="#blog">
                {i18n("Blog")}
                <i className="fab fa-medium ml-2"></i>
              </a>
              <p className="mt-2 max-w-2xl text-xl text-gray-500">
                {i18n("Find out the latest posts and tutorials.")}
              </p>
            </div>
            <div className="mt-8 mx-auto grid gap-5">
              <div className="dark:text-white flex justify-between gap-3">
                <b>{i18n("Latest")}</b>
                <span>{i18n("Subscription Required")}</span>
              </div>
              {
                blogs
                  .filter(post => {
                    const userLanguage = window.location.pathname.replace('/', '').replace('/paywall', '');
                    const postLanguage = languageCheck(post.title);
                    if (userLanguage.includes('zh')) {
                      return postLanguage === 'zh';
                    } else {
                      return postLanguage === 'en';
                    }
                  })
                  .map(post =>
                    <a id={post.title}
                      href={`https://blog.1998.media/${post.postID}?sk=${post.secret}`} target="_blank" key={post.title} className="flex items-center rounded-lg bg-white dark:bg-black overflow-hidden transform transition duration-500 border border-transparent hover:border-black dark:hover:border-white backlight">
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div className=" text-gray-400 text-sm md:text-lg">
                          <i className="far fa-calendar mr-1"></i>
                          <time dateTime={post.date.slice(0, 10)}>{post.date.slice(0, 10)}</time>
                        </div>
                        <div className="flex-1">
                          <a href={post.link} className="block mt-2 text-lg md:text-2xl font-semibold text-gray-900 dark:text-gray-100" target="_blank">
                            {post.title}
                          </a>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {
                          post.thumbnail 
                            ? <img className="w-[25vw] h-32 object-cover bg-white dark:bg-black" src={post.thumbnail} alt={post.title}/>
                            : <div className="w-[25vw] h-32 bg-white dark:bg-black"></div>
                        }
                      </div>
                    </a>
                  )
              }
            </div>
            <div className="mt-8 text-center">
              <button 
                onClick={nextPage}
                disabled={loadingBlog}
                className="w-full block text-lg font-semibold text-white bg-orange-600 hover:bg-orange-500 disabled:bg-gray-500 p-3 rounded-lg transition-all" target="_blank">
                  {i18n(loadingBlog ? "Loading" : "Load More")}
                  {loadingBlog ? <i className="fas fa-spinner fa-spin ml-2" /> : <i className="fas fa-arrow-down ml-2" />}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
