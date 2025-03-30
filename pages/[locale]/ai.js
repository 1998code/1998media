import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AI(props) {
  function i18n(key) {
    if (props.i18n && props.i18n['ai'] && !props.i18n['ai'][key]) {
      console.log('AI Missing Translation: ' + key);
    }
    return props.i18n && props.i18n['ai'] && props.i18n['ai'][key]
      ? props.i18n['ai'][key]
      : key;
  }

  useEffect(() => {
    getDalleData();
  }, []);

  const [dalle, setDalle] = useState([]);
  function getDalleData() {
    axios
      .get(
        `https://edge-config.vercel.com/ecfg_hmcfjwi2h70gpx7dhcynqeromm3s?token=8bc3ba74-f695-40ea-b637-a78860e530e8`
      )
      .then((res) => {
        console.log(res);
        setDalle(res.data.items['results']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      id="ai"
      data-aos="zoom-in"
      data-aos-once
      className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="text-left flex flex-wrap">
          <a
            className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl grow"
            href="#ai"
          >
            {i18n('AI')}
            <i className="far fa-user-robot ml-2"></i>
          </a>
          <p className="mt-2 max-w-2xl text-xl text-gray-500">
            {i18n('The latest prompt design and experimental results.')}
          </p>
        </div>
        {/* Featured */}
        <div className="group flex flex-nowrap overflow-x-auto max-w-full gap-6 px-3 py-6">
          {dalle.map(
            (item, index) =>
              item.featured === '🏆 Hall of Fame' && (
                <a
                  href={item.sourceURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[300px] flex flex-col gap-3 pb-3 rounded-lg overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-95 border border-transparent hover:border-black dark:hover:border-white backlight"
                >
                  <div>
                    <img
                      loading="lazy"
                      src={item.output}
                      className="w-[300px] object-cover flex-1"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black h-[300px] rounded-lg group-hover:rounded-none"></div>
                  </div>
                  <div className="-mt-11 flex justify-between px-3 z-[1]">
                    <span className="text-sm text-gray-500">
                      {i18n(item.featured)}
                    </span>
                    <p className="text-sm text-gray-500 group-hover:text-gray-400">
                      {i18n(`Open in ${item.source}`)}
                    </p>
                  </div>
                  <p className="hidden group-hover:block font-semibold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 dark:from-gray-100 to-gray-500 dark:to-gray-500 px-3 pt-3 transition-all">
                    "{i18n(item.prompt)}"{' '}
                    <span className="text-gray-500 text-xs">
                      - {item.version}
                    </span>
                  </p>
                </a>
              )
          )}
        </div>
        {/* Other */}
        <div className="group flex flex-nowrap overflow-x-auto max-w-full gap-6 px-3 py-6">
          {dalle.map(
            (item, index) =>
              item.featured !== '🏆 Hall of Fame' && (
                <a
                  href={item.sourceURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[250px] flex flex-col gap-3 pb-3 rounded-lg overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-95 border border-transparent hover:border-black dark:hover:border-white backlight"
                >
                  <div>
                    <img
                      loading="lazy"
                      src={item.output}
                      className="w-[250px] object-cover flex-1"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black h-[250px] rounded-lg group-hover:rounded-none"></div>
                  </div>
                  <div className="-mt-11 flex justify-between px-2 z-[1]">
                    <span className="text-sm text-gray-500">
                      🌠 {i18n('NEW')}
                    </span>
                    <p className="text-sm text-gray-500 group-hover:text-gray-400">
                      {i18n(`Open in ${item.source}`)}
                    </p>
                  </div>
                  <p className="hidden group-hover:block text-xs md:text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 dark:from-gray-100 to-gray-500 dark:to-gray-500 px-2 pt-2 transition-all">
                    "{i18n(item.prompt)}"{' '}
                    <span className="text-gray-500 text-xs">
                      - {item.version}
                    </span>
                  </p>
                </a>
              )
          )}
        </div>
      </div>
    </div>
  );
}
