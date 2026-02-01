import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header(props) {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    // Check if locale banner is dismissed
    const dismissed = sessionStorage.getItem('locale-switcher-dismissed');
    setBannerVisible(!dismissed);

    // Listen for storage changes in case banner is dismissed
    const checkBanner = () => {
      const isDismissed = sessionStorage.getItem('locale-switcher-dismissed');
      setBannerVisible(!isDismissed);
    };

    window.addEventListener('storage', checkBanner);
    // Also check periodically for same-tab changes
    const interval = setInterval(checkBanner, 500);

    return () => {
      window.removeEventListener('storage', checkBanner);
      clearInterval(interval);
    };
  }, []);

  function i18n(key) {
    if (props.i18n && props.i18n['header'] && !props.i18n['header'][key]) {
      console.log('Header Missing Translation: ' + key);
    }
    return props.i18n && props.i18n['header'] && props.i18n['header'][key]
      ? props.i18n['header'][key]
      : key;
  }

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const child = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const splitText = (text) =>
    Array.from(text).map((char, i) => (
      <motion.span key={i} variants={child}>
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));

  return (
    <div
      id="header"
      onClick={() => showContinue && props.onComplete && props.onComplete()}
      className={`relative h-full w-full flex flex-col items-center justify-center bg-gradient-to-b dark:from-[var(--arc-palette-background)] dark:text-[var(--arc-palette-foregroundPrimary)] ${showContinue ? 'cursor-pointer' : ''}`}
    >
      <motion.h1
        variants={container}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => {
          setTimeout(() => {
            setShowContinue(true);
            if (props.onReady) props.onReady();
          }, 500);
        }}
        className="text-8xl font-bold dark:text-white px-3 text-center -mt-20"
      >
        {splitText(i18n('Hi'))}{' '}
        <motion.i
          variants={child}
          className="fa-light fa-hand-wave text-orange-500"
        ></motion.i>{' '}
        {splitText(i18n("I'm") || "I'm")}{' '}
        <span className="text-orange-600 dark:text-orange-300 underline decoration-dotted decoration-2 underline-offset-8">
          {splitText(i18n('MING'))}
        </span>{' '}
        {splitText('!')}
      </motion.h1>

      {showContinue && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-[75%] left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              props.onComplete && props.onComplete();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-4 rounded-full text-orange-500 font-medium text-xl transition-all duration-300 border-0"
          >
            {/* Background shimmer effect - vertical */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <motion.div 
                animate={{ 
                  y: ['-100%', '100%'],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3, 
                  ease: "linear" 
                }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/10 to-transparent"
              />
            </div>
            
            {/* Animated dashed border - Capsule shape */}
            <div className="absolute inset-0 pointer-events-none -m-[2px]">
              <svg width="100%" height="100%" className="overflow-visible">
                <rect
                  x="2"
                  y="2"
                  width="calc(100% - 4px)"
                  height="calc(100% - 4px)"
                  rx="30"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  className="text-orange-500/50"
                  style={{
                    animation: 'dash 2s linear infinite',
                  }}
                />
              </svg>
            </div>
            <style jsx>{`
              @keyframes dash {
                to {
                  stroke-dashoffset: -16;
                }
              }
            `}</style>

            {/* Pulsing glow ring - keeping it but making it subtle */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full border border-orange-500/20 pointer-events-none"
            />

            <span className="relative z-10 flex items-center gap-2">
              <motion.i 
                animate={{ 
                  y: [10, -10],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3, 
                  ease: "linear" 
                }}
                className="far fa-arrow-up"
              ></motion.i>
              {i18n('Continue')} 
              <motion.i 
                animate={{ 
                  y: [-10, 10],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3, 
                  ease: "linear" 
                }}
                className="far fa-arrow-down"
              ></motion.i>
            </span>
          </motion.button>
        </motion.div>
      )}

      <span className="absolute bottom-5 text-center w-full text-gray-600 animate-pulse">
        {/* <i className="far fa-arrow-down"></i> */}
        {props.i18n && props.i18n['header'] ? (
          ''
        ) : (
          <div className="ml-3">
            {i18n(
              'Your language is not supported yet. English will be used instead. Scroll down to continue.'
            )}
          </div>
        )}
      </span>
    </div>
  );
}
