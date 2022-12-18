export default function Credits() {
  return (
    <div id="credits" data-aos="zoom-in" data-aos-once className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 flex flex-wrap justify-between gap-3">
      <h2 className="text-3xl font-extrabold text-orange-600 dark:text-orange-100">
        特別感謝
      </h2>
      <div className="flex flex-wrap gap-3">
        <a href="https://vercel.com/?utm_source=1998code&utm_campaign=oss">
          <img className="h-12 rounded-lg" src="/logos/Vercel.svg" alt="vercal" />
        </a>
        <a href="https://betteruptime.com/?ref=i41">
          <img className="w-12 h-12 p-2 bg-white dark:bg-black rounded-lg" src="/logos/BetterUptime.png" alt="betteruptime" />
        </a>
        <img className="h-12 rounded-lg" src="data:image/png;base64,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" alt="StackPath" />
        <img className="h-12 rounded-lg" src="data:image/png;base64,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" alt="fastly" />
      </div>
    </div>
  )
}