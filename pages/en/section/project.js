import { useState, useEffect } from 'react'

export default function Github() {
  const [githubs, setGithubs] = useState([])
  useEffect(() => {
    getGithubData()
    window.addEventListener('resize', () => {
      getGithubData()
    })
  }, [])
  function getGithubData() {
    fetch("https://api.github.com/users/1998code/repos?sort=created_at")
      .then(res => res.json())
      .then(
        (data) => {
          if (data.documentation_url != "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting") {
            if (window.innerWidth <= 1024) {
              setGithubs(data.slice(0, 8));
            } else {
              setGithubs(data.slice(0, 16));
            }
          }
        },
        (error) => {
          console.log(error)
        }
      )
  }
  return (
    <div id="project" className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-left flex flex-wrap">
          <a className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl grow" href="#project">
            Project
            <i className="fas fa-code ml-2"></i>
          </a>
          <p className="mt-2 max-w-2xl text-xl text-gray-500">
            Find out the latest projects.
          </p>
        </div>
        <div className="mt-8 mx-auto grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:max-w-none">
          {githubs.map(repo => (
            <a href={repo.html_url} target="_blank" key={repo.name} className="flex flex-col rounded-lg overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-105">
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                    <i className="fab fa-github text-gray-500 dark:text-gray-100 mr-1"></i>
                    {repo.name}
                  </p>
                </div>
                <div className="mt-3 flex items-center">
                  <div className="flex-shrink-0 text-gray-400">
                    <i className="far fa-calendar-alt text-gray-500 dark:text-gray-100 mr-2"></i>
                    <time dateTime={repo.created_at.slice(0, 10)}>{repo.created_at.slice(0, 10)}</time>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-8 mx-auto grid gap-5 md:grid-cols-4 lg:max-w-none">
          <img className="w-full col-span-3 hover:scale-105 transition duration-300" src="https://github-readme-stats.vercel.app/api?username=1998code&show_icons=true&bg_color=30,e96443,904e95&title_color=fff&text_color=fff&icon_color=fff&hide_border=true" alt="Performance" />
          <img className="w-full dark:hidden hover:scale-105 transition duration-300" src="https://github-readme-stats.vercel.app/api/top-langs/?username=1998code&langs_count=8&layout=default&hide_border=true" alt="Top Languages" />
          <img className="w-full hidden dark:block hover:scale-105 transition duration-300" src="https://github-readme-stats.vercel.app/api/top-langs/?username=1998code&langs_count=8&layout=default&bg_color=000&title_color=fff&text_color=fff&hide_border=true" alt="Top Languages" />
        </div>
      </div>
    </div>
  )
}