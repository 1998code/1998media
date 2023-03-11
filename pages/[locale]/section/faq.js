export default function Faq(props) {
  function i18n(key) {
    console.log(props.i18n && props.i18n['faq'] && props.i18n['faq'][key] ? '' : 'FAQ Missing i18n: ' + key)
    return props.i18n && props.i18n['faq'] && props.i18n['faq'][key] ? props.i18n['faq'][key] : key
  }
  const faqs = [
    {
      question: 'How to support your projects?',
      answer: () => (
        <a href="https://github.com/sponsors/1998code">
          {i18n("Github Sponsorship")}
          <i className="ml-1 fa fa-external-link fa-sm"></i>
        </a>
      ),
    },
    {
      question: 'Where does your Open Source Software (OSS) project host?',
      answer: () => (
        <span>
          <a href="https://github.com/1998code">Github<i className="ml-1 fa fa-external-link fa-sm"></i></a> 
          <i className="fa-solid fa-pipe px-3"></i>
          <a href="https://vercel.com">Vercel<i className="ml-1 fa fa-external-link fa-sm"></i></a>
        </span>
      ),
    },
  ]
  return (
    <div id="faq" data-aos="zoom-in" data-aos-once className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      <div>
        <a className="text-3xl font-extrabold text-gray-900 dark:text-gray-100" href="#faq">
          {i18n("Ask")}
          <i className="fa fa-question-circle ml-2"></i>
        </a>
        <p className="mt-4 text-lg text-gray-500">
          {i18n("Cannot find what you are looking for")}?
          <br />
          <a href="#contact" className="font-medium text-orange-600 dark:text-orange-300 hover:text-orange-500">
            {i18n("Contact now.")}
          </a>
        </p>
      </div>
      <div className="mt-12 lg:mt-0 lg:col-span-2">
        <dl className="space-y-12">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">{i18n(faq.question)}</dt>
              <dd className="mt-2 text-base text-gray-500"><faq.answer /></dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}