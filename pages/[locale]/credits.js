import Image from 'next/image';

export default function Credits(props) {
  function i18n(key) {
    if (props.i18n && props.i18n['credits'] && !props.i18n['credits'][key]) {
      console.log('Credits Missing Translation: ' + key);
    }
    return props.i18n && props.i18n['credits'] && props.i18n['credits'][key]
      ? props.i18n['credits'][key]
      : key;
  }
  return (
    <div
      id="credits"
      className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3"
    >
      <h2 className="text-3xl font-extrabold text-orange-600 dark:text-orange-100">
        {i18n('Special Thanks')}
      </h2>
      <div className="flex flex-wrap gap-3">
        {/* <a
          href="https://vercel.com/?utm_source=1998code&utm_campaign=oss"
          target="_blank"
        >
          <Image
            className="h-10 rounded-xl border border-black dark:border-white"
            src="https://cdn.1998.media/logos/Vercel.svg"
            alt="Vercel"
            width={200}
            height={40}
          />
        </a> */}
        <a href="https://betteruptime.com/?ref=i41" target="_blank">
          <Image
            className="h-10 rounded-xl p-2 border border-black dark:border-white dark:bg-white"
            src="https://cdn.1998.media/logos/BetterUptime.png"
            alt="BetterUptime"
            width={40}
            height={40}
          />
        </a>
        <a href="https://docsearch.algolia.com/?ref=1998.media" target="_blank">
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
        <a
          href="https://www.digitalocean.com/?refcode=ce873177d9ab&utm_medium=opensource"
          target="_blank"
        >
          <Image
            className="h-10 rounded-xl bg-white p-2 border border-black"
            src="https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/SVG/DO_Logo_icon_blue.svg"
            alt="DigitalOcean"
            width={40}
            height={40}
          />
        </a>
      </div>
    </div>
  );
}
