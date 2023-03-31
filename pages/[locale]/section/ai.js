import { useState, useEffect } from 'react'
import axios from 'axios'

export default function AI(props) {
  function i18n(key) {
    console.log(props.i18n && props.i18n['ai'] && props.i18n['ai'][key] ? '' : 'AI Missing i18n: ' + key)
    return props.i18n && props.i18n['ai'] && props.i18n['ai'][key] ? props.i18n['ai'][key] : key
  }

  useEffect(() => {
      getDalleData()
  }, [])

  const [dalle, setDalle] = useState([])
  function getDalleData() {
    axios.get(`https://edge-config.vercel.com/ecfg_hmcfjwi2h70gpx7dhcynqeromm3s?token=8bc3ba74-f695-40ea-b637-a78860e530e8`).then((res) => {
      console.log(res)
      setDalle(res.data.items['results'])
    }).catch((err) => {
        console.log(err)
    })
  }

  return (
    <div id="ai" data-aos="zoom-in" data-aos-once className="relative pt-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-left flex flex-wrap">
          <a className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl grow" href="#ai">
            {i18n("AI")}
            <i className="fa fa-user-robot ml-2"></i>
          </a>
          <p className="mt-2 max-w-2xl text-xl text-gray-500">
            {i18n("The latest prompt design and experimental results.")}
          </p>
        </div>
        <div className="mt-8">
          {/* Featured */}
          <div className="flex flex-nowrap overflow-x-auto max-w-full gap-6">
            { dalle.map((item, index) => (
              item.featured === '🏆 Hall of Fame' && (
                <a href={item.sourceURL} target="_blank" rel="noopener noreferrer" className="group w-96">
                  <img src={item.output} className="min-w-[350px] min-h-[350px] rounded-lg shadow-lg group-hover:scale-95 transition-all" />
                  <div className="mt-2 flex justify-between">
                    <span className="text-sm text-gray-500">{i18n(item.featured)}</span>
                    <p className="text-sm text-gray-500 group-hover:text-gray-400">{i18n(`Open in ${item.source}`)}</p>
                  </div>
                  <p className="mt-2 font-semibold text-gray-900 dark:text-gray-100 italic">
                    "{i18n(item.prompt)}" <span className="text-gray-500 text-xs">- {item.version}</span>
                  </p>
                </a>
              )
            ))}
          </div>
          {/* Other */}
          <div className="flex flex-nowrap overflow-x-auto max-w-full gap-6 mt-8">
            { dalle.map((item, index) => (
              item.featured !== '🏆 Hall of Fame' && (
                <a href={item.sourceURL} target="_blank" rel="noopener noreferrer" className="group w-96">
                  <img src={item.output} className="min-w-[280px] min-h-[280px] rounded-lg shadow-lg group-hover:scale-95 transition-all" />
                  <div className="mt-2 flex justify-between">
                    <span className="text-sm text-gray-500">🌠 {i18n("NEW")}</span>
                    <p className="text-sm text-gray-500 group-hover:text-gray-400">{i18n(`Open in ${item.source}`)}</p>
                  </div>
                  <p className="mt-2 text-xs md:text-sm font-semibold text-gray-900 dark:text-gray-100 italic">
                    "{i18n(item.prompt)}" <span className="text-gray-500 text-xs">- {item.version}</span>
                  </p>
                </a>
              )
            ))}
          </div>
        </div>
        <div className="mt-8 text-left flex flex-wrap items-center">
          <a className="text-2xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl grow" href="#ai">
            {i18n("Laboratory")}
            <i className="far fa-server ml-2"></i>
          </a>
          <p className="mt-2 max-w-2xl text-lg text-gray-500 text-left lg:text-right">
            {i18n("Models are running on large machines.")}<br/>
            {i18n("Feel free to tryout and share your thoughts via contact below.")}
          </p>
        </div>
        <div className="mt-6">
          <iframe className="w-full h-[1180px] md:h-[800px] lg:h-[750px] rounded-2xl" src="https://whisper.1998.media" scrolling='no' frameBorder='0' />
          <div className="text-gray-600 text-xs mt-3 text-left lg:text-right">
            Research supported with Cloud TPUs from Google's TPU Research Cloud (TRC)
            <br /><br />
            Tested Environment
            <br />
            Architecture: x86_64 - Intel® Xeon®<br />
            CPU(s): 96<br />
            TPU(s): 8 (v2)<br />
            Memory: 334 GB<br />
            Disk Space: 100 GB<br />
            OS: Ubuntu 20.04.4 LTS
          </div>
        </div>
      </div>
    </div>
  )
}