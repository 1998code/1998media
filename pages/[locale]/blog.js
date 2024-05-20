import { useState, useEffect } from 'react';
import axios from 'axios';
import { franc } from 'franc-min';

export default function Blog(props) {
  function i18n(key) {
    if (props.i18n && props.i18n['blog'] && !props.i18n['blog'][key]) {
      console.log('Blog Missing Translation: ' + key);
    }
    return props.i18n && props.i18n['blog'] && props.i18n['blog'][key]
      ? props.i18n['blog'][key]
      : key;
  }

  const topPromo = {
    "title": i18n("Get $10 OFF on Trip.com"),
    "pubDate": new Date().toISOString(),
    "link": "https://hk.trip.com/sale/4283/referee.html?locale=zh-HK&referCode=5253C1995FB313ED993BC64A068BDABA",
    "guid": "https://hk.trip.com/sale/4283/referee.html?locale=zh-HK&referCode=5253C1995FB313ED993BC64A068BDABA",
    "author": "MING",
    // "thumbnail": "https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/276300699_5834005769959881_8535075502349926768_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YJAM-OTlB0MQ7kNvgEznQBD&_nc_ht=scontent-vie1-1.xx&oh=00_AYBD9SJKSzi0uxF_T0G7LaSB-mSqM7GYZ7v--IK7p5HxIw&oe=6650E2F1",
    "thumbnail": i18n("https://ak-d.tripcdn.com/images/0a14l12000aqs8zq3AC37.jpg_.webp"),
    "description": "",
    "content": "",
    "enclosure": {},
    "categories": [
        "Trip.com",
        "Promotion",
        "Discount",
        "Featured"
    ]
  };

  const [payWallURL, setPayWallURL] = useState(false);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    getBlogData();

    setPayWallURL(`${window.location.pathname}/paywall`);
  }, []);
  function getBlogData() {
    axios
      .get(
        'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@1998design'
      )
      .then((res) => {
        setBlogs([topPromo, ...res.data.items]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function languageCheck(text) {
    const lang = franc(text);
    if (
      lang === 'cmn' ||
      lang === 'yue' ||
      lang === 'wuu' ||
      lang === 'nan' ||
      lang === 'zul' ||
      lang === 'und'
    ) {
      return 'zh';
    } else {
      return 'en';
    }
  }

  return (
    <div
      id="blog"
      data-aos="zoom-in"
      data-aos-once
      className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="text-left flex flex-wrap">
          <a
            className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl grow"
            href="#blog"
          >
            {i18n('Blog')}
            <i className="fab fa-medium ml-2"></i>
          </a>
          <p className="mt-2 max-w-2xl text-xl text-gray-500">
            {i18n('Find out the latest posts and tutorials.')}
          </p>
        </div>
        <div className="mt-8 mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogs
            .filter((post) => {
              const userLanguage = window.location.pathname.replace('/', '');
              const postLanguage = languageCheck(post.title);
              if (userLanguage.includes('zh')) {
                return postLanguage === 'zh';
              } else {
                return postLanguage === 'en';
              }
            })
            .map((post) => (
              <div
                key={post.title}
                className="flex flex-col rounded-lg overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-95 border border-transparent hover:border-black dark:hover:border-white backlight"
              >
                <div className="flex-shrink-0">
                  <a href={post.link} target="_blank">
                    <img
                      className="h-48 w-full object-cover"
                      src={post.thumbnail ? post.thumbnail : post.description.split('src="')[1].split('"')[0]}
                      alt={post.title}
                    />
                  </a>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className=" text-gray-400 text-xs">
                    <i className="far fa-calendar mr-1"></i>
                    <time dateTime={post.pubDate.slice(0, 10)}>
                      {post.pubDate.slice(0, 10)}
                    </time>
                  </div>
                  <div className="flex-1">
                    <a
                      href={post.link}
                      className="block mt-2 text-xl font-semibold text-gray-900 dark:text-gray-100"
                      target="_blank"
                    >
                      {post.title}
                    </a>
                  </div>
                  <span className="text-sm font-medium text-orange-600 space-x-2 mt-3">
                    {post.categories.map((category, index) => {
                      let level = 1;
                      for (let i = 0; i < index; i++) {
                        level -= 0.1;
                      }
                      level = Math.round(level * 10) / 10;
                      return (
                        <a
                          href={
                            'https://medium.com/search?q=' +
                            category.charAt(0).toUpperCase() +
                            category.slice(1)
                          }
                          style={{ opacity: level }} // Use inline styles for dynamic opacity (as TailwindCSS cannot handle this correctly)
                          className={`hover:underline`}
                          target="_blank"
                        >
                          #
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </a>
                      );
                    })}
                  </span>
                </div>
              </div>
            ))}
        </div>
        <div className="mt-8 text-center flex flex-wrap items-center gap-3">
          <a
            href={payWallURL}
            className="flex-1 block text-lg font-semibold text-white whitespace-nowrap bg-teal-600 hover:bg-teal-500 p-3 rounded-lg transition-all"
            target="_blank"
          >
            <i className="fa fa-circle-dollar mr-2"></i>
            {i18n('Subscribe with $2.99 per month')} ({i18n('Coming Soon')})
          </a>
          <a
            href="https://blog.1998.media"
            className="flex-1 md:flex-none block text-lg font-semibold text-white whitespace-nowrap bg-orange-600 hover:bg-orange-500 p-3 rounded-lg transition-all"
            target="_blank"
          >
            <i className="fab fa-medium mr-2"></i>
            {i18n('View all posts on Medium')} ({i18n('$5 per month')})
          </a>
        </div>
      </div>
    </div>
  );
}
