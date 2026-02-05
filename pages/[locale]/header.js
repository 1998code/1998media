import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ColorBends from '../../components/HeroAnimations/ColorBends';
import Aurora from '../../components/HeroAnimations/Aurora';
import DotGrid from '../../components/HeroAnimations/DotGrid';
import Galaxy from '../../components/HeroAnimations/Galaxy';
import GridScan from '../../components/HeroAnimations/GridScan';
import LightRays from '../../components/HeroAnimations/LightRays';
import Iridescence from '../../components/HeroAnimations/Iridescence';
import Orb from '../../components/HeroAnimations/Orb';
import Prism from '../../components/HeroAnimations/Prism';
import PrismaticBurst from '../../components/HeroAnimations/PrismaticBurst';

export default function Header(props) {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const bgType = props.bgType || 'colorbends';
  const direction = props.direction || 0;

  useEffect(() => {
    // Detect dark mode from darkmode-js class
    const checkDarkMode = () => {
      setIsDarkMode(document.body.classList.contains('darkmode--activated'));
    };

    // Initial check
    checkDarkMode();

    // Observe body class changes to handle dark mode toggle
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

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
      observer.disconnect();
      window.removeEventListener('storage', checkBanner);
      clearInterval(interval);
    };
  }, []);

  const loggedMissingKeys = useRef(new Set());

  const darkAnims = ['aurora', 'colorbends', 'galaxy', 'gridscan', 'orb', 'prism', 'prismaticburst'];
  const lightAnims = ['dotgrid', 'orb', 'prism', 'iridescence'];
  const currentAnims = isDarkMode ? darkAnims : lightAnims;

  const nextAnim = (e) => {
    e.stopPropagation();
    if (!props.setBg) return;
    const currentIndex = currentAnims.indexOf(bgType);
    const nextIndex = (currentIndex + 1) % currentAnims.length;
    props.setBg(currentAnims[nextIndex], 1);
  };

  const prevAnim = (e) => {
    e.stopPropagation();
    if (!props.setBg) return;
    const currentIndex = currentAnims.indexOf(bgType);
    const prevIndex = (currentIndex - 1 + currentAnims.length) % currentAnims.length;
    props.setBg(currentAnims[prevIndex], -1);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : direction < 0 ? '-100%' : 0,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : direction > 0 ? '-100%' : 0,
      opacity: 0,
    }),
  };

  function i18n(key) {
    if (props.i18n && props.i18n['header'] && !props.i18n['header'][key]) {
      if (!loggedMissingKeys.current.has(key)) {
        console.log('Header Missing Translation: ' + key);
        loggedMissingKeys.current.add(key);
      }
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
      onClick={() => props.onComplete && props.onComplete()}
      className={`relative h-full w-full flex flex-col items-center justify-center bg-transparent dark:text-[var(--arc-palette-foregroundPrimary)] cursor-pointer`}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden bg-[#fff6eb] dark:bg-[#000914]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={bgType + (isDarkMode ? 'dark' : 'light')}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.3 }
            }}
            className="absolute inset-0 bg-[#fff6eb] dark:bg-[#000914]"
          >
            {isDarkMode ? (
              bgType === 'aurora' ? (
                <Aurora
                  colorStops={["#7cff67", "#B19EEF", "#5227FF"]}
                  blend={0.5}
                  amplitude={0.5}
                  speed={1}
                />
              ) : bgType === 'galaxy' ? (
                <Galaxy
                  mouseRepulsion
                  mouseInteraction
                  density={1}
                  glowIntensity={0.3}
                  saturation={0}
                  hueShift={140}
                  twinkleIntensity={0.3}
                  rotationSpeed={0.1}
                  repulsionStrength={2}
                  autoCenterRepulsion={0}
                  starSpeed={0.5}
                  speed={1}
                />
              ) : bgType === 'gridscan' ? (
                <GridScan
                  sensitivity={0.55}
                  lineThickness={1}
                  linesColor="#4a2b10"
                  gridScale={0.1}
                  scanColor="#ffaa40"
                  scanOpacity={0.4}
                  enablePost
                  bloomIntensity={0.6}
                  chromaticAberration={0.002}
                  noiseIntensity={0.01}
                />
              ) : bgType === 'lightrays' ? (
                <LightRays
                  raysOrigin="bottom-center"
                  raysColor="#ffffff"
                  raysSpeed={2}
                  lightSpread={0.8}
                  rayLength={5}
                  followMouse={true}
                  mouseInfluence={0.5}
                  noiseAmount={0}
                  distortion={0}
                  pulsating={true}
                  fadeDistance={1}
                  saturation={1}
                />
              ) : bgType === 'orb' ? (
                <Orb
                  hoverIntensity={0}
                  rotateOnHover={false}
                  hue={0}
                  forceHoverState={false}
                  backgroundColor="#000914"
                />
              ) : bgType === 'prism' ? (
                <Prism
                  animationType="rotate"
                  timeScale={0.5}
                  height={3.5}
                  baseWidth={5.5}
                  scale={3.6}
                  hueShift={0}
                  colorFrequency={1}
                  noise={0}
                  glow={1}
                />
              ) : bgType === 'prismaticburst' ? (
                <PrismaticBurst
                  animationType="rotate3d"
                  intensity={2}
                  speed={0.5}
                  distort={0}
                  paused={false}
                  offset={{ x: 0, y: 0 }}
                  hoverDampness={0.25}
                  rayCount={0}
                  mixBlendMode="lighten"
                  colors={['#ff3300', '#ffaa40', '#ffffff']}
                />
              ) : (
                <ColorBends
                  colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
                  rotation={0}
                  speed={0.2}
                  scale={1}
                  frequency={1}
                  warpStrength={1}
                  mouseInfluence={1}
                  parallax={0.5}
                  noise={0.1}
                  transparent
                  autoRotate={0}
                />
              )
            ) : (
              bgType === 'orb' ? (
                <Orb
                  hoverIntensity={0}
                  rotateOnHover={false}
                  hue={0}
                  forceHoverState={false}
                  backgroundColor="#fff6eb"
                />
              ) : bgType === 'prism' ? (
                <Prism
                  animationType="rotate"
                  timeScale={0.5}
                  height={3.5}
                  baseWidth={5.5}
                  scale={3.6}
                  hueShift={0}
                  colorFrequency={1}
                  noise={0}
                  glow={1}
                />
              ) : bgType === 'iridescence' ? (
                <Iridescence
                  color={[1, 1, 1]}
                  mouseReact={true}
                  amplitude={0.1}
                  speed={0.7}
                />
              ) : (
                <DotGrid
                  dotSize={5}
                  gap={20}
                  baseColor="#e5e7eb"
                  activeColor="#f97316"
                  proximity={80}
                  shockRadius={150}
                  shockStrength={5}
                  resistance={750}
                  returnDuration={1.5}
                />
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - Desktop Only */}
      {currentAnims.length > 1 && (
        <>
          <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:block z-50">
            <button
              onClick={prevAnim}
              className="p-4 text-gray-500/30 hover:text-orange-500 transition-all duration-300 group/arrow"
              aria-label="Previous animation"
            >
              <motion.div
                whileHover={{ x: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <i className="far fa-chevron-left text-4xl" />
              </motion.div>
            </button>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block z-50">
            <button
              onClick={nextAnim}
              className="p-4 text-gray-500/30 hover:text-orange-500 transition-all duration-300 group/arrow"
              aria-label="Next animation"
            >
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <i className="far fa-chevron-right text-4xl" />
              </motion.div>
            </button>
          </div>
        </>
      )}

      <motion.h1
        variants={container}
        initial="hidden"
        animate={props.darkmodeReady ? "visible" : "hidden"}
        onAnimationComplete={() => {
          setTimeout(() => {
            setShowContinue(true);
          }, 500);
        }}
        className="relative z-10 text-5xl md:text-8xl font-bold dark:text-white px-3 text-center -mt-20"
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
          onAnimationComplete={() => {
            // Trigger navbar to appear after Continue button is fully visible
            if (props.onReady) props.onReady();
          }}
          className="absolute top-[75%] left-1/2 -translate-x-1/2 z-10"
        >
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              props.onComplete && props.onComplete();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-4 rounded-full text-orange-500 font-medium text-xl transition-all duration-300 border-0 bg-white/80 dark:bg-black/20 backdrop-blur-sm shadow-lg shadow-orange-500/10 hover:shadow-orange-500/40 hover:bg-white dark:hover:bg-black/40"
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
