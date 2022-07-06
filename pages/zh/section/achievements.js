export default function Achievements() {
  return (
    <div id="achievements" className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto text-left">
          <a className="text-3xl font-extrabold text-gray-900 sm:text-4xl" href="#achievements">
            深受超過 175 個國家和地區客戶的信賴
          </a>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            人們喜歡我的應用程序，我相信你也會喜歡的。
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
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">App Store 付費開發者工具</dt>
                  <dd className="order-1 text-5xl font-extrabold text-blue-600">加拿大 第一</dd>
                </div>
                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2021</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">App Store 付費開發者工具</dt>
                  <dd className="order-1 text-5xl font-extrabold text-cyan-600">美國 第一</dd>
                </div>
                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">2021</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Apple 全球開發者大會 (WWDC) 獲獎者</dt>
                  <dd className="order-1 text-5xl font-extrabold text-cyan-600">🎖</dd>
                </div>
                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">Since 2020</dt>
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">全球不同類別的付費應用排行</dt>
                  <dd className="order-1 text-5xl font-extrabold text-teal-600">首一百</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}