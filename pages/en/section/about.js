export default function About() {
  return (
    <div id="about" data-aos="zoom-in" data-aos-once className="max-w-7xl mx-auto py-16 md:mb-20 px-4 sm:py-24 sm:px-6 lg:px-8 bg-orange-200 dark:bg-orange-800 bg-opacity-50 lg:rounded-3xl">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <h2 className="max-w-md mx-auto text-3xl font-extrabold text-orange-900 dark:text-orange-100 text-center lg:max-w-xl lg:text-left">
          I'm a <span className="text-orange-500 dark:text-orange-400"><i className="fa-regular fa-computer-classic"></i> Software Engineer</span> working on <span className="text-orange-700 dark:text-orange-300"><i className="fa-regular fa-sidebar"></i> UI Design, <i className="fa-regular fa-command"></i> App Development, <i className="fa-regular fa-brain-circuit"></i> Neural Network, and <i className="fa-regular fa-server"></i> Deep Machine Learning Research</span>.
          <br /><br />
          As an <i className="fa-regular fa-person-to-portal"></i> <span className="underline decoration-orange-500 decoration-2">outgoing & motivated</span> <i className="fa-regular fa-person-from-portal"></i> person with <span className="underline decoration-orange-500 decoration-wavy decoration-2">unlimited</span> creativity <i className="fa-regular fa-paintbrush-pencil"></i> , studying within a great IT environment. <span className="text-yellow-600 dark:text-yellow-400">Eager to work in a large and professional MNC in Design and Programming related industry <i className="fa-regular fa-briefcase"></i> in the future.</span>
        </h2>
        <div className="flow-root self-center mt-8 lg:mt-0">
          <div className="-mt-4 -ml-8 flex flex-wrap lg:-ml-4">
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
              <img className="h-24 dark:hidden" src="/logos/CityU.png" alt="CityU" />
              <img className="h-24 hidden dark:block" src="/logos/CityU_dark.png" alt="CityU" />
            </div>
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
              <img className="h-24 dark:hidden" src="/logos/PolyU.webp" alt="PolyU" />
              <img className="h-24 hidden dark:block" src="/logos/PolyU_dark.webp" alt="PolyU" />
            </div>
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
              <img className="h-24 dark:hidden" src="/logos/Google.png" alt="Google" />
              <img className="h-24 hidden dark:block" src="/logos/Google_dark.png" alt="Google" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}