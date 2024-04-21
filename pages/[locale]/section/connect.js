export default function Connect(props) {
  function i18n(key) {
    if (props.i18n && props.i18n['blog'] && !props.i18n['blog'][key]) {
      console.log('Blog Missing Translation: ' + key)
    }
    return props.i18n && props.i18n['blog'] && props.i18n['blog'][key] ? props.i18n['blog'][key] : key
  }
  return (
    <div id="connect" data-aos="zoom-in" data-aos-once className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto space-y-8">
        <div className="text-left flex flex-wrap">
          <a className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl grow" href="#blog">
            {i18n("Connect")}
            <i className="fab fa-x ml-2"></i>
          </a>
          <p className="mt-2 max-w-2xl text-xl text-gray-500">
            {i18n("Find me on social media and other platforms.")}
          </p>
        </div>
        <div>
          <iframe width="100%" height="55" src="https://rss.app/embed/v1/ticker/uinAtIEboH5CBIfo" frameborder="0" class="relative rounded-lg -mb-7 z-[1]"></iframe>
          <iframe width="100%" height="450"  src="https://rss.app/embed/v1/carousel/uinAtIEboH5CBIfo" frameborder="0" class="relative z-[0]"></iframe>
        </div>
      </div>
    </div>
  )
}