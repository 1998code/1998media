import { useState, useEffect, useRef } from 'react';

export default function LocaleSwitcher() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLocale, setSelectedLocale] = useState(null);
  const bannerRef = useRef(null);

  // Locale configuration with translations
  const locales = [
    {
      code: 'en',
      name: 'English',
      path: '/en',
      message: 'We noticed you might prefer a different language or region.',
      continueText: 'Continue'
    },
    {
      code: 'zh-Hant',
      name: '繁體中文',
      path: '/zh-HK',
      aliases: ['zh-HK', 'zh-TW'],
      message: '我們注意到你可能偏好其他語言或地區。',
      continueText: '繼續'
    },
    {
      code: 'zh-CN',
      name: '简体中文',
      path: '/zh-CN',
      aliases: ['zh-CN'],
      message: '我们注意到你可能偏好其他语言或地区。',
      continueText: '继续'
    },
    {
      code: 'ja',
      name: '日本語',
      path: '/ja',
      aliases: ['ja'],
      message: '別の言語または地域を希望される可能性があることに気づきました。',
      continueText: '続ける'
    },
    {
      code: 'ko',
      name: '한국어',
      path: '/ko',
      aliases: ['ko'],
      message: '다른 언어 또는 지역을 선호하실 수 있습니다.',
      continueText: '계속'
    },
  ];

  useEffect(() => {
    // Check if banner was dismissed in this session
    const dismissed = sessionStorage.getItem('locale-switcher-dismissed');
    if (dismissed) return;

    // Get browser language
    const browserLang = navigator.language || navigator.userLanguage;

    // Get current website locale from path
    const currentPath = window.location.pathname.replace('/', '').split('/')[0];
    const currentLocale = locales.find(l =>
      l.aliases?.includes(currentPath) || l.code === currentPath || l.path === `/${currentPath}`
    );

    // Check for mismatch - find locale that matches browser language
    const browserLocale = locales.find(l => {
      if (!l.aliases) return browserLang.toLowerCase().startsWith(l.code.toLowerCase());
      return l.aliases.some(alias => browserLang.toLowerCase().startsWith(alias.toLowerCase()));
    });

    // Don't show banner if browser locale matches current locale (including aliases)
    if (browserLocale && currentLocale) {
      // Check if they're the same locale group (e.g., both Traditional Chinese)
      const isSameLocaleGroup = browserLocale.code === currentLocale.code ||
        (browserLocale.aliases && currentLocale.aliases &&
         browserLocale.aliases.some(a => currentLocale.aliases?.includes(a)));

      if (!isSameLocaleGroup) {
        setSelectedLocale(browserLocale);
        setIsVisible(true);
      }
    }
  }, []);

  // Adjust navigation position when banner is visible
  useEffect(() => {
    if (isVisible && bannerRef.current) {
      const bannerHeight = bannerRef.current.offsetHeight;
      const nav = document.getElementById('navigation');
      if (nav) {
        nav.style.top = `${bannerHeight}px`;
      }
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('locale-switcher-dismissed', 'true');
    // Remove padding from navigation
    const nav = document.getElementById('navigation');
    if (nav) nav.style.top = '0';
  };

  const handleContinue = () => {
    if (selectedLocale) {
      window.location.href = selectedLocale.path;
    }
  };

  const handleLocaleSelect = (locale) => {
    setSelectedLocale(locale);
    setIsDropdownOpen(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      ref={bannerRef}
      className="fixed top-0 left-0 right-0 z-[101] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg"
      role="banner"
      aria-label="Choose country or region"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3">
          {/* Close Button - moved to left */}
          <button
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors shrink-0"
            aria-label="Close locale switcher"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Message */}
          <div className="text-sm text-gray-700 dark:text-gray-300 flex-1">
            {selectedLocale?.message || 'We noticed you might prefer a different language or region.'}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Dropdown */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-40 px-3 py-1.5 text-left bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {selectedLocale?.name || 'Select'}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full mt-1 right-0 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-80 overflow-y-auto z-50">
                  <ul role="menu">
                    {locales.map((locale) => (
                      <li key={locale.code}>
                        <button
                          onClick={() => handleLocaleSelect(locale)}
                          className={`w-full px-4 py-2.5 text-left hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors flex items-center justify-between ${
                            selectedLocale?.code === locale.code
                              ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}
                          role="menuitem"
                        >
                          <span className="text-sm font-medium">{locale.name}</span>
                          {selectedLocale?.code === locale.code && (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg font-medium transition-colors whitespace-nowrap"
            >
              {selectedLocale?.continueText || 'Continue'}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop for dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </aside>
  );
}
