import { useState } from 'react'
import axios from 'axios'

export default function Footer() {
    const navigation = {
      main: [
        { name: 'About', href: '#about' },
        { name: 'Blog', href: 'https://blog.1998.media' },
        { name: 'Store', href: 'https://shop.1998.media' },
        { name: 'Status', href: 'https://status.1998.media' },
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
        setGeo(res.data.geo && res.data.geo.city + ', ' + res.data.geo.country || 'Unknown');
        setLatitude(res.data.latitude || 'Unknown');
        setLongitude(res.data.longitude || 'Unknown');
      }).catch(err => {
        console.log(err)
      }
    )
    return (
      <div data-aos="zoom-in" data-aos-once className="right-0 max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-gray-400">Made with <i className="fa fa-heart" /> by MING</p>
            <p className="mt-1 text-gray-400 text-sm">Ver. 23.01.30 | Since 2020 | Open Source.</p>
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
          <span class="flex items-center gap-3">
            Compatible with: 
            <i class="fab fa-safari"></i>
            <i class="fab fa-chrome"></i>
            <i class="fab fa-firefox-browser" />
            <i class="fab fa-edge"></i>
            <i class="fab fa-opera"></i>
            <i class="fab fa-internet-explorer"></i>
          </span>
          <p className="text-gray-400">You come from: {ip} | {geo} ({latitude}，{longitude})</p>
          <div class="flex gap-3">
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