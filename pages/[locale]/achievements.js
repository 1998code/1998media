import { useState, useEffect } from 'react';
import { Tooltip } from '@nextui-org/tooltip';

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
    { year: '2024', title: 'Developer Tools in Taiwan', rank: '#1', flag: '🇹🇼', color: 'text-cyan-600' },
    { year: '2024', title: 'Developer Tools in Hong Kong', rank: '#1', flag: '🇭🇰', color: 'text-cyan-600' },
    { year: '2023', title: 'Developer Tools in the United Kingdom', rank: '#1', flag: '🇬🇧', color: 'text-cyan-600' },
    { year: '2023', title: 'Developer Tools in the United States', rank: '#1', flag: '🇺🇸', color: 'text-cyan-600' },
    { year: '2023', title: 'Developer Tools in Canada', rank: '#1', flag: '🇨🇦', color: 'text-blue-600' },
    { year: '2022', title: 'Graphics & Design App in Uzbekistan', rank: '#1', flag: '🇺🇿', color: 'text-sky-600' },
    { year: '2022', title: 'Developer Tools in Kuwait', rank: '#1', flag: '🇰🇼', color: 'text-pink-600' },
    { year: '2022', title: 'Developer Tools in Taiwan', rank: '#1', flag: '🇹🇼', color: 'text-green-600' },
    { year: '2022', title: 'Developer Tools in Canada', rank: '#1', flag: '🇨🇦', color: 'text-blue-600' },
    { year: '2021', title: 'Developer Tools in the United States', rank: '#1', flag: '🇺🇸', color: 'text-cyan-600' },
    { year: '2021', title: 'Apple Worldwide Developers Conference (WWDC)', rank: 'Winner', flag: '', color: 'text-orange-600 dark:text-orange-300' },
    { year: 'Since 2020', title: 'Paid Apps in Different Categories Globally', rank: 'Top-100', flag: '', color: 'text-teal-600' },
  ];

  const unsplashPublicKey = 'hjm0tzh_dDQx2REubp1NiT1P4jxE5wmnCbKQLbD-BZ8';

  const [totalViews, setTotalViews] = useState(0);
  function getUnsplashStats() {
    fetch(
      `https://api.unsplash.com/users/1998media/statistics?client_id=${unsplashPublicKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTotalViews(data.views.total);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const [photos, setPhotos] = useState([]);
  function getUnsplashPhotos() {
    fetch(
      `https://api.unsplash.com/users/1998media/photos?client_id=${unsplashPublicKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const totalReleases = photos.length;
  const avgViews = Math.floor(totalViews / totalReleases)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const stats = [
    {
      name: 'Total Views',
      stat: `${i18n('Over')} ${totalViews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
    },
    { name: 'Total Releases', stat: `${totalReleases}` },
    { name: 'Average Views', stat: `${i18n('Over')} ${avgViews}` },
  ];

  useEffect(() => {
    getUnsplashStats();
    getUnsplashPhotos();
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageURL, setSelectedImageURL] = useState(null);

  const handleClick = (photo) => {
    setSelectedImage(photo.urls.raw);
    setSelectedImageURL(photo.links.html);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <div
        data-aos="zoom-in"
        data-aos-once
        className="relative px-4 sm:px-6 lg:px-8"
      >
        <img
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
              <dl className="rounded-lg overflow-hidden bg-white/50 dark:bg-black/50 backdrop-blur-md shadow-lg sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 divide-y divide-gray-200 dark:divide-gray-800 sm:divide-y-0 backlight">
                {achievements.map((achievement) => (
                  <div className="flex flex-col p-6 text-center hover:scale-105 transition-all">
                    <dt className="order-3 mt-1 text-lg leading-6 font-medium text-gray-400">
                      {achievement.year}
                    </dt>
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      {i18n(achievement.title)} {achievement.flag}
                    </dt>
                    <dd className={`order-1 text-5xl font-extrabold ${achievement.color}`}>
                      {i18n(achievement.rank)}
                    </dd>
                  </div>
                ))}
              </dl>
              <img
                className="dark:hidden my-6 rounded-lg hover:scale-95 transition-all"
                src="https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-l+b8172a(113.9745954,22.3526409),pin-s+1f89e3(121.1945767,25.0169013),pin-s+0b236f(-9.7459993,54.4364324),pin-s+0033a0(-95.7129,37.0902),pin-s+ff0000(-106.3468,56.1304),pin-s+0099b5(64.5853,41.3775),pin-s+007a3d(47.4818,29.3117)/11.7314,14.9358,1.32,0,35/1280x720@2x?access_token=pk.eyJ1IjoiMTk5OG1lZGlhIiwiYSI6ImNsdHRuaGg4ZzE1NDUya3N5MTd2dTgwbTYifQ.nTFoFutOK1E7O6KBSFPLVQ&logo=false&attribution=false"
              />
              <img
                className="hidden dark:block my-6 rounded-lg hover:scale-95 transition-all"
                src="https://api.mapbox.com/styles/v1/1998media/clttnmr3900k501qw52w30alb/static/pin-l+b8172a(113.9745954,22.3526409),pin-s+1f89e3(121.1945767,25.0169013),pin-s+0b236f(-9.7459993,54.4364324),pin-s+0033a0(-95.7129,37.0902),pin-s+ff0000(-106.3468,56.1304),pin-s+0099b5(64.5853,41.3775),pin-s+007a3d(47.4818,29.3117)/11.7314,14.9358,1.32,0,35/1280x720@2x?access_token=pk.eyJ1IjoiMTk5OG1lZGlhIiwiYSI6ImNsdHRuaGg4ZzE1NDUya3N5MTd2dTgwbTYifQ.nTFoFutOK1E7O6KBSFPLVQ&logo=false&attribution=false"
              />
            </div>
            <img
              src="https://cdn.1998.media/bgs/Camera.png"
              className="absolute -z-[1] w-[25vw] top-25 -right-72"
            />

            <div id="impacts" className="pt-16">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                {i18n('3D Rendering and Photography @Unsplash')}
                <i className="far fa-image ml-2"></i>
              </h3>
              <dl className="mt-5 bg-white/50 dark:bg-black/50 backdrop-blur-md grid grid-cols-1 overflow-hidden rounded-lg shadow md:grid-cols-3 divide-y divide-gray-200 dark:divide-gray-800 md:divide-y-0 md:divide-x backlight">
                {stats.map((item) => (
                  <div key={item.name} className="px-4 py-5 sm:p-6">
                    <dt className="text-base font-normal text-gray-900 dark:text-gray-100">
                      {i18n(item.name)}
                    </dt>
                    <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                      <div className="flex items-baseline text-2xl font-semibold text-emerald-600">
                        {item.stat}
                      </div>
                      <div className="bg-green-800 text-green-100 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0">
                        <i className="flex-shrink-0 self-center fa fa-caret-up" />
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>
              <h4 className="mt-6 text-lg font-medium leading-6 text-gray-500">
                {i18n('Random Sample')}
                <i className="far fa-random ml-2"></i>
              </h4>
              <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 lg:grid-cols-3">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="group flex flex-col rounded-lg overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-105 border border-transparent hover:border-black dark:hover:border-white"
                  >
                    <img
                      className="h-[25vh] w-full object-cover cursor-pointer"
                      src={photo.urls.raw}
                      alt={photo.alt_description}
                      onClick={() => handleClick(photo)}
                    />
                    <Tooltip
                      content={photo.color}
                      placement="right"
                      className="p-1 border text-xs dark:text-white bg-white dark:bg-black rounded-lg"
                    >
                      <div
                        className="opacity-0 group-hover:opacity-100 absolute bottom-0 h-7 border-t border-r rounded-tr-md duration-500 transition-all"
                        style={{ backgroundColor: photo.color }}
                      >
                        {Object.entries(photo.topic_submissions).map(
                          ([topic, submission]) =>
                            submission.status === 'approved' ? (
                              <span className="p-1.5 text-white text-sm">
                                <i className="fas fa-crown"></i> Featured in{' '}
                                {topic.replaceAll('-', ' ')}
                              </span>
                            ) : null
                        )}
                      </div>
                    </Tooltip>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`fixed z-[101] inset-0 overflow-y-auto transition-all ease-out duration-500 ${isDialogOpen ? 'opacity-100 bg-gray-300/80 dark:bg-gray-800/80 backdrop-blur-lg' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-all" aria-hidden="true" onClick={handleClose}>
            <div className="absolute inset-0 cursor-alias transition-all"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <a href={selectedImageURL} target="_blank">
            <img src={selectedImage} alt="Selected" className="relative w-[80vw] h-[80vh] object-cover rounded-3xl" />
          </a>
        </div>
      </div>
    </>
  );
}
