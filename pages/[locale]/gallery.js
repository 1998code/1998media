import { useState, useEffect, useRef } from 'react';
import { Tooltip } from '@nextui-org/tooltip';
import { fetchI18nData } from '../../lib/fetchData';

export default function Gallery(props) {
  function i18n(key) {
    if (props.i18n && props.i18n['gallery'] && !props.i18n['gallery'][key]) {
      console.log('Gallery Missing Translation: ' + key);
    }
    return props.i18n && props.i18n['gallery'] && props.i18n['gallery'][key]
      ? props.i18n['gallery'][key]
      : key;
  }

  const unsplashPublicKey = 'hjm0tzh_dDQx2REubp1NiT1P4jxE5wmnCbKQLbD-BZ8';
  // Always start with 'unsplash' for SSR compatibility
  const [activeTab, setActiveTab] = useState('unsplash');
  const [spatialFilter, setSpatialFilter] = useState('all');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const unsplashData = props.unsplashData || { stats: null, photos: [] };
  const [totalViews, setTotalViews] = useState(
    unsplashData.stats?.totalViews || 0
  );
  const [photos, setPhotos] = useState(unsplashData.photos || []);
  const [isSafari, setIsSafari] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [spatialPhotosReady, setSpatialPhotosReady] = useState(false);

  // Dynamic tab positioning
  const [mainTabStyles, setMainTabStyles] = useState({
    left: '4px',
    width: '98px',
  });
  const [filterTabStyles, setFilterTabStyles] = useState({
    left: '4px',
    width: '64px',
  });
  const mainTabRefs = useRef({});
  const filterTabRefs = useRef({});
  const unsplashTabRef = useRef(null);
  const spatialTabRef = useRef(null);

  // Initialize client-side state and Safari detection
  useEffect(() => {
    setIsClient(true);

    // Mobile detection - check user agent and screen width
    const mobileUserAgent =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const mobileScreenWidth = window.innerWidth <= 768;
    const isMobileDevice = mobileUserAgent || mobileScreenWidth;
    setIsMobile(isMobileDevice);

    // Safari detection - only run on client side
    const safariDetection =
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
      !navigator.userAgent.includes('Chrome') &&
      !navigator.userAgent.includes('Firefox') &&
      !navigator.userAgent.includes('Edge');

    setIsSafari(safariDetection);

    // Set spatial photos ready after Safari detection with a small delay for DOM readiness
    // Only if Safari AND not mobile
    if (safariDetection && !isMobileDevice) {
      setTimeout(() => {
        console.log('Setting spatial photos ready');
        setSpatialPhotosReady(true);
      }, 100);
    }

    console.log('useEffect running, checking URL parameters...');
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type');
    console.log('URL type parameter:', typeParam);

    if (typeParam?.toLowerCase() === 'spatial') {
      console.log('URL parameter detected: type=spatial (case-insensitive)');

      console.log('Is Safari:', safariDetection);
      console.log('Is Mobile:', isMobileDevice);
      console.log('User Agent:', navigator.userAgent);

      if (safariDetection && !isMobileDevice) {
        console.log('Setting activeTab to spatial');
        setActiveTab('spatial');
      } else {
        console.log(
          'Not Safari or Mobile - showing alert and staying on Unsplash'
        );
        // Not Safari or Mobile - show alert and stay on Unsplash (don't set spatial tab)
        alert(
          i18n(
            'Only Safari on Vision Pro/Desktop is supported for Spatial content.'
          )
        );
        // Ensure we're on Unsplash tab
        setActiveTab('unsplash');
      }
    } else {
      console.log('No spatial type parameter found');
    }
  }, []);

  // Handle window resize to detect mobile/desktop changes
  useEffect(() => {
    const handleResize = () => {
      const mobileScreenWidth = window.innerWidth <= 768;
      const mobileUserAgent =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const isMobileDevice = mobileUserAgent || mobileScreenWidth;
      setIsMobile(isMobileDevice);

      // If user resizes to mobile while on spatial tab, switch to unsplash
      if (isMobileDevice && activeTab === 'spatial') {
        setActiveTab('unsplash');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  // Data is now fetched server-side via SSR
  // Removed client-side fetching functions

  // Only initialize spatial photos data for Safari to save traffic - but ensure consistent SSR
  const spatialPhotos = spatialPhotosReady
    ? [
      // Beijing
      {
        id: 'summer-palace-pano-1',
        title: 'Summer Palace Panorama',
        url: 'https://cdn.1998.media/spatial/pano/SummerPalace1.HEIC',
        type: 'photo',
      },
      {
        id: 'summer-palace-pano-2',
        title: 'Summer Palace Panorama',
        url: 'https://cdn.1998.media/spatial/pano/SummerPalace2.HEIC',
      },
      {
        id: 'summer-palace-pano-3',
        title: 'Summer Palace Panorama',
        url: 'https://cdn.1998.media/spatial/pano/SummerPalace3.HEIC',
        type: 'photo',
      },
      {
        id: 'summer-palace-pano-4',
        title: 'Summer Palace Panorama',
        url: 'https://cdn.1998.media/spatial/pano/SummerPalace4.HEIC',
        type: 'photo',
      },
      {
        id: 'shichahai-pano-1',
        title: 'Shichahai Panorama',
        url: 'https://cdn.1998.media/spatial/pano/Shichahai1.HEIC',
        type: 'photo',
      },
      {
        id: 'shichahai-pano-2',
        title: 'Shichahai Panorama',
        url: 'https://cdn.1998.media/spatial/pano/Shichahai2.HEIC',
        type: 'photo',
      },
      // Osaka (Expo)
      {
        id: 'osaka-expo-pano',
        title: 'Osaka Expo Panorama',
        url: 'https://cdn.1998.media/spatial/pano/OsakaExpo.HEIC',
        type: 'photo',
      },
      {
        id: 'osaka-expo-east-gate',
        title: 'Osaka Expo East Gate',
        url: 'https://cdn.1998.media/spatial/photo/OsakaExpoEastGate.HEIC',
        type: 'photo',
      },
      {
        id: 'osaka-expo-water-plaza',
        title: 'Osaka Expo Water Plaza',
        url: 'https://cdn.1998.media/spatial/photo/OsakaExpoWaterPlaza.HEIC',
        type: 'photo',
      },
      // Changsha
      {
        id: 'juzizhou-pano',
        title: 'Juzizhou Panorama',
        url: 'https://cdn.1998.media/spatial/pano/Juzizhou.HEIC',
        type: 'photo',
      },
      {
        id: 'juzizhou',
        title: 'Juzizhou',
        url: 'https://cdn.1998.media/spatial/photo/JuzizhouByMing.HEIC',
        type: 'photo',
      },
      {
        id: 'changsha-south-station',
        title: 'Changsha South Station',
        url: 'https://cdn.1998.media/spatial/photo/ChangshaSouthStationByMing.HEIC',
        type: 'photo',
      },
      // Tokyo
      {
        id: 'tokyo-tower-night-video',
        title: 'Tokyo Tower Night',
        url: 'https://cdn.1998.media/spatial/video/TokyoTowerNight.MOV',
        type: 'video',
      },
      {
        id: 'akasaka-palace',
        title: 'Akasaka Palace',
        url: 'https://cdn.1998.media/spatial/photo/AkasakaPalaceByMing.HEIC',
        type: 'photo',
      },
      // San Francisco
      {
        id: 'golden-gate-bridge',
        title: 'Golden Gate Bridge',
        url: 'https://cdn.1998.media/spatial/photo/GoldenGateBridgeByMing.HEIC',
        type: 'photo',
      },
      {
        id: 'sf-sea-video',
        title: 'San Francisco Sea',
        url: 'https://cdn.1998.media/spatial/video/SanFranciscoSea.MOV',
        type: 'video',
      },
      {
        id: 'sf-night-pano',
        title: 'San Francisco Night Panorama',
        url: 'https://cdn.1998.media/spatial/pano/SanFranciscoNight.HEIC',
        type: 'photo',
      },
      // Nagoya
      {
        id: 'nagoya-rocket-video',
        title: 'Nagoya Rocket',
        url: 'https://cdn.1998.media/spatial/video/NagoyaRocket.MOV',
        type: 'video',
      },
      {
        id: 'nagoya-station-day-video',
        title: 'Nagoya Station Day',
        url: 'https://cdn.1998.media/spatial/video/NagoyaStationDay.MOV',
        type: 'video',
      },
      {
        id: 'nagoya-station-night-video',
        title: 'Nagoya Station Night',
        url: 'https://cdn.1998.media/spatial/video/NagoyaStationNight.MOV',
        type: 'video',
      },
      {
        id: 'nagoya-night-pano',
        title: 'Nagoya Station Night Panorama',
        url: 'https://cdn.1998.media/spatial/pano/NagoyaStationNight.HEIC',
        type: 'photo',
      },
      {
        id: 'nagoya-station-day1',
        title: 'Nagoya Station Day',
        url: 'https://cdn.1998.media/spatial/photo/NagoyaStationDay1ByMing.HEIC',
        type: 'photo',
      },
      {
        id: 'nagoya-station-night1',
        title: 'Nagoya Station Night',
        url: 'https://cdn.1998.media/spatial/photo/NagoyaStationNight1ByMing.HEIC',
        type: 'photo',
      },
      {
        id: 'nagoya-station-day2',
        title: 'Nagoya Station Day',
        url: 'https://cdn.1998.media/spatial/photo/NagoyaStationDay2ByMing.HEIC',
        type: 'photo',
      },
    ]
    : [];

  const totalReleases = photos.length;
  const avgViews = Math.floor(totalViews / (totalReleases || 1))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Update main tab styles when active tab changes
  useEffect(() => {
    const updateMainTabStyles = () => {
      const activeTabElement = mainTabRefs.current[activeTab];
      if (activeTabElement && activeTabElement.offsetParent !== null) {
        const parent = activeTabElement.parentElement;
        const parentRect = parent.getBoundingClientRect();
        const activeRect = activeTabElement.getBoundingClientRect();

        setMainTabStyles({
          left: `${activeRect.left - parentRect.left}px`,
          width: `${activeRect.width}px`,
        });
      }
    };

    updateMainTabStyles();
    const timeoutId = setTimeout(updateMainTabStyles, 50);
    return () => clearTimeout(timeoutId);
  }, [activeTab, props.i18n]);

  // Update filter tab styles when spatial filter changes
  useEffect(() => {
    const updateFilterTabStyles = () => {
      const activeFilterElement = filterTabRefs.current[spatialFilter];
      if (activeFilterElement && activeFilterElement.offsetParent !== null) {
        const parent = activeFilterElement.parentElement;
        const parentRect = parent.getBoundingClientRect();
        const activeRect = activeFilterElement.getBoundingClientRect();

        setFilterTabStyles({
          left: `${activeRect.left - parentRect.left}px`,
          width: `${activeRect.width}px`,
        });
      }
    };

    updateFilterTabStyles();
    const timeoutId = setTimeout(updateFilterTabStyles, 50);
    return () => clearTimeout(timeoutId);
  }, [spatialFilter, props.i18n]);

  // Handle spatial filter change with animation
  const handleSpatialFilterChange = (newFilter) => {
    if (newFilter === spatialFilter) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setSpatialFilter(newFilter);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 250);
  };

  // Filter spatial photos based on spatial filter
  const getFilteredSpatialPhotos = () => {
    const filtered = (() => {
      switch (spatialFilter) {
        case 'photo':
          return spatialPhotos.filter(
            (photo) =>
              photo.type === 'photo' &&
              (!photo.id || !photo.id.includes('pano'))
          );
        case 'video':
          return spatialPhotos.filter((photo) => photo.type === 'video');
        case 'panorama':
          return spatialPhotos.filter(
            (photo) =>
              photo.type === 'photo' && photo.id && photo.id.includes('pano')
          );
        case 'all':
        default:
          return spatialPhotos;
      }
    })();

    console.log(
      'Filtered spatial photos:',
      filtered.length,
      'Filter:',
      spatialFilter
    );
    if (spatialFilter === 'panorama' || spatialFilter === 'all') {
      const panos = filtered.filter(
        (photo) => photo.id && photo.id.includes('pano')
      );
      console.log(
        'Panorama photos found:',
        panos.length,
        panos.map((p) => p.id)
      );
    }

    return filtered;
  };

  // Render spatial tab content only for Safari on desktop
  const renderSpatialTab = () => {
    if (!isClient || !isSafari || isMobile) return null;

    return (
      <div className="w-full px-1">
        <div className="relative overflow-hidden">
          <div
            className="transition-all duration-500 ease-in-out"
            style={{
              transform: isTransitioning ? 'translateX(20px)' : 'translateX(0)',
              opacity: isTransitioning ? 0 : 1,
            }}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {getFilteredSpatialPhotos().map((photo) => (
                <div
                  key={photo.id}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-[0.98] border border-transparent hover:border-black dark:hover:border-white xl:rounded-[25px]"
                >
                  {photo.type === 'video' ? (
                    <div
                      className={`relative h-[25vh] w-full -mb-14 ${isSpatialPhoto &&
                          selectedImage === photo.url &&
                          isDialogOpen
                          ? 'cursor-default'
                          : 'cursor-pointer'
                        }`}
                      onClick={
                        !(
                          isSpatialPhoto &&
                          selectedImage === photo.url &&
                          isDialogOpen
                        )
                          ? () => handleClick(photo)
                          : undefined
                      }
                    >
                      <video
                        src={photo.url}
                        muted
                        autoPlay
                        loop
                        playsInline
                        controls={false}
                        className="absolute inset-0 w-full h-full object-cover rounded-t-2xl"
                        style={{ zIndex: 1 }}
                      />
                    </div>
                  ) : (
                    <div className="relative h-[25vh] w-full -mb-14 overflow-hidden">
                      {photo.id && photo.id.includes('pano') ? (
                        <div
                          key={`pano-${photo.id}`}
                          className={`flex h-full animate-pan-slow ${isSpatialPhoto &&
                              selectedImage === photo.url &&
                              isDialogOpen
                              ? 'cursor-default'
                              : 'cursor-pointer'
                            }`}
                          {...(!(
                            isSpatialPhoto &&
                            selectedImage === photo.url &&
                            isDialogOpen
                          ) && {
                            onClick: () => handleClick(photo),
                          })}
                          onAnimationStart={() =>
                            console.log(
                              'Panorama animation started for:',
                              photo.id
                            )
                          }
                        >
                          <img
                            loading="lazy"
                            className="h-full min-w-full object-cover object-left flex-shrink-0"
                            src={photo.url}
                            alt={photo.title}
                          />
                          <img
                            loading="lazy"
                            className="h-full min-w-full object-cover object-center flex-shrink-0"
                            src={photo.url}
                            alt={photo.title}
                          />
                          <img
                            loading="lazy"
                            className="h-full min-w-full object-cover object-right flex-shrink-0"
                            src={photo.url}
                            alt={photo.title}
                          />
                        </div>
                      ) : (
                        <img
                          loading="lazy"
                          className={`h-full w-full object-cover ${isSpatialPhoto &&
                              selectedImage === photo.url &&
                              isDialogOpen
                              ? 'cursor-default'
                              : 'cursor-pointer'
                            }`}
                          src={photo.url}
                          alt={photo.title}
                          {...(!(
                            isSpatialPhoto &&
                            selectedImage === photo.url &&
                            isDialogOpen
                          ) && {
                            onClick: () => handleClick(photo),
                          })}
                        />
                      )}
                    </div>
                  )}
                  <div className="p-1.5 z-[1]">
                    <h3 className="text-sm font-medium text-gray-100 flex items-center justify-between w-full">
                      <span className="flex-shrink-0 flex items-center">
                        <span className="rounded-xl bg-white/50 dark:bg-black/40 backdrop-blur-sm px-1.5 py-0.5">
                          {photo.type === 'video' ? (
                            <i
                              className="fal fa-video text-base dark:text-gray-400"
                              title="Spatial Video"
                            ></i>
                          ) : photo.id && photo.id.includes('pano') ? (
                            <i
                              className="fal fa-panorama text-base dark:text-gray-400"
                              title="Panorama"
                            ></i>
                          ) : (
                            <i
                              className="fal fa-cube text-base dark:text-gray-400"
                              title="Spatial Photo"
                            ></i>
                          )}
                        </span>
                      </span>
                      <span className="flex-1 text-right">
                        {i18n(photo.title)}
                      </span>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const stats = [
    {
      name: 'Total Views',
      stat: `${i18n('Over')} ${totalViews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
    },
    { name: 'Total Releases', stat: `${totalReleases}` },
    { name: 'Average Views', stat: `${i18n('Over')} ${avgViews}` },
  ];

  // Data is now fetched server-side via SSR, no need for client-side fetching

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageURL, setSelectedImageURL] = useState(null);
  const [isSpatialPhoto, setIsSpatialPhoto] = useState(false);

  const handleClick = (photo) => {
    const imageUrl = photo.urls?.raw || photo.url;
    const linkUrl = photo.links?.html || photo.url;
    const isSpatial = !photo.urls;
    if (
      isSpatial &&
      isSpatialPhoto &&
      selectedImage === imageUrl &&
      isDialogOpen
    ) {
      return;
    }
    if (isSpatial && photo.id && photo.id.includes('pano')) {
      setSelectedImage(imageUrl);
      setSelectedImageURL(linkUrl);
      setIsSpatialPhoto(isSpatial);
      setIsDialogOpen(false);
      setTimeout(() => {
        const img = document.getElementById('img');
        if (img && img.requestFullscreen) {
          img.requestFullscreen();
        }
      }, 100);
    } else if (isSpatial) {
      setSelectedImage(imageUrl);
      setSelectedImageURL(linkUrl);
      setIsSpatialPhoto(isSpatial);
      setIsDialogOpen(false);
      setTimeout(() => {
        const img = document.getElementById('img');
        if (img && img.requestFullscreen) {
          img.requestFullscreen();
        }
      }, 100);
    } else {
      setSelectedImage(imageUrl);
      setSelectedImageURL(linkUrl);
      setIsSpatialPhoto(isSpatial);
      setIsDialogOpen(true);
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedImage(null);
    setIsSpatialPhoto(false);
  };

  // Fetch data on component mount
  // Data is now fetched server-side via SSR, no need for client-side fetching

  return (
    <>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div id="gallery" className="pt-16 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <a
              className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl"
              href="#gallery"
            >
              {i18n('Gallery')}
              <i className="far fa-eyes ml-2"></i>
            </a>
            <div className="relative flex bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-2xl p-1 border border-gray-200 dark:border-gray-700 xl:rounded-[20px]">
              {/* Sliding Background for Main Tabs */}
              <div
                className="absolute top-1 bottom-1 bg-emerald-600 rounded-xl transition-all duration-300 ease-out shadow-sm pointer-events-none"
                style={mainTabStyles}
              />
              <button
                ref={(el) => (mainTabRefs.current['unsplash'] = el)}
                onClick={() => setActiveTab('unsplash')}
                className={`relative z-10 p-2 text-sm font-medium rounded-xl transition-all duration-300 ${activeTab === 'unsplash'
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
              >
                <i className="fab fa-unsplash mr-1"></i>
                Unsplash
              </button>
              <button
                ref={(el) => (mainTabRefs.current['spatial'] = el)}
                onClick={(e) => {
                  if (!isClient || !isSafari || isMobile) {
                    e.preventDefault();
                    alert(
                      i18n('Only Safari on Vision Pro/Desktop is supported.')
                    );
                    return;
                  }
                  setActiveTab('spatial');
                }}
                className={`relative z-10 p-2 text-sm font-medium rounded-xl transition-all duration-300 ${!isClient || !isSafari || isMobile
                    ? 'bg-transparent text-gray-400 opacity-60 cursor-not-allowed'
                    : activeTab === 'spatial'
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                type="button"
              >
                <i className="fas fa-cube mr-1"></i>
                {i18n('Spatial')}
              </button>
            </div>
          </div>
          {/* Spatial Filter Tabs - Only show when Spatial tab is active, Safari is detected, and not mobile */}
          {activeTab === 'spatial' && isClient && isSafari && !isMobile && (
            <div className="flex justify-center mt-4">
              <div className="relative flex bg-white/30 dark:bg-black/30 backdrop-blur-md rounded-2xl p-1 border border-gray-200/50 dark:border-gray-700/50">
                {/* Sliding Background */}
                <div
                  className="absolute top-1 bottom-1 bg-emerald-500 rounded-xl transition-all duration-300 ease-out shadow-sm pointer-events-none"
                  style={filterTabStyles}
                />
                <button
                  ref={(el) => (filterTabRefs.current['all'] = el)}
                  onClick={() => handleSpatialFilterChange('all')}
                  className={`relative z-10 px-3 py-1.5 text-xs font-medium rounded-xl transition-all duration-300 ${spatialFilter === 'all'
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                >
                  <i className="fas fa-th mr-1"></i>
                  {i18n('ALL')}
                </button>
                <button
                  ref={(el) => (filterTabRefs.current['photo'] = el)}
                  onClick={() => handleSpatialFilterChange('photo')}
                  className={`relative z-10 px-3 py-1.5 text-xs font-medium rounded-xl transition-all duration-300 ${spatialFilter === 'photo'
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                >
                  <i className="fal fa-cube mr-1"></i>
                  {i18n('Spatial Photo')}
                </button>
                <button
                  ref={(el) => (filterTabRefs.current['video'] = el)}
                  onClick={() => handleSpatialFilterChange('video')}
                  className={`relative z-10 px-3 py-1.5 text-xs font-medium rounded-xl transition-all duration-300 ${spatialFilter === 'video'
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                >
                  <i className="fal fa-video mr-1"></i>
                  {i18n('Spatial Video')}
                </button>
                <button
                  ref={(el) => (filterTabRefs.current['panorama'] = el)}
                  onClick={() => handleSpatialFilterChange('panorama')}
                  className={`relative z-10 px-3 py-1.5 text-xs font-medium rounded-xl transition-all duration-300 ${spatialFilter === 'panorama'
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                >
                  <i className="fal fa-panorama mr-1"></i>
                  {i18n('Panorama')}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="relative my-6 max-w-7xl mx-auto">
          <div className="relative overflow-hidden">
            {/* Unsplash Tab */}
            <div
              ref={unsplashTabRef}
              className={`w-full px-1 transition-all duration-500 ease-in-out ${activeTab === 'unsplash'
                  ? 'relative translate-x-0 opacity-100'
                  : 'absolute top-0 left-0 -translate-x-full opacity-0 pointer-events-none'
                }`}
            >
              <dl className="bg-white/50 dark:bg-black/50 backdrop-blur-md grid grid-cols-1 overflow-hidden rounded-xl shadow md:grid-cols-3 divide-y divide-gray-200 dark:divide-gray-800 md:divide-y-0 md:divide-x backlight xl:rounded-[25px]">
                {stats.map((item) => (
                  <div key={item.name} className="px-4 py-5 sm:p-6">
                    <dt className="flex items-baseline justify-between gap-1">
                      <div className="text-base font-normal text-gray-900 dark:text-gray-100">
                        {i18n(item.name)}
                      </div>
                      <div className="bg-green-800 text-green-100 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0">
                        <i className="flex-shrink-0 self-center fa fa-arrow-up-right" />
                      </div>
                    </dt>
                    <dd className="mt-1 flex items-baseline justify-between md:block">
                      <div className="flex items-baseline text-2xl font-semibold text-emerald-600">
                        {item.stat}
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="grid grid-cols-1 gap-4 my-5 sm:grid-cols-2 lg:grid-cols-3">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="group flex flex-col rounded-xl overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-[0.98] border border-transparent hover:border-black dark:hover:border-white xl:rounded-[25px]"
                  >
                    <img
                      loading="lazy"
                      className="h-[25vh] w-full object-cover cursor-pointer"
                      src={photo.urls.raw}
                      alt={photo.alt_description}
                      onClick={() => handleClick(photo)}
                    />
                    <Tooltip
                      content={photo.color}
                      placement="right"
                      className="p-1 border text-xs dark:text-white bg-white dark:bg-black rounded-2xl"
                    >
                      <div
                        className={`opacity-0 group-hover:opacity-100 absolute bottom-0 h-7 border-t border-r rounded-tr-md duration-500 transition-all`}
                        style={{ backgroundColor: photo.color }}
                      >
                        {Object.entries(photo.topic_submissions).map(
                          ([topic, submission]) =>
                            submission.status === 'approved' ? (
                              <span className="p-1.5 text-white text-sm">
                                <i className="fa fa-crown"></i> Featured in{' '}
                                {topic.replaceAll('-', ' ')}
                              </span>
                            ) : (
                              <span className="p-1.5 text-white text-sm">
                                <i className="fa fa-thumbs-up"></i>
                              </span>
                            )
                        )}
                      </div>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </div>
            {/* Spatial Tab - Only render for Safari to save traffic */}
            <div
              ref={spatialTabRef}
              className={`w-full transition-all duration-500 ease-in-out ${activeTab === 'spatial'
                  ? 'relative translate-x-0 opacity-100'
                  : 'absolute top-0 left-0 translate-x-full opacity-0 pointer-events-none'
                }`}
            >
              {renderSpatialTab()}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed z-[101] inset-0 overflow-y-auto transition-all ease-out duration-500 ${isDialogOpen ? 'opacity-100 bg-gray-300/80 dark:bg-gray-800/80 backdrop-blur-lg' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 transition-all"
            aria-hidden="true"
            onClick={handleClose}
          >
            <div className="absolute inset-0 cursor-alias transition-all"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <a href={selectedImageURL} target="_blank">
            {isSpatialPhoto &&
              selectedImage &&
              selectedImage.endsWith('.MOV') ? (
              <video
                id="img"
                src={selectedImage}
                className="relative w-[80vw] h-[80vh] object-cover rounded-3xl"
                autoPlay
                muted
                playsInline
                controls
                poster="https://cdn.1998.media/spatial/video/SanFranciscoSea.MOV.jpg"
              />
            ) : (
              <img
                id={isSpatialPhoto ? 'img' : undefined}
                loading="lazy"
                src={selectedImage}
                alt="Selected"
                className="relative w-[80vw] h-[80vh] object-cover rounded-3xl"
              />
            )}
          </a>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { locale } = context.params;

  try {
    const [i18nData, unsplashData] = await Promise.all([
      fetchI18nData(locale),
      fetchUnsplashData(),
    ]);

    return {
      props: {
        i18n: i18nData,
        unsplashData,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        i18n: {},
        unsplashData: { stats: null, photos: [] },
      },
    };
  }
}

async function fetchUnsplashData() {
  try {
    const unsplashPublicKey = 'hjm0tzh_dDQx2REubp1NiT1P4jxE5wmnCbKQLbD-BZ8';
    const [statsResponse, photosResponse] = await Promise.all([
      fetch(
        `https://api.unsplash.com/users/1998media/statistics?client_id=${unsplashPublicKey}`
      ),
      fetch(
        `https://api.unsplash.com/users/1998media/photos?client_id=${unsplashPublicKey}`
      ),
    ]);

    const stats = statsResponse.ok ? await statsResponse.json() : null;
    const photos = photosResponse.ok ? await photosResponse.json() : [];

    return {
      stats: stats ? { totalViews: stats.views?.total || 0 } : null,
      photos,
    };
  } catch (error) {
    console.error('Error fetching Unsplash data:', error);
    return { stats: null, photos: [] };
  }
}
