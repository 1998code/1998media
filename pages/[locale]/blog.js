import { useState, useEffect, useRef } from 'react';
import { franc } from 'franc-min';
import { Tooltip } from '@nextui-org/tooltip';

export default function Blog(props) {
  const blogScrollRef = useRef(null);
  const tripScrollRef = useRef(null);

  const loggedMissingKeys = useRef(new Set());

  function i18n(key) {
    if (props.i18n && props.i18n['blog'] && !props.i18n['blog'][key]) {
      if (!loggedMissingKeys.current.has(key)) {
        console.log('Blog Missing Translation: ' + key);
        loggedMissingKeys.current.add(key);
      }
    }
    return props.i18n && props.i18n['blog'] && props.i18n['blog'][key]
      ? props.i18n['blog'][key]
      : key;
  }

  const blogs = props.blogData?.posts || [];

  function languageCheck(text) {
    // First check if text contains Chinese characters
    const hasChineseChars = /[\u4e00-\u9fff]/.test(text);
    if (hasChineseChars) {
      return 'zh';
    }

    // Fall back to franc for other languages
    const lang = franc(text);
    if (lang === 'cmn' || lang === 'yue' || lang === 'wuu' || lang === 'nan') {
      return 'zh';
    } else {
      return 'en';
    }
  }

  const medals = props.blogData?.medals || [];

  const tripPromo = {
    title: i18n('「Global」Get $10 OFF on Trip.com'),
    shareURL:
      'https://hk.trip.com/sale/4283/referee.html?locale=zh-HK&referCode=5253C1995FB313ED993BC64A068BDABA',
    coverURL: i18n(
      'https://ak-d.tripcdn.com/images/0a14l12000aqs8zq3AC37.jpg_.webp'
    ),
    publishTime: '2025-01-01T00:00:00.000Z', // Static date to avoid hydration mismatch
  };

  const moments = (props.blogData?.moments || []).slice(0, 5);
  const moment = [tripPromo, ...moments];

  // Filtered blogs for display
  const filteredBlogs = blogs
    .filter((post) => {
      const userLanguage = props.locale || 'en';
      const postLanguage = languageCheck(post.title);
      if (userLanguage.includes('zh')) {
        return postLanguage === 'zh';
      } else {
        return postLanguage === 'en';
      }
    })
    .slice(0, 6);

  // Auto-scroll for Blog posts
  useEffect(() => {
    const blogContainer = blogScrollRef.current;
    if (!blogContainer || filteredBlogs.length === 0) return;

    let isUserScrolling = false;
    let scrollTimeout;
    let animationFrame;

    const handleInteraction = () => {
      isUserScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 3000);
    };

    const autoScroll = () => {
      if (!isUserScrolling && blogContainer) {
        blogContainer.scrollLeft += 0.5;

        // Reset when we've scrolled past the first set (one third of total scroll width since we have 3 sets)
        const scrollWidth = blogContainer.scrollWidth;
        const firstSetWidth = scrollWidth / 3;

        if (blogContainer.scrollLeft >= firstSetWidth) {
          blogContainer.scrollLeft = blogContainer.scrollLeft - firstSetWidth;
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    blogContainer.addEventListener('wheel', handleInteraction, {
      passive: true,
    });
    blogContainer.addEventListener('touchstart', handleInteraction);
    blogContainer.addEventListener('touchmove', handleInteraction);
    blogContainer.addEventListener('mousedown', handleInteraction);

    animationFrame = requestAnimationFrame(autoScroll);

    return () => {
      blogContainer.removeEventListener('wheel', handleInteraction);
      blogContainer.removeEventListener('touchstart', handleInteraction);
      blogContainer.removeEventListener('touchmove', handleInteraction);
      blogContainer.removeEventListener('mousedown', handleInteraction);
      cancelAnimationFrame(animationFrame);
      clearTimeout(scrollTimeout);
    };
  }, [filteredBlogs]);

  // Auto-scroll for Trip moments (reverse direction)
  useEffect(() => {
    const tripContainer = tripScrollRef.current;
    if (!tripContainer || moment.length === 0) return;

    setTimeout(() => {
      if (tripContainer) {
        tripContainer.scrollLeft = tripContainer.scrollWidth / 2;
      }
    }, 100);

    let isUserScrolling = false;
    let scrollTimeout;
    let animationFrame;

    const handleInteraction = () => {
      isUserScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 3000);
    };

    const autoScroll = () => {
      if (!isUserScrolling && tripContainer) {
        tripContainer.scrollLeft -= 0.5;
        if (tripContainer.scrollLeft <= 0) {
          tripContainer.scrollLeft = tripContainer.scrollWidth / 2;
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    tripContainer.addEventListener('wheel', handleInteraction, {
      passive: true,
    });
    tripContainer.addEventListener('touchstart', handleInteraction);
    tripContainer.addEventListener('touchmove', handleInteraction);
    tripContainer.addEventListener('mousedown', handleInteraction);

    animationFrame = requestAnimationFrame(autoScroll);

    return () => {
      tripContainer.removeEventListener('wheel', handleInteraction);
      tripContainer.removeEventListener('touchstart', handleInteraction);
      tripContainer.removeEventListener('touchmove', handleInteraction);
      tripContainer.removeEventListener('mousedown', handleInteraction);
      cancelAnimationFrame(animationFrame);
      clearTimeout(scrollTimeout);
    };
  }, [moment]);

  return (
    <div className="relative h-full w-full max-w-7xl mx-auto flex flex-col items-start px-4 sm:px-6 lg:px-8 pt-24 overflow-y-auto scrollbar-hide space-y-8 md:space-y-16">
      {/* Blog */}
      <div id="blog" className="relative w-full space-y-8">
        <div className="text-left flex flex-wrap">
          <a
            className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl grow"
            href="#blog"
          >
            {i18n('Blog')}
            <i className="far fa-ghost ml-2"></i>
          </a>
          <p className="mt-2 max-w-2xl text-xl text-gray-500">
            {i18n('Find out the latest posts and tutorials.')}
          </p>
        </div>
        {props.isLoading && filteredBlogs.length === 0 && (
          <div className="overflow-x-hidden my-5">
            <div className="flex gap-5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[350px] rounded-xl overflow-hidden bg-white dark:bg-black border border-gray-100 dark:border-gray-800 animate-pulse"
                >
                  <div className="h-64 w-full bg-gray-200 dark:bg-gray-800" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div
          className="overflow-x-auto my-5 scrollbar-hide"
          ref={blogScrollRef}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-5">
            {(filteredBlogs.length >= 5 ? [...filteredBlogs, ...filteredBlogs, ...filteredBlogs] : filteredBlogs).map(
              (post, index) => (
                <a
                  key={`${post.title}-${index}`}
                  href={post.link}
                  target="_blank"
                  className="flex-shrink-0 w-[350px] flex flex-col rounded-xl overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-95 border border-transparent hover:border-black dark:hover:border-white xl:rounded-[25px]"
                >
                  <div className="flex-shrink-0">
                    <img
                      loading="lazy"
                      className="h-64 w-[350px] object-cover"
                      src={post.enclosure.link}
                      alt={post.title}
                    />
                    <div className="invisible dark:visible absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black h-64"></div>
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className=" text-gray-400 text-xs">
                      <i className="far fa-calendar mr-1"></i>
                      <time
                        dateTime={
                          new Date(post.pubDate).toISOString().split('T')[0]
                        }
                      >
                        {new Date(post.pubDate).toISOString().split('T')[0]}
                      </time>
                    </div>
                    <div className="flex-1 mt-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {post.title}
                    </div>
                    {/* <span className="text-sm font-medium text-orange-600 space-x-2 mt-3">
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
                  </span> */}
                  </div>
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Moments */}
      <div id="trip" className="relative w-full space-y-8">
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
            {props.isLoading && medals.length === 0 && (
              [...Array(6)].map((_, i) => (
                <div key={i} className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse mr-1" />
              ))
            )}
            {medals.map((medal) => (
              <Tooltip
                key={medal.medalStageId || medal.medalStageName}
                content={medal.medalStageName || ''}
                placement="bottom"
                className="p-1 border text-xs dark:text-white bg-white dark:bg-black rounded-xl"
              >
                <img
                  loading="lazy"
                  src={medal.medalStageIcon}
                  alt={medal.medalStageName || ''}
                  className="h-10 w-10 hover:scale-105 transition-all"
                />
              </Tooltip>
            ))}
          </div>
          <a
            href="https://hk.trip.com/travel-guide/personal-home/E1B9A703A2E3FEF984D86D1D507FB324B4A7CBA7500F0E62A0BFA68DCC95C09E"
            className="flex-1 md:flex-none block text-sm font-semibold text-white whitespace-nowrap bg-sky-600 hover:bg-sky-500 px-4 py-2 rounded-xl transition-all"
            target="_blank"
          >
            <i className="fa fa-suitcase-rolling mr-2"></i>
            {i18n('View all on Trip.com')}
          </a>
        </div>
        {props.isLoading && moments.length === 0 && (
          <div className="overflow-x-hidden my-5">
            <div className="flex gap-5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[350px] rounded-xl overflow-hidden bg-white dark:bg-black border border-gray-100 dark:border-gray-800 animate-pulse">
                  <div className="h-64 w-full bg-gray-200 dark:bg-gray-800" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div
          className="overflow-x-auto my-5 scrollbar-hide"
          ref={tripScrollRef}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-5">
            {(moments.length >= 4 ? [tripPromo, ...moments, ...moments, ...moments] : [tripPromo, ...moments]).map(
              (post, index) => (
                <a
                  href={post.shareURL}
                  target="_blank"
                  key={`${post.translateTitle || post.title}-${index}`}
                  className="flex-shrink-0 w-[350px] flex flex-col rounded-xl overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-95 border border-transparent hover:border-black dark:hover:border-white xl:rounded-[25px]"
                >
                  <div className="flex-shrink-0">
                    <img
                      loading="lazy"
                      className="h-64 w-[350px] object-cover"
                      src={post.coverURL}
                      alt={post.translateTitle || post.title}
                    />
                    <div className="invisible dark:visible absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black h-64"></div>
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className=" text-gray-400 text-xs">
                      <i className="far fa-calendar mr-1"></i>
                      <time
                        dateTime={
                          new Date(post.publishTime).toISOString().split('T')[0]
                        }
                      >
                        {new Date(post.publishTime).toISOString().split('T')[0]}
                      </time>
                      {!post.translateTitle && (
                        <span>
                          <i className="far fa-map-marker-alt ml-2 mr-1"></i>
                          {post.title.split('「')[1] &&
                            post.title.split('「')[1].split('」')[0]}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {post.translateTitle || post.title.split('」')[1]}
                      </div>
                    </div>
                  </div>
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
