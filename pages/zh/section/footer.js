import { useState } from 'react'
import axios from 'axios'

export default function Footer() {
    const navigation = {
      main: [
        { name: '關於', href: '#about' },
        { name: '文章', href: 'https://blog.1998.media' },
        { name: '商店', href: 'https://shop.1998.media' },
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
        {
          name: 'Behance',
          href: 'https://www.behance.net/1998design',
          icon: (props) => (
            <i className="fab fa-behance fa-xl" />
          ),
        },
      ],
    }
    const [ip, setIP] = useState([])
    const [geo, setGeo] = useState([])
    const [latitude, setLatitude] = useState([])
    const [longitude, setLongitude] = useState([])
    axios.get('/api/ip')
      .then(res => {
        setIP(res.data.ip);
        setGeo(res.data.geo && res.data.geo.city + '，' + res.data.geo.country || '未知');
        setLatitude(res.data.latitude || '未知');
        setLongitude(res.data.longitude || '未知');
      }).catch(err => {
        console.log(err)
      }
    )
    return (
        <div data-aos="zoom-in" data-aos-once className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            {navigation.main.map((item) => (
              <div key={item.name} className="px-5 py-2">
                <a href={item.href} target="_blank" className="text-base text-gray-500 hover:text-gray-600">
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
              <a key={item.name} href={item.href} target="_blank" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-center text-base text-gray-400">MING 用♥製作</p>
          <p className="mt-1 text-center text-base text-gray-400">版本 22.11.13 | 自 2020 年起 | 完全開源。</p>
          <p className="mt-1 text-center text-xs text-gray-400 pt-3">您的 IP 源自: {ip} | {geo} ({latitude}，{longitude})</p>
        </div>
    )
}