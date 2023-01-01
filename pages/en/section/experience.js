export default function Experience() {
  const positions = [
    {
      title: 'Senior Software Engineer',
      type: 'Full-time',
      location: '🇭🇰 HONG KONG',
      description: 'UI Design, Web, iOS Development, A.I. Research',
      date: '2023-NOW',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'QuestDB Translator',
      type: 'Volunteer',
      location: '🌐 Remote, United Kingdom',
      description: 'Contribute open source database project.',
      date: '2022',
      textColor: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Unsplash Artists',
      type: 'Freelance',
      location: '🌐 Remote',
      description: '3D Design + Photography',
      date: '2022-NOW',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Software Engineer',
      type: 'Full-time',
      location: '🇭🇰 HONG KONG',
      description: 'Web + iOS Development',
      date: '2021-2023',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Articles Writer',
      type: 'Freelance',
      location: '🌐 Remote',
      description: 'Powerful tutorial + Writing',
      date: '2020-NOW',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Apple Developer',
      type: 'Freelance',
      location: '🌐 Remote',
      description: 'Build and publish app for iOS, iPadOS, watchOS, and macOS platforms',
      date: '2020-NOW',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Student Assistant',
      type: 'Part-time',
      location: '🇭🇰 HONG KONG',
      description: 'Data analytics and visualisation.',
      date: '2020-2021',
      textColor: 'text-pink-600',
      bgColor: 'bg-pink-100'
    },
    {
      title: 'Student Developer',
      type: 'Part-time',
      location: '🇭🇰 HONG KONG',
      description: 'Participate in Artificial Intelligence (A.I.) and Natural Language Processing (N.L.P) research field.',
      date: '2020-2021',
      textColor: 'text-pink-600',
      bgColor: 'bg-pink-100'
    },
    {
      title: 'Student Assistant',
      type: 'Part-time',
      location: '🇭🇰 HONG KONG',
      description: 'Develop website & design booklet for University\'s Language Scolar Program.',
      date: '2020-2021',
      textColor: 'text-pink-600',
      bgColor: 'bg-pink-100'
    },
    {
      title: 'Atlassian Translator',
      type: 'Volunteer',
      location: '🌐 Remote, Australia',
      description: 'BitBucket.org Team',
      date: '2020-2021',
      textColor: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'StopCovid19Tokyo Translator',
      type: 'Volunteer',
      location: '🌐 Remote, Japan',
      description: 'Contribute open source project with Tokyo Metropolitan Government and Code of Japan Team.',
      date: '2020-2021',
      textColor: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Designer',
      type: 'Freelance',
      location: '🌐 Remote',
      description: 'Start Freelance works on different platforms (Adobe Stock, Behance, Dribbble)',
      date: '2019-NOW',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
  ]
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <div id="experience" data-aos="zoom-in" data-aos-once className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-left flex flex-wrap">
          <a className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl grow" href="#experience">
            Experience
            <i className="fa-regular fa-flask ml-2"></i>
          </a>
          <p className="mt-2 max-w-2xl text-xl text-gray-500">
            Works and society contributions.
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