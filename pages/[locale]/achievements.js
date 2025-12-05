import React from 'react';

export default function Achievements(props) {
  function i18n(key) {
    if (
      props.i18n &&
      props.i18n['achievements'] &&
      !props.i18n['achievements'][key]
    ) {
      console.log('Achievements Missing Translation: ' + key);
    }
    return props.i18n &&
      props.i18n['achievements'] &&
      props.i18n['achievements'][key]
      ? props.i18n['achievements'][key]
      : key;
  }

  const achievements = [
    {
      year: '2024',
      title: 'Developer Tools in Maldives',
      rank: '#1',
      flag: '🇲🇻',
      color: 'text-red-600', // Red and green flag
    },
    // {
    //   year: '2024',
    //   title: 'Developer Tools in Taiwan',
    //   rank: '#1',
    //   flag: '🇹🇼',
    //   color: 'text-blue-600', // Blue and red flag
    // },
    {
      year: '2024',
      title: 'Developer Tools in Hong Kong',
      rank: '#1',
      flag: '🇭🇰',
      color: 'text-red-600', // Red and white flag
    },
    {
      year: '2023',
      title: 'Developer Tools in the United Kingdom',
      rank: '#1',
      flag: '🇬🇧',
      color: 'text-blue-600', // Red, white, blue flag
    },
    // {
    //   year: '2023',
    //   title: 'Developer Tools in the United States',
    //   rank: '#1',
    //   flag: '🇺🇸',
    //   color: 'text-blue-600', // Red, white, blue flag
    // },
    // {
    //   year: '2023',
    //   title: 'Developer Tools in Canada',
    //   rank: '#1',
    //   flag: '🇨🇦',
    //   color: 'text-red-600', // Red and white flag
    // },
    {
      year: '2022',
      title: 'Graphics & Design App in Uzbekistan',
      rank: '#1',
      flag: '🇺🇿',
      color: 'text-sky-500', // Blue, white, green flag
    },
    {
      year: '2022',
      title: 'Developer Tools in Kuwait',
      rank: '#1',
      flag: '🇰🇼',
      color: 'text-green-600', // Green, white, red flag
    },
    {
      year: '2022',
      title: 'Developer Tools in Taiwan',
      rank: '#1',
      flag: '🇹🇼',
      color: 'text-blue-600', // Blue and red flag
    },
    {
      year: '2022',
      title: 'Developer Tools in Canada',
      rank: '#1',
      flag: '🇨🇦',
      color: 'text-red-600', // Red and white flag
    },
    {
      year: '2021',
      title: 'Developer Tools in the United States',
      rank: '#1',
      flag: '🇺🇸',
      color: 'text-blue-600', // Red, white, blue flag
    },
    {
      year: '2021',
      title: 'Apple Worldwide Developers Conference (WWDC)',
      rank: 'Winner',
      flag: '',
      color: 'text-orange-600 dark:text-orange-300',
    },
    {
      year: 'Since 2020',
      title: 'Paid Apps in Different Categories Globally',
      rank: 'Top-100',
      flag: '',
      color: 'text-teal-600',
    },
  ];

  return (
    <>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <img
          loading="lazy"
          src="https://cdn.1998.media/bgs/App.png"
          className="absolute -z-[1] w-[25vw] top-14 -right-16"
        />
        <div id="achievements" className="pt-16 max-w-7xl mx-auto">
          <div className="mx-auto text-left">
            <a
              className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl"
              href="#achievements"
            >
              {i18n('Trusted by customers from over 175 countries and regions')}
              <i className="far fa-earth-americas ml-2"></i>
            </a>
            <p className="mt-3 text-xl text-gray-500 sm:mt-4">
              {i18n("People love my apps, and I'd believe you will, too.")}{' '}
              <i className="far fa-hand-holding-heart"></i>
            </p>
          </div>
        </div>
        <div className="mt-10 pb-12 sm:pb-16">
          <div className="relative max-w-7xl mx-auto">
            <div className="cursor-default">
              <h3 className="mb-6 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                {i18n(
                  'Apple App Store (iOS, iPadOS, watchOS, App Clips, macOS, visionOS)'
                )}
                <i className="fab fa-app-store ml-2"></i>
              </h3>
              <dl className="rounded-xl overflow-hidden bg-white/50 dark:bg-black/50 backdrop-blur-md shadow-lg grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 backlight">
                {achievements.map((achievement) => (
                  <div className="flex flex-col p-6 text-center lg:text-left hover:scale-105 transition-all">
                    {/* <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">
                      {achievement.year}
                    </dt> */}
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      {i18n(achievement.title)} {achievement.flag}
                    </dt>
                    <dd
                      className={`order-1 text-5xl font-extrabold ${achievement.color}`}
                    >
                      {i18n(achievement.rank)}
                    </dd>
                  </div>
                ))}
              </dl>
              <img
                loading="lazy"
                className="dark:hidden my-6 rounded-xl hover:scale-95 transition-all"
                src="https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-l+b8172a(113.9745954,22.3526409),pin-s+dc143c(73.5089,4.1755),pin-s+1f89e3(121.1945767,25.0169013),pin-s+0b236f(-9.7459993,54.4364324),pin-s+0033a0(-95.7129,37.0902),pin-s+ff0000(-106.3468,56.1304),pin-s+0099b5(64.5853,41.3775),pin-s+007a3d(47.4818,29.3117)/11.7314,14.9358,1.32,0,35/1280x720@2x?access_token=pk.eyJ1IjoiMTk5OG1lZGlhIiwiYSI6ImNsdHRuaGg4ZzE1NDUya3N5MTd2dTgwbTYifQ.nTFoFutOK1E7O6KBSFPLVQ&logo=false&attribution=false"
              />
              <img
                loading="lazy"
                className="hidden dark:block my-6 rounded-xl hover:scale-95 transition-all"
                src="https://api.mapbox.com/styles/v1/1998media/clttnmr3900k501qw52w30alb/static/pin-l+b8172a(113.9745954,22.3526409),pin-s+dc143c(73.5089,4.1755),pin-s+1f89e3(121.1945767,25.0169013),pin-s+0b236f(-9.7459993,54.4364324),pin-s+0033a0(-95.7129,37.0902),pin-s+ff0000(-106.3468,56.1304),pin-s+0099b5(64.5853,41.3775),pin-s+007a3d(47.4818,29.3117)/11.7314,14.9358,1.32,0,35/1280x720@2x?access_token=pk.eyJ1IjoiMTk5OG1lZGlhIiwiYSI6ImNsdHRuaGg4ZzE1NDUya3N5MTd2dTgwbTYifQ.nTFoFutOK1E7O6KBSFPLVQ&logo=false&attribution=false"
              />
            </div>
            <img
              loading="lazy"
              src="https://cdn.1998.media/bgs/Camera.png"
              className="absolute -z-[1] w-[25vw] top-25 -right-72"
            />
          </div>
        </div>
      </div>
    </>
  );
}
