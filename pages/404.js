import Head from 'next/head'

export default function Custom404() {
    const links = [
        { title: 'Blog', description: 'Read the latest articles', icon: "fa-solid fa-square-rss", url: "https://blog.1998.media" },
      ]

    return (
        <div>
            <Head>
                <link rel="stylesheet" href="https://cdn.1998.media/css/fontawesome.css" />
            </Head>
            <main className="max-w-7xl w-full h-screen grid content-center mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl mx-auto py-16 sm:py-24">
                <div className="text-left">
                    <p className="text-base font-semibold text-sky-600">404</p>
                    <h1 className="mt-2 text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl sm:tracking-tight">
                    This page does not exist.
                    </h1>
                    <p className="mt-2 text-lg text-gray-500">The page you are looking for could not be found.</p>
                </div>
                <div className="mt-12">
                    <h2 className="text-base font-semibold text-gray-500">Suggest for you</h2>
                    <ul role="list" className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
                    {links.map((link, linkIdx) => (
                        <li key={linkIdx} className="relative py-6 flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <i className={'text-sky-700 fa-3x ' + (link.icon)} aria-hidden="true" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                                <span className="rounded-sm focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                    <a href={link.url} target="_blank" className="focus:outline-none">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    {link.title}
                                    </a>
                                </span>
                                </h3>
                                <p className="text-base text-gray-500">{link.description}</p>
                            </div>
                            <div className="flex-shrink-0 self-center">
                                <i class="fa-solid fa-square-arrow-up-right text-gray-400"></i>
                            </div>
                        </li>
                    ))}
                    </ul>
                    <div className="mt-8">
                    <a href="/" className="text-base font-medium text-sky-600 hover:text-sky-500">
                        Or go back home<span aria-hidden="true"> &rarr;</span>
                    </a>
                    </div>
                </div>
                </div>
            </main>
        </div>
    )
  }