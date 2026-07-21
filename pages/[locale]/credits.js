import { useRef } from 'react';
import Image from 'next/image';
import { Tooltip } from '@nextui-org/tooltip';

export default function Credits(props) {
  const loggedMissingKeys = useRef(new Set());

  function i18n(key) {
    if (props.i18n && props.i18n['credits'] && !props.i18n['credits'][key]) {
      if (!loggedMissingKeys.current.has(key)) {
        console.log('Credits Missing Translation: ' + key);
        loggedMissingKeys.current.add(key);
      }
    }
    return props.i18n && props.i18n['credits'] && props.i18n['credits'][key]
      ? props.i18n['credits'][key]
      : key;
  }
  return (
    <div
      id="credits"
      className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3"
    >
      <h2 className="text-3xl font-extrabold text-orange-600 dark:text-orange-100">
        {i18n('Special Thanks')}
      </h2>
      <div className="flex flex-wrap gap-3">
        <Tooltip
          content="Better Uptime"
          placement="bottom"
          className="p-1 border text-xs dark:text-white bg-white dark:bg-black rounded-xl"
        >
          <a href="https://betteruptime.com/?ref=i41" target="_blank">
            <Image
              className="h-10 rounded-xl bg-white p-2 dark:hidden border border-black"
              src="https://cdn.1998.media/logos/BetterUptime.png"
              alt="BetterUptime"
              width={40}
              height={40}
            />
            <Image
              className="h-10 rounded-xl hidden p-2 dark:bg-black dark:block border border-white"
              src="/assets/logos/betteruptime-white.png"
              alt="BetterUptime"
              width={40}
              height={40}
            />
          </a>
        </Tooltip>
        <Tooltip
          content="Algolia DocSearch"
          placement="bottom"
          className="p-1 border text-xs dark:text-white bg-white dark:bg-black rounded-xl"
        >
          <a
            href="https://docsearch.algolia.com/?ref=1998.media"
            target="_blank"
          >
            <Image
              className="h-10 rounded-xl bg-white p-2 dark:hidden border border-black"
              src="https://docsearch.algolia.com/img/docsearch-logo.svg"
              alt="Algolia"
              width={150}
              height={40}
            />
            <Image
              className="h-10 rounded-xl hidden p-2 dark:bg-black dark:block border border-white"
              src="https://docsearch.algolia.com/img/docsearch-logo-white.svg"
              alt="Docsearch"
              width={150}
              height={40}
            />
          </a>
        </Tooltip>
        <Tooltip
          content="DigitalOcean"
          placement="bottom"
          className="p-1 border text-xs dark:text-white bg-white dark:bg-black rounded-xl"
        >
          <a
            href="https://www.digitalocean.com/?refcode=ce873177d9ab&utm_medium=opensource"
            target="_blank"
          >
            <Image
              className="h-10 rounded-xl bg-white p-2 dark:hidden border border-black"
              src="https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/SVG/DO_Logo_icon_blue.svg"
              alt="DigitalOcean"
              width={40}
              height={40}
            />
            <Image
              className="h-10 rounded-xl hidden p-2 dark:bg-black dark:block border border-white"
              src="https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/SVG/DO_Logo_icon_white.svg"
              alt="DigitalOcean"
              width={40}
              height={40}
            />
          </a>
        </Tooltip>
        <Tooltip
          content="Anthropic"
          placement="bottom"
          className="p-1 border text-xs dark:text-white bg-white dark:bg-black rounded-xl"
        >
          <a href="https://www.anthropic.com/?ref=1998.media" target="_blank">
            <span className="md:hidden">
              <Image
                className="h-10 rounded-xl bg-white p-2 dark:hidden border border-black"
                src="/assets/logos/anthropic.svg"
                alt="Anthropic"
                width={40}
                height={40}
              />
              <Image
                className="h-10 rounded-xl hidden p-2 dark:bg-black dark:block border border-white"
                src="/assets/logos/anthropic-white.svg"
                alt="Anthropic"
                width={40}
                height={40}
              />
            </span>
            <span className="hidden md:block">
              <Image
                className="h-10 rounded-xl bg-white p-2 dark:hidden border border-black"
                src="/assets/logos/anthropic-wordmark.svg"
                alt="Anthropic"
                width={230}
                height={40}
              />
              <Image
                className="h-10 rounded-xl hidden p-2 dark:bg-black dark:block border border-white"
                src="/assets/logos/anthropic-wordmark-white.svg"
                alt="Anthropic"
                width={230}
                height={40}
              />
            </span>
          </a>
        </Tooltip>
      </div>
    </div>
  );
}
