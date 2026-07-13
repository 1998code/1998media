import { useEffect, useMemo, useRef } from 'react';
import { franc } from 'franc-min';
import { Tooltip } from '@nextui-org/tooltip';

const CAROUSEL_ROW_REPEAT_COUNT = 6;

function languageCheck(text) {
  const hasChineseChars = /[\u4e00-\u9fff]/.test(text);
  if (hasChineseChars) {
    return 'zh';
  }

  const lang = franc(text);
  return ['cmn', 'yue', 'wuu', 'nan'].includes(lang) ? 'zh' : 'en';
}

function splitIntoRows(items) {
  const rows = [[], []];
  items.forEach((item, index) => rows[index % 2].push(item));

  if (rows[1].length === 0 && rows[0].length > 0) {
    rows[1] = [...rows[0]];
  }

  return rows;
}

function setupAutoScroll(container, direction) {
  if (!container) return () => {};

  let isUserScrolling = false;
  let scrollTimeout;
  let animationFrame;
  const rowWidth = container.scrollWidth / CAROUSEL_ROW_REPEAT_COUNT;

  container.scrollLeft = direction > 0 ? rowWidth : rowWidth * 2;

  const handleInteraction = () => {
    isUserScrolling = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isUserScrolling = false;
    }, 3000);
  };

  const autoScroll = () => {
    if (!isUserScrolling && rowWidth > 0) {
      container.scrollLeft += direction * 0.5;

      if (direction > 0 && container.scrollLeft >= rowWidth * 2) {
        container.scrollLeft -= rowWidth;
      } else if (direction < 0 && container.scrollLeft <= rowWidth) {
        container.scrollLeft += rowWidth;
      }
    }
    animationFrame = requestAnimationFrame(autoScroll);
  };

  container.addEventListener('wheel', handleInteraction, { passive: true });
  container.addEventListener('touchstart', handleInteraction);
  container.addEventListener('touchmove', handleInteraction);
  container.addEventListener('mousedown', handleInteraction);

  animationFrame = requestAnimationFrame(autoScroll);

  return () => {
    container.removeEventListener('wheel', handleInteraction);
    container.removeEventListener('touchstart', handleInteraction);
    container.removeEventListener('touchmove', handleInteraction);
    container.removeEventListener('mousedown', handleInteraction);
    cancelAnimationFrame(animationFrame);
    clearTimeout(scrollTimeout);
  };
}

export default function Blog(props) {
  const blogScrollRef = useRef(null);
  const blogReverseScrollRef = useRef(null);
  const tripScrollRef = useRef(null);
  const tripReverseScrollRef = useRef(null);

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

  const moments = useMemo(
    () => (props.blogData?.moments || []).slice(0, 5),
    [props.blogData?.moments]
  );

  // Filtered blogs for display
  const filteredBlogs = useMemo(() => {
    const blogs = props.blogData?.posts || [];
    const userLanguage = props.locale || 'en';

    return blogs
      .filter((post) => {
        const postLanguage = languageCheck(post.title);
        return userLanguage.includes('zh')
          ? postLanguage === 'zh'
          : postLanguage === 'en';
      })
      .slice(0, 6);
  }, [props.blogData?.posts, props.locale]);

  const blogRows = useMemo(
    () => splitIntoRows(filteredBlogs),
    [filteredBlogs]
  );
  const tripRows = splitIntoRows([tripPromo, ...moments]);

  // Auto-scroll for Blog posts
  useEffect(() => {
    if (filteredBlogs.length === 0) return;

    const cleanups = [
      setupAutoScroll(blogScrollRef.current, 1),
      setupAutoScroll(blogReverseScrollRef.current, -1),
    ];

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [filteredBlogs]);

  // Auto-scroll for Trip moments in opposite directions
  useEffect(() => {
    const cleanups = [
      setupAutoScroll(tripScrollRef.current, 1),
      setupAutoScroll(tripReverseScrollRef.current, -1),
    ];

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [moments]);

  return (
    <>
      {/* Blog */}
      <section
        id="blog"
        className="relative snap-start min-h-dvh flex flex-col w-full max-w-7xl mx-auto flex-shrink-0 px-4 sm:px-6 lg:px-8 pt-24 pb-12 overflow-x-hidden space-y-8"
      >
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
          <div className="space-y-5 my-5">
            {[...Array(2)].map((_, rowIndex) => (
              <div key={rowIndex} className="overflow-x-hidden">
                <div className="flex gap-5">
                  {[...Array(4)].map((_, cardIndex) => (
                    <div
                      key={cardIndex}
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
            ))}
          </div>
        )}
        <div className="w-full min-w-0 space-y-5 my-5">
          {blogRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              ref={rowIndex === 0 ? blogScrollRef : blogReverseScrollRef}
              className="w-full min-w-0 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex">
                {[...Array(CAROUSEL_ROW_REPEAT_COUNT)].map((_, groupIndex) => (
                  <div
                    key={groupIndex}
                    className="flex flex-none gap-5 pr-5"
                  >
                    {row.map((post, index) => (
                      <a
                        key={`${post.link || post.title}-${rowIndex}-${groupIndex}-${index}`}
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
                                new Date(post.pubDate)
                                  .toISOString()
                                  .split('T')[0]
                              }
                            >
                              {
                                new Date(post.pubDate)
                                  .toISOString()
                                  .split('T')[0]
                              }
                            </time>
                          </div>
                          <div className="flex-1 mt-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                            {post.title}
                          </div>
                          {/* <span className="text-sm font-medium text-orange-600 space-x-2 mt-3">
                            {post.categories.map((category, categoryIndex) => {
                              let level = 1;
                              for (let i = 0; i < categoryIndex; i++) {
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
                                  style={{ opacity: level }}
                                  className="hover:underline"
                                  target="_blank"
                                >
                                  #
                                  {category.charAt(0).toUpperCase() +
                                    category.slice(1)}
                                </a>
                              );
                            })}
                          </span> */}
                        </div>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Moments */}
      <section
        id="trip"
        className="relative snap-start min-h-dvh flex flex-col w-full max-w-7xl mx-auto flex-shrink-0 px-4 sm:px-6 lg:px-8 pt-24 pb-12 overflow-x-hidden space-y-8"
      >
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
            {props.isLoading &&
              medals.length === 0 &&
              [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse mr-1"
                />
              ))}
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
          {(!props.isLoading || medals.length > 0) && (
            <a
              href="https://hk.trip.com/travel-guide/personal-home/E1B9A703A2E3FEF984D86D1D507FB324B4A7CBA7500F0E62A0BFA68DCC95C09E"
              className="flex-1 md:flex-none block text-sm font-semibold text-white whitespace-nowrap bg-sky-600 hover:bg-sky-500 px-4 py-2 rounded-xl transition-all"
              target="_blank"
            >
              <i className="fa fa-suitcase-rolling mr-2"></i>
              {i18n('View all on Trip.com')}
            </a>
          )}
        </div>
        {props.isLoading && moments.length === 0 && (
          <div className="space-y-5 my-5">
            {[...Array(2)].map((_, rowIndex) => (
              <div key={rowIndex} className="overflow-x-hidden">
                <div className="flex gap-5">
                  {[...Array(4)].map((_, cardIndex) => (
                    <div
                      key={cardIndex}
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
            ))}
          </div>
        )}
        <div className="w-full min-w-0 space-y-5 my-5">
          {tripRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              ref={rowIndex === 0 ? tripScrollRef : tripReverseScrollRef}
              className="w-full min-w-0 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex">
                {[...Array(CAROUSEL_ROW_REPEAT_COUNT)].map(
                  (_, groupIndex) => (
                    <div
                      key={groupIndex}
                      className="flex flex-none gap-5 pr-5"
                    >
                      {row.map((post, index) => (
                        <a
                          href={post.shareURL}
                          target="_blank"
                          key={`${post.shareURL || post.title}-${rowIndex}-${groupIndex}-${index}`}
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
                                  new Date(post.publishTime)
                                    .toISOString()
                                    .split('T')[0]
                                }
                              >
                                {
                                  new Date(post.publishTime)
                                    .toISOString()
                                    .split('T')[0]
                                }
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
                                {post.translateTitle ||
                                  post.title.split('」')[1]}
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
