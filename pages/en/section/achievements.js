export default function Achievements() {
  return (
    <div id="achievements" className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto text-left">
          <a className="text-3xl font-extrabold text-gray-900 sm:text-4xl" href="#achievements">
            Trusted by customers from over 175 countries and regions
          </a>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            People love my apps, and I'd believe you will, too.
          </p>
        </div>
      </div>
      <div className="mt-10 pb-12 sm:pb-16">
        <div className="relative">
          <div className="relative max-w-7xl mx-auto">
            <div className="max-w-7xl mx-auto">
              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-4">
                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2022</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Developer Tools in Canada</dt>
                  <dd className="order-1 text-5xl font-extrabold text-blue-600">#1</dd>
                </div>
                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2021</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Developer Tools in the United States</dt>
                  <dd className="order-1 text-5xl font-extrabold text-cyan-600">#1</dd>
                </div>
                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2021</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Award Winner in Apple Worldwide Developers Conference (WWDC)</dt>
                  <dd className="order-1 text-5xl font-extrabold text-cyan-600">🎖</dd>
                </div>
                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">Since 2020</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Paid Apps in different categories Globally</dt>
                  <dd className="order-1 text-5xl font-extrabold text-teal-600">Top-100</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}