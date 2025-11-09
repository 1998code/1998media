import { useState, useEffect } from 'react';

export default function Header(props) {
  const [bannerVisible, setBannerVisible] = useState(false);

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
  return (
    <div
      id="header"
      className="h-[90vh] text-center flex flex-col justify-center bg-gradient-to-b dark:from-[var(--arc-palette-background)] dark:text-[var(--arc-palette-foregroundPrimary)]"
    >
      <h1
        className={`text-8xl font-bold mb-3 dark:text-white px-3 transition-all duration-300 ${bannerVisible ? 'pt-16' : ''}`}
      >
        {i18n('Hi')} <i className="fa-light fa-hand-wave text-orange-500"></i>{' '}
        {i18n("I'm")}{' '}
        <span className="text-orange-600 dark:text-orange-300 underline decoration-dotted decoration-2 underline-offset-8">
          {i18n('MING')}
        </span>{' '}
        !
      </h1>
      <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-400 px-3">
        {i18n('Glad to see you here')}{' '}
        <i className="far fa-face-laugh-wink"></i>
      </h2>
      <div className="h-[60vh] hidden sm:block">
        <spline-viewer
          url="https://cdn.1998.media/3ds/pig.splinecode"
          events-target="global"
        ></spline-viewer>
      </div>
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
