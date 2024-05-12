import { useState, useEffect } from 'react'
import axios from 'axios'
import { franc } from 'franc-min'

export default function Blog(props) {
  function i18n(key) {
    if (props.i18n && props.i18n['blog'] && !props.i18n['blog'][key]) {
      console.log('Blog Missing Translation: ' + key)
    }
    return props.i18n && props.i18n['blog'] && props.i18n['blog'][key] ? props.i18n['blog'][key] : key
  }
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    getBlogData()
    window.addEventListener('resize', () => {
      getBlogData()
    })
  }, [])
  function getBlogData() {
    axios.get("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@1998design")
      .then(res => {
        // if (window.innerWidth <= 1024) {
          setBlogs(res.data.items);
        // } else {
        //   setBlogs(res.data.items.slice(0, 9));
        // }
      }).catch(err => {
        console.log(err)
      }
      )
  }

  function languageCheck(text) {
    const lang = franc(text);
    if (lang === 'cmn' || lang === 'yue' || lang === 'wuu' || lang === 'nan' || lang === 'und') { 
      return 'zh';
    }
    else {
      return 'en';
    }
  }

  return (
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
        <div className="mt-8 mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {
            blogs
              .filter(post => {
                const userLanguage = window.location.pathname.replace('/', '');
                const postLanguage = languageCheck(post.title);
                if (userLanguage.includes('zh')) {
                  return postLanguage === 'zh';
                } else {
                  return postLanguage === 'en';
                }
              })
              .map(post =>
                <div key={post.title} className="flex flex-col rounded-lg overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-95 border border-transparent hover:border-black dark:hover:border-white backlight">
                  {post.description.includes('medium-feed-image') && (
                    <div className="flex-shrink-0">
                      <a href={post.link} target="_blank">
                        <img className="h-48 w-full object-cover" src={post.description.split('src="')[1].split('"')[0]} alt={post.title}  />
                      </a>
                    </div>
                  )}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className=" text-gray-400 text-xs">
                      <i className="far fa-calendar mr-1"></i>
                      <time dateTime={post.pubDate.slice(0, 10)}>{post.pubDate.slice(0, 10)}</time>
                    </div>
                    <div className="flex-1">
                      <a href={post.link} className="block mt-2 text-xl font-semibold text-gray-900 dark:text-gray-100" target="_blank">
                        {post.title}
                      </a>
                    </div>
                    <span className="text-sm font-medium text-orange-600 space-x-2 mt-3">
                      {
                        post.categories.map((category, index) => {
                          let level = 1
                          for (let i = 0; i < index; i++) {
                            level -= 0.1
                          }
                          level = Math.round(level * 10) / 10
                          return (
                            <a
                              href={'https://medium.com/search?q=' + category.charAt(0).toUpperCase() + category.slice(1)}
                              style={{ opacity: level }} // Use inline styles for dynamic opacity (as TailwindCSS cannot handle this correctly)
                              className={`hover:underline`}
                              target="_blank"
                            >
                              #{category.charAt(0).toUpperCase() + category.slice(1)}
                            </a>
                          );
                        })
                      }
                    </span>
                  </div>
                </div>
              )
          }
        </div>
        <div className="mt-8 text-center">
          <a href="https://blog.1998.media" className="block text-lg font-semibold text-white bg-orange-600 hover:bg-orange-500 p-3 rounded-lg transition-all" target="_blank">
            <i className="fab fa-medium mr-2"></i>
            {i18n("View all posts on Medium")}
          </a>
        </div>
      </div>
    </div>
  )
}