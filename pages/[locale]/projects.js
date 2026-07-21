import { useState, useRef, useEffect } from 'react';
import { Grid } from '@githubocto/flat-ui';

export default function Projects(props) {
  const projectScrollRef = useRef(null);

  const loggedMissingKeys = useRef(new Set());

  function i18n(key) {
    if (props.i18n && props.i18n['projects'] && !props.i18n['projects'][key]) {
      if (!loggedMissingKeys.current.has(key)) {
        console.log('Projects Missing Translation: ' + key);
        loggedMissingKeys.current.add(key);
      }
    }
    return props.i18n && props.i18n['projects'] && props.i18n['projects'][key]
      ? props.i18n['projects'][key]
      : key;
  }
  const githubRaw = props.projectsData || [];

  // Filter and limit to 8 non-fork repositories
  const filteredProjects = githubRaw.filter((repo) => !repo.fork).slice(0, 8);

  // Auto-scroll for Projects
  useEffect(() => {
    const projectContainer = projectScrollRef.current;
    if (!projectContainer || filteredProjects.length === 0) return;

    let isUserScrolling = false;
    let scrollTimeout;
    let animationFrame;

    const handleInteraction = () => {
      isUserScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 3000);
    };

    const autoScroll = () => {
      if (!isUserScrolling && projectContainer) {
        projectContainer.scrollLeft += 0.5;
        if (projectContainer.scrollLeft >= projectContainer.scrollWidth / 2) {
          projectContainer.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    projectContainer.addEventListener('wheel', handleInteraction, {
      passive: true,
    });
    projectContainer.addEventListener('touchstart', handleInteraction);
    projectContainer.addEventListener('touchmove', handleInteraction);
    projectContainer.addEventListener('mousedown', handleInteraction);

    animationFrame = requestAnimationFrame(autoScroll);

    return () => {
      projectContainer.removeEventListener('wheel', handleInteraction);
      projectContainer.removeEventListener('touchstart', handleInteraction);
      projectContainer.removeEventListener('touchmove', handleInteraction);
      projectContainer.removeEventListener('mousedown', handleInteraction);
      cancelAnimationFrame(animationFrame);
      clearTimeout(scrollTimeout);
    };
  }, [filteredProjects]);
  return (
    <div
      id="projects"
      className="relative h-full w-full max-w-7xl mx-auto flex flex-col items-start px-4 sm:px-6 lg:px-8 pt-24 overflow-y-auto scrollbar-hide"
    >
      <div className="relative w-full space-y-8">
        <div className="text-left flex flex-wrap">
          <a
            className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl grow"
            href="#projects"
          >
            {i18n('Projects')}
            <i className="fa fa-code ml-2"></i>
          </a>
          <p className="mt-2 max-w-2xl text-xl text-gray-500">
            {i18n('Find out the latest inspiration.')}
          </p>
        </div>
        <div className="mx-auto grid gap-5 md:grid-cols-4 lg:max-w-none items-end">
          <img
            loading="lazy"
            className="w-full col-span-3 md:col-span-2 hover:scale-95 transition duration-300 rounded-xl xl:rounded-[25px]"
            src="https://gitstats.1998.media/api?username=1998code&show_icons=true&bg_color=30,e96443,904e95&title_color=fff&text_color=fff&icon_color=fff&hide_border=true"
            alt="Performance"
          />
          <img
            loading="lazy"
            className="w-full col-span-3 md:col-span-1 dark:hidden hover:scale-95 transition duration-300 rounded-xl xl:rounded-[25px]"
            src="https://gitstats.1998.media/api/top-langs/?username=1998code&langs_count=4&layout=default&hide_border=true"
            alt="Top Languages"
          />
          <img
            loading="lazy"
            className="w-full col-span-3 md:col-span-1 hidden dark:block hover:scale-95 transition duration-300 rounded-xl xl:rounded-[25px]"
            src="https://gitstats.1998.media/api/top-langs/?username=1998code&langs_count=4&layout=default&bg_color=000&title_color=fff&text_color=fff&hide_border=true"
            alt="Top Languages"
          />
          <img
            alt="Lapras Score"
            loading="lazy"
            className="col-span-3 md:col-span-1 hover:scale-95 transition duration-300 rounded-xl xl:rounded-[25px]"
            src="https://lapras-card-generator-auto.vercel.app/api/svg?b1=%23020E27&b2=%230E5593&i1=%23030E21&i2=%231688BF&l=en&u=MING"
          />
        </div>
        <img
          loading="lazy"
          id="projectChart"
          className="w-full p-3 hover:scale-95 transition duration-300 rounded-xl xl:rounded-[25px]"
          src="https://ghchart.rshah.org/1998code"
          alt="Github chart"
        />
        {props.isLoading && filteredProjects.length === 0 && (
          <div className="overflow-x-hidden my-5">
            <div className="flex gap-5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[350px] rounded-xl overflow-hidden bg-white dark:bg-black border border-gray-100 dark:border-gray-800 animate-pulse"
                >
                  <div className="h-[150px] w-full bg-gray-200 dark:bg-gray-800" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div
          className="overflow-x-auto my-5 scrollbar-hide"
          ref={projectScrollRef}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-5">
            {[...filteredProjects, ...filteredProjects].map((repo, index) => (
              <a
                href={repo.html_url}
                target="_blank"
                key={`${repo.name}-${index}`}
                className="flex-shrink-0 w-[350px] flex flex-col rounded-xl overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-95 border border-transparent hover:border-black dark:hover:border-white xl:rounded-[25px]"
              >
                <div className="flex-shrink-0">
                  <img
                    loading="lazy"
                    className="w-[350px] h-[150px] object-cover"
                    src={`https://opengraph.githubassets.com/286af552210001e9ea769373d5955f2c4d4a911070501bbd22fc7cb957761f48/1998code/${repo.name}`}
                    alt={repo.name.replaceAll('-', ' ')}
                  />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <span className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center truncate">
                    <i className="fab fa-github text-gray-500 dark:text-gray-100 mr-1"></i>
                    {repo.name.replaceAll('-', ' ')}
                  </span>
                  <div className="mt-2  text-gray-400 text-sm">
                    <i className="far fa-code text-gray-500 dark:text-gray-100 mr-1"></i>
                    {repo.language ?? '-'}
                    {repo.license ? ' | ' + repo.license.name : ''}
                  </div>
                  <div className="mt-2 text-gray-400 text-xs">
                    <i className="far fa-calendar text-gray-500 dark:text-gray-100 mr-2"></i>
                    <time dateTime={repo.created_at.slice(0, 10)}>
                      {repo.created_at.slice(0, 10)}
                    </time>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div
          id="projectFlattenDataTable"
          className="rounded-xl overflow-hidden"
        >
          <Grid data={githubRaw} canDownload={false} />
        </div>
      </div>
    </div>
  );
}
