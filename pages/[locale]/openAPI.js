import { useState } from 'react';

export default function openAPI(props) {
  function i18n(key) {
    if (props.i18n && props.i18n['openAPI'] && !props.i18n['openAPI'][key]) {
      console.log('openAPI Missing Translation: ' + key);
    }
    return props.i18n && props.i18n['openAPI'] && props.i18n['openAPI'][key]
      ? props.i18n['openAPI'][key]
      : key;
  }

  const [highlighted, setHighlighted] = useState('');

  const lists = [
    {
      title: 'Apple Music',
      type: 'GET',
      status: 'Available',
      code: '/api/music?path={TEXT(STRING)}',
      href: '/api/music?path=catalog/us/charts?types=songs',
      date: '24Q2',
      textColor: 'text-red-600 dark:text-red-100',
      bgColor: 'bg-red-100 dark:bg-red-900',
    },
    {
      title: 'DNS Resolver',
      type: 'GET',
      status: 'Available',
      code: '/api/dns?domain={URL(STRING)}',
      href: '/api/dns?domain=www.1998.media',
      date: '24Q1',
      textColor: 'text-sky-600 dark:text-sky-100',
      bgColor: 'bg-sky-100 dark:bg-sky-900',
    },
    // {
    //   title: 'Generative AI',
    //   type: 'GET',
    //   status: 'Available',
    //   code: '/api/ai?text={TEXT(STRING)}',
    //   href: '/api/ai?text=Hello%20World',
    //   date: '24Q2',
    //   textColor: 'text-teal-600 dark:text-teal-100',
    //   bgColor: 'bg-teal-100 dark:bg-teal-900',
    // },
    {
      title: 'IP Information',
      type: 'GET',
      status: 'Available',
      code: '/api/ip',
      href: '/api/ip',
      date: '24Q1',
      textColor: 'text-sky-600 dark:text-sky-100',
      bgColor: 'bg-sky-100 dark:bg-sky-900',
    },
    {
      title: 'Language Detection',
      type: 'GET',
      status: 'Available',
      code: '/api/nl?text={TEXT(STRING)}',
      href: '/api/nl?text=Hello%20World%21%20Thanks%20for%20using%20this%20API%2E',
      date: '24Q2',
      textColor: 'text-cyan-600 dark:text-cyan-100',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900',
    },
    {
      title: 'QQ Music',
      type: 'GET',
      status: 'Available',
      code: '/api/music?provider=qq&path={TEXT(STRING)}',
      href: '/api/music?provider=qq&path=search/quick&key=%E3%81%AF%E3%81%98%E3%81%BE%E3%82%8A%E3%81%AE%E3%81%86%E3%81%9F',
      date: '24Q2',
      textColor: 'text-green-600 dark:text-green-100',
      bgColor: 'bg-green-100 dark:bg-green-900',
    },
    {
      title: 'Request Headers',
      type: 'GET',
      status: 'Available',
      code: '/api/origin',
      href: '/api/origin',
      date: '24Q2',
      textColor: 'text-sky-600 dark:text-sky-100',
      bgColor: 'bg-sky-100 dark:bg-sky-900',
    },
    {
      title: 'Translate',
      type: 'GET',
      status: 'Available',
      code: '/api/translate?text={TEXT(STRING)}&from={LANG(CODE)}&to={LANG(CODE)}',
      href: '/api/translate?text=Hello!%20%E4%BB%8A%E6%97%A5%E5%A4%A9%E6%B0%A3%E9%BB%9E%E5%95%8A%EF%BC%9F&from=zh&to=ko',
      date: '24Q2',
      textColor: 'text-cyan-600 dark:text-cyan-100',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900',
    },
    {
      title: 'Trip',
      type: 'GET',
      status: 'Available',
      code: '/api/trip?type={TEXT(STRING)}&cid={TEXT(STRING)}&locale={LANG(CODE)}',
      href: '/api/trip?type=moment&cid=09031029418990699836&locale=zh-TW',
      date: '24Q2',
      textColor: 'text-cyan-600 dark:text-cyan-100',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900',
    },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div id="openAPI" className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-left flex flex-wrap">
          <a
            className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl grow"
            href="#openAPI"
          >
            {i18n('OpenAPI')}
            <i className="far fa-chart-network ml-2"></i>
          </a>
          <p className="mt-2 max-w-2xl text-xl text-gray-500">
            {i18n('Free to use.')}
          </p>
        </div>
        <div className="bg-white dark:bg-black shadow overflow-hidden rounded-xl mt-8 backlight">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-800"
          >
            {lists.map((item) => (
              <li
                key={item.title}
                onClick={() => setHighlighted(item.title)}
                className="cursor-pointer"
              >
                <div
                  className={`block ${item.bgColor} opacity-90 hover:opacity-100`}
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex gap-3">
                        <span
                          className={`border border-white px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${item.textColor} ${item.bgColor}`}
                        >
                          {i18n(item.type)}
                        </span>
                        <div
                          className={classNames(
                            item.textColor,
                            'font-medium truncate'
                          )}
                        >
                          {i18n(item.title)}
                        </div>
                      </div>
                      <a
                        href={item.href}
                        target="_blank"
                        className={`border border-white px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.textColor} hover:bg-white dark:hover:bg-black`}
                      >
                        {i18n('TRY')}
                      </a>
                    </div>
                    <div
                      className={`${highlighted === item.title ? 'flex' : 'hidden'} mt-2 flex-wrap justify-between gap-3 text-xs`}
                    >
                      <code
                        className={`flex-1 ${item.textColor} bg-white dark:bg-black/50 p-2 rounded-xl`}
                      >
                        {i18n(item.code)}
                      </code>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-white">
                        {i18n(item.status)} {i18n('since')}
                        <time dateTime={item.date}>{i18n(item.date)}</time>
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
  );
}
