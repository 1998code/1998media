import { useState, useEffect } from 'react';

export default function WhatsAppChat({ i18n: i18nData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  // Mount animation state
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  function i18n(key) {
    if (i18nData && i18nData['whatsapp'] && !i18nData['whatsapp'][key]) {
      console.log('WhatsApp Missing Translation: ' + key);
    }
    return i18nData && i18nData['whatsapp'] && i18nData['whatsapp'][key]
      ? i18nData['whatsapp'][key]
      : key;
  }

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is ready before animation
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  // Prevent body scroll when pricing modal is open
  useEffect(() => {
    if (isPricingOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      // Prevent body scroll - simpler approach
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      // Cleanup on unmount
      const scrollY = document.body.style.top;
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [isPricingOpen]);

  // Auto-expand when scrolled 50% of the page
  useEffect(() => {
    const handleScroll = () => {
      if (hasAutoOpened) return;

      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollPercentage = (scrolled / scrollHeight) * 100;

      if (scrollPercentage >= 50) {
        setIsOpen(true);
        setHasAutoOpened(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAutoOpened]);

  const handleSend = () => {
    if (!message.trim()) return;

    const currentUrl =
      typeof window !== 'undefined' ? window.location.href : '';
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B12132161526&text=${encodeURIComponent(message + '\n\n' + currentUrl)}&type=phone_number&app_absent=0`;

    window.open(whatsappUrl, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-[102] max-w-full transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ pointerEvents: 'none' }}
    >
      {/* Chat Popup with Intercom-style design */}
      {isOpen && (
        <div
          className={`absolute bottom-16 right-0 w-[380px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden mb-2 transition-all duration-300 ease-out ${
            isAnimating
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-50'
          }`}
          style={{
            boxShadow:
              '0 12px 48px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            transformOrigin: 'bottom right',
            pointerEvents: 'auto',
          }}
        >
          {/* Header with Gradient */}
          <div className="relative bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 p-6 pb-20">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
            >
              <i className="fas fa-times text-lg"></i>
            </button>

            {/* Header Content */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://pbs.twimg.com/profile_images/1809462035656392704/QxSEm6lz_400x400.jpg"
                  alt={i18n('MING')}
                  className="w-14 h-14 rounded-full border-3 border-white shadow-lg"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{i18n('MING')}</h3>
                <p className="text-white/90 text-sm font-medium">
                  {i18n('Product UI Lead')}
                </p>
              </div>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="relative -mt-14 px-5 pb-5 space-y-4">
            {/* Welcome Message Bubble */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-100 dark:border-gray-700">
              <p className="text-gray-800 dark:text-gray-200 text-[15px] leading-relaxed">
                {i18n("We're here to help turn your idea into reality.")}
              </p>
            </div>

            {/* Pricing Card */}
            <button
              onClick={() => setIsPricingOpen(true)}
              className="block w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <i className="fas fa-file-invoice-dollar text-xl"></i>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-[15px]">
                      {i18n('View Pricing')}
                    </p>
                    <p className="text-white/80 text-xs">
                      {i18n('See our rates & packages')}
                    </p>
                  </div>
                </div>
                <i className="fas fa-arrow-right text-sm"></i>
              </div>
            </button>
          </div>

          {/* Input Area */}
          <div className="p-5 pt-0 pb-5">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-1.5 border border-gray-200 dark:border-gray-700 focus-within:border-emerald-500 dark:focus-within:border-emerald-500 transition-colors">
              <div className="flex gap-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={i18n('Send a message...')}
                  rows="1"
                  className="flex-1 px-3 py-2.5 bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none text-[15px]"
                  style={{ minHeight: '42px', maxHeight: '120px' }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className={`rounded-xl px-4 transition-all duration-200 flex items-center justify-center min-w-[44px] ${
                    message.trim()
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-md hover:shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <i className="fas fa-paper-plane text-lg"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button - Intercom style */}
      <button
        onClick={handleToggle}
        className="relative bg-emerald-500 hover:bg-emerald-600 text-white rounded-full md:rounded-tl-full md:rounded-bl-full md:rounded-br-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-14 h-14 md:w-auto md:h-auto flex items-center justify-center"
        style={{
          boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
          pointerEvents: 'auto',
        }}
      >
        <div className="flex items-center gap-2 px-0 md:px-4 py-0 md:py-3">
          <i className="fab fa-whatsapp text-xl"></i>
          <span className="hidden md:inline font-semibold text-sm whitespace-nowrap">
            {i18n('Get Quote')}
          </span>
        </div>

        {/* Notification dot */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </button>

      {/* Pricing Modal */}
      {isPricingOpen && (
        <div
          className="fixed z-[103] inset-0 transition-all ease-out duration-300 opacity-100 bg-gray-900/80 backdrop-blur-lg"
          onClick={() => setIsPricingOpen(false)}
          style={{ touchAction: 'pan-y', pointerEvents: 'auto' }}
        >
          {/* Modal Content Container */}
          <div
            className="absolute inset-0 flex items-center justify-center p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
          >
            <div
              className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-6xl h-[85vh] overflow-hidden transition-all duration-300 scale-100 opacity-100 my-auto"
              style={{ touchAction: 'pan-y' }}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <i className="fas fa-file-invoice-dollar text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {i18n('Pricing & Packages')}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {i18n('View our rates and services')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPricingOpen(false)}
                  className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              {/* Embedded Excel */}
              <div className="w-full h-[calc(100%-73px)]">
                <iframe
                  src="https://view.officeapps.live.com/op/embed.aspx?src=https://cdn.1998.media/quote/Q2_Pricing.xlsx"
                  className="w-full h-full border-0"
                  title="Pricing Table"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
