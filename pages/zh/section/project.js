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
          if (window.innerWidth <= 1024) {
            setGithubs(data.slice(0, 4));
          } else {
            setGithubs(data.slice(0, 8));
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
          <a className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl grow" href="#project">開源專案</a>
          <p className="mt-2 max-w-2xl text-xl text-gray-500">
            查找最新項目（只提供英語版本）。
          </p>
        </div>
        <div className="mt-8 mx-auto grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:max-w-none">
          {githubs.map(repo => (
            <a href={repo.html_url} target="_blank" key={repo.name} className="flex flex-col rounded-lg overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-105">
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{repo.name}</p>
                </div>
                <div className="mt-3 flex items-center">
                  <div className="flex-shrink-0 text-gray-400">
                    <time dateTime={repo.created_at.slice(0, 10)}>{repo.created_at.slice(0, 10)}</time>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}