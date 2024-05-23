import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@githubocto/flat-ui';

export default function Projects(props) {
  function i18n(key) {
    if (props.i18n && props.i18n['projects'] && !props.i18n['projects'][key]) {
      console.log('Projects Missing Translation: ' + key);
    }
    return props.i18n && props.i18n['projects'] && props.i18n['projects'][key]
      ? props.i18n['projects'][key]
      : key;
  }
  const [githubs, setGithubs] = useState([]);
  const [githubRaw, setGithubRaw] = useState([]);
  useEffect(() => {
    getGithubData();
    window.addEventListener('resize', () => {
      getGithubData();
    });
  }, []);
  function getGithubData() {
    axios
      .get('https://api.github.com/users/1998code/repos?sort=created_at')
      .then((res) => {
        if (
          res.data.documentation_url !=
          'https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting'
        ) {
          let filteredData = res.data.filter((repo) => !repo.fork);
          setGithubRaw(filteredData);
          if (window.innerWidth <= 1024) {
            setGithubs(filteredData.slice(0, 8));
          } else {
            setGithubs(filteredData.slice(0, 16));
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div
      id="projects"
      data-aos="zoom-in"
      data-aos-once
      className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="relative max-w-7xl mx-auto space-y-8">
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
            className="w-full col-span-2 hover:scale-95 transition duration-300 rounded-lg"
            src="https://gitstats.1998.media/api?username=1998code&show_icons=true&bg_color=30,e96443,904e95&title_color=fff&text_color=fff&icon_color=fff&hide_border=true"
            alt="Performance"
          />
          <img
            className="w-full col-span-3 md:col-span-1 dark:hidden hover:scale-95 transition duration-300 rounded-lg"
            src="https://gitstats.1998.media/api/top-langs/?username=1998code&langs_count=4&layout=default&hide_border=true"
            alt="Top Languages"
          />
          <img
            className="w-full col-span-3 md:col-span-1 hidden dark:block hover:scale-95 transition duration-300 rounded-lg backlight"
            src="https://gitstats.1998.media/api/top-langs/?username=1998code&langs_count=4&layout=default&bg_color=000&title_color=fff&text_color=fff&hide_border=true"
            alt="Top Languages"
          />
          <img
            className="col-span-3 md:col-span-1"
            src="https://lapras-card-generator-auto.vercel.app/api/svg?b1=%23020E27&b2=%230E5593&i1=%23030E21&i2=%231688BF&l=en&u=MING"
          />
        </div>
        <img
          id="projectChart"
          className="w-full p-3 hover:scale-95 transition duration-300 rounded-lg backlight"
          src="https://ghchart.rshah.org/1998code"
          alt="Github chart"
        />
        <div className="mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:max-w-none">
          {githubs.map(
            (repo) =>
              !repo.fork && (
                <a
                  href={repo.html_url}
                  target="_blank"
                  key={repo.name}
                  className="flex flex-col rounded-lg overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-95 border border-transparent hover:border-black dark:hover:border-white backlight"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="w-full object-cover"
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
              )
          )}
        </div>
        <div
          id="projectFlattenDataTable"
          className="rounded-lg overflow-hidden dark:hidden"
        >
          <Grid data={githubRaw} canDownload={false} />
        </div>
      </div>
    </div>
  );
}
