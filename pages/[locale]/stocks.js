import { useState, useRef, useEffect, useMemo } from 'react';
import { fetchI18nData, fetchStocks, MY_PORTFOLIO } from '../../lib/fetchData';

export const runtime = 'experimental-edge';

const EMPTY_STOCKS = [];

// Interactive Stock Card Component
function StockCard({ stock, i18n, locale }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const chartData = stock.chartData || [];
  const chartTimestamps = stock.chartTimestamps || [];
  const isPositive = stock.change >= 0;
  const exchangeName = stock.exchange ? i18n(`Exchange ${stock.exchange}`) : '';

  // Map locale to proper locale string for date formatting
  const dateLocale =
    locale === 'zh'
      ? 'zh-CN'
      : locale === 'zh-HK'
        ? 'zh-HK'
        : locale === 'ja'
          ? 'ja-JP'
          : locale === 'ko'
            ? 'ko-KR'
            : locale === 'ru'
              ? 'ru-RU'
              : locale === 'fr'
                ? 'fr-FR'
                : locale === 'es'
                  ? 'es-ES'
                  : 'en-US';

  if (chartData.length === 0) {
    return (
      <div className="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg relative">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-3 gap-2">
            <div className="min-w-0 flex-1">
              <div className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
                {stock.symbol}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {stock.name}
              </div>
            </div>
            {stock.exchange && (
              <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 whitespace-nowrap">
                {exchangeName}
              </span>
            )}
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stock.currency} {stock.price?.toFixed(2) || 'N/A'}
            </div>
            <div
              className={`text-sm font-semibold mt-1 ${
                stock.change >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {stock.change >= 0 ? '+' : ''}
              {stock.change?.toFixed(2) || '0.00'} (
              {stock.changePercent >= 0 ? '+' : ''}
              {stock.changePercent?.toFixed(2) || '0.00'}%)
            </div>
          </div>
        </div>
      </div>
    );
  }

  const width = 100;
  const height = 100;
  const minPrice = Math.min(...chartData);
  const maxPrice = Math.max(...chartData);
  const priceRange = maxPrice - minPrice || 1;

  // Generate path points
  const points = chartData.map((price, index) => {
    const x = (index / (chartData.length - 1)) * width;
    const y = height - ((price - minPrice) / priceRange) * height;
    return { x, y, price, timestamp: chartTimestamps[index] };
  });

  const areaPath = `M 0,${height} L ${points.map((p) => `${p.x},${p.y}`).join(' L ')} L ${width},${height} Z`;
  const linePath = `M ${points.map((p) => `${p.x},${p.y}`).join(' L ')}`;
  const color = isPositive ? '#10b981' : '#ef4444';

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const closestIndex = Math.round((x / 100) * (points.length - 1));
    setHoveredIndex(Math.max(0, Math.min(closestIndex, points.length - 1)));
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const hoveredPoint = hoveredIndex !== null ? points[hoveredIndex] : null;
  const hoveredDate = hoveredPoint?.timestamp
    ? new Date(hoveredPoint.timestamp * 1000)
    : null;

  return (
    <div className="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg relative">
      {/* Interactive Chart Background */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-30 overflow-hidden rounded-xl cursor-crosshair z-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id={`gradient-${stock.symbol}-${isPositive ? 'up' : 'down'}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: color, stopOpacity: 0.4 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: color, stopOpacity: 0.1 }}
              />
            </linearGradient>
          </defs>
          <path
            d={areaPath}
            fill={`url(#gradient-${stock.symbol}-${isPositive ? 'up' : 'down'})`}
          />
          <path
            d={linePath}
            stroke={color}
            strokeWidth="0.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {hoveredPoint && (
            <>
              <line
                x1={hoveredPoint.x}
                y1="0"
                x2={hoveredPoint.x}
                y2="100"
                stroke={color}
                strokeWidth="0.3"
                strokeDasharray="2,2"
                opacity="0.5"
              />
            </>
          )}
        </svg>
        {/* Dot overlay using absolute positioning to avoid SVG scaling issues */}
        {hoveredPoint && (
          <div
            className="absolute w-2 h-2 rounded-full bg-white border-2 pointer-events-none"
            style={{
              left: `${hoveredPoint.x}%`,
              top: `${hoveredPoint.y}%`,
              transform: 'translate(-50%, -50%)',
              borderColor: color,
            }}
          >
            <div
              className="absolute inset-0.5 rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
        )}
      </div>

      <div className="relative z-10 pointer-events-none">
        <div className="flex justify-between items-start mb-3 gap-2">
          <div className="min-w-0 flex-1">
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
              {stock.symbol}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {stock.name}
            </div>
          </div>
          {stock.exchange && (
            <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 whitespace-nowrap">
              {exchangeName}
            </span>
          )}
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {stock.currency}{' '}
            {hoveredPoint
              ? hoveredPoint.price.toFixed(2)
              : stock.price?.toFixed(2) || 'N/A'}
          </div>
          <div
            className={`text-sm font-semibold mt-1 ${
              (() => {
                if (hoveredPoint) {
                  const hoveredChange =
                    hoveredPoint.price -
                    (stock.chartPreviousClose || stock.price);
                  return hoveredChange >= 0;
                }
                return stock.change >= 0;
              })()
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {(() => {
              if (hoveredPoint) {
                const previousClose = stock.chartPreviousClose || stock.price;
                const hoveredChange = hoveredPoint.price - previousClose;
                const hoveredChangePercent =
                  previousClose !== 0
                    ? (hoveredChange / previousClose) * 100
                    : 0;
                return (
                  <>
                    {hoveredChange >= 0 ? '+' : ''}
                    {hoveredChange.toFixed(2)} (
                    {hoveredChangePercent >= 0 ? '+' : ''}
                    {hoveredChangePercent.toFixed(2)}%)
                  </>
                );
              }
              return (
                <>
                  {stock.change >= 0 ? '+' : ''}
                  {stock.change?.toFixed(2) || '0.00'} (
                  {stock.changePercent >= 0 ? '+' : ''}
                  {stock.changePercent?.toFixed(2) || '0.00'}%)
                </>
              );
            })()}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            {hoveredPoint && hoveredDate ? (
              <span className="inline-flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                {hoveredDate.toLocaleDateString(dateLocale)}{' '}
                {hoveredDate.toLocaleTimeString(dateLocale, {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            ) : stock.marketState ? (
              stock.marketState === 'REGULAR' ? (
                <span className="inline-flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  {i18n('Market Open')}
                </span>
              ) : (
                <span className="inline-flex items-center">
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-1"></span>
                  {i18n('Market Closed')}
                </span>
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Stocks(props) {
  const [selectedStock, setSelectedStock] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [translatedCompanyNames, setTranslatedCompanyNames] = useState({});

  const loggedMissingKeys = useRef(new Set());
  const stockI18n = props.i18n || props.i18nData;

  function i18n(key) {
    if (stockI18n && stockI18n['stocks'] && !stockI18n['stocks'][key]) {
      if (!loggedMissingKeys.current.has(key)) {
        console.log('Stocks Missing Translation: ' + key);
        loggedMissingKeys.current.add(key);
      }
    }
    return stockI18n && stockI18n['stocks'] && stockI18n['stocks'][key]
      ? stockI18n['stocks'][key]
      : key;
  }

  const rawCurrentStocks = props.stocksData?.current || EMPTY_STOCKS;
  const rawFutureStocks = props.stocksData?.future || EMPTY_STOCKS;
  const rawPreviousStocks = props.stocksData?.previous || EMPTY_STOCKS;
  const targetLocale = props.locale || 'en';

  const uniqueCompanyNames = useMemo(() => {
    return [
      ...new Set(
        [...rawCurrentStocks, ...rawFutureStocks, ...rawPreviousStocks]
          .map((stock) => stock.name)
          .filter(Boolean)
      ),
    ];
  }, [rawCurrentStocks, rawFutureStocks, rawPreviousStocks]);

  useEffect(() => {
    if (
      !targetLocale ||
      targetLocale === 'en' ||
      uniqueCompanyNames.length === 0
    ) {
      setTranslatedCompanyNames({});
      return;
    }

    const controller = new AbortController();

    async function translateCompanyNames() {
      try {
        const combinedNames = uniqueCompanyNames.join('\n');
        const response = await fetch(
          `/api/translate?text=${encodeURIComponent(combinedNames)}&from=auto&to=${targetLocale}`,
          { signal: controller.signal }
        );

        if (!response.ok) return;

        const data = await response.json();
        const translatedNames = (data.output || combinedNames).split('\n');
        const translations = uniqueCompanyNames.reduce(
          (result, name, index) => {
            result[name] = translatedNames[index] || name;
            return result;
          },
          {}
        );

        setTranslatedCompanyNames(translations);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Company name translation error:', error);
        }
      }
    }

    translateCompanyNames();

    return () => controller.abort();
  }, [targetLocale, uniqueCompanyNames]);

  const currentStocks = useMemo(
    () =>
      rawCurrentStocks.map((stock) => ({
        ...stock,
        originalName: stock.originalName || stock.name,
        name: translatedCompanyNames[stock.name] || stock.name,
      })),
    [rawCurrentStocks, translatedCompanyNames]
  );
  const futureStocks = useMemo(
    () =>
      rawFutureStocks.map((stock) => ({
        ...stock,
        originalName: stock.originalName || stock.name,
        name: translatedCompanyNames[stock.name] || stock.name,
      })),
    [rawFutureStocks, translatedCompanyNames]
  );
  const previousStocks = useMemo(
    () =>
      rawPreviousStocks.map((stock) => ({
        ...stock,
        originalName: stock.originalName || stock.name,
        name: translatedCompanyNames[stock.name] || stock.name,
      })),
    [rawPreviousStocks, translatedCompanyNames]
  );

  const handleStockClick = (stock) => {
    setSelectedStock(stock);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedStock(null);
  };

  return (
    <div className="relative h-full w-full max-w-7xl mx-auto flex flex-col items-start px-4 sm:px-6 lg:px-8 pt-24 overflow-y-auto scrollbar-hide">
      <div id="stocks" className="relative w-full space-y-8">
        <div className="text-left flex flex-wrap items-center justify-between">
          <a
            className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl"
            href="#stocks"
          >
            {i18n('Stocks')}
            <i className="far fa-chart-line ml-2"></i>
          </a>
          <div className="flex flex-col sm:items-end">
            <p className="text-xl text-gray-500">
              {i18n('My Stock Portfolio - Real-time Market Data.')}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {i18n('Holdings undisclosed.')}
            </p>
          </div>
        </div>

        {/* Current Portfolio */}
        <div className="space-y-4 w-full">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {i18n('Current')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentStocks.map((stock, index) => (
              <div
                key={stock.symbol || index}
                onClick={() => handleStockClick(stock)}
                className="cursor-pointer"
              >
                <StockCard stock={stock} i18n={i18n} locale={props.locale} />
              </div>
            ))}
            {props.isLoading &&
              currentStocks.length === 0 &&
              [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-6 space-y-4 animate-pulse"
                >
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                      <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                    <div className="h-3 w-10 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-16 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              ))}
          </div>
        </div>

        {/* Future Portfolio */}
        {futureStocks.length > 0 && (
          <div className="space-y-4 w-full">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {i18n('Future')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {futureStocks.map((stock, index) => (
                <div
                  key={stock.symbol || index}
                  onClick={() => handleStockClick(stock)}
                  className="cursor-pointer"
                >
                  <StockCard stock={stock} i18n={i18n} locale={props.locale} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Previous Portfolio */}
        <div className="space-y-4 pb-12 w-full">
          <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400">
            {i18n('Previous')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 opacity-80">
            {previousStocks.map((stock, index) => (
              <div
                key={stock.symbol || index}
                onClick={() => handleStockClick(stock)}
                className="cursor-pointer"
              >
                <StockCard stock={stock} i18n={i18n} locale={props.locale} />
              </div>
            ))}
          </div>
        </div>

        {!props.isLoading &&
          currentStocks.length === 0 &&
          previousStocks.length === 0 && (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
              {i18n('No stock data available.')}
            </div>
          )}
      </div>

      {/* Stock Detail Dialog */}
      <div
        className={`fixed z-[101] inset-0 overflow-y-auto transition-all ease-out duration-500 ${isDialogOpen ? 'opacity-100 bg-gray-300/80 dark:bg-gray-800/80 backdrop-blur-lg' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 transition-all"
            aria-hidden="true"
            onClick={handleCloseDialog}
          >
            <div className="absolute inset-0 cursor-alias transition-all"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          {selectedStock && (
            <div className="inline-block align-bottom bg-white dark:bg-gray-900 rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {selectedStock.name}
                    </h2>
                    <p className="text-xl text-gray-500 dark:text-gray-400">
                      {selectedStock.symbol}
                      {selectedStock.exchange &&
                        ` • ${i18n(`Exchange ${selectedStock.exchange}`)}`}
                    </p>
                  </div>
                  <button
                    onClick={handleCloseDialog}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  >
                    <i className="fas fa-times text-2xl"></i>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedStock.currency} {selectedStock.price?.toFixed(2)}
                    </p>
                    <div
                      className={`text-xl font-semibold ${selectedStock.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                    >
                      {selectedStock.change >= 0 ? '+' : ''}
                      {selectedStock.change?.toFixed(2)} (
                      {selectedStock.changePercent >= 0 ? '+' : ''}
                      {selectedStock.changePercent?.toFixed(2)}%)
                    </div>
                  </div>

                  <div className="flex flex-col justify-end space-y-2">
                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                      <span className="text-gray-500">
                        {i18n('Market State')}
                      </span>
                      <span
                        className={`font-semibold ${selectedStock.marketState === 'REGULAR' ? 'text-green-500' : 'text-gray-500'}`}
                      >
                        {selectedStock.marketState === 'REGULAR'
                          ? i18n('Open')
                          : i18n('Closed')}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                      <span className="text-gray-500">{i18n('Currency')}</span>
                      <span className="text-gray-900 dark:text-white font-semibold">
                        {selectedStock.currency}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-[300px] w-full bg-gray-50 dark:bg-black/20 rounded-2xl p-4">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="overflow-visible"
                  >
                    <defs>
                      <linearGradient
                        id="dialog-gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{
                            stopColor:
                              selectedStock.change >= 0 ? '#10b981' : '#ef4444',
                            stopOpacity: 0.4,
                          }}
                        />
                        <stop
                          offset="100%"
                          style={{
                            stopColor:
                              selectedStock.change >= 0 ? '#10b981' : '#ef4444',
                            stopOpacity: 0.1,
                          }}
                        />
                      </linearGradient>
                    </defs>
                    {/* Simplified path for the large chart */}
                    {selectedStock.chartData &&
                      selectedStock.chartData.length > 0 && (
                        <>
                          <path
                            d={`M 0,100 L ${selectedStock.chartData
                              .map((price, i) => {
                                const x =
                                  (i / (selectedStock.chartData.length - 1)) *
                                  100;
                                const min = Math.min(
                                  ...selectedStock.chartData
                                );
                                const max = Math.max(
                                  ...selectedStock.chartData
                                );
                                const range = max - min || 1;
                                const y = 100 - ((price - min) / range) * 100;
                                return `${x},${y}`;
                              })
                              .join(' L ')} L 100,100 Z`}
                            fill="url(#dialog-gradient)"
                          />
                          <path
                            d={`M ${selectedStock.chartData
                              .map((price, i) => {
                                const x =
                                  (i / (selectedStock.chartData.length - 1)) *
                                  100;
                                const min = Math.min(
                                  ...selectedStock.chartData
                                );
                                const max = Math.max(
                                  ...selectedStock.chartData
                                );
                                const range = max - min || 1;
                                const y = 100 - ((price - min) / range) * 100;
                                return `${x},${y}`;
                              })
                              .join(' L ')}`}
                            fill="none"
                            stroke={
                              selectedStock.change >= 0 ? '#10b981' : '#ef4444'
                            }
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </>
                      )}
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let { locale } = context.params;
  const { req } = context;

  // Fallback to English if locale is not supported
  const supportedLocales = ['en', 'zh', 'zh-HK', 'ko', 'ja', 'ru', 'fr', 'es'];
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
            : locale?.includes('ru')
              ? 'ru'
              : locale?.includes('fr')
                ? 'fr'
                : locale?.includes('es')
                  ? 'es'
                  : locale;

  if (!supportedLocales.includes(normalizedLocale)) {
    locale = 'en'; // Fallback to English
  } else {
    locale = normalizedLocale;
  }

  try {
    const [i18nData, currentStocks, futureStocks, previousStocks] =
      await Promise.all([
        fetchI18nData(locale),
        fetchStocks(MY_PORTFOLIO.current),
        fetchStocks(MY_PORTFOLIO.future),
        fetchStocks(MY_PORTFOLIO.previous),
      ]);

    return {
      props: {
        i18nData,
        stocksData: {
          current: currentStocks,
          future: futureStocks,
          previous: previousStocks,
        },
        locale,
      },
    };
  } catch (error) {
    console.error('Error fetching stocks data:', error);
    return {
      props: {
        i18nData: {},
        stocksData: { current: [], future: [], previous: [] },
        locale: 'en',
      },
    };
  }
}
