export default function Achievements() {
  return (
    <div id="achievements" data-aos="zoom-in" data-aos-once className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto text-left">
          <a className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl" href="#achievements">
            深受超過 175 個國家和地區客戶的信賴
            <i className="fa-regular fa-earth-americas ml-2"></i>
          </a>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            人們喜歡我的應用程式，我相信你也會喜歡的。<i className="fa-regular fa-hand-holding-heart"></i>
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
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">App Store 付費圖形與設計軟件</dt>
                  <dd className="order-1 text-3xl font-extrabold text-sky-600">烏茲別克 第一</dd>
                </div>
                <div className="flex flex-col p-6 text-center">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2022</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">App Store 付費開發者工具</dt>
                  <dd className="order-1 text-3xl font-extrabold text-pink-600">科威特 第一</dd>
                </div>
                <div className="flex flex-col p-6 text-center !border-t-0">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2022</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">App Store 付費開發者工具</dt>
                  <dd className="order-1 text-3xl font-extrabold text-green-600">台灣 第一</dd>
                </div>
                <div className="flex flex-col p-6 text-center !border-t-0">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2022</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">App Store 付費開發者工具</dt>
                  <dd className="order-1 text-3xl font-extrabold text-blue-600">加拿大 第一</dd>
                </div>
                <div className="flex flex-col p-6 text-center !border-l-0">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2021</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">App Store 付費開發者工具</dt>
                  <dd className="order-1 text-3xl font-extrabold text-cyan-600">美國 第一</dd>
                </div>
                <div className="flex flex-col p-6 text-center">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2021</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Apple WWDC 全球開發者大會</dt>
                  <dd className="order-1 text-3xl font-extrabold text-orange-600 dark:text-orange-300">獲獎</dd>
                </div>
                <div className="flex flex-col p-6 text-center">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">Since 2020</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">全球不同類別的付費應用排行</dt>
                  <dd className="order-1 text-3xl font-extrabold text-teal-600">前一百</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}