export default function Credits(props) {
  function i18n(key) {
    console.log(props.i18n && props.i18n['credits']&& props.i18n['credits'][key] ? '' : 'Credits Missing i18n: ' + key)
    return props.i18n && props.i18n['credits'] && props.i18n['credits'][key] ? props.i18n['credits'][key] : key
  }
  return (
    <div id="credits" data-aos="zoom-in" data-aos-once className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-3xl font-extrabold text-orange-600 dark:text-orange-100">
        {i18n("Special Thanks")}
      </h2>
      <div className="flex flex-wrap gap-3">
        <a href="https://vercel.com/?utm_source=1998code&utm_campaign=oss">
          <img className="h-10 rounded-lg border border-white" src="/logos/Vercel.svg" alt="Vercel" />
        </a>
        <a href="https://betteruptime.com/?ref=i41">
          <img className="w-10 h-10 p-2 bg-white rounded-lg transition-all border border-black" src="/logos/BetterUptime.png" alt="BetterUptime" />
        </a>
        <img className="h-10 rounded-lg bg-white p-2 dark:hidden border border-black" src="https://docsearch.algolia.com/img/docsearch-logo.svg" alt="Algolia Docsearch" /> 
        <img className="h-10 rounded-lg hidden p-2 dark:bg-black dark:block border border-white" src="https://docsearch.algolia.com/img/docsearch-logo-white.svg" alt="Algolia Docsearch" /> 
        <img className="h-10 rounded-lg border border-black" src="/logos/GoogleResearch.png" alt="Google Research" />
        <img className="h-10 rounded-lg bg-white p-2 border border-black" src="https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/SVG/DO_Logo_icon_blue.svg" alt="DigitalOcean" />
        <img className="h-10 rounded-lg border border-white" src="/logos/STACKPATH.png" alt="STACKPATH" />
        <img className="h-10 rounded-lg" src="/logos/fastly.png" alt="fastly" />
      </div>
    </div>
  )
}