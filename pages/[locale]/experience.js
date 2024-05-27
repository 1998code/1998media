export default function Experience(props) {
  function i18n(key) {
    if (
      props.i18n &&
      props.i18n['experience'] &&
      !props.i18n['experience'][key]
    ) {
      console.log('Experience Missing Translation: ' + key);
    }
    return props.i18n &&
      props.i18n['experience'] &&
      props.i18n['experience'][key]
      ? props.i18n['experience'][key]
      : key;
  }
  const positions = [
    {
      title: 'Senior Software Engineer',
      type: 'Full-time',
      location: '🇭🇰 Hong Kong',
      description: 'UI Design, Web, iOS Development, A.I. Research',
      date: '2023-2025',
      textColor: 'text-blue-600 dark:text-blue-100',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      title: 'Software Engineer',
      type: 'Full-time',
      location: '🇭🇰 Hong Kong',
      description: 'Web + iOS Development',
      date: '2021-2023',
      textColor: 'text-blue-600 dark:text-blue-100',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
    },

    {
      title: 'Lapras Score Data Linkage',
      type: 'Contributor',
      location: '🌐 Remote, Japan',
      description: 'Contribute open source web project',
      date: '2024',
      textColor: 'text-green-600 dark:text-green-100',
      bgColor: 'bg-green-100 dark:bg-green-900',
    },
    {
      title: 'Google AI SDK for Swift',
      type: 'Contributor',
      location: '🌐 Remote',
      description: 'Contribute open source iOS project',
      date: '2024',
      textColor: 'text-green-600 dark:text-green-100',
      bgColor: 'bg-green-100 dark:bg-green-900',
    },
    {
      title: 'Google VertexAI for iOS',
      type: 'Contributor',
      location: '🌐 Remote',
      description: 'Contribute open source iOS project',
      date: '2024',
      textColor: 'text-green-600 dark:text-green-100',
      bgColor: 'bg-green-100 dark:bg-green-900',
    },
    {
      title: 'QuestDB Translator',
      type: 'Contributor',
      location: '🌐 Remote, United Kingdom',
      description: 'Contribute open source database project',
      date: '2022',
      textColor: 'text-green-600 dark:text-green-100',
      bgColor: 'bg-green-100 dark:bg-green-900',
    },
    {
      title: 'Atlassian Translator',
      type: 'Contributor',
      location: '🌐 Remote, Australia',
      description: 'BitBucket.org Team',
      date: '2020-2021',
      textColor: 'text-green-600 dark:text-green-100',
      bgColor: 'bg-green-100 dark:bg-green-900',
    },
    {
      title: 'StopCovid19Tokyo Translator',
      type: 'Contributor',
      location: '🌐 Remote, Japan',
      description:
        'Contribute open source project with Tokyo Metropolitan Government and Code of Japan Team',
      date: '2020-2021',
      textColor: 'text-green-600 dark:text-green-100',
      bgColor: 'bg-green-100 dark:bg-green-900',
    },

    {
      title: 'Application Development Consultant',
      type: 'Freelance',
      location: '🌐 Remote',
      description:
        'Provide professional advice on cross platform development and design',
      date: '2024-NOW',
      textColor: 'text-orange-600 dark:text-orange-100',
      bgColor: 'bg-orange-100 dark:bg-orange-900',
    },
    {
      title: 'Unsplash Artists',
      type: 'Freelance',
      location: '🌐 Remote',
      description: '3D Design + Photography',
      date: '2022-NOW',
      textColor: 'text-orange-600 dark:text-orange-100',
      bgColor: 'bg-orange-100 dark:bg-orange-900',
    },
    {
      title: 'Articles Writer',
      type: 'Freelance',
      location: '🌐 Remote',
      description:
        'Write easy to understand tutorials that help thousands of developers',
      date: '2020-NOW',
      textColor: 'text-orange-600 dark:text-orange-100',
      bgColor: 'bg-orange-100 dark:bg-orange-900',
    },
    {
      title: 'Apple Developer',
      type: 'Freelance',
      location: '🌐 Remote',
      description:
        'Build and publish app for iOS, iPadOS, watchOS, and macOS platforms',
      date: '2020-NOW',
      textColor: 'text-orange-600 dark:text-orange-100',
      bgColor: 'bg-orange-100 dark:bg-orange-900',
    },
    {
      title: 'Designer / Photographer',
      type: 'Freelance',
      location: '🌐 Remote',
      description:
        'Start Freelance works on different platforms (Adobe Stock, Behance, Dribbble)',
      date: '2019-NOW',
      textColor: 'text-orange-600 dark:text-orange-100',
      bgColor: 'bg-orange-100 dark:bg-orange-900',
    },

    {
      title: 'Student Assistant',
      type: 'Part-time',
      location: '🇭🇰 Hong Kong',
      description: 'Data analytics and visualisation',
      date: '2020-2021',
      textColor: 'text-pink-600 dark:text-pink-100',
      bgColor: 'bg-pink-100 dark:bg-pink-900',
    },
    {
      title: 'Student Developer',
      type: 'Part-time',
      location: '🇭🇰 Hong Kong',
      description:
        'Participate in Artificial Intelligence (A.I.) and Natural Language Processing (N.L.P) research field',
      date: '2020-2021',
      textColor: 'text-pink-600 dark:text-pink-100',
      bgColor: 'bg-pink-100 dark:bg-pink-900',
    },
    {
      title: 'Student Assistant',
      type: 'Part-time',
      location: '🇭🇰 Hong Kong',
      description:
        "Develop website & design booklet for University's Language Scolar Program",
      date: '2020-2021',
      textColor: 'text-pink-600 dark:text-pink-100',
      bgColor: 'bg-pink-100 dark:bg-pink-900',
    },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <div
      id="experience"
      data-aos="zoom-in"
      data-aos-once
      className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="text-left flex flex-wrap">
          <a
            className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl grow"
            href="#experience"
          >
            {i18n('Experience')}
            <i className="far fa-flask ml-2"></i>
          </a>
          <p className="mt-2 max-w-2xl text-xl text-gray-500">
            {i18n('Works and society contributions.')}
          </p>
        </div>
        <div className="bg-white dark:bg-black shadow overflow-hidden sm:rounded-md mt-8 backlight">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-800"
          >
            {positions.map((position) => (
              <li key={position.title}>
                <div
                  className={`block ${position.bgColor} opacity-90 hover:opacity-100`}
                >
                  <div className="group px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div
                        className={classNames(
                          position.textColor,
                          'font-medium truncate'
                        )}
                      >
                        {i18n(position.title)}
                      </div>
                      <div className="ml-2 flex-shrink-0 flex items-center gap-1">
                        <p
                          className={`border px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${position.textColor} ${position.bgColor}`}
                        >
                          {i18n(position.type)}
                        </p>
                        <i
                          className={`far fa-circle-info ${position.textColor} dark:text-white`}
                        />
                      </div>
                    </div>
                    <div className="!hidden mt-2 group-hover:!flex flex-wrap justify-between text-xs">
                      <div className="text-gray-600 dark:text-gray-400">
                        {i18n(position.description)}
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        {i18n(position.location)}
                        <time dateTime={position.date}>
                          {i18n(position.date)}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
