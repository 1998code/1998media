import { Tooltip } from '@nextui-org/tooltip';

export default function Footer(props) {
  function i18n(key) {
    if (props.i18n && props.i18n['footer'] && !props.i18n['footer'][key]) {
      console.log('Footer Missing Translation: ' + key);
    }
    return props.i18n && props.i18n['footer'] && props.i18n['footer'][key]
      ? props.i18n['footer'][key]
      : key;
  }

  const navigation = {
    main: [
      { name: 'About', href: '#about' },
      { name: 'Blog', href: 'https://blog.1998.media' },
      { name: 'Store', href: 'https://shop.1998.media' },
      { name: 'Status', href: 'https://status.1998.media' },
    ],
    social: [
      {
        name: 'X (Twitter)',
        href: 'https://twitter.com/1998design',
        icon: (props) => <i className="fab fa-x fa-xl" />,
      },
      {
        name: 'GitHub',
        href: 'https://github.com/1998code',
        icon: (props) => <i className="fab fa-github fa-xl" />,
      },
      {
        name: 'Dribbble',
        href: 'https://dribbble.com/1998design',
        icon: (props) => <i className="fab fa-dribbble fa-xl" />,
      },
      {
        name: 'Behance',
        href: 'https://www.behance.net/1998design',
        icon: (props) => <i className="fab fa-behance fa-xl" />,
      },
      {
        name: 'Instagram',
        href: 'https://instagram.com/1998trip',
        icon: (props) => <i className="fab fa-instagram fa-xl" />,
      },
      {
        name: 'YouTube',
        href: 'https://www.youtube.com/@MingsExplorer',
        icon: (props) => <i className="fab fa-youtube fa-xl" />,
      },
      {
        name: 'Tiktok',
        href: 'https://www.tiktok.com/@ming.explorer',
        icon: (props) => <i className="fab fa-tiktok fa-xl" />,
      },
    ],
  };

  // Data is now fetched server-side via SSR
  const ipData = props.ipData || {
    ip: null,
    geo: 'Unknown',
    latitude: 'Unknown',
    longitude: 'Unknown',
  };
  const ip = ipData.ip;
  const geo = ipData.geo;
  const latitude = ipData.latitude;
  const longitude = ipData.longitude;

  // Since
  const today = new Date();
  const start = new Date('2020-05-18');
  const diff = today.getTime() - start.getTime();
  const diffDay = Math.floor(diff / (24 * 3600 * 1000));
  const diffYearNDay = `${Math.floor(diffDay / 365)} ${i18n('Years')} ${i18n('and')} ${Math.floor(diffDay % 365)} ${i18n('Days')}`;

  return (
    <div className="right-0 max-w-7xl mx-auto pt-12 pb-20 px-4 overflow-hidden sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-end justify-between gap-3">
        <div>
          <span className="text-gray-600 dark:text-gray-400">
            {i18n('Made with')} <i className="fa fa-heart" /> {i18n('by MING')}{' '}
            | {i18n('Open Source')}
            {i18n('.')}
          </span>
          <br />
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            {diffYearNDay} | {i18n('Since')} 2020{i18n('.')}
          </span>
        </div>
        {ip && (
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {i18n('You come from')}:{' '}
            <a href={`https://whatismyipaddress.com/ip/${ip}`} target="_blank">
              {ip}
            </a>{' '}
            | {i18n(geo)} (
            <a
              href={`https://www.google.com/maps/@${latitude},${longitude},11z`}
              target="_blank"
            >
              {i18n(latitude)}
              {i18n(',')}
              {i18n(longitude)}
            </a>
            )
          </span>
        )}
        <div className="flex justify-center gap-3">
          {navigation.social.map((item) => (
            <Tooltip
              key={item.name}
              content={item.name}
              placement="top"
              className="p-1 mb-1 border text-xs dark:text-white bg-white dark:bg-black rounded-xl"
            >
              <a
                href={item.href}
                target="_blank"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">{i18n(item.name)}</span>
                <item.icon aria-hidden="true" />
              </a>
            </Tooltip>
          ))}
        </div>
      </div>

      <hr className="mt-3" />

      <div className="mt-1 text-xs text-gray-600 dark:text-gray-400 pt-3 gap-3 flex flex-wrap justify-between">
        <div className="flex items-center gap-3">
          {i18n('Compatible with')}:
          <Tooltip
            content="Safari 12+"
            placement="bottom"
            className="p-1 border text-xs dark:text-white bg-white dark:bg-black rounded-xl"
          >
            <i className="fab fa-safari"></i>
          </Tooltip>
          <Tooltip
            content="Chrome 64+"
            placement="top"
            className="p-1 border text-xs dark:text-white bg-white dark:bg-black rounded-xl"
          >
            <i className="fab fa-chrome"></i>
          </Tooltip>
          <Tooltip
            content="Firefox 67+"
            placement="bottom"
            className="p-1 border text-xs dark:text-white bg-white dark:bg-black rounded-xl"
          >
            <i className="fab fa-firefox-browser" />
          </Tooltip>
          <Tooltip
            content="Microsoft Edge 79+"
            placement="top"
            className="p-1 border text-xs dark:text-white bg-white dark:bg-black rounded-xl"
          >
            <i className="fab fa-edge"></i>
          </Tooltip>
          <Tooltip
            content="Opera 51+"
            placement="bottom"
            className="p-1 border text-xs dark:text-white bg-white dark:bg-black rounded-xl"
          >
            <i className="fab fa-opera"></i>
          </Tooltip>
        </div>
        <div className="flex items-center gap-3">
          {navigation.main.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target={item.href.includes('http') ? '_blank' : '_self'}
              alt={i18n(item.name)}
              className="text-gray-500 hover:text-gray-600"
            >
              {i18n(item.name)}
              {item.href.includes('http') ? (
                <i className="ml-1 fa fa-external-link fa-sm"></i>
              ) : (
                <i className="ml-1 far fa-circle-arrow-up fa-sm"></i>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
