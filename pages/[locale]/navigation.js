import { useState, useEffect, useRef } from 'react';
import { DocSearch } from '@docsearch/react';
import '@docsearch/css';

export default function Navigation(props) {
  function i18n(key) {
    if (
      props.i18n &&
      props.i18n['navigation'] &&
      !props.i18n['navigation'][key]
    ) {
      console.log('Navigation Missing Translation: ' + key);
    }
    return props.i18n &&
      props.i18n['navigation'] &&
      props.i18n['navigation'][key]
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

  const sectionIconMap = {
    header: 'house',
    about: 'info-circle',
    achievements: 'earth-americas',
    gallery: 'image',
    experience: 'briefcase',
    skills: 'tools',
    projects: 'project-diagram',
    openAPI: 'code',
    ai: 'robot',
    blog: 'rss',
    stocks: 'chart-line',
    trip: 'map-marked-alt',
    faq: 'question-circle',
    contact: 'envelope',
  };

  return (
    <div
      id="navigation"
      className={`group fixed ${props.sidebarOpen ? 'top-0 left-0 md:min-w-[10vw]' : 'w-full flex items-center md:justify-center p-3.5 sm:py-5'} select-none z-[100] transition-all`}
    >
      <div
        className={`flex bg-white/50 dark:bg-black/50 dark:text-white backdrop-blur-md shadow dark:shadow-gray-900 ${props.sidebarOpen ? 'h-screen flex-col overflow-auto' : 'items-center pl-1 rounded-full'} transition-all`}
      >
        <div
          className={`px-2 flex items-center gap-2 text-sm font-semibold ${props.sidebarOpen && 'py-6'}`}
        >
          {/* Sidebar Toggle */}
          <button
            onClick={() => props.toggleSidebar()}
            className={`py-1 opacity-50 hover:opacity-80 ${!props.sidebarOpen && 'rounded-full'} transition-all`}
          >
            <i
              className={`fad fa-sidebar ${props.sidebarOpen && 'rotate-90'}`}
            ></i>
          </button>
          {props.sidebarOpen ? (
            <span className="hidden 2xl:inline">MING's Design</span>
          ) : (
            <></>
          )}
        </div>

        {props.sidebarOpen && (
          <div className="hidden 2xl:inline mb-3">
            <DocSearch
              appId="01IRDDJXZ4"
              indexName="1998"
              apiKey="a8c97c33f935922cf3fa01ff8ea67f10"
              placeholder="Search & Learn More..."
            />
          </div>
        )}

        {props.sections &&
          props.sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`px-2 text-sm font-semibold ${props.activeSection === section ? 'opacity-100 bg-white text-orange-600 dark:text-orange-400 dark:bg-white/10 shadow-inner dark:shadow-gray-900/50' : 'opacity-50'} ${props.sidebarOpen ? 'py-3.5 hover:bg-orange-100 dark:hover:bg-gray-900' : 'hidden lg:inline py-1 rounded-full hover:opacity-80'} transition-all`}
            >
              {
                <div className="flex items-center gap-2">
                  <i
                    className={`inline ${section != 'header' && !props.sidebarOpen && 'lg:hidden'} fad fa-${sectionIconMap[section]}`}
                  ></i>
                  <span
                    className={`hidden ${(section != 'header' || props.sidebarOpen) && 'lg:inline'}`}
                  >
                    {i18n(
                      section.charAt(0).toUpperCase() +
                        section.replace(/ai/g, 'AI').slice(1).replace(/-/g, ' ')
                    )}
                  </span>
                </div>
              }
            </a>
          ))}

        {/* Divider */}
        {props.sidebarOpen ? (
          <></>
        ) : (
          <div className="h-6 w-0.5 bg-black/10 dark:bg-white/10 mx-2" />
        )}

        {/* Search */}
        {!props.sidebarOpen && (
          <DocSearch
            appId="01IRDDJXZ4"
            indexName="1998"
            apiKey="a8c97c33f935922cf3fa01ff8ea67f10"
            placeholder="Search & Learn More..."
          />
        )}
      </div>
    </div>
  );
}
