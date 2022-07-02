export default function Faq() {
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
  return (
    <div id="faq" className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <div>
          <a className="text-3xl font-extrabold text-gray-900" href="#faq">Ask</a>
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
  )
}