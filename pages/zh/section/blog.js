import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Blog() {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    getBlogData()
    window.addEventListener('resize', () => {
      getBlogData()
    })
  }, [])
  function getBlogData() {
    axios.get("https://api.rss2json.com/v1/api.json?rss_url=https://api.allorigins.win/raw?url=https://medium.com/feed/@1998design")
      .then(res => {
        if (window.innerWidth <= 1024) {
          setBlogs(res.data.items);
        } else {
          setBlogs(res.data.items.slice(0, 9));
        }
      }).catch(err => {
        console.log(err)
      }
    )
  }
  return (
    <div id="blog" data-aos="zoom-in" data-aos-once className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-left flex flex-wrap">
          <a className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl grow" href="#blog">
            文章專欄
            <i className="fab fa-medium ml-2"></i>
          </a>
          <p className="mt-2 max-w-2xl text-xl text-gray-500">
            查找最新的文章和教程（只提供英語版本）。
          </p>
        </div>
        <div className="mt-8 mx-auto grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
          {blogs.map(post => (
            <div key={post.title} className="flex flex-col rounded-lg overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-105">
              <div className="flex-shrink-0">
                <a href={post.link} target="_blank">
                  <img className="h-48 w-full object-cover" src={post.thumbnail} alt={post.title} />
                </a>
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600 space-x-2">
                    <a href={'https://medium.com/search?q=' + post.categories[0].charAt(0).toUpperCase() + post.categories[0].slice(1)} className="hover:underline" target="_blank">
                      #{post.categories[0].charAt(0).toUpperCase() + post.categories[0].slice(1)}
                    </a>
                    <a href={'https://medium.com/search?q=' + post.categories[1].charAt(0).toUpperCase() + post.categories[1].slice(1)} className="hover:underline" target="_blank">
                      #{post.categories[1].charAt(0).toUpperCase() + post.categories[1].slice(1)}
                    </a>
                    <a href={'https://medium.com/search?q=' + post.categories[2].charAt(0).toUpperCase() + post.categories[2].slice(1)} className="hover:underline" target="_blank">
                      #{post.categories[2].charAt(0).toUpperCase() + post.categories[2].slice(1)}
                    </a>
                  </p>
                  <a href={post.link} className="block mt-2" target="_blank">
                    <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{post.title}</p>
                  </a>
                </div>
                <div className="mt-3 flex items-center">
                  <div className="flex-shrink-0 text-gray-400">
                    <time dateTime={post.pubDate.slice(0, 10)}>{post.pubDate.slice(0, 10)}</time>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}