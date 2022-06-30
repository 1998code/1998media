import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("https://api.allorigins.win/raw?url=https://api.rss2json.com/v1/api.json?rss_url=https://api.allorigins.win/raw?url=https://medium.com/feed/@1998design")
      .then(res => res.json())
      .then(
        (data) => {
          setBlogs(data.items.slice(0, 9));
        },
        (error) => {
          console.log(error)
        }
      )
  }, [])

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

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
    { name: 'Cantonese (Chinese Traditional)', initials: 'Proficient', href: '#', bgColor: 'bg-green-600' },
    { name: 'English', initials: 'Proficient', href: '#', bgColor: 'bg-green-600' },

    { name: 'Mandarin (Chinese Simplified)', initials: 'Fluent', href: '#', bgColor: 'bg-blue-600' },
    { name: 'Korean  (Passed the Test of Proficiency in Korean in 2018)', initials: 'Fluent', href: '#', bgColor: 'bg-blue-600' },

    { name: 'Japanese', initials: 'Basic', href: '#', bgColor: 'bg-orange-600' },
  ]

  const positions = [
    {
      title: 'Software Engineer',
      type: 'Full-time',
      location: '🇭🇰 HONG KONG',
      description: 'Web + iOS Development',
      date: '2021-',
    },
    {
      title: 'Unsplash Artists',
      type: 'Freelance',
      location: '🌐 Remote',
      description: '3D Design + Photography',
      date: '2022-',
    },
    {
      title: 'Articles Writer',
      type: 'Freelance',
      location: '🌐 Remote',
      description: 'Powerful tutorial + Writing',
      date: '2020-',
    },
    {
      title: 'Apple Developer',
      type: 'Freelance',
      location: '🌐 Remote',
      description: 'Build and publish app for iOS, iPadOS, watchOS, and macOS platforms',
      date: '2020-',
    },
    {
      title: 'Student Assistant',
      type: 'Part-time',
      location: '🇭🇰 HONG KONG',
      description: 'Data analytics and visualisation.',
      date: '2020-2021',
    },
    {
      title: 'Student Developer',
      type: 'Part-time',
      location: '🇭🇰 HONG KONG',
      description: 'Participate in Artificial Intelligence (A.I.) and Natural Language Processing (N.L.P) research field.',
      date: '2020-2021',
    },
    {
      title: 'Student Assistant',
      type: 'Part-time',
      location: '🇭🇰 HONG KONG',
      description: 'Develop website & design booklet for College\'s Language Scolar Program.',
      date: '2020-2021',
    },
    {
      title: 'Atlassian Translator',
      type: 'Volunteer',
      location: '🌐 Remote, Australia',
      description: 'BitBucket.org Team',
      date: '2020-2021',
    },
    {
      title: 'StopCovid19Tokyo Translator',
      type: 'Volunteer',
      location: '🌐 Remote, Japan',
      description: 'Contribute open source project with Tokyo Metropolitan Government and Code of Japan Team.',
      date: '2020-2021',
    },
    {
      title: 'Designer',
      type: 'Freelance',
      location: '🌐 Remote',
      description: 'Start Freelance works on different platforms (Adobe Stock, Behance, Dribbble)',
      date: '2019-',
    },
  ]

  const faqs = [
    {
      question: 'How to support your projects?',
      answer:
        'Github Sponsorship: https://github.com/sponsors/1998code',
    },
    {
      question: 'Where does your Open Source Software (OSS) project host?',
      answer:
        'Github: https://github.com/1998code | Vercel: https://vercel.com',
    },
  ]

  const navigation = {
    main: [
      { name: 'About', href: '#about' },
      { name: 'Blog', href: '#blog' },
    ],
    social: [
      {
        name: 'Twitter',
        href: 'https://twitter.com/1998design',
        icon: (props) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        ),
      },
      {
        name: 'GitHub',
        href: 'https://github.com/1998code',
        icon: (props) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: 'Dribbble',
        href: 'https://dribbble.com/1998design',
        icon: (props) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
    ],
  }

  return (
    <div>
      <Head>
        <title>1998 MEDIA (Official Website)</title>
        <meta name="description" content="The Official Website of 1998 MEDIA." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <a id="header" className="h-screen text-center flex flex-col justify-center" href="#about">
          <h1 className="text-8xl font-bold mb-3">Hi 👋 I'm MING!</h1>
          <h2 className="text-6xl font-bold text-gray-400">Glad to see you here.</h2>
        </a>

        <div id="about" className="max-w-7xl mx-auto py-16 md:mb-20 px-4 sm:py-24 sm:px-6 lg:px-8 bg-orange-200 bg-opacity-50">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <h2 className="max-w-md mx-auto text-3xl font-extrabold text-orange-900 text-center lg:max-w-xl lg:text-left">
              I'm a <span className="text-orange-500">Software Engineer</span> working on <span className="text-orange-700">UI Design, App Development & Neural Network, plus Deep Machine Learning Research</span>.
              <br /><br />
              As an <span className="underline decoration-orange-500 decoration-2">outgoing & motivated</span> person with <span className="underline decoration-orange-500 decoration-wavy decoration-2">unlimited</span> creativity, studying within a great IT environment. <span className="text-yellow-600">Eager to work in a large and professional MNC in Design and Programming related industry in the future.</span>
            </h2>
            <div className="flow-root self-center mt-8 lg:mt-0">
              <div className="-mt-4 -ml-8 flex flex-wrap lg:-ml-4">
                <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
                  <img className="h-24" src="/logos/CityU.png" alt="CityU" />
                </div>
                <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
                  <img className="h-24" src="/logos/PolyU.webp" alt="PolyU" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="achievements" className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-7xl mx-auto text-left">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Trusted by customers from over 175 countries and regions
              </h2>
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

        <div id="skills" className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-7xl mx-auto">
            <div className="text-left flex">
              <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Skills & Languages</h2>
            </div>
            <div className="mt-10">
              <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Softwares</h2>
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
              <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Languages & Technologies</h2>
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
              <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Speak & Write</h2>
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
            <p className="mt-10 text-sm text-gray-500">*Random sort - does not mean the order of proficient level</p>
          </div>
        </div>

        <div id="exp" className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-7xl mx-auto">
            <div className="text-left flex">
              <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Experience</h2>
              <p className="mt-3 max-w-2xl ml-auto text-xl text-gray-500 sm:mt-4">
                Works and society contribution.
              </p>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-md mt-8">
              <ul role="list" className="divide-y divide-gray-200">
                {positions.map((position) => (
                  <li key={position.id}>
                    <a href="#" className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className={"text-sm font-medium truncate " + (position.type == "Full-time" || position.type == "Volunteer" ? "text-green-600" : "text-sky-600")}>{position.title}</p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className={"px-2 inline-flex text-xs leading-5 font-semibold rounded-full " + (position.type == "Full-time" || position.type == "Volunteer" ? "text-green-800 bg-green-100" : "text-sky-800 bg-sky-100")}>
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

        <div id="blog" className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-7xl mx-auto">
            <div className="text-left flex">
              <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Blog</h2>
              <p className="mt-3 max-w-2xl ml-auto text-xl text-gray-500 sm:mt-4">
                Find out the latest posts and tutorials.
              </p>
            </div>
            <div className="mt-8 mx-auto grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
              {blogs.map(post => (
                <div key={post.title} className="flex flex-col rounded-lg overflow-hidden bg-white transform transition duration-500 hover:scale-105">
                  <div className="flex-shrink-0">
                    <a href={post.link}>
                      <img className="h-48 w-full object-cover" src={post.thumbnail} alt="" />
                    </a>
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-indigo-600 space-x-2">
                        <a href={'https://medium.com/search?q=' + post.categories[0].charAt(0).toUpperCase() + post.categories[0].slice(1)} className="hover:underline">
                          #{post.categories[0].charAt(0).toUpperCase() + post.categories[0].slice(1)}
                        </a>
                        <a href={'https://medium.com/search?q=' + post.categories[1].charAt(0).toUpperCase() + post.categories[1].slice(1)} className="hover:underline">
                          #{post.categories[1].charAt(0).toUpperCase() + post.categories[1].slice(1)}
                        </a>
                        <a href={'https://medium.com/search?q=' + post.categories[2].charAt(0).toUpperCase() + post.categories[2].slice(1)} className="hover:underline">
                          #{post.categories[2].charAt(0).toUpperCase() + post.categories[2].slice(1)}
                        </a>
                      </p>
                      <a href={post.link} className="block mt-2">
                        <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                      </a>
                    </div>
                    <div className="mt-3 flex items-center">
                      <div className="flex-shrink-0 text-gray-400">
                        <time dateTime={post.pubDate.slice(0, 10)}>{post.pubDate.slice(0, 10)}</time>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="faq" className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Ask</h2>
              <p className="mt-4 text-lg text-gray-500">
                Cannot find what you are looking for?
                <br />
                <a href="#contact" className="font-medium text-orange-600 hover:text-orange-500">
                  Contact
                </a>{' '}
                now.
              </p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <dl className="space-y-12">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <dt className="text-lg leading-6 font-medium text-gray-900">{faq.question}</dt>
                    <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div id="contact" className="relative py-16">
          <div className="hidden absolute top-0 inset-x-0 h-1/2 lg:block" aria-hidden="true" />
          <div className="max-w-7xl mx-auto bg-orange-600 lg:bg-transparent lg:px-8">
            <div className="lg:grid lg:grid-cols-12">
              <div className="relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-16 lg:bg-transparent">
                <div className="max-w-md mx-auto px-4 sm:pt-8 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
                  <div className="aspect-w-10 aspect-h-6 sm:aspect-w-1 sm:aspect-h-1 lg:aspect-w-1">
                    <img
                      className="object-cover object-center rounded-3xl shadow-2xl"
                      src="https://snapshot.apple-mapkit.com/api/v1/snapshot?center=22.34501591896432%2C114.17990720272064&t=standard&scale=1&spn=0.3175427580212222%2C0.34332275390625&size=500x500&lang=en-US&poi=0&annotations=%5B%7B%22point%22%3A%2222.428117752075195%2C114.208251953125%22%2C%22markerStyle%22%3A%22large%22%2C%22color%22%3A%22006d8f%22%2C%22glyphText%22%3A%22S%22%7D%2C%7B%22point%22%3A%2222.30408477783203%2C114.17972564697266%22%2C%22markerStyle%22%3A%22balloon%22%2C%22color%22%3A%22b92d5d%22%2C%22glyphText%22%3A%22P%22%7D%2C%7B%22point%22%3A%2222.336124420166016%2C114.1732177734375%22%2C%22markerStyle%22%3A%22balloon%22%2C%22color%22%3A%22e63b7a%22%2C%22glyphText%22%3A%22C%22%7D%5D&teamId=9PAHLTG8AD&keyId=FD3N2TP9F5&signature=7EQjssZqx9iYI1uJYqBU8ZDgqHPJrbZadAfT8G6rTwXM2l08vy6XREcWCWOk4gWLeQUIC80SUJLz8ZE0pqlC1w"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="relative bg-orange-600 lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-3xl lg:grid lg:grid-cols-10 lg:items-center">
                <div className="hidden absolute inset-0 overflow-hidden rounded-3xl lg:block" aria-hidden="true">
                  <svg
                    className="absolute bottom-full left-full transform translate-y-1/3 -translate-x-2/3 xl:bottom-auto xl:top-0 xl:translate-y-0"
                    width={404}
                    height={384}
                    fill="none"
                    viewBox="0 0 404 384"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern
                        id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                        x={0}
                        y={0}
                        width={20}
                        height={20}
                        patternUnits="userSpaceOnUse"
                      >
                        <rect x={0} y={0} width={4} height={4} className="text-orange-500" fill="currentColor" />
                      </pattern>
                    </defs>
                    <rect width={404} height={384} fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
                  </svg>
                  <svg
                    className="absolute top-full transform -translate-y-1/3 -translate-x-1/3 xl:-translate-y-1/2"
                    width={404}
                    height={384}
                    fill="none"
                    viewBox="0 0 404 384"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern
                        id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                        x={0}
                        y={0}
                        width={20}
                        height={20}
                        patternUnits="userSpaceOnUse"
                      >
                        <rect x={0} y={0} width={4} height={4} className="text-orange-500" fill="currentColor" />
                      </pattern>
                    </defs>
                    <rect width={404} height={384} fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
                  </svg>
                </div>
                <div className="relative max-w-md mx-auto py-12 px-4 space-y-6 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 lg:col-start-4 lg:col-span-6">
                  <h2 className="text-3xl font-extrabold text-white" id="join-heading">
                    Contact
                  </h2>
                  <p className="text-lg text-white">
                    Email or Chat Available. Response in 72 hours.
                  </p>
                  <a
                    className="block w-full py-3 px-5 text-center bg-white border border-transparent rounded-md shadow-md text-base font-medium text-orange-700 hover:bg-gray-50 sm:inline-block sm:w-auto"
                    href="#"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="credits" className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <h2 className="max-w-md mx-auto text-3xl font-extrabold text-indigo-900 text-center lg:max-w-xl lg:text-left">
              Special thanks to partners:
            </h2>
            <div className="flow-root self-center mt-8 lg:mt-0">
              <div className="-mt-4 -ml-8 flex flex-wrap justify-between lg:-ml-4">
                <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
                  <a href="https://vercel.com/?utm_source=1998code&utm_campaign=oss">
                    <img
                      className="h-12"
                      src="https://1998.media/assets/img/powered-by-vercel.svg?h=91084ef203023a391277bb16f564cc4f"
                      alt="vercal"
                    />
                  </a>
                </div>
                <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
                  <a href="https://betteruptime.com/?ref=i41">
                    <img className="h-12" src="https://1005343358-files.gitbook.io/~/files/v0/b/gitbook-legacy-files/o/spaces%2F-MAlerB6U8ZgIEat7t7C%2Favatar-1593632747885.png?generation=1593632748298147&alt=media" alt="betteruptime" />
                  </a>
                </div>
                <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      <footer>
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            {navigation.main.map((item) => (
              <div key={item.name} className="px-5 py-2">
                <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
          <div className="mt-8 flex justify-center space-x-6">
            {navigation.social.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-center text-base text-gray-400">Made with&nbsp;♥&nbsp;by MING.</p>
          <p className="mt-1 text-center text-base text-gray-400">Ver. 22.06.19 | Since 2020</p>
        </div>
      </footer>
    </div>
  )
}
