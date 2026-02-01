import { useState, useRef, useEffect } from 'react';

export default function Skills(props) {
  const [activeTab, setActiveTab] = useState('all');
  const [tabStyles, setTabStyles] = useState({ left: '4px', width: '62px' });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const desktopTabRefs = useRef({});
  const mobileTabRefs = useRef({});

  function i18n(key) {
    if (props.i18n && props.i18n['skills'] && !props.i18n['skills'][key]) {
      console.log('Skills Missing Translation: ' + key);
    }
    return props.i18n && props.i18n['skills'] && props.i18n['skills'][key]
      ? props.i18n['skills'][key]
      : key;
  }
  const certs = [
    {
      name: 'User Experience Design',
      icons: 'fa-google',
      href: 'https://coursera.org/verify/KDTDPH6RCXZD',
      bgColor: 'bg-blue-600',
      fromColor: 'from-blue-600',
    },
    {
      name: 'AI Fluency for nonprofits',
      icons: 'Claude',
      href: 'http://verify.skilljar.com/c/i9sa4ijatjzj',
      bgColor: 'bg-orange-600',
      fromColor: 'from-orange-600',
    },
  ];

  const softwareGroups = {
    'Design & Productivity': [
      {
        name: 'Adobe Creative Cloud',
        icons: 'CC',
        href: 'https://adobe.com',
        bgColor: 'bg-red-600',
        fromColor: 'from-red-600',
      },
      {
        name: 'Figma',
        icons: 'fa-figma',
        href: 'https://figma.com',
        bgColor: 'bg-purple-600',
        fromColor: 'from-purple-600',
      },
      {
        name: 'Framer',
        icons: 'F',
        href: 'https://www.framer.com/',
        bgColor: 'bg-sky-500',
        fromColor: 'from-sky-500',
      },
      {
        name: 'Sketch',
        icons: 'fa-sketch',
        href: 'https://www.sketch.com/',
        bgColor: 'bg-orange-400',
        fromColor: 'from-orange-400',
      },
      {
        name: 'AutoCAD',
        icons: 'AC',
        href: 'https://www.autodesk.com/products/autocad/',
        bgColor: 'bg-red-700',
        fromColor: 'from-red-700',
      },
      {
        name: 'Google Worksuite',
        icons: 'fa-google',
        href: 'https://workspace.google.com/',
        bgColor: 'bg-blue-500',
        fromColor: 'from-blue-500',
      },
      {
        name: 'Microsoft Office',
        icons: 'fa-microsoft',
        href: 'https://www.microsoft.com/microsoft-365',
        bgColor: 'bg-teal-500',
        fromColor: 'from-teal-500',
      },
    ],
    'Development Tools': [
      {
        name: 'Apple Xcode',
        icons: 'fa-apple',
        href: 'https://developer.apple.com/xcode/',
        bgColor: 'bg-blue-600',
        fromColor: 'from-blue-600',
      },
      {
        name: 'Apple iWork',
        icons: 'fa-apple',
        href: 'https://www.apple.com/iwork/',
        bgColor: 'bg-blue-600',
        fromColor: 'from-blue-600',
      },
      {
        name: 'Apple Final Cut Pro',
        icons: 'fa-apple',
        href: 'https://www.apple.com/final-cut-pro/',
        bgColor: 'bg-blue-600',
        fromColor: 'from-blue-600',
      },
      {
        name: 'Unity',
        icons: 'fa-unity',
        href: 'https://unity.com/',
        bgColor: 'bg-gray-700',
        fromColor: 'from-gray-700',
      },
    ],
    '3D & Multimedia': [
      {
        name: 'Cinema 4D',
        icons: 'C4D',
        href: 'https://www.maxon.net/en/cinema-4d',
        bgColor: 'bg-purple-500',
        fromColor: 'from-purple-500',
      },
      {
        name: 'Shapr3D',
        icons: 'S3D',
        href: 'https://www.shapr3d.com/',
        bgColor: 'bg-orange-500',
        fromColor: 'from-orange-500',
      },
    ],
    'Data & Database': [
      {
        name: 'Microsoft PowerBI',
        icons: 'fa-microsoft',
        href: 'https://powerbi.microsoft.com/',
        bgColor: 'bg-teal-500',
        fromColor: 'from-teal-500',
      },
      {
        name: 'MS SQL Server',
        icons: 'fa-microsoft',
        href: 'https://www.microsoft.com/sql-server',
        bgColor: 'bg-red-600',
        fromColor: 'from-red-600',
      },
      {
        name: 'MySQLWorkbench',
        icons: 'MSW',
        href: 'https://www.mysql.com/products/workbench/',
        bgColor: 'bg-blue-600',
        fromColor: 'from-blue-600',
      },
      {
        name: 'Table Plus',
        icons: 'TP',
        href: 'https://tableplus.com/',
        bgColor: 'bg-indigo-600',
        fromColor: 'from-indigo-600',
      },
    ],
  };

  const languages = [
    {
      name: 'SwiftUI',
      icons: 'fa-swift',
      href: 'https://developer.apple.com/xcode/swiftui/',
      bgColor: 'bg-orange-600',
      fromColor: 'from-orange-600',
    },
    {
      name: 'CoreData',
      icons: 'fa-apple',
      href: 'https://developer.apple.com/documentation/coredata/',
      bgColor: 'bg-orange-600',
      fromColor: 'from-orange-600',
    },
    {
      name: 'CloudKit/JS',
      icons: 'fa-apple',
      href: 'https://developer.apple.com/icloud/cloudkit/',
      bgColor: 'bg-orange-600',
      fromColor: 'from-orange-600',
    },

    {
      name: 'NextJS',
      icons: 'fa-react',
      href: 'https://nextjs.org/',
      bgColor: 'bg-sky-600',
      fromColor: 'from-sky-600',
    },

    {
      name: 'TailwindCSS',
      icons: 'fa-css3',
      href: 'https://tailwindcss.com/',
      bgColor: 'bg-indigo-600',
      fromColor: 'from-indigo-600',
    },
    {
      name: 'Bootstrap 5',
      icons: 'fa-bootstrap',
      href: 'https://getbootstrap.com/',
      bgColor: 'bg-indigo-600',
      fromColor: 'from-indigo-600',
    },

    {
      name: 'NuxtJS',
      icons: 'fa-vuejs',
      href: 'https://nuxt.com/',
      bgColor: 'bg-teal-600',
      fromColor: 'from-teal-600',
    },
    {
      name: 'VuetifyJS',
      icons: 'fa-vuejs',
      href: 'https://vuetifyjs.com/en/',
      bgColor: 'bg-blue-600',
      fromColor: 'from-blue-600',
    },

    {
      name: 'OpenAI GPT',
      icons: 'AI',
      href: 'https://openai.com/',
      bgColor: 'bg-teal-600',
      fromColor: 'from-teal-600',
    },
  ];
  const speakWrites = [
    {
      name: 'Cantonese (Chinese Traditional)',
      icons: 'Proficient',
      href: 'https://www.hkeaa.edu.hk/en/hkdse/',
      bgColor: 'bg-green-600',
      fromColor: 'from-green-600',
    },
    {
      name: 'English',
      icons: 'Proficient',
      href: 'https://www.hkeaa.edu.hk/en/hkdse/',
      bgColor: 'bg-green-600',
      fromColor: 'from-green-600',
    },

    {
      name: 'Mandarin (Chinese Simplified)',
      icons: 'Fluent',
      href: 'https://www.hkeaa.edu.hk/en/hkdse/',
      bgColor: 'bg-blue-600',
      fromColor: 'from-blue-600',
    },

    {
      name: 'Korean (Passed the Test of Proficiency in Korean in 2018)',
      icons: 'Intermediate',
      href: 'https://www.topik-hk.org/eng/index.asp',
      bgColor: 'bg-sky-600',
      fromColor: 'from-sky-600',
    },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  // Tab configuration
  const tabs = [
    { id: 'all', label: 'All', icon: 'fa-th', color: 'bg-orange-600' },
    { id: 'certified', label: 'Certified', icon: 'fa-certificate', color: 'bg-blue-600' },
    { id: 'softwares', label: 'Softwares', icon: 'fa-desktop', color: 'bg-purple-600' },
    { id: 'languages', label: 'Languages & Technologies', icon: 'fa-code', color: 'bg-indigo-600' },
    { id: 'speak-write', label: 'Speak & Write', icon: 'fa-language', color: 'bg-green-600' },
  ];

  // Get active tab color
  const getActiveTabColor = () => {
    const activeTabData = tabs.find((tab) => tab.id === activeTab);
    return activeTabData?.color || 'bg-gray-600';
  };

  // Handle tab change with animation
  const handleTabChange = (newTab) => {
    if (newTab === activeTab) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 250);
  };

  // Update tab styles when active tab changes
  useEffect(() => {
    const updateTabStyles = () => {
      const desktopEl = desktopTabRefs.current[activeTab];
      const mobileEl = mobileTabRefs.current[activeTab];

      const activeTabElement =
        desktopEl && desktopEl.offsetParent !== null
          ? desktopEl
          : mobileEl && mobileEl.offsetParent !== null
            ? mobileEl
            : null;

      if (activeTabElement) {
        const parent = activeTabElement.parentElement;
        const parentRect = parent.getBoundingClientRect();
        const activeRect = activeTabElement.getBoundingClientRect();

        setTabStyles({
          left: `${activeRect.left - parentRect.left}px`,
          width: `${activeRect.width}px`,
        });
      }
    };

    updateTabStyles();
    const timeoutId = setTimeout(updateTabStyles, 50);
    return () => clearTimeout(timeoutId);
  }, [activeTab, props.i18n]);

  const colorMap = {
    'from-blue-600': '#2563eb',
    'from-orange-600': '#ea580c',
    'from-red-600': '#dc2626',
    'from-purple-600': '#9333ea',
    'from-sky-500': '#0ea5e9',
    'from-orange-400': '#fb923c',
    'from-red-700': '#b91c1c',
    'from-blue-500': '#3b82f6',
    'from-teal-500': '#14b8a6',
    'from-gray-700': '#374151',
    'from-purple-500': '#a855f7',
    'from-orange-500': '#f97316',
    'from-indigo-600': '#4f46e5',
    'from-sky-600': '#0284c7',
    'from-teal-600': '#0d9488',
    'from-green-600': '#16a34a',
  };

  return (
    <div id="skills" className="relative h-full w-full max-w-7xl mx-auto flex flex-col items-start px-4 sm:px-6 lg:px-8 pt-24 overflow-y-auto scrollbar-hide">
      <div className="relative w-full">
        <div className="text-left">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <a
              className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl"
              href="#skills"
            >
              {i18n('Skills & Languages')}
              <i className="far fa-language ml-2"></i>
            </a>

            {/* Tab Switcher - Desktop only */}
            <div className="hidden lg:block">
              <div className="relative flex bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-2xl p-1 border border-gray-200 dark:border-gray-700 xl:rounded-[20px]">
                {/* Sliding Background */}
                <div
                  className={`absolute top-1 bottom-1 ${getActiveTabColor()} rounded-xl transition-all duration-300 ease-out shadow-sm pointer-events-none`}
                  style={tabStyles}
                />
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    ref={(el) => (desktopTabRefs.current[tab.id] = el)}
                    onClick={() => handleTabChange(tab.id)}
                    className={`relative z-10 px-3 py-2 text-xs font-medium rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    <i className={`far ${tab.icon} mr-1`}></i>
                    {i18n(tab.label)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Switcher - Mobile & Tablet */}
          <div className="flex justify-center mt-6 lg:hidden">
            <div className="relative flex bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-2xl p-1 border border-gray-200 dark:border-gray-700 xl:rounded-[20px]">
              {/* Sliding Background */}
              <div
                className={`absolute top-1 bottom-1 ${getActiveTabColor()} rounded-xl transition-all duration-300 ease-out shadow-sm pointer-events-none`}
                style={tabStyles}
              />
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  ref={(el) => (mobileTabRefs.current[tab.id] = el)}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative z-10 px-3 py-2 text-xs font-medium rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  <i className={`far ${tab.icon} mr-1`}></i>
                  {i18n(tab.label)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div
          className="transition-all duration-500 ease-in-out mt-8"
          style={{
            transform: isTransitioning ? 'translateX(20px)' : 'translateX(0)',
            opacity: isTransitioning ? 0 : 1,
          }}
        >
          {/* Certified */}
          {(activeTab === 'all' || activeTab === 'certified') && (
            <div className="mt-10">
                <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                  {i18n('Certified')}
                </h2>
                <ul
                  role="list"
                  className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {certs.map((cert) => {
                    const fromClass = cert.fromColor;
                    const hexColor = colorMap[fromClass] || '#666';
                    return (
                      <li key={cert.name} className="col-span-1">
                        <a
                          href={cert.href}
                          target="_blank"
                          className="flex shadow-sm rounded-xl overflow-hidden hover:animate-pulse transition-all border-2 bg-transparent"
                          style={{ 
                            borderColor: hexColor,
                            color: hexColor,
                          }}
                        >
                          <div
                            className="flex-shrink-0 flex items-center justify-center w-12 text-current text-sm font-medium ml-4"
                          >
                            <i className={classNames('fab', cert.icons)}>
                              {cert.icons.includes('fa') ? '' : cert.icons}
                            </i>
                          </div>
                          <div className="flex-1 flex items-center justify-between bg-transparent truncate">
                            <div className="flex-1 px-4 py-2 text-sm truncate font-bold">
                              {i18n(cert.name)}
                            </div>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
            </div>
          )}

          {/* Softwares */}
          {(activeTab === 'all' || activeTab === 'softwares') && (
            <div className="mt-10 space-y-10">
              {Object.entries(softwareGroups).map(([groupName, items]) => (
                <div key={groupName}>
                  <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                    {i18n(groupName)}
                  </h2>
                  <ul
                    role="list"
                    className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5"
                  >
                    {items.map((software) => {
                      const hexColor = colorMap[software.fromColor] || '#666';
                      return (
                        <li key={software.name} className="col-span-1">
                          <a
                            href={software.href}
                            target="_blank"
                            className="flex shadow-sm rounded-xl overflow-hidden hover:animate-pulse transition-all border-2 bg-transparent"
                            style={{ 
                              borderColor: hexColor,
                              color: hexColor,
                            }}
                          >
                            <div className="flex-shrink-0 flex items-center justify-center w-12 text-current text-sm font-medium ml-4">
                              <i className={classNames('fab', software.icons)}>
                                {software.icons.includes('fa')
                                  ? ''
                                  : software.icons}
                              </i>
                            </div>
                            <div className="flex-1 flex items-center justify-between border-gray-200 bg-transparent truncate">
                              <div className="flex-1 px-4 py-2 text-sm truncate font-bold">
                                {i18n(software.name)}
                              </div>
                            </div>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Languages & Technologies */}
          {(activeTab === 'all' || activeTab === 'languages') && (
            <div className="mt-10">
                <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                  {i18n('Languages & Technologies')}
                </h2>
                <ul
                  role="list"
                  className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5"
                >
                  {languages.map((language) => {
                    const hexColor = colorMap[language.fromColor] || '#666';
                    return (
                      <li key={language.name} className="col-span-1">
                        <a
                          href={language.href}
                          target="_blank"
                          className="flex shadow-sm rounded-xl overflow-hidden hover:animate-pulse transition-all border-2 bg-transparent"
                          style={{ 
                            borderColor: hexColor,
                            color: hexColor,
                          }}
                        >
                          <div
                            className="flex-shrink-0 flex items-center justify-center w-12 text-current text-sm font-medium ml-4"
                          >
                            <i className={classNames('fab', language.icons)}>
                              {language.icons.includes('fa') ? '' : language.icons}
                            </i>
                          </div>
                          <div className="flex-1 flex items-center justify-between bg-transparent truncate">
                            <div className="flex-1 px-4 py-2 text-sm truncate font-bold">
                              {i18n(language.name)}
                            </div>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
            </div>
          )}

          {/* Speak & Write */}
          {(activeTab === 'all' || activeTab === 'speak-write') && (
            <div className="mt-10">
                <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                  {i18n('Speak & Write')}
                </h2>
                <ul
                  role="list"
                  className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-4"
                >
                  {speakWrites.map((speakWrite) => {
                    const hexColor = colorMap[speakWrite.fromColor] || '#666';
                    return (
                      <li key={speakWrite.name} className="col-span-1">
                        <a
                          href={speakWrite.href}
                          target="_blank"
                          className="flex shadow-sm rounded-xl overflow-hidden hover:animate-pulse transition-all border-2 bg-transparent"
                          style={{ 
                            borderColor: hexColor,
                            color: hexColor,
                          }}
                        >
                          <div
                            className="flex-shrink-0 flex items-center justify-center w-12 text-current text-xs font-medium ml-4"
                          >
                            {i18n(speakWrite.icons)}
                          </div>
                          <div className="flex-1 flex items-center justify-between bg-transparent truncate">
                            <div className="flex-1 px-4 py-2 text-sm truncate font-bold">
                              {i18n(speakWrite.name)}
                            </div>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
            </div>
          )}
        </div>
        <p className="mt-6 text-sm text-gray-500">
          {i18n('*Random sort - does not mean the order of proficient level')}
        </p>
      </div>
    </div>
  );
}
