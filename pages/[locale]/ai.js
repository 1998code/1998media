import { useState, useRef, useEffect } from 'react';

export default function AI(props) {
  const [isPausedFeatured, setIsPausedFeatured] = useState(false);
  const [isPausedOther, setIsPausedOther] = useState(false);
  const featuredScrollRef = useRef(null);
  const otherScrollRef = useRef(null);
  const featuredAnimationRef = useRef(null);
  const otherAnimationRef = useRef(null);

  function i18n(key) {
    if (props.i18n && props.i18n['ai'] && !props.i18n['ai'][key]) {
      console.log('AI Missing Translation: ' + key);
    }
    return props.i18n && props.i18n['ai'] && props.i18n['ai'][key]
      ? props.i18n['ai'][key]
      : key;
  }

  const dalle = props.dalle || [];

  // Auto-scroll for Featured section
  useEffect(() => {
    const featuredContainer = featuredScrollRef.current;
    if (!featuredContainer) return;

    let isUserScrolling = false;
    let scrollTimeout;
    let animationFrame;

    const handleInteraction = () => {
      isUserScrolling = true;
      setIsPausedFeatured(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
        setIsPausedFeatured(false);
      }, 3000);
    };

    const autoScroll = () => {
      if (!isUserScrolling && featuredContainer) {
        featuredContainer.scrollLeft += 0.5;
        // Reset to start when reaching the end (seamless loop)
        if (featuredContainer.scrollLeft >= featuredContainer.scrollWidth / 2) {
          featuredContainer.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    featuredContainer.addEventListener('wheel', handleInteraction, { passive: true });
    featuredContainer.addEventListener('touchstart', handleInteraction);
    featuredContainer.addEventListener('touchmove', handleInteraction);
    featuredContainer.addEventListener('mousedown', handleInteraction);

    animationFrame = requestAnimationFrame(autoScroll);

    return () => {
      featuredContainer.removeEventListener('wheel', handleInteraction);
      featuredContainer.removeEventListener('touchstart', handleInteraction);
      featuredContainer.removeEventListener('touchmove', handleInteraction);
      featuredContainer.removeEventListener('mousedown', handleInteraction);
      cancelAnimationFrame(animationFrame);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Auto-scroll for Other section (reverse direction)
  useEffect(() => {
    const otherContainer = otherScrollRef.current;
    if (!otherContainer) return;

    // Initialize scroll position to middle for reverse scrolling
    setTimeout(() => {
      if (otherContainer) {
        otherContainer.scrollLeft = otherContainer.scrollWidth / 2;
      }
    }, 100);

    let isUserScrolling = false;
    let scrollTimeout;
    let animationFrame;

    const handleInteraction = () => {
      isUserScrolling = true;
      setIsPausedOther(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
        setIsPausedOther(false);
      }, 3000);
    };

    const autoScroll = () => {
      if (!isUserScrolling && otherContainer) {
        otherContainer.scrollLeft -= 0.5; // Scroll right (opposite direction)
        // Reset to middle when reaching the start (seamless loop)
        if (otherContainer.scrollLeft <= 0) {
          otherContainer.scrollLeft = otherContainer.scrollWidth / 2;
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    otherContainer.addEventListener('wheel', handleInteraction, { passive: true });
    otherContainer.addEventListener('touchstart', handleInteraction);
    otherContainer.addEventListener('touchmove', handleInteraction);
    otherContainer.addEventListener('mousedown', handleInteraction);

    animationFrame = requestAnimationFrame(autoScroll);

    return () => {
      otherContainer.removeEventListener('wheel', handleInteraction);
      otherContainer.removeEventListener('touchstart', handleInteraction);
      otherContainer.removeEventListener('touchmove', handleInteraction);
      otherContainer.removeEventListener('mousedown', handleInteraction);
      cancelAnimationFrame(animationFrame);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div id="ai" className="relative h-full w-full max-w-7xl mx-auto flex flex-col items-start px-4 sm:px-6 lg:px-8 pt-24 overflow-y-auto scrollbar-hide">
      <div className="relative w-full">
        <div className="text-left flex flex-wrap">
          <a
            className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl grow"
            href="#ai"
          >
            {i18n('AI')}
            <i className="far fa-user-robot ml-2"></i>
          </a>
          <p className="mt-2 max-w-2xl text-xl text-gray-500">
            {i18n('The latest prompt design and experimental results.')}
          </p>
        </div>
        {/* Featured */}
        <div className="overflow-x-auto my-5 scrollbar-hide" ref={featuredScrollRef} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex gap-6">
            {[
              ...dalle.filter((item) => item.featured === '🏆 Hall of Fame'),
              ...dalle.filter((item) => item.featured === '🏆 Hall of Fame'),
            ].map((item, index) => (
                <a
                  href={item.sourceURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-shrink-0 min-w-[300px] flex flex-col rounded-xl overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-95 border border-transparent hover:border-black dark:hover:border-white transition-all xl:rounded-[25px]"
                  key={`featured-${index}`}
                >
                  <div className="relative">
                    <img
                      loading="lazy"
                      src={item.output}
                      className="w-[300px] h-[300px] object-cover"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/80 dark:bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl xl:rounded-t-[25px] flex flex-col justify-center items-center p-4">
                      <div className="text-white text-center">
                        <p className="text-sm font-semibold mb-2">
                          "{i18n(item.prompt)}"
                        </p>
                        <p className="text-xs text-gray-300 mb-3">
                          - {item.version}
                        </p>
                        <p className="text-xs text-gray-400">
                          {i18n(`Open in ${item.source}`)}
                        </p>
                      </div>
                    </div>
                    {/* Top labels - always visible */}
                    <div className="absolute top-2 left-2 z-10">
                      <span className="text-xs text-white bg-black/50 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                        {i18n(item.featured)}
                      </span>
                    </div>
                  </div>
                </a>
            ))}
          </div>
        </div>
        {/* Other */}
        <div className="overflow-x-auto my-5 scrollbar-hide" ref={otherScrollRef} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex gap-6">
            {[
              ...dalle.filter((item) => item.featured !== '🏆 Hall of Fame'),
              ...dalle.filter((item) => item.featured !== '🏆 Hall of Fame'),
            ].map((item, index) => (
                <a
                  href={item.sourceURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-shrink-0 min-w-[250px] flex flex-col rounded-xl overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-95 border border-transparent hover:border-black dark:hover:border-white xl:rounded-[25px]"
                  key={`other-${index}`}
                >
                  <div className="relative">
                    <img
                      loading="lazy"
                      src={item.output}
                      className="w-[250px] h-[250px] object-cover"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/80 dark:bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl xl:rounded-t-[25px] flex flex-col justify-center items-center p-4">
                      <div className="text-white text-center">
                        <p className="text-xs md:text-sm font-semibold mb-2">
                          "{i18n(item.prompt)}"
                        </p>
                        <p className="text-xs text-gray-300 mb-3">
                          - {item.version}
                        </p>
                        <p className="text-xs text-gray-400">
                          {i18n(`Open in ${item.source}`)}
                        </p>
                      </div>
                    </div>
                    {/* Top labels - always visible */}
                    <div className="absolute top-2 left-2 z-10">
                      <span className="text-xs text-white bg-black/50 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                        🌠 {i18n('NEW')}
                      </span>
                    </div>
                  </div>
                </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
