export default function Footer() {
    const navigation = {
        main: [
          { name: '關於', href: '#about' },
          { name: '文章', href: '#blog' },
          { name: '狀態', href: 'https://status.1998.media' },
        ],
        social: [
          {
            name: 'Twitter',
            href: 'https://twitter.com/1998design',
            icon: (props) => (
              <i className="fab fa-twitter fa-xl" />
            ),
          },
          {
            name: 'GitHub',
            href: 'https://github.com/1998code',
            icon: (props) => (
              <i className="fab fa-github fa-xl" />
            ),
          },
          {
            name: 'Dribbble',
            href: 'https://dribbble.com/1998design',
            icon: (props) => (
              <i className="fab fa-dribbble fa-xl" />
            ),
          },
        ],
      }
    return (
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            {navigation.main.map((item) => (
              <div key={item.name} className="px-5 py-2">
                <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                  {item.name}
                  {item.href.includes('http') ? (
                    <i className="ml-1 fa fa-external-link fa-sm"></i>
                  ) : (
                    <i className="ml-1 fa fa-circle-arrow-up fa-sm"></i>
                  )}
                </a>
              </div>
            ))}
          </nav>
          <div className="mt-8 flex justify-center space-x-6">
            {navigation.social.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-center text-base text-gray-400">MING 用♥製作</p>
          <p className="mt-1 text-center text-base text-gray-400">版本 22.8.20 | 自 2020 年起 | 完全開源。</p>
        </div>
    )
}