export default function Skills() {
  const softwares = [
    { name: 'Adobe Creative Cloud', icons: 'CC', href: '#', bgColor: 'bg-red-600' },
    { name: 'Figma', icons: 'fa-figma', href: '#', bgColor: 'bg-black dark:bg-white dark:text-black' },
    { name: 'Framer', icons: 'fa-sketch', href: '#', bgColor: 'bg-sky-500' },
    { name: 'Sketch', icons: 'Sk', href: '#', bgColor: 'bg-orange-400' },

    { name: 'Apple Xcode', icons: 'fa-apple', href: '#', bgColor: 'bg-black dark:bg-white dark:text-black' },
    { name: 'Apple iWork', icons: 'fa-apple', href: '#', bgColor: 'bg-black dark:bg-white dark:text-black' },
    { name: 'Microsoft Office', icons: 'fa-microsoft', href: '#', bgColor: 'bg-teal-500' },
    { name: 'Google Worksuite', icons: 'fa-google', href: '#', bgColor: 'bg-blue-500' },

    { name: 'Apple Final Cut Pro', icons: 'fa-apple', href: '#', bgColor: 'bg-black dark:bg-white dark:text-black' },
    { name: 'Unity', icons: 'fa-unity', href: '#', bgColor: 'bg-blue-500' },
    { name: 'Cinema 4D', icons: 'C4D', href: '#', bgColor: 'bg-purple-500' },
    { name: 'Shapr3D', icons: 'S3D', href: '#', bgColor: 'bg-orange-500' },

    { name: 'Microsoft PowerBI', icons: 'fa-microsoft', href: '#', bgColor: 'bg-teal-500' },
    { name: 'Microsoft SQL Server', icons: 'fa-microsoft', href: '#', bgColor: 'bg-teal-500' },
    { name: 'MySQLWorkbench', icons: 'MSW', href: '#', bgColor: 'bg-green-500' },
    { name: 'Table Plus', icons: 'TP', href: '#', bgColor: 'bg-purple-500' },
  ]
  const languages = [
    { name: 'SwiftUI', icons: 'fa-swift', href: '#', bgColor: 'bg-orange-600' },
    { name: 'CoreData', icons: 'fa-apple', href: '#', bgColor: 'bg-orange-600' },
    { name: 'CloudKit', icons: 'fa-apple', href: '#', bgColor: 'bg-orange-600' },

    { name: 'VuetifyJS', icons: 'fa-vuejs', href: '#', bgColor: 'bg-teal-600' },
    { name: 'NuxtJS', icons: 'fa-vuejs', href: '#', bgColor: 'bg-teal-600' },

    { name: 'NextJS', icons: 'fa-react', href: '#', bgColor: 'bg-sky-600' },

    { name: 'TailwindCSS', icons: 'fa-css3', href: '#', bgColor: 'bg-indigo-600' },
    { name: 'Bootstrap 5', icons: 'fa-bootstrap', href: '#', bgColor: 'bg-indigo-600' },
  ]
  const speakWrites = [
    { name: 'Cantonese (Chinese Traditional)', icons: '熟練', href: '#', bgColor: 'bg-green-600' },
    { name: 'English', icons: '熟練', href: '#', bgColor: 'bg-green-600' },

    { name: 'Mandarin (Chinese Simplified)', icons: '流利', href: '#', bgColor: 'bg-blue-600' },
    { name: 'Korean  (Passed the Test of Proficiency in Korean in 2018)', icons: '流利', href: '#', bgColor: 'bg-blue-600' },

    { name: 'Japanese', icons: '基本', href: '#', bgColor: 'bg-orange-600' },
  ]
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <div id="skills" className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-left flex">
          <a className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl" href="#skills">
            技能和語言
            <i className="fa-regular fa-language ml-2"></i>
          </a>
        </div>
        <div className="mt-10">
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">軟體</h2>
          <ul role="list" className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {softwares.map((software) => (
              <li key={software.name} className="col-span-1 flex shadow-sm rounded-md">
                <div
                  className={classNames(
                    software.bgColor,
                    'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                  )}
                >
                  <i className={classNames('fa-brands',software.icons)}>{software.icons.includes('fa') ? '' : software.icons}</i>
                </div>
                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white dark:bg-black dark:border-black rounded-r-md truncate">
                  <div className="flex-1 px-4 py-2 text-sm truncate">
                    <a href={software.href} className="text-gray-900 dark:text-gray-100 font-medium hover:text-gray-600">
                      {software.name}
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10">
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">技術語言</h2>
          <ul role="list" className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {languages.map((language) => (
              <li key={language.name} className="col-span-1 flex shadow-sm rounded-md">
                <div
                  className={classNames(
                    language.bgColor,
                    'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                  )}
                >
                  <i className={classNames('fa-brands',language.icons)}>{language.icons.includes('fa') ? '' : language.icons}</i>
                </div>
                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white dark:bg-black dark:border-black rounded-r-md truncate">
                  <div className="flex-1 px-4 py-2 text-sm truncate">
                    <a href={language.href} className="text-gray-900 dark:text-gray-100 font-medium hover:text-gray-600">
                      {language.name}
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10">
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">說話和寫作</h2>
          <ul role="list" className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            {speakWrites.map((speakWrite) => (
              <li key={speakWrite.name} className="col-span-1 flex shadow-sm rounded-md">
                <div
                  className={classNames(
                    speakWrite.bgColor,
                    'flex-shrink-0 flex items-center justify-center w-24 text-white text-sm font-medium rounded-l-md'
                  )}
                >
                  {speakWrite.icons}
                </div>
                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white dark:bg-black dark:border-black rounded-r-md truncate">
                  <div className="flex-1 px-4 py-2 text-sm truncate">
                    <a href={speakWrite.href} className="text-gray-900 dark:text-gray-100 font-medium hover:text-gray-600">
                      {speakWrite.name}
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10 text-sm text-gray-500">*隨機排序-並不意味著熟練水準的順序</p>
      </div>
    </div>
  )
}