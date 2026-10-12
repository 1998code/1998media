import { useRef } from 'react';

export default function Contact(props) {
  const loggedMissingKeys = useRef(new Set());

  function i18n(key) {
    if (props.i18n && props.i18n['contact'] && !props.i18n['contact'][key]) {
      if (!loggedMissingKeys.current.has(key)) {
        console.log('Contact Missing Translation: ' + key);
        loggedMissingKeys.current.add(key);
      }
    }
    return props.i18n && props.i18n['contact'] && props.i18n['contact'][key]
      ? props.i18n['contact'][key]
      : key;
  }
  return (
    <div id="contact" className="relative py-4">
      <div
        className="hidden absolute top-0 inset-x-0 h-1/2 md:block"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto bg-orange-600 md:bg-transparent md:px-8">
        <div className="relative bg-orange-600 md:rounded-3xl overflow-hidden">
          <div
            className="hidden absolute inset-0 overflow-hidden rounded-3xl md:block"
            aria-hidden="true"
          >
            <svg
              className="absolute bottom-full left-full transform translate-y-1/3 -translate-x-2/3 xl:bottom-auto xl:top-0 xl:translate-y-0"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="user spaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-orange-500"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
              />
            </svg>
            <svg
              className="absolute top-full transform -translate-y-1/3 -translate-x-1/3 xl:-translate-y-1/2"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-orange-500"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
              />
            </svg>
          </div>
          <div className="relative max-w-2xl mx-auto py-12 px-4 space-y-6 sm:py-16 sm:px-6 md:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white" id="contact">
              {i18n('Contact')}
            </h2>
            <p className="text-lg text-white">
              {i18n(
                'Response in 48 hours. Holidays may take longer. No spam, please.'
              )}
            </p>
            <div>
              <a
                className="block w-full py-3 px-5 text-center bg-white dark:bg-black border border-transparent rounded-xl shadow-md text-base font-medium text-orange-700 dark:text-orange-300 hover:bg-gray-50 dark:hover:bg-gray-900 sm:inline-block sm:w-auto"
                href="mailto:find@1998.media"
              >
                {i18n('General Inquiry')}: <span>Find&#064;1998.media</span>
                <i className="fa fa-envelope ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* China Only */}
      {typeof window !== 'undefined' &&
        window.location.href.includes('zh-CN') && (
          <a
            href="https://www.xiaohongshu.com/user/profile/6662438f00000000030300c4"
            target="_blank"
            className="relative block w-full mt-6 text-center md:text-right max-w-7xl mx-auto sm:px-6 md:px-8"
          >
            <img
              alt="Xiaohongshu Profile"
              loading="lazy"
              className="rounded-3xl max-w-[500px]"
              src="https://cdn.1998.media/banners/Xiaohongshu.jpg"
            />
          </a>
        )}
    </div>
  );
}
