import { useState, useEffect, use } from 'react';
import axios from 'axios';
import { franc } from 'franc-min';
import { Tooltip } from '@nextui-org/tooltip';

export default function Blog(props) {
  function i18n(key) {
    if (props.i18n && props.i18n['blog'] && !props.i18n['blog'][key]) {
      console.log('Blog Missing Translation: ' + key);
    }
    return props.i18n && props.i18n['blog'] && props.i18n['blog'][key]
      ? props.i18n['blog'][key]
      : key;
  }

  // const topPromo = {
  //   title: i18n('Get $10 OFF on Trip.com'),
  //   published: new Date(),
  //   link: 'https://hk.trip.com/sale/4283/referee.html?locale=zh-HK&referCode=5253C1995FB313ED993BC64A068BDABA',
  //   guid: 'https://hk.trip.com/sale/4283/referee.html?locale=zh-HK&referCode=5253C1995FB313ED993BC64A068BDABA',
  //   author: 'MING',
  //   // "thumbnail": "https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/276300699_5834005769959881_8535075502349926768_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YJAM-OTlB0MQ7kNvgEznQBD&_nc_ht=scontent-vie1-1.xx&oh=00_AYBD9SJKSzi0uxF_T0G7LaSB-mSqM7GYZ7v--IK7p5HxIw&oe=6650E2F1",
  //   thumbnail: i18n(
  //     'https://ak-d.tripcdn.com/images/0a14l12000aqs8zq3AC37.jpg_.webp'
  //   ),
  //   description: '',
  //   content: '',
  //   enclosure: {},
  //   category: ['Trip.com', 'Promotion', 'Discount', 'Featured'],
  // };

  const [payWallURL, setPayWallURL] = useState(false);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    getBlog();

    setPayWallURL(`${window.location.pathname}/paywall`);
  }, []);
  function getBlog() {
    axios
      .get(
        '/api/medium'
      )
      .then((res) => {
        setBlogs([
          // topPromo, 
          ...res.data.items
        ]);
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

  const [medals, setMedals] = useState([]);

  function getMedals() {
    axios
      .post(`/api/trip?type=medal&cid=09031029418990699836&locale=${window.location.pathname.split('#')[0].replace('/', '')}`)
      .then((res) => {
        setMedals(res.data.medalList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getMedals();
  }, []);

  const [moment, setMoment] = useState([]);

  const tripPromo = {
    title: i18n('「Global」Get $10 OFF on Trip.com'),
    shareURL: 'https://hk.trip.com/sale/4283/referee.html?locale=zh-HK&referCode=5253C1995FB313ED993BC64A068BDABA',
    coverURL: i18n(
      'https://ak-d.tripcdn.com/images/0a14l12000aqs8zq3AC37.jpg_.webp'
    ),
    publishTime: new Date(),
  };

  function getMoment() {
    axios
      .post(`/api/trip?type=moment&cid=09031029418990699836&locale=${window.location.pathname.split('#')[0].replace('/', '')}`)
      .then((res) => {
        setMoment([
          tripPromo,
          ...res.data.resourceBlockList.slice(0, 5)
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getMoment();
  }
    , []);

  return (
    <div
      data-aos="zoom-in"
      data-aos-once
      className="relative px-4 sm:px-6 lg:px-8 space-y-16"
    >
      {/* Medium Blog */}
      <div id="blog" className="relative max-w-7xl mx-auto space-y-8 pt-16">
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
        <div className="mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
            .slice(0, 6)
            .map((post) => (
              <a key={post.title} href={post.link} target="_blank"
                className="flex flex-col rounded-lg overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-95 border border-transparent hover:border-black dark:hover:border-white backlight"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-64 w-full object-cover"
                    src={
                      post.thumbnail
                        ? post.thumbnail
                        : post.description.split('src="')[1].split('"')[0]
                    }
                    alt={post.title}
                  />
                  <div className="invisible dark:visible absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black h-64"></div>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className=" text-gray-400 text-xs">
                    <i className="far fa-calendar mr-1"></i>
                    <time dateTime={new Date(post.published).toISOString().split('T')[0]}>
                      {new Date(post.published).toISOString().split('T')[0]}
                    </time>
                  </div>
                  <div className="flex-1 mt-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {post.title}
                  </div>
                  <span className="text-sm font-medium text-orange-600 space-x-2 mt-3">
                    {post.category.map((category, index) => {
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
              </a>
            ))}
        </div>
        <div className="text-center flex flex-wrap items-center gap-3">
          {/* <a
            href={payWallURL}
            className="flex-1 block text-lg font-semibold text-white whitespace-nowrap bg-teal-600 hover:bg-teal-500 p-3 rounded-lg transition-all"
            target="_blank"
          >
            <i className="fa fa-circle-dollar mr-2"></i>
            {i18n('Subscribe with $2.99 per month')} ({i18n('Coming Soon')})
          </a> */}

          {/* md:flex-none deleted */}
          <a
            href="https://blog.1998.media"
            className="flex-1 block text-lg font-semibold text-white whitespace-nowrap bg-orange-600 hover:bg-orange-500 p-3 rounded-lg transition-all"
            target="_blank"
          >
            <i className="fab fa-medium mr-2"></i>
            {i18n('View all posts on Medium')} 
            {/* ({i18n('$5 per month')}) */}
          </a>
        </div>
      </div>
      {/* Moments */}
      <div id="trip" className="relative max-w-7xl mx-auto space-y-8 pt-16">
        <div className="text-left flex flex-wrap">
          <a
            className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl grow"
            href="#trip"
          >
            {i18n('Trip Moments')}
            <i className="far fa-planet-ringed ml-2"></i>
          </a>
          <p className="mt-2 max-w-2xl text-xl text-gray-500">
            {i18n('Travel Around, Global Journey.')}
          </p>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div className="flex">
            {medals.map((medal) => (
              <Tooltip
                content={medal.medalStageName}
                placement="bottom"
                className="p-1 border text-xs dark:text-white bg-white dark:bg-black rounded-lg"
              >
                <img src={medal.medalStageIcon} alt={medal.medalStageName} className="h-16 w-16 hover:scale-105 transition-all" />
              </Tooltip>
            ))}
          </div>
          <a
            href="https://hk.trip.com/travel-guide/personal-home/E1B9A703A2E3FEF984D86D1D507FB324B4A7CBA7500F0E62A0BFA68DCC95C09E"
            className="flex-1 md:flex-none block text-lg font-semibold text-white whitespace-nowrap bg-sky-600 hover:bg-sky-500 p-3 rounded-lg transition-all"
            target="_blank"
          >
            <i className="fa fa-suitcase-rolling mr-2"></i>
            {i18n('View all on Trip.com')}
          </a>
        </div>
        <div className="mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {moment && moment.map((post) => (
            <a href={post.shareURL} target="_blank"
              key={post.translateTitle || post.title}
              className="flex flex-col rounded-lg overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-95 border border-transparent hover:border-black dark:hover:border-white backlight"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-64 w-full object-cover"
                  src={post.coverURL}
                  alt={post.translateTitle || post.title}
                />
                <div className="invisible dark:visible absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black h-64"></div>
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className=" text-gray-400 text-xs">
                  <i className="far fa-calendar mr-1"></i>
                  <time dateTime={new Date(post.publishTime).toISOString().split('T')[0]}>
                    {new Date(post.publishTime).toISOString().split('T')[0]}
                  </time>
                  {!post.translateTitle && (
                    <span>
                      <i className="far fa-map-marker-alt ml-2 mr-1"></i>
                      {post.title.split('「')[1].split('」')[0]}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div
                    className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-100"
                  >
                    {post.translateTitle || post.title.split('」')[1]}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
