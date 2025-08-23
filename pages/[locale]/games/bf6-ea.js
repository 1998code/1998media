import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function BF6EventData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weekLoading, setWeekLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locale, setLocale] = useState('en');
  const [currentUser, setCurrentUser] = useState('chakmingea');
  const [searchUser, setSearchUser] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('all');
  const [allWeeksData, setAllWeeksData] = useState({});
  const [combinedData, setCombinedData] = useState(null);

  useEffect(() => {
    // Get locale from URL path
    const pathSegments = window.location.pathname.split('/');
    const currentLocale = pathSegments[1] || 'en';
    setLocale(currentLocale);
    
    // Get user and week from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get('user');
    const weekParam = urlParams.get('week');
    
    if (userParam) {
      setCurrentUser(userParam);
      setSearchUser(userParam);
    }
    
    if (weekParam && (weekParam === '1' || weekParam === '2' || weekParam === 'all')) {
      const weekValue = weekParam === '1' ? 'OpenBetaWeekend1' : weekParam === '2' ? 'OpenBetaWeekend2' : 'all';
      setSelectedWeek(weekValue);
    }
    
    fetchBF6Data(currentLocale, userParam || 'chakmingea', weekParam === '1' ? 'OpenBetaWeekend1' : weekParam === '2' ? 'OpenBetaWeekend2' : 'all');
  }, []);

  const fetchBF6Data = async (currentLocale = locale, user = currentUser, week = selectedWeek) => {
    try {
      setLoading(true);
      
      if (week === 'all') {
        // Fetch data for all weeks
        const [week1Response, week2Response] = await Promise.all([
          axios.get(`/api/bf6-stats?locale=${currentLocale}&user=${user}&week=OpenBetaWeekend1`),
          axios.get(`/api/bf6-stats?locale=${currentLocale}&user=${user}&week=OpenBetaWeekend2`)
        ]);
        
        const week1Data = week1Response.data.playerStatsSummary;
        const week2Data = week2Response.data.playerStatsSummary;
        
        // Store individual week data
        setAllWeeksData({
          week1: week1Data,
          week2: week2Data
        });
        
        // Combine the data
        const combined = combineWeekData(week1Data, week2Data);
        setCombinedData(combined);
        setData(combined);
      } else {
        // Fetch single week data
        const response = await axios.get(`/api/bf6-stats?locale=${currentLocale}&user=${user}&week=${week}`);
        setData(response.data.playerStatsSummary);
        setCombinedData(null);
      }
      
      setCurrentUser(user);
      setError(null);
    } catch (err) {
      setError('Failed to fetch Battlefield 6 data');
      console.error('Error fetching BF6 data:', err);
    } finally {
      setLoading(false);
    }
  };

  const combineWeekData = (week1Data, week2Data) => {
    if (!week1Data || !week2Data) return week1Data || week2Data;
    
    const week1Stats = week1Data.stats;
    const week2Stats = week2Data.stats;
    
    // Combine numeric stats
    const combinedStats = {
      total_kills: {
        ...week1Stats.total_kills,
        value: (parseInt(week1Stats.total_kills.value.replace(',', '')) + parseInt(week2Stats.total_kills.value.replace(',', ''))).toString()
      },
      total_assists: {
        ...week1Stats.total_assists,
        value: (parseInt(week1Stats.total_assists.value.replace(',', '')) + parseInt(week2Stats.total_assists.value.replace(',', ''))).toString()
      },
      total_revives: {
        ...week1Stats.total_revives,
        value: (parseInt(week1Stats.total_revives.value.replace(',', '')) + parseInt(week2Stats.total_revives.value.replace(',', ''))).toString()
      },
      total_matches_played: {
        ...week1Stats.total_matches_played,
        value: (parseInt(week1Stats.total_matches_played.value.replace(',', '')) + parseInt(week2Stats.total_matches_played.value.replace(',', ''))).toString()
      },
      total_xp: {
        ...week1Stats.total_xp,
        value: (parseInt(week1Stats.total_xp.value.replace(/,/g, '')) + parseInt(week2Stats.total_xp.value.replace(/,/g, ''))).toLocaleString()
      },
      kill_death_ratio: week1Stats.kill_death_ratio || week2Stats.kill_death_ratio,
      shot_accuracy: week1Stats.shot_accuracy || week2Stats.shot_accuracy
    };
    
    // Determine most played class and mode based on total matches
    const week1Matches = parseInt(week1Stats.total_matches_played.value.replace(',', ''));
    const week2Matches = parseInt(week2Stats.total_matches_played.value.replace(',', ''));
    
    const mostPlayedClass = week1Matches >= week2Matches ? week1Data.mostPlayedClass : week2Data.mostPlayedClass;
    const mostPlayedMode = week1Matches >= week2Matches ? week1Data.mostPlayedMode : week2Data.mostPlayedMode;
    
    return {
      ...week1Data,
      stats: combinedStats,
      mostPlayedClass,
      mostPlayedMode
    };
  };

  const handleUserSearch = () => {
    if (searchUser.trim()) {
      // Update URL with new user parameter
      const url = new URL(window.location);
      url.searchParams.set('user', searchUser.trim());
      const weekParam = selectedWeek === 'OpenBetaWeekend1' ? '1' : selectedWeek === 'OpenBetaWeekend2' ? '2' : 'all';
      url.searchParams.set('week', weekParam);
      window.history.pushState({}, '', url);
      
      fetchBF6Data(locale, searchUser.trim(), selectedWeek);
    }
  };

  const handleWeekChange = async (week) => {
    if (week === selectedWeek) return; // Prevent unnecessary calls
    
    setSelectedWeek(week);
    setWeekLoading(true);
    
    // Update URL with new week parameter
    const url = new URL(window.location);
    const weekParam = week === 'OpenBetaWeekend1' ? '1' : week === 'OpenBetaWeekend2' ? '2' : 'all';
    url.searchParams.set('week', weekParam);
    window.history.pushState({}, '', url);
    
    if (week === 'all') {
      // Fetch and combine all weeks data
      try {
        const [week1Response, week2Response] = await Promise.all([
          axios.get(`/api/bf6-stats?locale=${locale}&user=${currentUser}&week=OpenBetaWeekend1`),
          axios.get(`/api/bf6-stats?locale=${locale}&user=${currentUser}&week=OpenBetaWeekend2`)
        ]);
        
        const week1Data = week1Response.data.playerStatsSummary;
        const week2Data = week2Response.data.playerStatsSummary;
        
        setAllWeeksData({
          week1: week1Data,
          week2: week2Data
        });
        
        const combined = combineWeekData(week1Data, week2Data);
        setCombinedData(combined);
        setData(prevData => ({
          ...prevData,
          stats: combined.stats,
          mostPlayedClass: combined.mostPlayedClass,
          mostPlayedMode: combined.mostPlayedMode
        }));
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch Battlefield 6 data');
        console.error('Error fetching BF6 data:', err);
      }
    } else {
      // Fetch single week data
      try {
        const response = await axios.get(`/api/bf6-stats?locale=${locale}&user=${currentUser}&week=${week}`);
        
        if (response.data.playerStatsSummary) {
          setData(prevData => ({
            ...prevData,
            stats: response.data.playerStatsSummary.stats,
            mostPlayedClass: response.data.playerStatsSummary.mostPlayedClass,
            mostPlayedMode: response.data.playerStatsSummary.mostPlayedMode
          }));
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch Battlefield 6 data');
        console.error('Error fetching BF6 data:', err);
      }
    }
    
    setWeekLoading(false);
  };

  const handleShare = () => {
    const url = new URL(window.location);
    const weekParam = selectedWeek === 'OpenBetaWeekend1' ? '1' : selectedWeek === 'OpenBetaWeekend2' ? '2' : 'all';
    url.searchParams.set('user', currentUser);
    url.searchParams.set('week', weekParam);
    
    const weekText = selectedWeek === 'all' ? 'All Weeks' : `Weekend ${weekParam}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Battlefield 6 Stats - ${currentUser}`,
        text: `Check out ${currentUser}'s Battlefield 6 stats for ${weekText}!`,
        url: url.toString()
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url.toString()).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {
        // Final fallback: show URL
        prompt('Share this link:', url.toString());
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUserSearch();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://drop-assets.ea.com/images/7fyt5SYapQDRx0QwBSaEM/df5a9246a1688d3e3f6d10b916cbec5d/SM.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-white text-lg font-mono">LOADING BATTLEFIELD 6 STATS...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://drop-assets.ea.com/images/7fyt5SYapQDRx0QwBSaEM/df5a9246a1688d3e3f6d10b916cbec5d/SM.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <p className="text-white text-lg mb-4 font-mono">{error || 'No data available'}</p>
            <p className="text-gray-300 text-sm mb-6 font-mono">Try a different soldier name</p>
            
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border-2 border-orange-500/30 max-w-md mx-auto mb-6">
              <h3 className="text-lg font-bold text-white font-mono mb-4">SEARCH SOLDIER</h3>
              
              {/* Week Selector */}
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-gray-300 font-mono text-sm">WEEK:</span>
                <div className="flex bg-black/50 rounded-lg p-1 border border-orange-500/30">
                  <button
                    onClick={() => handleWeekChange('all')}
                    className={`px-3 py-1 rounded text-sm font-mono transition-colors ${
                      selectedWeek === 'all'
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    ALL
                  </button>
                  <button
                    onClick={() => handleWeekChange('OpenBetaWeekend1')}
                    className={`px-3 py-1 rounded text-sm font-mono transition-colors ${
                      selectedWeek === 'OpenBetaWeekend1'
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    1
                  </button>
                  <button
                    onClick={() => handleWeekChange('OpenBetaWeekend2')}
                    className={`px-3 py-1 rounded text-sm font-mono transition-colors ${
                      selectedWeek === 'OpenBetaWeekend2'
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    2
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleUserSearch();
                    }
                  }}
                  placeholder="Enter soldier name..."
                  className="flex-1 bg-black/50 border-2 border-orange-500/50 rounded-lg px-4 py-2 text-white font-mono placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
                />
                <button 
                  onClick={handleUserSearch}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all duration-300 font-mono border-2 border-orange-400 hover:border-orange-300 shadow-lg hover:shadow-xl"
                >
                  SEARCH
                </button>
              </div>
            </div>
            
            <button 
              onClick={fetchBF6Data}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors font-mono border border-orange-400"
            >
              RETRY
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = data.stats;
  const mostPlayedClass = data.mostPlayedClass;
  const mostPlayedMode = data.mostPlayedMode;

  return (
    <>
      <Head>
        <title>Battlefield 6 - Event Statistics | 1998media</title>
        <meta name="description" content="Battlefield 6 Open Beta Weekend 2 player statistics and achievements" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://drop-assets.ea.com/images/7rCJR3doyMEuFWiwgnYETl/206add66832eb5d708c563bbacb40a98/Conquest-16x9.jpg')`
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500 bg-clip-text text-transparent font-mono tracking-wider">
                  BATTLEFIELD 6
                </h1>
                <p className="text-lg text-gray-300 mb-4 font-mono tracking-wide">
                  OPEN BETA {selectedWeek === 'OpenBetaWeekend1' ? 'WEEKEND 1' : selectedWeek === 'OpenBetaWeekend2' ? 'WEEKEND 2' : 'ALL WEEKS'} - COMBAT STATISTICS
                </p>
                
                {/* Player Info Card */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-black/40 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto border-2 border-orange-500/50 hover:border-orange-500 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:shadow-orange-500/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img 
                          src={data.userAvatar.large} 
                          alt={data.playerDisplayName}
                          className="w-16 h-16 rounded-full border-4 border-orange-500 shadow-lg"
                        />
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="text-left">
                        <h2 className="text-2xl font-bold text-white font-mono">{data.playerDisplayName}</h2>
                        <p className="text-gray-400 font-mono text-sm">SOLDIER: {data.playerDisplayName}</p>
                      </div>
                    </div>
                    
                    {/* Week Selector */}
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-300 font-mono text-sm">WEEK:</span>
                      <div className="flex bg-black/50 rounded-lg p-1 border border-orange-500/30">
                        <button
                          onClick={() => handleWeekChange('all')}
                          className={`px-3 py-1 rounded text-sm font-mono transition-colors ${
                            selectedWeek === 'all'
                              ? 'bg-orange-500 text-white'
                              : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          ALL
                        </button>
                        <button
                          onClick={() => handleWeekChange('OpenBetaWeekend1')}
                          className={`px-3 py-1 rounded text-sm font-mono transition-colors ${
                            selectedWeek === 'OpenBetaWeekend1'
                              ? 'bg-orange-500 text-white'
                              : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          1
                        </button>
                        <button
                          onClick={() => handleWeekChange('OpenBetaWeekend2')}
                          className={`px-3 py-1 rounded text-sm font-mono transition-colors ${
                            selectedWeek === 'OpenBetaWeekend2'
                              ? 'bg-orange-500 text-white'
                              : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          2
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Search Field */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={searchUser}
                      onChange={(e) => setSearchUser(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Search different soldier..."
                      className="flex-1 bg-black/50 border-2 border-orange-500/50 rounded-lg px-4 py-2 text-white font-mono placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
                    />
                    <button 
                      onClick={handleUserSearch}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all duration-300 font-mono border-2 border-orange-400 hover:border-orange-300 shadow-lg hover:shadow-xl"
                    >
                      SEARCH
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="container mx-auto px-4">
            {weekLoading && (
              <div className="text-center mb-4">
                <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md rounded-lg px-4 py-2 border border-orange-500/30">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent"></div>
                  <span className="text-orange-400 font-mono text-sm">Loading week data...</span>
                </div>
              </div>
            )}
            <motion.div 
              key={`stats-grid-${selectedWeek}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-4 ${weekLoading ? 'opacity-50' : ''}`}
            >
              {/* Most Played Class */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border-2 border-orange-500/30 hover:border-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 flex flex-col"
              >
                <div className="flex items-center mb-2">
                  <img 
                    src={mostPlayedClass.icon.ar1X1} 
                    alt={mostPlayedClass.name}
                    className="w-10 h-10 mr-3 filter drop-shadow-lg"
                  />
                  <h3 className="text-lg font-bold text-white font-mono">PRIMARY CLASS</h3>
                </div>
                <h4 className="text-xl font-bold text-orange-400 mb-1 font-mono">{mostPlayedClass.name}</h4>
                <p className="text-gray-300 text-xs leading-relaxed mb-2 flex-grow">{mostPlayedClass.description}</p>
                <img 
                  src={mostPlayedClass.image.ar16X9} 
                  alt={mostPlayedClass.name}
                  className="w-full h-24 object-cover rounded-lg border border-orange-500/30 mt-auto"
                />
              </motion.div>

              {/* Most Played Mode */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border-2 border-orange-500/30 hover:border-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 flex flex-col"
              >
                <h3 className="text-lg font-bold text-white mb-2 font-mono">PRIMARY MODE</h3>
                <h4 className="text-xl font-bold text-orange-400 mb-1 font-mono">{mostPlayedMode.name}</h4>
                <p className="text-gray-300 text-xs leading-relaxed mb-2 flex-grow">{mostPlayedMode.description}</p>
                <img 
                  src={mostPlayedMode.image.ar16X9} 
                  alt={mostPlayedMode.name}
                  className="w-full h-24 object-cover rounded-lg border border-orange-500/30 mt-auto"
                />
              </motion.div>

              {/* Total Matches */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
                className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border-2 border-orange-500/30 hover:border-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 flex flex-col justify-center"
              >
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <img 
                      src={stats.total_matches_played.icon.ar1X1} 
                      alt="Matches"
                      className="w-10 h-10 mr-3 filter drop-shadow-lg"
                    />
                    <h3 className="text-lg font-bold text-white font-mono">MISSIONS</h3>
                  </div>
                  <div className="text-5xl font-bold text-orange-400 mb-1 font-mono">{stats.total_matches_played.value}</div>
                  <p className="text-gray-300 font-mono text-sm">{stats.total_matches_played.name}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Detailed Stats */}
            <motion.div 
              key={`detailed-stats-${selectedWeek}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className={`grid grid-cols-2 md:grid-cols-4 gap-2 ${weekLoading ? 'opacity-50' : ''}`}
            >
              {/* Kills */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
                className="bg-black/40 backdrop-blur-md rounded-xl p-4 border-2 border-orange-500/30 text-center hover:border-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20"
              >
                <img 
                  src={stats.total_kills.icon.ar1X1} 
                  alt="Kills"
                  className="w-6 h-6 mx-auto mb-2 filter drop-shadow-lg"
                />
                <div className="text-2xl font-bold text-orange-400 mb-1 font-mono">{stats.total_kills.value}</div>
                <p className="text-gray-300 text-xs font-mono">{stats.total_kills.name}</p>
              </motion.div>

              {/* Assists */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5, ease: "easeOut" }}
                className="bg-black/40 backdrop-blur-md rounded-xl p-4 border-2 border-orange-500/30 text-center hover:border-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20"
              >
                <img 
                  src={stats.total_assists.icon.ar1X1} 
                  alt="Assists"
                  className="w-6 h-6 mx-auto mb-2 filter drop-shadow-lg"
                />
                <div className="text-2xl font-bold text-orange-400 mb-1 font-mono">{stats.total_assists.value}</div>
                <p className="text-gray-300 text-xs font-mono">{stats.total_assists.name}</p>
              </motion.div>

              {/* Revives */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
                className="bg-black/40 backdrop-blur-md rounded-xl p-4 border-2 border-orange-500/30 text-center hover:border-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20"
              >
                <img 
                  src={stats.total_revives.icon.ar1X1} 
                  alt="Revives"
                  className="w-6 h-6 mx-auto mb-2 filter drop-shadow-lg"
                />
                <div className="text-2xl font-bold text-orange-400 mb-1 font-mono">{stats.total_revives.value}</div>
                <p className="text-gray-300 text-xs font-mono">{stats.total_revives.name}</p>
              </motion.div>

              {/* XP */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
                className="bg-black/40 backdrop-blur-md rounded-xl p-4 border-2 border-orange-500/30 text-center hover:border-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20"
              >
                <img 
                  src={stats.total_xp.icon.ar1X1} 
                  alt="XP"
                  className="w-6 h-6 mx-auto mb-2 filter drop-shadow-lg"
                />
                <div className="text-2xl font-bold text-orange-400 mb-1 font-mono">{stats.total_xp.value}</div>
                <p className="text-gray-300 text-xs font-mono">{stats.total_xp.name}</p>
              </motion.div>
            </motion.div>

            {/* Performance Metrics */}
            <motion.div 
              key={`performance-metrics-${selectedWeek}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className={`mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 ${weekLoading ? 'opacity-50' : ''}`}
            >
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5, ease: "easeOut" }}
                className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border-2 border-orange-500/30 hover:border-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20"
              >
                <h3 className="text-lg font-bold text-white mb-2 text-center font-mono">K/D RATIO</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-1 font-mono">
                    {stats.kill_death_ratio ? parseFloat(stats.kill_death_ratio).toFixed(2) : 'N/A'}
                  </div>
                  <p className="text-gray-300 text-xs font-mono">KILLS PER DEATH</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
                className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border-2 border-orange-500/30 hover:border-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20"
              >
                <h3 className="text-lg font-bold text-white mb-2 text-center font-mono">AVG KILLS</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-1 font-mono">
                    {(parseInt(stats.total_kills.value) / parseInt(stats.total_matches_played.value)).toFixed(1)}
                  </div>
                  <p className="text-gray-300 text-xs font-mono">PER MISSION</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5, ease: "easeOut" }}
                className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border-2 border-orange-500/30 hover:border-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20"
              >
                <h3 className="text-lg font-bold text-white mb-2 text-center font-mono">AVG XP</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-1 font-mono">
                    {(parseInt(stats.total_xp.value.replace(',', '')) / parseInt(stats.total_matches_played.value)).toLocaleString()}
                  </div>
                  <p className="text-gray-300 text-xs font-mono">PER MISSION</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-center"
            >
              <p className="text-gray-400 text-sm font-mono mb-4">
                COMBAT DATA FROM EA BATTLEFIELD 6 OPEN BETA {selectedWeek === 'OpenBetaWeekend1' ? 'WEEKEND 1' : selectedWeek === 'OpenBetaWeekend2' ? 'WEEKEND 2' : 'ALL WEEKS'}
              </p>
              
              <div className="flex space-x-3 justify-center">
                <button 
                  onClick={() => fetchBF6Data(locale, currentUser, selectedWeek)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-all duration-300 font-mono border-2 border-orange-400 hover:border-orange-300 shadow-lg hover:shadow-xl text-sm"
                >
                  REFRESH DATA
                </button>
                
                <button 
                  onClick={handleShare}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-300 font-mono border-2 border-blue-400 hover:border-blue-300 shadow-lg hover:shadow-xl text-sm flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>SHARE</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
