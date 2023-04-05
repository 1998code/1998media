export default function About(props) {
  function i18n(key) {
    if (props.i18n && props.i18n['about'] && !props.i18n['about'][key]) {
      console.log('About Missing i18n: ' + key)
    }
    return props.i18n && props.i18n['about'] && props.i18n['about'][key] ? props.i18n['about'][key] : key
  }
  return (
    <div id="about" data-aos="zoom-in" data-aos-once className="max-w-7xl mx-auto py-16 md:mb-20 px-4 sm:py-24 sm:px-6 lg:px-8 bg-orange-200 dark:bg-orange-800 bg-opacity-50 lg:rounded-3xl">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <h2 className="max-w-md mx-auto text-3xl font-extrabold text-orange-900 dark:text-orange-100 text-center lg:max-w-xl lg:text-left">
          {i18n("I'm a")} <span className="text-orange-500 dark:text-orange-400"><i className="far fa-computer-classic"></i> {i18n("Software Engineer")}</span> {i18n("working on")} <span className="text-orange-700 dark:text-orange-300"><i className="far fa-sidebar"></i> {i18n("UI Design,")} <i className="far fa-command"></i> {i18n("App Development,")} <i className="far fa-brain-circuit"></i> {i18n("Neural Network,")} {i18n("and")} <i className="far fa-server"></i> {i18n("Deep Machine Learning Research.")}</span>
          <br /><br />
          {i18n("As an")} <i className="far fa-person-to-portal"></i> <span className="border-b-2 border-orange-500">{i18n("outgoing & motivated")}</span> <i className="far fa-person-from-portal"></i> {i18n("person with")} <span className="underline decoration-orange-500 decoration-wavy decoration-2">{i18n("unlimited")}</span> {i18n("creativity")} <i className="far fa-paintbrush-pencil"></i> , {i18n("studying within a great IT environment.")} <span className="text-yellow-600 dark:text-yellow-400">{i18n("Eager to work in a large and professional MNC in Design and Programming related industry")} <i className="far fa-briefcase"></i> {i18n("in the future.")}</span>
        </h2>
        <div className="flow-root self-center mt-8 lg:mt-0">
          <div className="-mt-4 -ml-8 flex flex-wrap lg:-ml-4">
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
              <img className="h-24 dark:hidden" src="https://cdn.1998.media/logos/CityU.png" alt="CityU" />
              <img className="h-24 hidden dark:block" src="https://cdn.1998.media/logos/CityU_dark.png" alt="CityU" />
            </div>
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
              <img className="h-24 dark:hidden" src="https://cdn.1998.media/logos/PolyU.webp" alt="PolyU" />
              <img className="h-24 hidden dark:block" src="https://cdn.1998.media/logos/PolyU_dark.webp" alt="PolyU" />
            </div>
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
              <img className="h-24 dark:hidden" src="https://cdn.1998.media/logos/Google.png" alt="Google" />
              <img className="h-24 hidden dark:block" src="https://cdn.1998.media/logos/Google_dark.png" alt="Google" />
            </div>
          </div>
        </div>
      </div>
      <img src="https://cdn.1998.media/bgs/Calculator.png" data-aos="zoom-in" data-aos-once />
    </div>
  )
}