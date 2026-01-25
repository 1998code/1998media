import { useState } from 'react';
import { fetchI18nData, fetchStocks } from '../../lib/fetchData';

// Interactive Stock Card Component
function StockCard({ stock, i18n, locale }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const chartData = stock.chartData || [];
  const chartTimestamps = stock.chartTimestamps || [];
  const isPositive = stock.change >= 0;
  
  // Map locale to proper locale string for date formatting
  const dateLocale = locale === 'zh' ? 'zh-CN' :
                     locale === 'zh-HK' ? 'zh-HK' :
                     locale === 'ja' ? 'ja-JP' :
                     locale === 'ko' ? 'ko-KR' :
                     'en-US';
  
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
                {stock.exchange}
              </span>
            )}
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stock.currency} {stock.price?.toFixed(2) || 'N/A'}
            </div>
            <div className={`text-sm font-semibold mt-1 ${
              stock.change >= 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {stock.change >= 0 ? '+' : ''}
              {stock.change?.toFixed(2) || '0.00'} ({stock.changePercent >= 0 ? '+' : ''}
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

  const areaPath = `M 0,${height} L ${points.map(p => `${p.x},${p.y}`).join(' L ')} L ${width},${height} Z`;
  const linePath = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
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
  const hoveredDate = hoveredPoint?.timestamp ? new Date(hoveredPoint.timestamp * 1000) : null;

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg relative"
    >
      {/* Interactive Chart Background */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-30 overflow-hidden rounded-xl cursor-crosshair z-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`gradient-${stock.symbol}-${isPositive ? 'up' : 'down'}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.4 }} />
              <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#gradient-${stock.symbol}-${isPositive ? 'up' : 'down'})`} />
          <path d={linePath} stroke={color} strokeWidth="0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {hoveredPoint && (
            <>
              <line x1={hoveredPoint.x} y1="0" x2={hoveredPoint.x} y2="100" stroke={color} strokeWidth="0.3" strokeDasharray="2,2" opacity="0.5" />
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
              {stock.exchange}
            </span>
          )}
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {stock.currency} {hoveredPoint ? hoveredPoint.price.toFixed(2) : (stock.price?.toFixed(2) || 'N/A')}
          </div>
          <div className={`text-sm font-semibold mt-1 ${
            (() => {
              if (hoveredPoint) {
                const hoveredChange = hoveredPoint.price - (stock.chartPreviousClose || stock.price);
                return hoveredChange >= 0;
              }
              return stock.change >= 0;
            })()
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {(() => {
              if (hoveredPoint) {
                const previousClose = stock.chartPreviousClose || stock.price;
                const hoveredChange = hoveredPoint.price - previousClose;
                const hoveredChangePercent = previousClose !== 0 ? ((hoveredChange / previousClose) * 100) : 0;
                return (
                  <>
                    {hoveredChange >= 0 ? '+' : ''}
                    {hoveredChange.toFixed(2)} ({hoveredChangePercent >= 0 ? '+' : ''}
                    {hoveredChangePercent.toFixed(2)}%)
                  </>
                );
              }
              return (
                <>
                  {stock.change >= 0 ? '+' : ''}
                  {stock.change?.toFixed(2) || '0.00'} ({stock.changePercent >= 0 ? '+' : ''}
                  {stock.changePercent?.toFixed(2) || '0.00'}%)
                </>
              );
            })()}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            {hoveredPoint && hoveredDate ? (
              <span className="inline-flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                {hoveredDate.toLocaleDateString(dateLocale)} {hoveredDate.toLocaleTimeString(dateLocale, { hour: '2-digit', minute: '2-digit' })}
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
  function i18n(key) {
    if (props.i18n && props.i18n['stocks'] && !props.i18n['stocks'][key]) {
      console.log('Stocks Missing Translation: ' + key);
    }
    return props.i18n && props.i18n['stocks'] && props.i18n['stocks'][key]
      ? props.i18n['stocks'][key]
      : key;
  }

  const stocks = props.stocksData || [];

  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      <div id="stocks" className="relative max-w-7xl mx-auto space-y-8 pt-16">
        <div className="text-left flex flex-wrap items-center justify-between">
          <a
            className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl"
            href="#stocks"
          >
            {i18n('Stocks')}
            <i className="far fa-chart-line ml-2"></i>
          </a>
          <div className="flex flex-col items-end">
            <p className="text-xl text-gray-500">
              {i18n('My Stock Portfolio - Real-time Market Data.')}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {i18n('Shareholding quantity not disclosed.')}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
          {stocks.map((stock, index) => (
            <StockCard key={stock.symbol || index} stock={stock} i18n={i18n} locale={props.locale} />
          ))}
          {stocks.length === 0 && (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
              {i18n('No stock data available.')}
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
  const supportedLocales = ['en', 'zh', 'zh-HK', 'ko', 'ja'];
  const normalizedLocale = locale?.includes('en') ? 'en' :
                          locale?.includes('ja') || locale?.includes('jp') ? 'ja' :
                          locale?.includes('ko') || locale?.includes('kr') ? 'ko' :
                          locale?.includes('zh-TW') || locale?.includes('zh-MO') ? 'zh-HK' :
                          locale?.includes('zh-CN') ? 'zh' :
                          locale;
  
  if (!supportedLocales.includes(normalizedLocale)) {
    locale = 'en'; // Fallback to English
  } else {
    locale = normalizedLocale;
  }

  try {
    const [i18nData, stocksData] = await Promise.all([
      fetchI18nData(locale),
      fetchStocks('NVDA,MC.PA,3033.HK'),
    ]);

    return {
      props: {
        i18nData,
        stocksData,
        locale,
      },
    };
  } catch (error) {
    console.error('Error fetching stocks data:', error);
    return {
      props: {
        i18nData: {},
        stocksData: [],
        locale: 'en',
      },
    };
  }
}
