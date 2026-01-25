import React, { useState, useEffect, useRef, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Achievements(props) {
  const [hoveredAchievement, setHoveredAchievement] = useState(null);

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

  // Map achievements to their map coordinates and colors
  const achievementMapData = {
    'Developer Tools in Hong Kong': {
      coords: [113.9745954, 22.3526409],
      color: 'b8172a'
    },
    'Developer Tools in Maldives': {
      coords: [73.5089, 4.1755],
      color: 'dc143c'
    },
    'Developer Tools in Taiwan': {
      coords: [121.1945767, 25.0169013],
      color: '1f89e3'
    },
    'Developer Tools in the United Kingdom': {
      coords: [-9.7459993, 54.4364324],
      color: '0b236f'
    },
    'Developer Tools in the United States': {
      coords: [-95.7129, 37.0902],
      color: '0033a0'
    },
    'Developer Tools in Canada': {
      coords: [-106.3468, 56.1304],
      color: 'ff0000'
    },
    'Graphics & Design App in Uzbekistan': {
      coords: [64.5853, 41.3775],
      color: '0099b5'
    },
    'Developer Tools in Kuwait': {
      coords: [47.4818, 29.3117],
      color: '007a3d'
    },
  };

  const achievements = [
    {
      year: '2024',
      title: 'Developer Tools in Maldives',
      rank: '#1',
      flag: '🇲🇻',
      color: 'text-red-600', // Red and green flag
    },
    {
      year: '2024',
      title: 'Developer Tools in Taiwan',
      rank: '#1',
      flag: '🇹🇼',
      color: 'text-blue-600', // Blue and red flag
    },
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
    {
      year: '2023',
      title: 'Developer Tools in the United States',
      rank: '#1',
      flag: '🇺🇸',
      color: 'text-blue-600', // Red, white, blue flag
    },
    {
      year: '2023',
      title: 'Developer Tools in Canada',
      rank: '#1',
      flag: '🇨🇦',
      color: 'text-red-600', // Red and white flag
    },
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

  // Map container ref
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);

  // Detect dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentMapStyleRef = useRef(null);

  // Update map style when dark mode changes
  const updateMapStyle = useCallback((isDark) => {
    if (!map.current || !map.current.loaded()) {
      return;
    }

    const newStyle = isDark ? 'dark_all' : 'light_all';
    
    // Prevent unnecessary updates if style hasn't changed
    if (currentMapStyleRef.current === newStyle) {
      return;
    }
    
    currentMapStyleRef.current = newStyle;
    
    // Remove existing source and layer
    if (map.current.getLayer('carto-basemap-layer')) {
      map.current.removeLayer('carto-basemap-layer');
    }
    if (map.current.getSource('carto-basemap')) {
      map.current.removeSource('carto-basemap');
    }

    // Add new source with updated style
    map.current.addSource('carto-basemap', {
      type: 'raster',
      tiles: [
        `https://a.basemaps.cartocdn.com/${newStyle}/{z}/{x}/{y}.png`,
        `https://b.basemaps.cartocdn.com/${newStyle}/{z}/{x}/{y}.png`,
        `https://c.basemaps.cartocdn.com/${newStyle}/{z}/{x}/{y}.png`,
      ],
      tileSize: 256,
      attribution: '',
    });

    // Add layer back
    map.current.addLayer({
      id: 'carto-basemap-layer',
      type: 'raster',
      source: 'carto-basemap',
    });
  }, []);

  useEffect(() => {
    // Check for dark mode - darkmode-js adds 'darkmode--activated' class to body
    // Priority: explicit toggle (darkmode-js) > Tailwind dark class > system preference
    const checkDarkMode = () => {
      if (typeof window !== 'undefined') {
        const hasDarkmodeClass = document.body.classList.contains('darkmode--activated');
        const hasDarkClass = document.documentElement.classList.contains('dark');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Check if darkmode-js widget exists (means user can toggle)
        const darkmodeWidget = document.querySelector('.darkmode-toggle');
        const hasDarkmodeWidget = !!darkmodeWidget;
        
        // If darkmode-js widget exists, prioritize its class over system preference
        // When user toggles, the class presence/absence is the source of truth
        let isDark;
        if (hasDarkmodeWidget) {
          // User has the toggle widget, so respect the explicit toggle
          isDark = hasDarkmodeClass;
        } else {
          // No widget yet, use Tailwind class or system preference
          isDark = hasDarkClass || prefersDark;
        }
        
        setIsDarkMode(isDark);
        return isDark;
      }
      return false;
    };

    const initialDark = checkDarkMode();

    // Watch for dark mode changes on both body and html
    const observer = new MutationObserver((mutations) => {
      // Check if class actually changed
      const hasClassChange = mutations.some(mutation => 
        mutation.type === 'attributes' && mutation.attributeName === 'class'
      );
      
      if (hasClassChange) {
        // Small delay to ensure class change is complete
        setTimeout(() => {
          const isDark = checkDarkMode();
          if (map.current && map.current.loaded()) {
            updateMapStyle(isDark);
          }
        }, 100);
      }
    });

    if (typeof window !== 'undefined') {
      // Observe body for darkmode--activated class (darkmode-js)
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class'],
        subtree: false,
      });
      
      // Also observe html for dark class (Tailwind)
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
        subtree: false,
      });

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', () => {
        setTimeout(() => {
          const isDark = checkDarkMode();
          if (map.current && map.current.loaded()) {
            updateMapStyle(isDark);
          }
        }, 50);
      });
      
      // Also add a periodic check as backup (every 500ms)
      // This ensures we catch dark mode changes even if MutationObserver misses them
      const intervalId = setInterval(() => {
        const isDark = checkDarkMode();
        if (map.current && map.current.loaded()) {
          const expectedStyle = isDark ? 'dark_all' : 'light_all';
          if (currentMapStyleRef.current !== expectedStyle) {
            updateMapStyle(isDark);
          }
        }
      }, 500);
      
      return () => {
        observer.disconnect();
        clearInterval(intervalId);
      };
    }

    return () => {
      observer.disconnect();
    };
  }, [updateMapStyle]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Get locale from props or detect from browser/system
    const getLocale = () => {
      // Try to get from props first
      if (props.locale) {
        return props.locale;
      }
      // Fall back to browser language
      if (typeof window !== 'undefined') {
        const browserLang = navigator.language || navigator.userLanguage || 'en';
        // Extract language code (e.g., 'zh-HK' -> 'zh-HK', 'en-US' -> 'en')
        if (browserLang.startsWith('zh')) {
          return browserLang.includes('HK') || browserLang.includes('TW') || browserLang.includes('MO') 
            ? 'zh-HK' 
            : 'zh';
        }
        if (browserLang.startsWith('ja')) return 'ja';
        if (browserLang.startsWith('ko')) return 'ko';
        return 'en';
      }
      return 'en';
    };

    const locale = getLocale();
    
    // Calculate center from all achievement coordinates
    const allCoords = Object.values(achievementMapData).map((data) => data.coords);
    const allLats = allCoords.map((c) => c[1]);
    const allLons = allCoords.map((c) => c[0]);
    const centerLat = (Math.min(...allLats) + Math.max(...allLats)) / 2;
    const centerLon = (Math.min(...allLons) + Math.max(...allLons)) / 2;

    // Determine initial style based on dark mode (check directly)
    // Priority: explicit toggle (darkmode-js) > Tailwind dark class > system preference
    const checkDarkMode = () => {
      if (typeof window !== 'undefined') {
        const hasDarkmodeClass = document.body.classList.contains('darkmode--activated');
        const hasDarkClass = document.documentElement.classList.contains('dark');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Check if darkmode-js widget exists (means user can toggle)
        const darkmodeWidget = document.querySelector('.darkmode-toggle');
        const hasDarkmodeWidget = !!darkmodeWidget;
        
        // If darkmode-js widget exists, prioritize its class over system preference
        let isDark;
        if (hasDarkmodeWidget) {
          // User has the toggle widget, so respect the explicit toggle
          isDark = hasDarkmodeClass;
        } else {
          // No widget yet, use Tailwind class or system preference
          isDark = hasDarkClass || prefersDark;
        }
        
        return isDark;
      }
      return false;
    };
    const isDarkInitially = checkDarkMode();
    const initialStyle = isDarkInitially ? 'dark_all' : 'light_all';
    currentMapStyleRef.current = initialStyle;

    // Initialize MapLibre with Carto basemap (OpenStreetMap-based)
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'carto-basemap': {
            type: 'raster',
            tiles: [
              `https://a.basemaps.cartocdn.com/${initialStyle}/{z}/{x}/{y}.png`,
              `https://b.basemaps.cartocdn.com/${initialStyle}/{z}/{x}/{y}.png`,
              `https://c.basemaps.cartocdn.com/${initialStyle}/{z}/{x}/{y}.png`,
            ],
            tileSize: 256,
            attribution: '', // Remove attribution
          },
        },
        layers: [
          {
            id: 'carto-basemap-layer',
            type: 'raster',
            source: 'carto-basemap',
          },
        ],
      },
      center: [centerLon, centerLat],
      zoom: 1, // Zoom out most by default
      minZoom: 1,
      maxZoom: 10,
      scrollZoom: true, // Enable scroll zoom
      boxZoom: true, // Enable box zoom
      dragRotate: false, // Disable drag rotation
      dragPan: true, // Enable panning
      keyboard: true, // Enable keyboard navigation
      doubleClickZoom: true, // Enable double-click zoom
      touchZoomRotate: true, // Enable touch zoom/rotate
      locale: locale, // Set map locale to match system/browser language
    });

    // Navigation controls removed

    // Add markers after map loads
    map.current.on('load', () => {
      updateMarkers();
      // Hide attribution
      const attribution = mapContainer.current?.querySelector('.maplibregl-ctrl-attrib');
      if (attribution) {
        attribution.style.display = 'none';
      }
      
      // Check dark mode again after map loads and update if needed
      // Priority: explicit toggle (darkmode-js) > Tailwind dark class > system preference
      const checkDarkMode = () => {
        if (typeof window !== 'undefined') {
          const hasDarkmodeClass = document.body.classList.contains('darkmode--activated');
          const hasDarkClass = document.documentElement.classList.contains('dark');
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          
          // Check if darkmode-js widget exists (means user can toggle)
          const darkmodeWidget = document.querySelector('.darkmode-toggle');
          const hasDarkmodeWidget = !!darkmodeWidget;
          
          // If darkmode-js widget exists, prioritize its class over system preference
          if (hasDarkmodeWidget) {
            // User has the toggle widget, so respect the explicit toggle
            return hasDarkmodeClass;
          } else {
            // No widget yet, use Tailwind class or system preference
            return hasDarkClass || prefersDark;
          }
        }
        return false;
      };
      const isDark = checkDarkMode();
      const expectedStyle = isDark ? 'dark_all' : 'light_all';
      if (currentMapStyleRef.current !== expectedStyle) {
        updateMapStyle(isDark);
      }
    });

    // Also hide attribution immediately if it exists
    const hideAttribution = () => {
      const attribution = mapContainer.current?.querySelector('.maplibregl-ctrl-attrib');
      if (attribution) {
        attribution.style.display = 'none';
      }
    };
    
    // Check periodically for attribution element
    const attributionInterval = setInterval(hideAttribution, 100);
    
    // Clear interval after 5 seconds
    const timeoutId = setTimeout(() => clearInterval(attributionInterval), 5000);

    return () => {
      clearInterval(attributionInterval);
      clearTimeout(timeoutId);
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update markers based on hover state
  const updateMarkers = useCallback(() => {
    if (!map.current) return;

    // Remove existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Get all achievements that have map data
    const achievementsWithMap = achievements.filter(
      (a) => achievementMapData[a.title]
    );

    // Group achievements by coordinates to count duplicates
    const locationMap = new Map();
    achievementsWithMap.forEach((achievement) => {
      const mapData = achievementMapData[achievement.title];
      const [lon, lat] = mapData.coords;
      const key = `${lon},${lat}`;
      
      if (!locationMap.has(key)) {
        locationMap.set(key, {
          coords: [lon, lat],
          mapData,
          achievements: [],
        });
      }
      locationMap.get(key).achievements.push(achievement);
    });

    // Create markers for each unique location
    locationMap.forEach((location) => {
      const { coords, mapData, achievements: locationAchievements } = location;
      const [lon, lat] = coords;
      const count = locationAchievements.length;
      
      // Check if any achievement at this location is hovered
      const isHovered = locationAchievements.some(
        (a) => hoveredAchievement === a.title
      );

      // Determine marker color and size
      // If nothing is hovered, show all markers in their original colors and large size
      // If something is hovered, highlight the hovered one (large) and gray out others (small)
      const color = hoveredAchievement 
        ? (isHovered ? `#${mapData.color}` : '#808080')
        : `#${mapData.color}`;
      // All markers are large by default, only smaller when something else is hovered
      const size = hoveredAchievement ? (isHovered ? 20 : 12) : 20;

      // Create marker element
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.borderRadius = '50%';
      el.style.backgroundColor = color;
      el.style.border = '1px solid #ffffff';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      el.style.cursor = 'pointer';
      el.style.transition = 'all 0.3s ease';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.fontSize = count > 1 ? `${Math.max(8, size * 0.4)}px` : '0';
      el.style.fontWeight = 'bold';
      el.style.color = '#ffffff';
      el.style.textShadow = '0 1px 2px rgba(0,0,0,0.5)';
      
      // Add count number inside marker if count > 1
      if (count > 1) {
        el.textContent = count.toString();
      }

      // Add marker to map
      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([lon, lat])
        .addTo(map.current);

      markersRef.current.push(marker);
    });
  }, [hoveredAchievement]);


  // Update markers when hover state changes
  useEffect(() => {
    if (map.current && map.current.loaded()) {
      updateMarkers();
    }
  }, [hoveredAchievement, updateMarkers]);

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
              <dl className="rounded-xl overflow-hidden bg-white/50 dark:bg-black/50 backdrop-blur-md shadow-lg grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 backlight xl:rounded-[30px]">
                {achievements.map((achievement) => {
                  const hasMapData = achievementMapData[achievement.title];
                  const isHovered = hoveredAchievement === achievement.title;
                  const isGrayedOut = hoveredAchievement && !isHovered;
                  return (
                    <div
                      key={achievement.title}
                      className={`flex flex-col p-6 text-center lg:text-left transition-all ${
                        isHovered
                          ? 'scale-105'
                          : isGrayedOut
                          ? 'opacity-40 grayscale'
                          : 'hover:scale-105'
                      }`}
                      onMouseEnter={() => {
                        setHoveredAchievement(achievement.title);
                      }}
                      onMouseLeave={() => {
                        setHoveredAchievement(null);
                      }}
                    >
                      <dt className="order-3 mt-1 text-md leading-6 font-medium text-gray-400">
                        {achievement.year}
                      </dt>
                      <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                        {i18n(achievement.title)} {achievement.flag}
                      </dt>
                      <dd
                        className={`order-1 text-4xl font-extrabold ${achievement.color}`}
                      >
                        {i18n(achievement.rank)}
                      </dd>
                    </div>
                  );
                })}
              </dl>
              <p className="mt-3 text-xs text-gray-400 dark:text-gray-500 text-right">
                {i18n('Rank updates until the end of 2024.')}
              </p>
              <div className="relative my-6">
                {/* Interactive MapLibre map with Carto basemaps (OpenStreetMap-based) */}
                <div
                  ref={mapContainer}
                  className="w-full h-[450px] rounded-3xl overflow-hidden shadow-lg [&_.maplibregl-ctrl-attrib]:hidden"
                />
              </div>
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
