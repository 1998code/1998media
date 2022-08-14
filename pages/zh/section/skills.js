export default function Skills() {
  const softwares = [
    { name: 'Adobe Creative Cloud', initials: 'CC', href: '#', bgColor: 'bg-red-600' },
    { name: 'Figma', initials: 'Fi', href: '#', bgColor: 'bg-black' },
    { name: 'Framer', initials: 'Fr', href: '#', bgColor: 'bg-sky-500' },
    { name: 'Sketch', initials: 'Sk', href: '#', bgColor: 'bg-orange-400' },

    { name: 'Apple Xcode', initials: 'AX', href: '#', bgColor: 'bg-sky-500' },
    { name: 'Apple iWork', initials: 'Ai', href: '#', bgColor: 'bg-green-500' },
    { name: 'Microsoft Office', initials: 'MO', href: '#', bgColor: 'bg-teal-500' },
    { name: 'Google Worksuite', initials: 'GW', href: '#', bgColor: 'bg-blue-500' },

    { name: 'Apple Final Cut Pro', initials: 'FCP', href: '#', bgColor: 'bg-yellow-500' },
    { name: 'Unity', initials: 'Un', href: '#', bgColor: 'bg-blue-500' },
    { name: 'Cinema 4D', initials: 'C4D', href: '#', bgColor: 'bg-purple-500' },
    { name: 'Shapr3D', initials: 'S3D', href: '#', bgColor: 'bg-orange-500' },

    { name: 'Microsoft PowerBI', initials: 'PBI', href: '#', bgColor: 'bg-purple-500' },
    { name: 'Microsoft SQL Server', initials: 'MSS', href: '#', bgColor: 'bg-yellow-500' },
    { name: 'MySQLWorkbench', initials: 'MSW', href: '#', bgColor: 'bg-green-500' },
    { name: 'Table Plus', initials: 'TP', href: '#', bgColor: 'bg-purple-500' },
  ]
  const languages = [
    { name: 'SwiftUI', initials: 'Swift', href: '#', bgColor: 'bg-orange-600' },
    { name: 'CoreData', initials: 'Swift', href: '#', bgColor: 'bg-orange-600' },
    { name: 'CloudKit', initials: 'Swift', href: '#', bgColor: 'bg-orange-600' },

    { name: 'VuetifyJS', initials: 'VUE', href: '#', bgColor: 'bg-teal-600' },
    { name: 'NuxtJS', initials: 'VUE', href: '#', bgColor: 'bg-teal-600' },

    { name: 'NextJS', initials: 'REACT', href: '#', bgColor: 'bg-sky-600' },

    { name: 'TailwindCSS', initials: 'CSS', href: '#', bgColor: 'bg-indigo-600' },
    { name: 'Bootstrap 5', initials: 'CSS', href: '#', bgColor: 'bg-indigo-600' },
  ]
  const speakWrites = [
    { name: 'Cantonese (Chinese Traditional)', initials: '熟練', href: '#', bgColor: 'bg-green-600' },
    { name: 'English', initials: '熟練', href: '#', bgColor: 'bg-green-600' },

    { name: 'Mandarin (Chinese Simplified)', initials: '流利', href: '#', bgColor: 'bg-blue-600' },
    { name: 'Korean  (Passed the Test of Proficiency in Korean in 2018)', initials: '流利', href: '#', bgColor: 'bg-blue-600' },

    { name: 'Japanese', initials: '基本', href: '#', bgColor: 'bg-orange-600' },
  ]
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <div id="skills" className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-left flex">
          <a className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl" href="#skills">技能和語言 <i class="fa-regular fa-language"></i></a>
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
                  {software.initials}
                </div>
                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                  <div className="flex-1 px-4 py-2 text-sm truncate">
                    <a href={software.href} className="text-gray-900 font-medium hover:text-gray-600">
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
                  {language.initials}
                </div>
                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                  <div className="flex-1 px-4 py-2 text-sm truncate">
                    <a href={language.href} className="text-gray-900 font-medium hover:text-gray-600">
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
                  {speakWrite.initials}
                </div>
                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                  <div className="flex-1 px-4 py-2 text-sm truncate">
                    <a href={speakWrite.href} className="text-gray-900 font-medium hover:text-gray-600">
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