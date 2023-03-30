import { useState } from 'react'
import axios from 'axios'

export default function Footer(props) {
  function i18n(key) {
    console.log(props.i18n && props.i18n['footer'] && props.i18n['footer'][key] ? '' : 'Footer Missing i18n: ' + key)
    return props.i18n && props.i18n['footer'] && props.i18n['footer'][key] ? props.i18n['footer'][key] : key
  }

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
          <p className="text-gray-400">{i18n("Made with")} <i className="fa fa-heart" /> {i18n("by MING")}</p>
          <p className="mt-1 text-gray-400 text-sm">{i18n("Ver.")} 23.03.31 | {i18n("Since")} 2020 | {i18n("Open Source")}{i18n(".")}</p>
        </div>
        <div className="flex justify-center space-x-6">
          {navigation.social.map((item) => (
            <a key={item.name} href={item.href} target="_blank" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">{i18n(item.name)}</span>
              <item.icon aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <hr className="mt-3" />

      <div className="mt-1 text-xs text-gray-400 pt-3 gap-3 flex flex-wrap justify-between">
        <span className="flex items-center gap-3">
        {i18n("Compatible with")}: 
          <i className="fab fa-safari"></i>
          <i className="fab fa-chrome"></i>
          <i className="fab fa-firefox-browser" />
          <i className="fab fa-edge"></i>
          <i className="fab fa-opera"></i>
          <i className="fab fa-internet-explorer"></i>
        </span>
        <p className="text-gray-400">{i18n("You come from")}: {ip} | {geo} ({latitude}{i18n(",")}{longitude})</p>
        <div className="flex gap-3">
          {navigation.main.map((item) => (
            <a href={item.href} target="_blank" alt={item.name} className="text-gray-500 hover:text-gray-600">
              {i18n(item.name)}
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