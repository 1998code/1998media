import { useState, useEffect, useRef } from 'react';
import { Tooltip } from '@nextui-org/tooltip';
import { fetchI18nData } from '../../lib/fetchData';

export const runtime = 'experimental-edge';

export default function Gallery(props) {
  function i18n(key) {
    if (props.i18n && props.i18n['gallery'] && !props.i18n['gallery'][key]) {
      // Translation missing - silently use key
    }
    return props.i18n && props.i18n['gallery'] && props.i18n['gallery'][key]
      ? props.i18n['gallery'][key]
      : key;
  }

  const locale = props.locale || 'en';
  const isZhCN = locale === 'zh-CN' || locale === 'zh';

  const unsplashPublicKey = 'hjm0tzh_dDQx2REubp1NiT1P4jxE5wmnCbKQLbD-BZ8';
  // Always start with 'xiaohongshu' for zh-CN, 'unsplash' for others
  const [activeTab, setActiveTab] = useState(
    isZhCN ? 'xiaohongshu' : 'unsplash'
  );
  const [spatialFilter, setSpatialFilter] = useState('all');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const unsplashData = props.unsplashData || { stats: null, photos: [] };

  // Xiaohongshu (小紅書) data - static stats
  const xiaohongshuData = {
    profileUrl:
      'https://www.xiaohongshu.com/user/profile/6662438f00000000030300c4',
    totalExposure: 5094666 + 187666,
    totalWorks: 168 + 30,
    totalWatchDuration: ((2789 + 365) * (1480078 + 31930)) / 60,
    featuredPhotos: [
      {
        id: 'xhs-1',
        url: 'https://cdn.1998.media/xhs/1.jpeg',
        title: 'Featured 1',
      },
      {
        id: 'xhs-2',
        url: 'https://cdn.1998.media/xhs/2.jpeg',
        title: 'Featured 2',
      },
      {
        id: 'xhs-3',
        url: 'https://cdn.1998.media/xhs/3.jpeg',
        title: 'Featured 3',
      },
      {
        id: 'xhs-4',
        url: 'https://cdn.1998.media/xhs/4.jpeg',
        title: 'Featured 4',
      },
      {
        id: 'xhs-5',
        url: 'https://cdn.1998.media/xhs/5.jpeg',
        title: 'Featured 5',
      },
      {
        id: 'xhs-6',
        url: 'https://cdn.1998.media/xhs/6.jpeg',
        title: 'Featured 6',
      },
      {
        id: 'xhs-7',
        url: 'https://cdn.1998.media/xhs/7.jpeg',
        title: 'Featured 7',
      },
      {
        id: 'xhs-8',
        url: 'https://cdn.1998.media/xhs/8.jpeg',
        title: 'Featured 8',
      },
    ],
  };
  const [totalViews, setTotalViews] = useState(
    unsplashData.stats?.totalViews || 0
  );
  const [photos, setPhotos] = useState(unsplashData.photos || []);

  useEffect(() => {
    if (unsplashData.stats?.totalViews) {
      setTotalViews(unsplashData.stats.totalViews);
    }
    if (unsplashData.photos?.length) {
      setPhotos(unsplashData.photos);
    }
  }, [unsplashData]);
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
  const unsplashScrollRef = useRef(null);
  const xhsScrollRef = useRef(null);
  const xhsScrollRef2 = useRef(null);
  const [isPausedUnsplash, setIsPausedUnsplash] = useState(false);

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
        setSpatialPhotosReady(true);
      }, 100);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type');

    if (typeParam?.toLowerCase() === 'spatial') {
      if (safariDetection && !isMobileDevice) {
        setActiveTab('spatial');
      } else {
        // Not Safari or Mobile - show alert and stay on Unsplash (don't set spatial tab)
        alert(
          i18n(
            'Only Safari on Vision Pro/Desktop is supported for Spatial content.'
          )
        );
        // Ensure we're on Unsplash tab
        setActiveTab('unsplash');
      }
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

  // Auto-scroll for Unsplash photos
  useEffect(() => {
    const unsplashContainer = unsplashScrollRef.current;
    if (!unsplashContainer || activeTab !== 'unsplash') return;

    let isUserScrolling = false;
    let scrollTimeout;
    let animationFrame;

    const handleInteraction = () => {
      isUserScrolling = true;
      setIsPausedUnsplash(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
        setIsPausedUnsplash(false);
      }, 3000);
    };

    const autoScroll = () => {
      if (!isUserScrolling && unsplashContainer) {
        unsplashContainer.scrollLeft += 0.5;
        // Reset to start when reaching the end (seamless loop)
        if (unsplashContainer.scrollLeft >= unsplashContainer.scrollWidth / 2) {
          unsplashContainer.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    unsplashContainer.addEventListener('wheel', handleInteraction, {
      passive: true,
    });
    unsplashContainer.addEventListener('touchstart', handleInteraction);
    unsplashContainer.addEventListener('touchmove', handleInteraction);
    unsplashContainer.addEventListener('mousedown', handleInteraction);

    animationFrame = requestAnimationFrame(autoScroll);

    return () => {
      unsplashContainer.removeEventListener('wheel', handleInteraction);
      unsplashContainer.removeEventListener('touchstart', handleInteraction);
      unsplashContainer.removeEventListener('touchmove', handleInteraction);
      unsplashContainer.removeEventListener('mousedown', handleInteraction);
      cancelAnimationFrame(animationFrame);
      clearTimeout(scrollTimeout);
    };
  }, [activeTab, photos]);

  // Auto-scroll for XHS photos - Row 1 (Left to Right)
  useEffect(() => {
    const xhsContainer = xhsScrollRef.current;
    if (!xhsContainer || activeTab !== 'xiaohongshu') return;

    let isUserScrolling = false;
    let scrollTimeout;
    let animationFrame;

    const handleInteraction = () => {
      isUserScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 3000);
    };

    const autoScroll = () => {
      if (!isUserScrolling && xhsContainer) {
        xhsContainer.scrollLeft += 0.5;
        // Reset to start when reaching the end (seamless loop)
        if (xhsContainer.scrollLeft >= xhsContainer.scrollWidth / 2) {
          xhsContainer.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    xhsContainer.addEventListener('wheel', handleInteraction, {
      passive: true,
    });
    xhsContainer.addEventListener('touchstart', handleInteraction);
    xhsContainer.addEventListener('touchmove', handleInteraction);
    xhsContainer.addEventListener('mousedown', handleInteraction);

    animationFrame = requestAnimationFrame(autoScroll);

    return () => {
      xhsContainer.removeEventListener('wheel', handleInteraction);
      xhsContainer.removeEventListener('touchstart', handleInteraction);
      xhsContainer.removeEventListener('touchmove', handleInteraction);
      xhsContainer.removeEventListener('mousedown', handleInteraction);
      cancelAnimationFrame(animationFrame);
      clearTimeout(scrollTimeout);
    };
  }, [activeTab, xiaohongshuData]);

  // Auto-scroll for XHS photos - Row 2 (Right to Left)
  useEffect(() => {
    const xhsContainer = xhsScrollRef2.current;
    if (!xhsContainer || activeTab !== 'xiaohongshu') return;

    let isUserScrolling = false;
    let scrollTimeout;
    let animationFrame;

    const handleInteraction = () => {
      isUserScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 3000);
    };

    const autoScroll = () => {
      if (!isUserScrolling && xhsContainer) {
        xhsContainer.scrollLeft -= 0.5;
        // Reset to end when reaching the start (seamless loop)
        if (xhsContainer.scrollLeft <= 0) {
          xhsContainer.scrollLeft = xhsContainer.scrollWidth / 2;
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    // Initialize position to half for smooth reverse loop
    if (xhsContainer.scrollLeft === 0) {
      xhsContainer.scrollLeft = xhsContainer.scrollWidth / 2;
    }

    xhsContainer.addEventListener('wheel', handleInteraction, {
      passive: true,
    });
    xhsContainer.addEventListener('touchstart', handleInteraction);
    xhsContainer.addEventListener('touchmove', handleInteraction);
    xhsContainer.addEventListener('mousedown', handleInteraction);

    animationFrame = requestAnimationFrame(autoScroll);

    return () => {
      xhsContainer.removeEventListener('wheel', handleInteraction);
      xhsContainer.removeEventListener('touchstart', handleInteraction);
      xhsContainer.removeEventListener('touchmove', handleInteraction);
      xhsContainer.removeEventListener('mousedown', handleInteraction);
      cancelAnimationFrame(animationFrame);
      clearTimeout(scrollTimeout);
    };
  }, [activeTab, xiaohongshuData]);

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
          url: 'https://cdn.1998.media/spatial/photo/Juzizhou.HEIC',
          type: 'photo',
        },
        {
          id: 'changsha-south-station',
          title: 'Changsha South Station',
          url: 'https://cdn.1998.media/spatial/photo/ChangshaSouthStation.HEIC',
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
          url: 'https://cdn.1998.media/spatial/photo/AkasakaPalace.HEIC',
          type: 'photo',
        },
        // San Francisco
        {
          id: 'golden-gate-bridge',
          title: 'Golden Gate Bridge',
          url: 'https://cdn.1998.media/spatial/photo/GoldenGateBridge.HEIC',
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
          url: 'https://cdn.1998.media/spatial/photo/NagoyaStationDay1.HEIC',
          type: 'photo',
        },
        {
          id: 'nagoya-station-night1',
          title: 'Nagoya Station Night',
          url: 'https://cdn.1998.media/spatial/photo/NagoyaStationNight1.HEIC',
          type: 'photo',
        },
        {
          id: 'nagoya-station-day2',
          title: 'Nagoya Station Day',
          url: 'https://cdn.1998.media/spatial/photo/NagoyaStationDay2.HEIC',
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
    if (!isClient) return;

    const updateMainTabStyles = () => {
      const activeTabElement = mainTabRefs.current[activeTab];
      if (activeTabElement && activeTabElement.offsetParent !== null) {
        const parent = activeTabElement.parentElement;
        if (!parent) return;
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
  }, [activeTab, props.i18n, isClient]);

  // Update filter tab styles when spatial filter changes
  useEffect(() => {
    if (!isClient) return;

    const updateFilterTabStyles = () => {
      const activeFilterElement = filterTabRefs.current[spatialFilter];
      if (activeFilterElement && activeFilterElement.offsetParent !== null) {
        const parent = activeFilterElement.parentElement;
        if (!parent) return;
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
  }, [spatialFilter, props.i18n, isClient]);

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

    if (spatialFilter === 'panorama' || spatialFilter === 'all') {
      const panos = filtered.filter(
        (photo) => photo.id && photo.id.includes('pano')
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
                      className={`relative h-[25vh] w-full -mb-14 ${
                        isSpatialPhoto &&
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
                          className={`flex h-full animate-pan-slow ${
                            isSpatialPhoto &&
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
                          onAnimationStart={() => {}}
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
                          className={`h-full w-full object-cover ${
                            isSpatialPhoto &&
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

  const unsplashScrollRef2 = useRef(null);

  // Auto-scroll for Unsplash photos - Row 2 (Right to Left)
  useEffect(() => {
    const unsplashContainer = unsplashScrollRef2.current;
    if (!unsplashContainer || activeTab !== 'unsplash') return;

    let isUserScrolling = false;
    let scrollTimeout;
    let animationFrame;

    const handleInteraction = () => {
      isUserScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 3000);
    };

    const autoScroll = () => {
      if (!isUserScrolling && unsplashContainer) {
        unsplashContainer.scrollLeft -= 0.5;
        // Reset to end when reaching the start (seamless loop)
        if (unsplashContainer.scrollLeft <= 0) {
          unsplashContainer.scrollLeft = unsplashContainer.scrollWidth / 2;
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    // Initialize position to half for smooth reverse loop
    if (unsplashContainer.scrollLeft === 0) {
      unsplashContainer.scrollLeft = unsplashContainer.scrollWidth / 2;
    }

    unsplashContainer.addEventListener('wheel', handleInteraction, {
      passive: true,
    });
    unsplashContainer.addEventListener('touchstart', handleInteraction);
    unsplashContainer.addEventListener('touchmove', handleInteraction);
    unsplashContainer.addEventListener('mousedown', handleInteraction);

    animationFrame = requestAnimationFrame(autoScroll);

    return () => {
      unsplashContainer.removeEventListener('wheel', handleInteraction);
      unsplashContainer.removeEventListener('touchstart', handleInteraction);
      unsplashContainer.removeEventListener('touchmove', handleInteraction);
      unsplashContainer.removeEventListener('mousedown', handleInteraction);
      cancelAnimationFrame(animationFrame);
      clearTimeout(scrollTimeout);
    };
  }, [activeTab, photos]);

  return (
    <>
      <div className="relative h-full w-full max-w-7xl mx-auto flex flex-col items-start px-4 sm:px-6 lg:px-8 pt-24 overflow-hidden">
        <div id="gallery" className="w-full">
          <div className="flex flex-wrap items-center justify-between gap-3">
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
                className={`absolute top-1 bottom-1 rounded-xl transition-all duration-300 ease-out shadow-sm pointer-events-none ${
                  activeTab === 'xiaohongshu' ? 'bg-red-500' : 'bg-emerald-600'
                }`}
                style={mainTabStyles}
              />
              {/* Xiaohongshu Tab - Only show for zh-CN locale */}
              {isZhCN && (
                <button
                  ref={(el) => (mainTabRefs.current['xiaohongshu'] = el)}
                  onClick={() => setActiveTab('xiaohongshu')}
                  className={`relative z-10 p-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                    activeTab === 'xiaohongshu'
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  <i className="fab fa-redhat mr-1"></i>
                  小红书
                </button>
              )}
              <button
                ref={(el) => (mainTabRefs.current['unsplash'] = el)}
                onClick={() => setActiveTab('unsplash')}
                className={`relative z-10 p-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                  activeTab === 'unsplash'
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
                className={`relative z-10 p-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                  !isClient || !isSafari || isMobile
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
                  className={`relative z-10 px-3 py-1.5 text-xs font-medium rounded-xl transition-all duration-300 ${
                    spatialFilter === 'all'
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
                  className={`relative z-10 px-3 py-1.5 text-xs font-medium rounded-xl transition-all duration-300 ${
                    spatialFilter === 'photo'
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
                  className={`relative z-10 px-3 py-1.5 text-xs font-medium rounded-xl transition-all duration-300 ${
                    spatialFilter === 'video'
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
                  className={`relative z-10 px-3 py-1.5 text-xs font-medium rounded-xl transition-all duration-300 ${
                    spatialFilter === 'panorama'
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
        <div className="relative my-2 w-full">
          <div className="relative overflow-hidden">
            {/* Xiaohongshu Tab - Only show for zh-CN locale */}
            {isZhCN && (
              <div
                className={`w-full px-1 transition-all duration-500 ease-in-out ${
                  activeTab === 'xiaohongshu'
                    ? 'relative translate-x-0 opacity-100'
                    : 'absolute top-0 left-0 -translate-x-full opacity-0 pointer-events-none'
                }`}
              >
                <dl className="bg-white/50 dark:bg-black/50 backdrop-blur-md grid grid-cols-1 overflow-hidden rounded-xl shadow md:grid-cols-3 divide-y divide-gray-200 dark:divide-gray-800 md:divide-y-0 md:divide-x xl:rounded-[25px]">
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="flex items-baseline justify-between gap-1">
                      <div className="text-base font-normal text-gray-900 dark:text-gray-100">
                        總曝光量
                      </div>
                      <div className="bg-red-600 text-red-100 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0">
                        <i className="flex-shrink-0 self-center fa fa-arrow-up-right" />
                      </div>
                    </dt>
                    <dd className="mt-1 flex items-baseline justify-between md:block">
                      <div className="flex items-baseline text-2xl font-semibold text-red-500">
                        {i18n('Over')}{' '}
                        {xiaohongshuData.totalExposure
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </div>
                    </dd>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="flex items-baseline justify-between gap-1">
                      <div className="text-base font-normal text-gray-900 dark:text-gray-100">
                        作品
                      </div>
                      <div className="bg-red-600 text-red-100 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0">
                        <i className="flex-shrink-0 self-center fa fa-arrow-up-right" />
                      </div>
                    </dt>
                    <dd className="mt-1 flex items-baseline justify-between md:block">
                      <div className="flex items-baseline text-2xl font-semibold text-red-500">
                        {i18n('Over')} {xiaohongshuData.totalWorks}
                      </div>
                    </dd>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="flex items-baseline justify-between gap-1">
                      <div className="text-base font-normal text-gray-900 dark:text-gray-100">
                        观看總时长
                      </div>
                      <div className="bg-red-600 text-red-100 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0">
                        <i className="flex-shrink-0 self-center fa fa-arrow-up-right" />
                      </div>
                    </dt>
                    <dd className="mt-1 flex items-baseline justify-between md:block">
                      <div className="flex items-baseline text-2xl font-semibold text-red-500">
                        {i18n('Over')}{' '}
                        {Math.floor(xiaohongshuData.totalWatchDuration / 3600)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                        小时
                      </div>
                    </dd>
                  </div>
                </dl>
                {/* Xiaohongshu Row 1 (Left to Right) */}
                <div
                  ref={xhsScrollRef}
                  className="overflow-x-auto my-4 scrollbar-hide"
                >
                  <div className="flex gap-5">
                    {/* Duplicate photos for seamless infinite scroll */}
                    {[
                      ...xiaohongshuData.featuredPhotos,
                      ...xiaohongshuData.featuredPhotos,
                    ].map((photo, index) => (
                      <a
                        key={`${photo.id}-row1-${index}`}
                        href={xiaohongshuData.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex-shrink-0 w-[200px] rounded-xl overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-[0.98] border border-transparent hover:border-red-500 dark:hover:border-red-400 xl:rounded-[20px]"
                      >
                        <div className="aspect-[3/4] w-full">
                          <img
                            loading="lazy"
                            className="w-full h-full object-cover cursor-pointer"
                            src={photo.url}
                            alt={photo.title}
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Xiaohongshu Row 2 (Right to Left) */}
                <div
                  ref={xhsScrollRef2}
                  className="overflow-x-auto my-4 scrollbar-hide"
                >
                  <div className="flex gap-5">
                    {/* Duplicate and reverse for variation */}
                    {[
                      ...xiaohongshuData.featuredPhotos,
                      ...xiaohongshuData.featuredPhotos,
                    ]
                      .reverse()
                      .map((photo, index) => (
                        <a
                          key={`${photo.id}-row2-${index}`}
                          href={xiaohongshuData.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex-shrink-0 w-[200px] rounded-xl overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-[0.98] border border-transparent hover:border-red-500 dark:hover:border-red-400 xl:rounded-[20px]"
                        >
                          <div className="aspect-[3/4] w-full">
                            <img
                              loading="lazy"
                              className="w-full h-full object-cover cursor-pointer"
                              src={photo.url}
                              alt={photo.title}
                            />
                          </div>
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            )}
            {/* Unsplash Tab */}
            <div
              ref={unsplashTabRef}
              className={`w-full px-1 transition-all duration-500 ease-in-out ${
                activeTab === 'unsplash'
                  ? 'relative translate-x-0 opacity-100'
                  : 'absolute top-0 left-0 -translate-x-full opacity-0 pointer-events-none'
              }`}
            >
              <dl className="bg-white/50 dark:bg-black/50 backdrop-blur-md grid grid-cols-1 overflow-hidden rounded-xl shadow md:grid-cols-3 divide-y divide-gray-200 dark:divide-gray-800 md:divide-y-0 md:divide-x xl:rounded-[25px]">
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

              {/* Unsplash skeleton */}
              {props.isLoading && photos.length === 0 && (
                <div className="space-y-4 my-4 animate-pulse">
                  <div className="overflow-x-hidden">
                    <div className="flex gap-5">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="flex-shrink-0 w-[350px] h-[25vh] rounded-xl bg-gray-200 dark:bg-gray-800"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="overflow-x-hidden">
                    <div className="flex gap-5">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="flex-shrink-0 w-[350px] h-[25vh] rounded-xl bg-gray-200 dark:bg-gray-800"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Unsplash Row 1 (Left to Right) */}
              <div
                ref={unsplashScrollRef}
                className="overflow-x-auto my-4 scrollbar-hide"
              >
                <div className="flex gap-5">
                  {/* Duplicate photos for seamless infinite scroll */}
                  {[...photos, ...photos].map((photo, index) => (
                    <div
                      key={`${photo.id}-row1-${index}`}
                      className="group flex-shrink-0 relative rounded-xl overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-[0.98] border border-transparent hover:border-black dark:hover:border-white xl:rounded-[25px]"
                    >
                      <img
                        loading="lazy"
                        className="w-[350px] h-[25vh] object-cover cursor-pointer"
                        src={photo.urls.raw}
                        alt={photo.alt_description}
                        onClick={() => handleClick(photo)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Unsplash Row 2 (Right to Left) */}
              <div
                ref={unsplashScrollRef2}
                className="overflow-x-auto my-4 scrollbar-hide"
              >
                <div className="flex gap-5">
                  {/* Duplicate and reverse for variation */}
                  {[...photos, ...photos].reverse().map((photo, index) => (
                    <div
                      key={`${photo.id}-row2-${index}`}
                      className="group flex-shrink-0 relative rounded-xl overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-[0.98] border border-transparent hover:border-black dark:hover:border-white xl:rounded-[25px]"
                    >
                      <img
                        loading="lazy"
                        className="w-[350px] h-[25vh] object-cover cursor-pointer"
                        src={photo.urls.raw}
                        alt={photo.alt_description}
                        onClick={() => handleClick(photo)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Spatial Tab - Only render for Safari to save traffic */}
            <div
              ref={spatialTabRef}
              className={`w-full transition-all duration-500 ease-in-out ${
                activeTab === 'spatial'
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
  let { locale } = context.params;

  // Fallback to English if locale is not supported
  const supportedLocales = ['en', 'zh', 'zh-HK', 'ko', 'ja'];
  const normalizedLocale = locale?.includes('en')
    ? 'en'
    : locale?.includes('ja') || locale?.includes('jp')
      ? 'ja'
      : locale?.includes('ko') || locale?.includes('kr')
        ? 'ko'
        : locale?.includes('zh-TW') || locale?.includes('zh-MO')
          ? 'zh-HK'
          : locale?.includes('zh-CN')
            ? 'zh'
            : locale;

  if (!supportedLocales.includes(normalizedLocale)) {
    locale = 'en'; // Fallback to English
  } else {
    locale = normalizedLocale;
  }

  try {
    const [i18nData, unsplashData] = await Promise.all([
      fetchI18nData(locale),
      fetchUnsplashData(),
    ]);

    return {
      props: {
        i18n: i18nData,
        unsplashData,
        locale,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        i18n: {},
        unsplashData: { stats: null, photos: [] },
        locale: 'en',
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
