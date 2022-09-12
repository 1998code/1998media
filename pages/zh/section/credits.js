export default function Credits() {
  return (
    <div id="credits" data-aos="zoom-in" data-aos-once className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <h2 className="max-w-md mx-auto text-3xl font-extrabold text-indigo-900 dark:text-indigo-100 text-center lg:max-w-xl lg:text-left">
          特別感謝：
        </h2>
        <div className="flow-root self-center mt-8 lg:mt-0">
          <div className="-mt-4 -ml-8 flex flex-wrap justify-between lg:-ml-4">
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
              <a href="https://vercel.com/?utm_source=1998code&utm_campaign=oss">
                <img className="h-12" src="/logos/Vercel.svg" alt="vercal" />
              </a>
            </div>
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
              <a href="https://betteruptime.com/?ref=i41">
                <img className="h-12" src="/logos/BetterUptime.png" alt="betteruptime" />
              </a>
            </div>
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}