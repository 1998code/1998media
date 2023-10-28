export default function Achievements(props) {
  function i18n(key) {
    if (props.i18n && props.i18n['achievements'] && !props.i18n['achievements'][key]) {
      console.log('Achievements Missing i18n: ' + key)
    }
    return props.i18n && props.i18n['achievements'] && props.i18n['achievements'][key] ? props.i18n['achievements'][key] : key
  }
  const stats = [
    { name: 'Total Views', stat: 'Over 500,000', year: 'til Now' },
    { name: 'Total Releases', stat: '5', year: 'til Now' },
    { name: 'Average Views', stat: 'Over 100,000', year: 'til Now' },
  ]
  return (
    <div id="achievements" data-aos="zoom-in" data-aos-once className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <img src="https://cdn.1998.media/bgs/App.png" className="fixed -z-[1] w-[25vw] top-14 -right-16 " />
      <div className="max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto text-left">
          <a className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl" href="#achievements">
            {i18n("Trusted by customers from over 175 countries and regions")}
            <i className="far fa-earth-americas ml-2"></i>
          </a>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            {i18n("People love my apps, and I'd believe you will, too.")} <i className="far fa-hand-holding-heart"></i>
          </p>
        </div>
      </div>
      <div className="mt-10 pb-12 sm:pb-16">
        <div className="relative">
          <div className="relative max-w-7xl mx-auto">
            <div className="max-w-7xl mx-auto">
              <dl className="rounded-lg overflow-hidden bg-white/50 dark:bg-black/50 backdrop-blur-md shadow-lg sm:grid sm:grid-cols-2 md:grid-cols-3 divide-y divide-gray-200 dark:divide-gray-800 sm:divide-y-0 backlight">
                <div className="flex flex-col p-6 text-center hover:scale-105 transition-all">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2023</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{i18n("Developer Tools in the United Kingdom")} 🇬🇧</dt>
                  <dd className="order-1 text-5xl font-extrabold text-cyan-600">{i18n("#1")}</dd>
                </div>
                <div className="flex flex-col p-6 text-center hover:scale-105 transition-all">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2023</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{i18n("Developer Tools in the United States")} 🇺🇸</dt>
                  <dd className="order-1 text-5xl font-extrabold text-cyan-600">{i18n("#1")}</dd>
                </div>
                <div className="flex flex-col p-6 text-center hover:scale-105 transition-all">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2023</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{i18n("Developer Tools in Canada")} 🇨🇦</dt>
                  <dd className="order-1 text-5xl font-extrabold text-blue-600">{i18n("#1")}</dd>
                </div>
                <div className="flex flex-col p-6 text-center hover:scale-105 transition-all">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2022</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{i18n("Graphics & Design App in Uzbekistan")} 🇺🇿</dt>
                  <dd className="order-1 text-5xl font-extrabold text-sky-600">{i18n("#1")}</dd>
                </div>
                <div className="flex flex-col p-6 text-center hover:scale-105 transition-all">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2022</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{i18n("Developer Tools in Kuwait")} 🇰🇼</dt>
                  <dd className="order-1 text-5xl font-extrabold text-pink-600">{i18n("#1")}</dd>
                </div>
                <div className="flex flex-col p-6 text-center hover:scale-105 transition-all">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2022</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{i18n("Developer Tools in Taiwan")} 🇹🇼</dt>
                  <dd className="order-1 text-5xl font-extrabold text-green-600">{i18n("#1")}</dd>
                </div>
                <div className="flex flex-col p-6 text-center hover:scale-105 transition-all">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2022</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{i18n("Developer Tools in Canada")} 🇨🇦</dt>
                  <dd className="order-1 text-5xl font-extrabold text-blue-600">{i18n("#1")}</dd>
                </div>
                <div className="flex flex-col p-6 text-center hover:scale-105 transition-all">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2021</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{i18n("Developer Tools in the United States")} 🇺🇸</dt>
                  <dd className="order-1 text-5xl font-extrabold text-cyan-600">{i18n("#1")}</dd>
                </div>
                <div className="flex flex-col p-6 text-center hover:scale-105 transition-all">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2021</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{i18n("Apple Worldwide Developers Conference (WWDC)")} </dt>
                  <dd className="order-1 text-5xl font-extrabold text-orange-600 dark:text-orange-300">{i18n("Winner")}</dd>
                </div>
                <div className="flex flex-col p-6 text-center hover:scale-105 transition-all">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">{i18n("Since")} 2020</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{i18n("Paid Apps in Different Categories Globally")} </dt>
                  <dd className="order-1 text-5xl font-extrabold text-teal-600">{i18n("Top-100")}</dd>
                </div>
              </dl>
            </div>
            <img src="https://cdn.1998.media/bgs/Camera.png" className="fixed -z-[1] w-[25vw] top-25 -right-16" />
            <div className="pt-6">
              <h3 className="mt-6 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                <i className="far fa-cube mr-2"></i>
                {i18n("Unsplash 3D & Photography")}
              </h3>
              <dl className="mt-5 bg-white/50 dark:bg-black/50 backdrop-blur-md grid grid-cols-1 overflow-hidden rounded-lg shadow md:grid-cols-3 divide-y divide-gray-200 dark:divide-gray-800 md:divide-y-0 md:divide-x backlight">
                {stats.map((item) => (
                  <div key={item.name} className="px-4 py-5 sm:p-6">
                    <dt className="text-base font-normal text-gray-900 dark:text-gray-100">{i18n(item.name)}</dt>
                    <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                      <div className="flex items-baseline text-2xl font-semibold text-emerald-600">
                        {i18n(item.stat)}
                        <span className="ml-2 text-sm font-medium text-gray-500">{i18n(item.year)}</span>
                      </div>

                      <div className="bg-green-800 text-green-100 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0">
                        <i className="flex-shrink-0 self-center fa fa-caret-up" />
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}