import { useState, useEffect, useRef } from 'react';
import { Tooltip } from '@nextui-org/tooltip';

export default function About(props) {
  const currentSection = 'about';

  const sections = [
    'header',
    'about',
    'achievements',
    'gallery',
    'experience',
    'skills',
    'projects',
    'ai',
    'blog',
    'trip',
    'faq',
    'contact',
  ];

  const handleNavigate = (direction) => {
    const currentIndex = sections.indexOf(currentSection);
    let targetSection = null;

    if (direction === 'up' && currentIndex > 0) {
      targetSection = sections[currentIndex - 1];
    } else if (direction === 'down' && currentIndex < sections.length - 1) {
      targetSection = sections[currentIndex + 1];
    }

    if (targetSection) {
      const element = document.getElementById(targetSection);
      if (element) {
        // Update hash and scroll
        window.location.hash = targetSection;
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const loggedMissingKeys = useRef(new Set());

  function i18n(key) {
    if (props.i18n && props.i18n['about'] && !props.i18n['about'][key]) {
      if (!loggedMissingKeys.current.has(key)) {
        console.log('About Missing Translation: ' + key);
        loggedMissingKeys.current.add(key);
      }
    }
    return props.i18n && props.i18n['about'] && props.i18n['about'][key]
      ? props.i18n['about'][key]
      : key;
  }
  return (
    <div className="h-full w-full max-w-7xl mx-auto flex items-center justify-center">
      <div className="w-full px-4 py-8 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-200 to-clear dark:from-orange-800 dark:to-clear xl:rounded-[60px] relative">
        {/* Keyboard navigation keycaps - desktop only */}
        <div className="hidden lg:flex absolute bottom-6 left-6 flex-col items-center gap-2">
          <Tooltip
            content="Up - Use ↑ key to navigate"
            placement="right"
            className="p-1 border text-xs dark:text-white bg-white dark:bg-black rounded-xl"
          >
            <button
              onClick={() => handleNavigate('up')}
              disabled={sections.indexOf(currentSection) === 0}
              className="flex items-center justify-center w-12 h-12 rounded-xl xl:rounded-[25px] bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-800 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl font-semibold"
              aria-label="Navigate up"
            >
              <i className="far fa-arrow-up"></i>
            </button>
          </Tooltip>
          <Tooltip
            content="Down - Use ↓ key to navigate"
            placement="right"
            className="p-1 border text-xs dark:text-white bg-white dark:bg-black rounded-xl"
          >
            <button
              onClick={() => handleNavigate('down')}
              disabled={
                sections.indexOf(currentSection) === sections.length - 1
              }
              className="flex items-center justify-center w-12 h-12 rounded-xl xl:rounded-[25px] bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-800 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl font-semibold"
              aria-label="Navigate down"
            >
              <i className="far fa-arrow-down"></i>
            </button>
          </Tooltip>
        </div>
        <div className="lg:flex flex-col lg:flex-row gap-3 lg:gap-8 items-center min-h-[75vh]">
          <h2 className="-mt-0 lg:-mt-32 min-w-[36%] mx-auto text-3xl font-extrabold text-orange-900 dark:text-orange-100 text-center lg:text-left lg:min-w-[50%]">
            <img
              alt="Profile"
              loading="lazy"
              src="https://cdn.1998.media/favicon24.jpg"
              className="rounded-full w-24 h-24"
            />
            <br />
            <br />
            {i18n("I'm a")}{' '}
            <span className="text-orange-500 dark:text-orange-400">
              {i18n('Product Manager')}{' '}
            </span>
            <br />
            {i18n('leading on')}{' '}
            <span className="text-teal-700 dark:text-orange-300">
              <i className="far fa-sidebar"></i> {i18n('UI Design,')}
              <br />
              {i18n('and')} <i className="far fa-command"></i>{' '}
              {i18n('App Development')}
              {i18n('.')}
            </span>
            <br />
            <br />
            <div className="opacity-85">
              {i18n('As an')} <i className="far fa-person-to-portal"></i>{' '}
              <span className="border-b-2 border-orange-500">
                {i18n('outgoing & motivated')}
              </span>
              <br />
              <i className="far fa-person-from-portal"></i>{' '}
              {i18n('person with')}{' '}
              <span className="underline decoration-orange-500 decoration-wavy decoration-2">
                {i18n('unlimited')}
              </span>{' '}
              {i18n('creativity')} <i className="far fa-paintbrush-pencil"></i>{' '}
              {i18n(',')}
              <br />
              {i18n('growing from a great IT environment')}
              {i18n('.')}
            </div>
          </h2>
          <div className="mt-8 lg:mt-0 flex flex-wrap lg:flex-col space-y-3">
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:items-center lg:ml-4">
              <img
                loading="lazy"
                className="h-24 dark:hidden"
                src="https://cdn.1998.media/logos/CityU.png"
                alt="CityU"
              />
              <img
                loading="lazy"
                className="h-24 lg:h-32 hidden dark:block"
                src="https://cdn.1998.media/logos/CityU_dark.png"
                alt="CityU"
              />
            </div>
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:items-center lg:ml-4">
              <img
                loading="lazy"
                className="h-24 dark:hidden"
                src="https://cdn.1998.media/logos/PolyU.webp"
                alt="PolyU"
              />
              <img
                loading="lazy"
                className="h-24 lg:h-32 hidden dark:block"
                src="https://cdn.1998.media/logos/PolyU_dark.webp"
                alt="PolyU"
              />
            </div>
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:items-center lg:ml-4">
              <img
                loading="lazy"
                className="h-24 dark:hidden"
                src="https://cdn.1998.media/logos/Google.png"
                alt="Google"
              />
              <img
                loading="lazy"
                className="h-24 lg:h-32 hidden dark:block"
                src="https://cdn.1998.media/logos/Google_dark.png"
                alt="Google"
              />
              <img
                loading="lazy"
                className="h-24 p-6 dark:hidden"
                src="/assets/logos/anthropic.svg"
                alt="Anthropic"
              />
              <img
                loading="lazy"
                className="h-24 lg:h-32 p-6 lg:p-8 hidden dark:block"
                src="/assets/logos/anthropic-white.svg"
                alt="Anthropic"
              />
            </div>
            <img
              alt=""
              loading="lazy"
              src="https://cdn.1998.media/bgs/Calculator.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
