export default function About(props) {
  function i18n(key) {
    if (props.i18n && props.i18n['about'] && !props.i18n['about'][key]) {
      console.log('About Missing Translation: ' + key);
    }
    return props.i18n && props.i18n['about'] && props.i18n['about'][key]
      ? props.i18n['about'][key]
      : key;
  }
  return (
    <div id="about" className="max-w-7xl mx-auto pt-16 pb-32">
      <div className="px-4 py-16 sm:px-6 lg:px-8 bg-orange-200 dark:bg-orange-800 bg-opacity-50 xl:rounded-xl" >
        <div className="lg:flex flex-col lg:flex-row gap-3 lg:gap-8 items-center min-h-[75vh]">
          <h2 className="-mt-0 lg:-mt-32 min-w-[36%] mx-auto text-3xl font-extrabold text-orange-900 dark:text-orange-100 text-center lg:text-left">
            <img
              src="https://cdn.1998.media/favicon24.jpg"
              className="rounded-full w-24 h-24"
            />
            <br />
            <br />
            {i18n("I'm a")}{' '}
            <span className="text-orange-500 dark:text-orange-400">
              {i18n("Product Manager")}{' '}
            </span>
            <br/>
            {i18n('leading on')}{' '}
            <span className="text-teal-700 dark:text-orange-300">
              <i className="far fa-sidebar"></i> {i18n('UI Design,')}{' '}
              {i18n('and')}{' '}<br/>
              <i className="far fa-command"></i> {i18n('App Development')}{i18n('.')}
            </span>
            <br />
            <br />
            <div class="opacity-85">
              {i18n('As an')} <i className="far fa-person-to-portal"></i>{' '}
              <span className="border-b-2 border-orange-500">
                {i18n('outgoing & motivated')}
              </span>{' '}
              <i className="far fa-person-from-portal"></i> {i18n('person with')}{' '}
              <span className="underline decoration-orange-500 decoration-wavy decoration-2">
                {i18n('unlimited')}
              </span>{' '}
              {i18n('creativity')} <i className="far fa-paintbrush-pencil"></i> ,{' '}
              {i18n('growing from a great IT environment.')}
            </div>
          </h2>
          <div className="-ml-8 flex flex-wrap lg:flex-col lg:-ml-4 space-y-3">
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:items-center lg:ml-4">
              <img
                className="h-24 dark:hidden"
                src="https://cdn.1998.media/logos/CityU.png"
                alt="CityU"
              />
              <img
                className="h-24 lg:h-32 hidden dark:block"
                src="https://cdn.1998.media/logos/CityU_dark.png"
                alt="CityU"
              />
            </div>
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:items-center lg:ml-4">
              <img
                className="h-24 dark:hidden"
                src="https://cdn.1998.media/logos/PolyU.webp"
                alt="PolyU"
              />
              <img
                className="h-24 lg:h-32 hidden dark:block"
                src="https://cdn.1998.media/logos/PolyU_dark.webp"
                alt="PolyU"
              />
            </div>
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:items-center lg:ml-4">
              <img
                className="h-24 dark:hidden"
                src="https://cdn.1998.media/logos/Google.png"
                alt="Google"
              />
              <img
                className="h-24 lg:h-32 hidden dark:block"
                src="https://cdn.1998.media/logos/Google_dark.png"
                alt="Google"
              />
            </div>
            <img src="https://cdn.1998.media/bgs/Calculator.png" />
          </div>
        </div>
      </div>
    </div>
  );
}
