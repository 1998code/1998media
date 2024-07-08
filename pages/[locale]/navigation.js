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

  const [activeSection, setActiveSection] = useState('');
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.7 }
    );

    props.sections.forEach(section => {
      const ref = sectionRefs.current[section];
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      props.sections.forEach(section => {
        const ref = sectionRefs.current[section];
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [props.sections, props.activeSection]);

  return (
    <div
      id="navigation"
      className="group fixed w-full flex items-center justify-center py-5 z-[100]"
    >
      <div className="flex items-center bg-white/50 dark:bg-black/50 dark:text-white pl-1 backdrop-blur-md rounded-full shadow-inner transition-all">
        {props.sections
          .filter(section => section !== 'header')
          .map((section) => (
            <a
              key={section}
              href={`#${section}`}
              ref={ref => sectionRefs.current[section] = ref}
              onClick={() => setActiveSection(section)}
              className={`px-2 py-1 text-sm font-semibold ${activeSection === section ? 'opacity-100 bg-white text-orange-600 dark:text-orange-400 dark:bg-white/10 shadow' : 'opacity-50'} hover:opacity-80 rounded-full transition-all`}
            >
              {i18n(section.charAt(0).toUpperCase() + section.replace(/ai/g, 'AI').slice(1).replace(/-/g, ' '))}
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