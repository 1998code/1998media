export default function Experience() {
  const positions = [
    {
      title: 'QuestDB 譯者',
      type: '志願',
      location: '🌐 遠程, 英國',
      description: 'Contribute open source database project.',
      date: '2022',
      textColor: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Unsplash 藝術家',
      type: '自由職業',
      location: '🌐 遠程',
      description: '3D 設計 + 攝影',
      date: '2022-現在',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: '軟件工程師',
      type: '全職',
      location: '🇭🇰 香港',
      description: '網站UI設計+iOS開發',
      date: '2021-現在',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: '文章作者',
      type: '自由職業',
      location: '🌐 遠程',
      description: '強大的教程+寫作',
      date: '2020-現在',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Apple 開發者',
      type: '自由職業',
      location: '🌐 遠程',
      description: '為 iOS、iPadOS、watchOS 和 macOS 平台構建和發布應用',
      date: '2020-現在',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: '學生助理',
      type: '兼職',
      location: '🇭🇰 香港',
      description: '數據分析和可視化。',
      date: '2020-2021',
      textColor: 'text-pink-600',
      bgColor: 'bg-pink-100'
    },
    {
      title: '學生開發者',
      type: '兼職',
      location: '🇭🇰 香港',
      description: '參與人工智能 (A.I.) 和自然語言處理 (N.L.P) 研究領域。',
      date: '2020-2021',
      textColor: 'text-pink-600',
      bgColor: 'bg-pink-100'
    },
    {
      title: '學生助理',
      type: '兼職',
      location: '🇭🇰 香港',
      description: '為大學的語言學術項目開發網站和設計手冊。',
      date: '2020-2021',
      textColor: 'text-pink-600',
      bgColor: 'bg-pink-100'
    },
    {
      title: 'Atlassian 譯者',
      type: '志願',
      location: '🌐 遠程, 澳大利亞',
      description: 'BitBucket.org 團隊',
      date: '2020-2021',
      textColor: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'StopCovid19Tokyo 譯者',
      type: '志願',
      location: '🌐 遠程, 日本',
      description: '與東京都政府和 Code of Japan 團隊一起貢獻開源項目。',
      date: '2020-2021',
      textColor: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: '設計師',
      type: '自由職業',
      location: '🌐 遠程',
      description: '開始 自由職業 在不同平台上工作（Adobe Stock、Behance、Dribbble）',
      date: '2019-現在',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
  ]
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <div id="experience" className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-left flex flex-wrap">
          <a className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl grow" href="#experience">經驗 <i class="fa-regular fa-flask"></i></a>
          <p className="mt-2 max-w-2xl text-xl text-gray-500">
            工作和社會貢獻。
          </p>
        </div>
        <div className="bg-white dark:bg-black shadow overflow-hidden sm:rounded-md mt-8">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-800">
            {positions.map((position) => (
              <li key={position.id}>
                <a href="#" className="block hover:bg-gray-50 dark:hover:bg-gray-900">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className={classNames(position.textColor, 'text-sm font-medium truncate')}>{position.title}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${position.textColor} ${position.bgColor}`}>
                          {position.type}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {position.description}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p className="mr-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          {position.location}
                        </p>
                        <p>
                          <time dateTime={position.date}>{position.date}</time>
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}