import { useState, useRef, useEffect } from 'react';

export default function Experience(props) {
  const [activeTab, setActiveTab] = useState('all');
  const [tabStyles, setTabStyles] = useState({ left: '4px', width: '62px' });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const desktopTabRefs = useRef({});
  const mobileTabRefs = useRef({});

  const loggedMissingKeys = useRef(new Set());

  function i18n(key) {
    if (
      props.i18n &&
      props.i18n['experience'] &&
      !props.i18n['experience'][key]
    ) {
      if (!loggedMissingKeys.current.has(key)) {
        console.log('Experience Missing Translation: ' + key);
        loggedMissingKeys.current.add(key);
      }
    }
    return props.i18n &&
      props.i18n['experience'] &&
      props.i18n['experience'][key]
      ? props.i18n['experience'][key]
      : key;
  }
  const positions = [
    {
      title: 'Product Manager',
      type: 'Full-time',
      location: '🇭🇰 Hong Kong',
      description: 'Leading team to develop web and mobile applications',
      date: '2024-NOW',
      textColor: 'text-blue-600 dark:text-blue-300',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      borderColor: 'border-blue-600 dark:border-blue-300',
      icon: 'fa fa-list-check',
    },
    {
      title: 'Senior Software Engineer',
      type: 'Full-time',
      location: '🇭🇰 Hong Kong',
      description: 'UI Design, Web, iOS Development, A.I. Research',
      date: '2023-2024',
      textColor: 'text-blue-600 dark:text-blue-300',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      borderColor: 'border-blue-600 dark:border-blue-300',
      icon: 'fa fa-code',
    },
    {
      title: 'Software Engineer',
      type: 'Full-time',
      location: '🇭🇰 Hong Kong',
      description: 'Web, iOS Development',
      date: '2021-2023',
      textColor: 'text-blue-600 dark:text-blue-300',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      borderColor: 'border-blue-600 dark:border-blue-300',
      icon: 'fa fa-code',
    },

    {
      title: 'Check disposable email for Swift',
      type: 'Contributor',
      location: '🌐 Remote',
      description: 'Contribute open source project',
      date: '2024',
      textColor: 'text-teal-600 dark:text-teal-300',
      bgColor: 'bg-teal-100 dark:bg-teal-900',
      borderColor: 'border-teal-600 dark:border-teal-300',
      icon: 'far fa-envelope-circle-check',
    },
    {
      title: 'Lapras Score Data Linkage',
      type: 'Contributor',
      location: '🌐 Remote, Japan',
      description: 'Contribute open source web project',
      date: '2024',
      textColor: 'text-teal-600 dark:text-teal-300',
      bgColor: 'bg-teal-100 dark:bg-teal-900',
      borderColor: 'border-teal-600 dark:border-teal-300',
      icon: 'far fa-rectangle',
    },
    {
      title: 'Google AI SDK for Swift',
      type: 'Contributor',
      location: '🌐 Remote',
      description: 'Contribute open source iOS project',
      date: '2024',
      textColor: 'text-teal-600 dark:text-teal-300',
      bgColor: 'bg-teal-100 dark:bg-teal-900',
      borderColor: 'border-teal-600 dark:border-teal-300',
      icon: 'fab fa-google',
    },
    {
      title: 'Google VertexAI for iOS',
      type: 'Contributor',
      location: '🌐 Remote',
      description: 'Contribute open source iOS project',
      date: '2024',
      textColor: 'text-teal-600 dark:text-teal-300',
      bgColor: 'bg-teal-100 dark:bg-teal-900',
      borderColor: 'border-teal-600 dark:border-teal-300',
      icon: 'fab fa-google',
    },
    {
      title: 'QuestDB Translator',
      type: 'Contributor',
      location: '🌐 Remote, United Kingdom',
      description: 'Contribute open source database project',
      date: '2022',
      textColor: 'text-teal-600 dark:text-teal-300',
      bgColor: 'bg-teal-100 dark:bg-teal-900',
      borderColor: 'border-teal-600 dark:border-teal-300',
      icon: 'far fa-database',
    },
    {
      title: 'Atlassian Translator',
      type: 'Contributor',
      location: '🌐 Remote, Australia',
      description: 'BitBucket.org Team',
      date: '2020-2021',
      textColor: 'text-teal-600 dark:text-teal-300',
      bgColor: 'bg-teal-100 dark:bg-teal-900',
      borderColor: 'border-teal-600 dark:border-teal-300',
      icon: 'fab fa-atlassian',
    },
    {
      title: 'StopCovid19Tokyo Translator',
      type: 'Contributor',
      location: '🌐 Remote, Japan',
      description:
        'Contribute open source project with Tokyo Metropolitan Government and Code of Japan Team',
      date: '2020-2021',
      textColor: 'text-teal-600 dark:text-teal-300',
      bgColor: 'bg-teal-100 dark:bg-teal-900',
      borderColor: 'border-teal-600 dark:border-teal-300',
      icon: 'far fa-virus',
    },

    {
      title: 'Application Development Consultant',
      type: 'Freelance',
      location: '🌐 Remote',
      description:
        'Provide professional advice on cross platform development and design',
      date: '2024-NOW',
      textColor: 'text-amber-600 dark:text-amber-300',
      bgColor: 'bg-amber-100 dark:bg-amber-900',
      borderColor: 'border-amber-600 dark:border-amber-300',
      icon: 'far fa-square',
    },
    {
      title: 'Unsplash Artists',
      type: 'Freelance',
      location: '🌐 Remote',
      description: '3D Design + Photography',
      date: '2022-NOW',
      textColor: 'text-amber-600 dark:text-amber-300',
      bgColor: 'bg-amber-100 dark:bg-amber-900',
      borderColor: 'border-amber-600 dark:border-amber-300',
      icon: 'far fa-image',
    },
    {
      title: 'Articles Writer',
      type: 'Freelance',
      location: '🌐 Remote',
      description:
        'Write easy to understand tutorials that help thousands of developers',
      date: '2020-NOW',
      textColor: 'text-amber-600 dark:text-amber-300',
      bgColor: 'bg-amber-100 dark:bg-amber-900',
      borderColor: 'border-amber-600 dark:border-amber-300',
      icon: 'far fa-pen',
    },
    {
      title: 'Apple Developer',
      type: 'Freelance',
      location: '🌐 Remote',
      description:
        'Build and publish app for iOS, iPadOS, watchOS, and macOS platforms',
      date: '2020-NOW',
      textColor: 'text-amber-600 dark:text-amber-300',
      bgColor: 'bg-amber-100 dark:bg-amber-900',
      borderColor: 'border-amber-600 dark:border-amber-300',
      icon: 'fab fa-apple',
    },
    {
      title: 'Designer / Photographer',
      type: 'Freelance',
      location: '🌐 Remote',
      description:
        'Start Freelance works on different platforms (Adobe Stock, Behance, Dribbble)',
      date: '2019-NOW',
      textColor: 'text-amber-600 dark:text-amber-300',
      bgColor: 'bg-amber-100 dark:bg-amber-900',
      borderColor: 'border-amber-600 dark:border-amber-300',
      icon: 'fa fa-compass-drafting',
    },

    {
      title: 'Student Assistant',
      type: 'Part-time',
      location: '🇭🇰 Hong Kong',
      description: 'Data analytics and visualisation',
      date: '2020-2021',
      textColor: 'text-slate-600 dark:text-slate-300',
      bgColor: 'bg-slate-100 dark:bg-slate-900',
      borderColor: 'border-slate-600 dark:border-slate-300',
      icon: 'far fa-chart-bar',
    },
    {
      title: 'Student Developer',
      type: 'Part-time',
      location: '🇭🇰 Hong Kong',
      description:
        'Participate in Artificial Intelligence (A.I.) and Natural Language Processing (N.L.P) research field',
      date: '2020-2021',
      textColor: 'text-slate-600 dark:text-slate-300',
      bgColor: 'bg-slate-100 dark:bg-slate-900',
      borderColor: 'border-slate-600 dark:border-slate-300',
      icon: 'far fa-robot',
    },
    {
      title: 'Student Assistant',
      type: 'Part-time',
      location: '🇭🇰 Hong Kong',
      description:
        "Develop website & design booklet for University's Language Scolar Program",
      date: '2020-2021',
      textColor: 'text-slate-600 dark:text-slate-300',
      bgColor: 'bg-slate-100 dark:bg-slate-900',
      borderColor: 'border-slate-600 dark:border-slate-300',
      icon: 'far fa-book',
    },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  // Filter positions based on active tab
  const filteredPositions =
    activeTab === 'all'
      ? positions
      : positions.filter(
          (p) =>
            p.type.toLowerCase().replaceAll(' ', '-') ===
            activeTab.toLowerCase()
        );

  // Tab configuration with colors matching position types
  const tabs = [
    { id: 'all', label: 'All', icon: 'fa-th', color: 'bg-orange-600' },
    {
      id: 'full-time',
      label: 'Full-time',
      icon: 'fa-briefcase',
      color: 'bg-blue-600',
    },
    {
      id: 'contributor',
      label: 'Contributor',
      icon: 'fa-code-branch',
      color: 'bg-teal-600',
    },
    {
      id: 'freelance',
      label: 'Freelance',
      icon: 'fa-laptop-code',
      color: 'bg-amber-600',
    },
    {
      id: 'part-time',
      label: 'Part-time',
      icon: 'fa-clock',
      color: 'bg-slate-800',
    },
  ];

  // Get active tab color
  const getActiveTabColor = () => {
    return 'bg-gray-900 dark:bg-white';
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
      // Try desktop first, then mobile - use whichever is visible
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

    // Update immediately
    updateTabStyles();

    // Also update after a short delay to ensure i18n has rendered
    const timeoutId = setTimeout(updateTabStyles, 50);

    return () => clearTimeout(timeoutId);
  }, [activeTab, props.i18n]);

  return (
    <div
      id="experience"
      className="relative h-full w-full max-w-7xl mx-auto flex flex-col items-start px-4 sm:px-6 lg:px-8 pt-24"
    >
      <div className="relative w-full">
        <div className="text-left">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <a
              className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl"
              href="#experience"
            >
              {i18n('Experience')}
              <i className="far fa-flask ml-2"></i>
            </a>

            {/* Tab Switcher - Desktop only */}
            <div className="hidden lg:block">
              <div className="relative flex bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-2xl p-1 border border-gray-200 dark:border-gray-700">
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
                        ? 'text-white dark:text-black'
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

          <p className="mt-3 max-w-2xl text-xl text-gray-500">
            {i18n('Works and society contributions.')}
          </p>

          {/* Tab Switcher - Mobile & Tablet */}
          <div className="flex justify-start mt-6 lg:hidden">
            <div className="relative flex bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-2xl p-1 border border-gray-200 dark:border-gray-700">
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
                      ? 'text-white dark:text-black'
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
        <div className="mt-8 max-h-[70vh] overflow-y-auto rounded-xl border border-gray-200 bg-white/50 shadow-sm backdrop-blur-sm scrollbar-hide dark:border-gray-800 dark:bg-black/30 xl:rounded-[20px]">
          <div
            className="transition-all duration-500 ease-in-out"
            style={{
              transform: isTransitioning ? 'translateX(20px)' : 'translateX(0)',
              opacity: isTransitioning ? 0 : 1,
            }}
          >
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-800"
            >
              {filteredPositions.map((position, index) => (
                <li key={index}>
                  <div className="bg-transparent transition-colors hover:bg-gray-50/80 dark:hover:bg-white/5">
                    <div className="group px-4 py-4 sm:px-6">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
                            <i
                              className={`${position.icon} ${position.textColor} w-5 flex-shrink-0`}
                            ></i>
                            <span className="truncate">
                              {i18n(position.title)}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                            {i18n(position.description)}
                          </p>
                        </div>
                        <div className="flex flex-shrink-0 flex-col items-start gap-2 text-xs text-gray-500 dark:text-gray-400 sm:items-end">
                          <div
                            className={`inline-flex rounded-md border px-2 py-1 font-semibold bg-white/50 dark:bg-black/20 ${position.textColor} ${position.borderColor}`}
                          >
                            {i18n(position.type)}
                          </div>
                          <div className="flex items-center gap-1 whitespace-nowrap">
                            <span>{i18n(position.location)}</span>
                            <time dateTime={position.date}>
                              {i18n(position.date)}
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
