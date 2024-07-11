import { useState, useEffect, useRef } from 'react';
import { DocSearch } from '@docsearch/react';
import '@docsearch/css';

export default function Navigation(props) {
  function i18n(key) {
    if (props.i18n && props.i18n['navigation'] && !props.i18n['navigation'][key]) {
      console.log('Navigation Missing Translation: ' + key);
    }
    return props.i18n && props.i18n['navigation'] && props.i18n['navigation'][key]
      ? props.i18n['navigation'][key]
      : key;
  }

  // Watch arrow-up and down to change the url hash
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const index = props.sections.indexOf(props.activeSection);
        if (index > 0) {
          window.location.hash = props.sections[index - 1];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const index = props.sections.indexOf(props.activeSection);
        if (index < props.sections.length - 1) {
          window.location.hash = props.sections[index + 1];
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [props.activeSection]);

  return (
    <div
      id="navigation"
      className="group fixed w-full flex items-center justify-center py-5 z-[100]"
    >
      <div className="flex items-center bg-white/50 dark:bg-black/50 dark:text-white pl-1 backdrop-blur-md rounded-full shadow dark:shadow-gray-900 transition-all">
        {props.sections && props.sections
          .map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`hidden lg:inline px-2 py-1 text-sm font-semibold ${props.activeSection === section ? 'opacity-100 bg-white text-orange-600 dark:text-orange-400 dark:bg-white/10 shadow-inner dark:shadow-gray-900/50' : 'opacity-50'} hover:opacity-80 rounded-full transition-all`}
            >
              {
                section !== 'header' ? 
                i18n(section.charAt(0).toUpperCase() + section.replace(/ai/g, 'AI').slice(1).replace(/-/g, ' '))
                : <i className="fad fa-house"></i>
              }
            </a>
          ))}
        {/* Divider */}
        <div className="hidden lg:inline h-6 w-0.5 bg-black/10 dark:bg-white/10 mx-2" />
        {/* Search */}
        <DocSearch
          appId="01IRDDJXZ4"
          indexName="1998"
          apiKey="a8c97c33f935922cf3fa01ff8ea67f10"
          placeholder="Search & Learn More..."
        />
      </div>
    </div>
  );
}