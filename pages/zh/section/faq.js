export default function Faq() {
  const faqs = [
    {
      question: '如何支持您的項目？',
      answer:
        'Github 贊助: https://github.com/sponsors/1998code',
    },
    {
      question: '您的開源軟件 (OSS) 項目在哪里托管？',
      answer:
        'Github: https://github.com/1998code | Vercel: https://vercel.com',
    },
  ]
  return (
    <div id="faq" className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <div>
          <a className="text-3xl font-extrabold text-gray-900" href="#faq">查詢</a>
          <p className="mt-4 text-lg text-gray-500">
            無法找到您想要的？
            <br />
            <a href="#contact" className="font-medium text-orange-600 hover:text-orange-500">
              現在聯繫
            </a>
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