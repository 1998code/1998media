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
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-gray-400">MING 用 <i className="fa fa-heart" /> 製作</p>
              <p className="mt-1 text-gray-400 text-sm">版本 23.03.04 | 自 2020 年起 | 完全開源。</p>
            </div>
            <div className="flex justify-center space-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} target="_blank" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <hr className="mt-3" />

          <div className="mt-1 text-xs text-gray-400 pt-3 gap-3 flex flex-wrap justify-between">
            <span className="flex items-center gap-3">
              兼容: 
              <i className="fab fa-safari"></i>
              <i className="fab fa-chrome"></i>
              <i className="fab fa-firefox-browser" />
              <i className="fab fa-edge"></i>
              <i className="fab fa-opera"></i>
              <i className="fab fa-internet-explorer"></i>
            </span>
            <p className="text-gray-400">您的 IP 源自: {ip} | {geo} ({latitude}，{longitude})</p>
            <div className="flex gap-3">
              {navigation.main.map((item) => (
                <a href={item.href} target="_blank" alt={item.name} className="text-gray-500 hover:text-gray-600">
                  {item.name}
                  {item.href.includes('http') ? (
                    <i className="ml-1 fa fa-external-link fa-sm"></i>
                  ) : (
                    <i className="ml-1 far fa-circle-arrow-up fa-sm"></i>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
    )
}