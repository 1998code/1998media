export default function Faq(props) {
  function i18n(key) {
    if (props.i18n && props.i18n['faq'] && !props.i18n['faq'][key]) {
      console.log('FAQ Missing Translation: ' + key);
    }
    return props.i18n && props.i18n['faq'] && props.i18n['faq'][key]
      ? props.i18n['faq'][key]
      : key;
  }
  const faqs = [
    {
      question: 'Do you have any 🆓 font that I can use for web/app project?',
      answer: () => (
        <a href="https://github.com/1998code/Core-Font" className="hover:underline">
          <i className="mr-1 fab fa-github fa-sm"></i>
          {i18n('Core Font - My 1st OS Design Font 🤗')}
        </a>
      ),
    },
    {
      question: 'How to support your projects? 💰',
      answer: () => (
        <a href="https://github.com/sponsors/1998code" className="hover:underline">
          {i18n('Github Sponsorship')}
          <i className="ml-1 fa fa-external-link fa-sm"></i>
        </a>
      ),
    },
    {
      question: 'Where does your Open Source Software (OSS) project host? 🌍',
      answer: () => (
        <span>
          {i18n('Distributed globally with love on:')}{' '}
          <a href="https://github.com/1998code" className="hover:underline">
            Github<i className="ml-1 fa fa-external-link fa-sm"></i>
          </a>
          <i className="fa fa-pipe px-3"></i>
          <a href="https://vercel.com/?utm_source=1998code&utm_campaign=oss" className="hover:underline">
            Vercel<i className="ml-1 fa fa-external-link fa-sm"></i>
          </a>
          <i className="fa fa-pipe px-3"></i>
          <a href="https://www.digitalocean.com/?refcode=ce873177d9ab&utm_medium=opensource" className="hover:underline">
            DigitalOcean<i className="ml-1 fa fa-external-link fa-sm"></i>
          </a>
        </span>
      ),
    },
  ];
  return (
    <div
      id="faq"
      data-aos="zoom-in"
      data-aos-once
      className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
    >
      <div>
        <a
          className="text-3xl font-extrabold text-gray-900 dark:text-gray-100"
          href="#faq"
        >
          {i18n('Ask')}
          <i className="fa fa-question-circle ml-2"></i>
        </a>
        <p className="mt-4 text-lg text-gray-500">
          {i18n('Cannot find what you are looking for')}?
          <br />
          <a
            href="#contact"
            className="font-medium text-orange-600 dark:text-orange-300 hover:text-orange-500"
          >
            {i18n('Contact now.')}
          </a>
        </p>
      </div>
      <div className="mt-12 lg:mt-0 lg:col-span-2">
        <dl className="space-y-12">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                {i18n(faq.question)}
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                <faq.answer />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
