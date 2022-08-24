import Image from "next/future/image"

export default function Contact() {
  return (
    <div id="contact" className="relative py-16">
      <div className="hidden absolute top-0 inset-x-0 h-1/2 lg:block" aria-hidden="true" />
      <div className="max-w-7xl mx-auto bg-orange-600 lg:bg-transparent lg:px-8">
        <div className="lg:grid lg:grid-cols-12">
          <div className="relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-16 lg:bg-transparent">
            <div className="max-w-md mx-auto px-4 pt-8 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
              <div className="aspect-w-1 aspect-h-1">
                <Image
                  className="object-cover object-center rounded-3xl shadow-2xl"
                  src="https://snapshot.apple-mapkit.com/api/v1/snapshot?center=22.34501591896432%2C114.17990720272064&t=standard&scale=1&spn=0.3175427580212222%2C0.34332275390625&size=500x500&lang=en-US&poi=0&annotations=%5B%7B%22point%22%3A%2222.428117752075195%2C114.208251953125%22%2C%22markerStyle%22%3A%22large%22%2C%22color%22%3A%22006d8f%22%2C%22glyphText%22%3A%22S%22%7D%2C%7B%22point%22%3A%2222.30408477783203%2C114.17972564697266%22%2C%22markerStyle%22%3A%22balloon%22%2C%22color%22%3A%22b92d5d%22%2C%22glyphText%22%3A%22P%22%7D%2C%7B%22point%22%3A%2222.336124420166016%2C114.1732177734375%22%2C%22markerStyle%22%3A%22balloon%22%2C%22color%22%3A%22e63b7a%22%2C%22glyphText%22%3A%22C%22%7D%5D&teamId=9PAHLTG8AD&keyId=FD3N2TP9F5&signature=7EQjssZqx9iYI1uJYqBU8ZDgqHPJrbZadAfT8G6rTwXM2l08vy6XREcWCWOk4gWLeQUIC80SUJLz8ZE0pqlC1w"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="relative bg-orange-600 lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-3xl lg:grid lg:grid-cols-10 lg:items-center">
            <div className="hidden absolute inset-0 overflow-hidden rounded-3xl lg:block" aria-hidden="true">
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
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x={0} y={0} width={4} height={4} className="text-orange-500" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width={404} height={384} fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
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
                    <rect x={0} y={0} width={4} height={4} className="text-orange-500" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width={404} height={384} fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
              </svg>
            </div>
            <div className="relative max-w-md mx-auto py-12 px-4 space-y-6 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 lg:col-start-4 lg:col-span-6">
              <h2 className="text-3xl font-extrabold text-white" id="join-heading">
                聯繫
              </h2>
              <p className="text-lg text-white">
                請使用電子郵件。 72 小時內回覆。
              </p>
              <a
                className="block w-full py-3 px-5 text-center bg-white dark:bg-black border border-transparent rounded-md shadow-md text-base font-medium text-orange-700 dark:text-orange-300 hover:bg-gray-50 dark:hover:bg-gray-900 sm:inline-block sm:w-auto"
                href="mailto:hi@1998.media"
              >
                電郵
                <i className="fas fa-envelope ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}