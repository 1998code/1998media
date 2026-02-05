import { useState, useEffect, useRef } from 'react';
import { DocSearch } from '@docsearch/react';
import '@docsearch/css';
import StaggeredMenu from '../../components/StaggeredMenu/StaggeredMenu';

// Social items provided in the request
const socialItems = [
  {
    label: <i className="fab fa-x text-lg" />,
    link: 'https://twitter.com/1998design',
    ariaLabel: 'X (Twitter)',
  },
  {
    label: <i className="fab fa-github text-lg" />,
    link: 'https://github.com/1998code',
    ariaLabel: 'GitHub',
  },
  {
    label: <i className="fab fa-dribbble text-lg" />,
    link: 'https://dribbble.com/1998design',
    ariaLabel: 'Dribbble',
  },
  {
    label: <i className="fab fa-behance text-lg" />,
    link: 'https://www.behance.net/1998design',
    ariaLabel: 'Behance',
  },
  {
    label: <i className="fab fa-instagram text-lg" />,
    link: 'https://instagram.com/1998trip',
    ariaLabel: 'Instagram',
  },
  {
    label: <i className="fab fa-youtube text-lg" />,
    link: 'https://www.youtube.com/@MingsExplorer',
    ariaLabel: 'YouTube',
  },
  {
    label: <i className="fab fa-tiktok text-lg" />,
    link: 'https://www.tiktok.com/@ming.explorer',
    ariaLabel: 'Tiktok',
  },
];

export default function Navigation(props) {
  const [visible, setVisible] = useState(false);
  const loggedMissingKeys = useRef(new Set());

  useEffect(() => {
    setVisible(true);
  }, []);

  function i18n(key) {
    if (
      props.i18n &&
      props.i18n['navigation'] &&
      !props.i18n['navigation'][key]
    ) {
      if (!loggedMissingKeys.current.has(key)) {
        console.log('Navigation Missing Translation: ' + key);
        loggedMissingKeys.current.add(key);
      }
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
  }, [props.sections, props.activeSection]);

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

  // Convert sections to StaggeredMenu items
  const menuItems = props.sections
    ? props.sections.map((section) => ({
      label: i18n(
        section.charAt(0).toUpperCase() +
        section.replace(/ai/g, 'AI').slice(1).replace(/-/g, ' ')
      ),
      link: `#${section}`,
      ariaLabel: `Go to ${section}`,
      icon: <i className={`fad fa-${sectionIconMap[section]}`}></i>,
    }))
    : [];

  return (
    <div
      id="navigation"
      className={`group fixed w-full flex items-center md:justify-center p-3.5 sm:py-5 select-none z-[100] transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
    >
      <div
        className={`flex bg-white/50 dark:bg-black/50 dark:text-white backdrop-blur-md shadow dark:shadow-gray-900 items-center pl-1 rounded-full transition-all`}
      >
        <div className={`px-2 flex items-center gap-2 text-sm font-semibold`}>
          {/* Sidebar Toggle replaced by StaggeredMenu */}
          <StaggeredMenu
            isFixed={false}
            forceOverlay={true}
            position="left"
            items={menuItems}
            socialItems={socialItems}
            displaySocials
            displayItemNumbering={false}
            menuButtonColor={null} // Let CSS handle color
            openMenuButtonColor={null}
            changeMenuColorOnOpen={false}
            colors={['#fed7aa', '#ea580c']}
            logoUrl=""
            accentColor="#ea580c"
            triggerIcon={<i className="fad fa-sidebar text-lg"></i>}
            topButton={
              <div className="flex items-center justify-start gap-3 group/back hover:text-orange-600 transition-colors">
                <i className="fad fa-sidebar text-4xl text-orange-600 transition-transform group-hover/back:-translate-x-1"></i>
                <span className="text-2xl font-bold uppercase tracking-tighter text-black dark:text-white group-hover/back:text-orange-600 transition-all duration-300">
                  {i18n('Back')}
                </span>
              </div>
            }
            buttonClassName="py-1 opacity-50 hover:opacity-80 transition-all text-current"
            onMenuOpen={() => console.log('Menu opened')}
            onMenuClose={() => console.log('Menu closed')}
          />
        </div>

        {props.sections &&
          props.sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`px-2 text-sm font-semibold ${props.activeSection === section ? 'opacity-100 bg-white text-orange-600 dark:text-orange-400 dark:bg-white/10 shadow-inner dark:shadow-gray-900/50' : 'opacity-50'} hidden lg:inline py-1 rounded-full hover:opacity-80 transition-all`}
            >
              {
                <div className="flex items-center gap-2">
                  <i
                    className={`inline ${section != 'header' && 'lg:hidden'} fad fa-${sectionIconMap[section]}`}
                  ></i>
                  <span
                    className={`hidden ${section != 'header' && 'lg:inline'}`}
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
        <div className="h-6 w-0.5 bg-black/10 dark:bg-white/10 mx-2" />

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
