export default function Achievements() {
  const stats = [
    { name: 'Total Views', stat: 'Over 500,000', year: 'til Now' },
    { name: 'Total Releases', stat: '5', year: 'til Now' },
    { name: 'Average Views', stat: 'Over 100,000', year: 'til Now' },
  ]
  return (
    <div id="achievements" data-aos="zoom-in" data-aos-once className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto text-left">
          <a className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl" href="#achievements">
            Trusted by customers from over 175 countries and regions
            <i className="fa-regular fa-earth-americas ml-2"></i>
          </a>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            People love my apps, and I'd believe you will, too. <i className="fa-regular fa-hand-holding-heart"></i>
          </p>
        </div>
      </div>
      <div className="mt-10 pb-12 sm:pb-16">
        <div className="relative">
          <div className="relative max-w-7xl mx-auto">

            <div className="max-w-7xl mx-auto">
              <dl className="rounded-lg bg-white dark:bg-black shadow-lg sm:grid sm:grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col p-6 text-center">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2022</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Graphics & Design App in Uzbekistan</dt>
                  <dd className="order-1 text-5xl font-extrabold text-sky-600">#1</dd>
                </div>
                <div className="flex flex-col p-6 text-center">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2022</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Developer Tools in Kuwait</dt>
                  <dd className="order-1 text-5xl font-extrabold text-pink-600">#1</dd>
                </div>
                <div className="flex flex-col p-6 text-center !border-t-0">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2022</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Developer Tools in Taiwan</dt>
                  <dd className="order-1 text-5xl font-extrabold text-green-600">#1</dd>
                </div>
                <div className="flex flex-col p-6 text-center !border-t-0">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2022</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Developer Tools in Canada</dt>
                  <dd className="order-1 text-5xl font-extrabold text-blue-600">#1</dd>
                </div>
                <div className="flex flex-col p-6 text-center !border-l-0">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2021</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Developer Tools in the United States</dt>
                  <dd className="order-1 text-5xl font-extrabold text-cyan-600">#1</dd>
                </div>
                <div className="flex flex-col p-6 text-center">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2021</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Apple Worldwide Developers Conference (WWDC)</dt>
                  <dd className="order-1 text-5xl font-extrabold text-orange-600 dark:text-orange-300">Winner</dd>
                </div>
                <div className="flex flex-col p-6 text-center">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">Since 2020</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Paid Apps in Different Categories Globally</dt>
                  <dd className="order-1 text-5xl font-extrabold text-teal-600">Top-100</dd>
                </div>
              </dl>
            </div>

            <div className="pt-6">
              <h3 className="mt-6 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                <i className="far fa-cube mr-2"></i>
                Unsplash 3D & Photography
              </h3>
              <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white dark:bg-black shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
                {stats.map((item) => (
                  <div key={item.name} className="px-4 py-5 sm:p-6">
                    <dt className="text-base font-normal text-gray-900 dark:text-gray-100">{item.name}</dt>
                    <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                      <div className="flex items-baseline text-2xl font-semibold text-emerald-600">
                        {item.stat}
                        <span className="ml-2 text-sm font-medium text-gray-500">{item.year}</span>
                      </div>

                      <div
                        className="bg-green-800 text-green-100 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0"
                      >
                        <i
                          className="flex-shrink-0 self-center fa fa-caret-up"
                        />
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