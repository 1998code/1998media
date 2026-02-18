import { useEffect, useState, useRef } from 'react';
import { Tooltip } from '@nextui-org/tooltip';

export default function Music(props) {
  // Track if fallback is used
  const [usingCharts, setUsingCharts] = useState(false);
  // Track music source
  const [musicSource, setMusicSource] = useState('apple'); // 'apple', 'spotify', or 'charts'
  const [isMobile, setIsMobile] = useState(false);
  const loggedMissingKeys = useRef(new Set());
  const [deviceId, setDeviceId] = useState(null);
  const [sdkPlayer, setSdkPlayer] = useState(null);
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [isPersonalSpotify, setIsPersonalSpotify] = useState(false);

  function i18n(key) {
    if (props.i18n && props.i18n['music'] && !props.i18n['music'][key]) {
      if (!loggedMissingKeys.current.has(key)) {
        console.log('Music Missing Translation: ' + key);
        loggedMissingKeys.current.add(key);
      }
    }
    // Replace playlist title if using charts fallback
    if (usingCharts && key === 'My Recent Playlist') {
      return 'US Top 20 Charts';
    }
    return props.i18n && props.i18n['music'] && props.i18n['music'][key]
      ? props.i18n['music'][key]
      : key;
  }

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    fetchMusicList();

    // Check if personal Spotify is available
    fetch('/api/music?provider=spotify&path=token')
      .then((res) => res.json())
      .then((data) => {
        if (data.isPersonal) {
          setIsPersonalSpotify(true);
          // Load Spotify SDK if not already there
          if (!window.Spotify) {
            const script = document.createElement('script');
            script.src = 'https://sdk.scdn.co/spotify-player.js';
            script.async = true;
            document.body.appendChild(script);
            window.onSpotifyWebPlaybackSDKReady = () => {
              initializeSpotifySDK();
            };
          } else {
            initializeSpotifySDK();
          }
        }
      });

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (sdkPlayer) sdkPlayer.disconnect();
    };
  }, []);

  const initializeSpotifySDK = async () => {
    const player = new window.Spotify.Player({
      name: '1998 MEDIA Player',
      getOAuthToken: async (cb) => {
        const res = await fetch('/api/music?provider=spotify&path=token');
        const { access_token: token } = await res.json();
        cb(token);
      },
      volume: 0.5,
    });

    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      setDeviceId(device_id);
      setIsSdkReady(true);
    });

    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    player.addListener('player_state_changed', (state) => {
      if (!state) return;
      setIsPlaying(!state.paused);
      setTimer(state.position / 1000);

      // Update current playing if it changed from Spotify side
      const currentTrack = state.track_window.current_track;
      if (currentTrack && currentTrack.id !== currentPlaying.id) {
        // Sync track metadata if it changed (e.g. user skipped in Spotify app)
        const found = music.find((m) => m.id === currentTrack.id);
        if (found) setCurrentPlaying(found);
      }
    });

    player.connect();
    setSdkPlayer(player);
  };

  const [timer, setTimer] = useState(0);
  const [music, setMusic] = useState([]);
  const [currentPlaying, setCurrentPlaying] = useState({});
  function fetchMusicList() {
    fetch(`/api/music?path=me/recent/played/tracks`)
      .then((response) => {
        if (!response.ok) throw new Error('recent tracks error');
        return response.json();
      })
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setMusic(data.data);
          setCurrentPlaying(data.data[0]);
          setUsingCharts(false);
          setMusicSource('apple');
        } else {
          throw new Error('No recent tracks');
        }
      })
      .catch(() => {
        // Try Spotify as fallback before charts
        fetch(
          `/api/music?provider=spotify&path=me/top/tracks&time_range=medium_term`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.data && data.data.length > 0) {
              // Only search Apple Music for tracks that don't have a native Spotify preview
              Promise.all(
                data.data.map((spotifyTrack) => {
                  if (spotifyTrack.attributes.previews?.length > 0) {
                    return Promise.resolve(spotifyTrack);
                  }

                  const searchQuery = `${spotifyTrack.attributes.name} ${spotifyTrack.attributes.artistName}`;
                  return fetch(
                    `/api/music?path=catalog/us/search?term=${encodeURIComponent(searchQuery)}&types=songs&limit=1`
                  )
                    .then((res) => res.json())
                    .then((searchData) => {
                      if (searchData.results?.songs?.data?.[0]) {
                        const appleTrack = searchData.results.songs.data[0];
                        // Merge Spotify track info with Apple Music preview
                        return {
                          ...spotifyTrack,
                          attributes: {
                            ...spotifyTrack.attributes,
                            previews: appleTrack.attributes.previews || [],
                            // Keep Spotify artwork if Apple Music doesn't have one
                            artwork: appleTrack.attributes.artwork?.url
                              ? appleTrack.attributes.artwork
                              : spotifyTrack.attributes.artwork,
                          },
                        };
                      }
                      return spotifyTrack; // Return original if no match found
                    })
                    .catch(() => spotifyTrack); // Return original on error
                })
              ).then((tracksWithPreviews) => {
                setMusic(tracksWithPreviews);
                setCurrentPlaying(tracksWithPreviews[0]);
                setUsingCharts(false);
                setMusicSource('spotify');
              });
            } else {
              // Spotify also failed, fallback to charts
              throw new Error('Spotify failed');
            }
          })
          .catch(() => {
            // Final fallback to charts
            fetch(`/api/music?path=catalog/us/charts?types=songs`)
              .then((response) => response.json())
              .then((data) => {
                if (
                  data.results &&
                  data.results.songs &&
                  data.results.songs.length > 0 &&
                  data.results.songs[0].data &&
                  data.results.songs[0].data.length > 0
                ) {
                  setMusic(data.results.songs[0].data);
                  setCurrentPlaying(data.results.songs[0].data[0]);
                  setUsingCharts(true);
                  setMusicSource('charts');
                } else {
                  setMusic([]);
                  setCurrentPlaying({});
                  setUsingCharts(true);
                  setMusicSource('charts');
                }
              });
          });
      });
  }

  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  const lyricsContainerRef = useRef();
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollTimeoutRef = useRef();

  // Timer should only run when music is playing (and only manual timer if not using personal Spotify SDK)
  useEffect(() => {
    if (!isPlaying || isPersonalSpotify) return;

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 0.05);
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying, isPersonalSpotify]);

  useEffect(() => {
    // Reset timer when song changes
    if (!isPersonalSpotify) setTimer(0);

    // If using personal Spotify, play full song via SDK
    if (
      isPersonalSpotify &&
      musicSource === 'spotify' &&
      deviceId &&
      props.interacted
    ) {
      playSpotifyTrack(currentPlaying.id);
      setIsPlaying(true);
      setHasStarted(true);
      return;
    }

    // Autoplay when component mounts or user interacts
    if (audioRef.current && !hasStarted && props.interacted) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch(() => {
          // If autoplay fails, set to paused
          setIsPlaying(false);
        });
    } else if (audioRef.current && hasStarted && isPlaying) {
      // When song changes, continue playing if user hasn't manually paused
      audioRef.current.play();
    }
  }, [currentPlaying, props.interacted, isPersonalSpotify, deviceId]);

  const togglePlayPause = (e) => {
    e.preventDefault();
    if (isPersonalSpotify && sdkPlayer) {
      sdkPlayer.togglePlay();
      return;
    }
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playSpotifyTrack = async (trackId) => {
    if (!deviceId || !sdkPlayer) return;

    // Get fresh token
    const res = await fetch('/api/music?provider=spotify&path=token');
    const { access_token } = await res.json();

    await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      {
        method: 'PUT',
        body: JSON.stringify({ uris: [`spotify:track:${trackId}`] }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  };

  // Switch to next song per 30 sec (only if playing and not personal spotify)
  useEffect(() => {
    if (isPersonalSpotify) return;

    const timeInSeconds = Math.floor(timer);
    if (
      timeInSeconds > 0 &&
      timeInSeconds % 30 === 0 &&
      music.length > 0 &&
      isPlaying
    ) {
      // Use a flag to prevent multiple triggers
      const lastTrigger = Math.floor(timer - 0.05);
      if (lastTrigger % 30 !== 0) {
        const currentIndex = music.findIndex(
          (item) => item.id === currentPlaying.id
        );
        const nextIndex =
          currentIndex + 1 === music.length ? 0 : currentIndex + 1;
        setCurrentPlaying(music[nextIndex]);
        if (audioRef.current) {
          audioRef.current.play();
        }
        setIsPlaying(true);
      }
    }
  }, [timer, isPersonalSpotify]);

  // Get Lyrics
  // Need to search /api/music?provider=qq&path=search/quick&key={songName} to get songmid
  // Then get lyrics via /api/music?provider=qq&path=lyric&songmid=001IhSxX225n1g
  const [lyrics, setLyrics] = useState(null); // null = loading, '' = no lyrics, string = lyrics
  const [parsedLyrics, setParsedLyrics] = useState([]);
  const [isTranslated, setIsTranslated] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedLyrics, setTranslatedLyrics] = useState([]);

  // Parse lyrics with timestamps
  const parseLyricsWithTimestamps = (lyricsText) => {
    if (!lyricsText) return [];

    const lines = lyricsText.split('\n');
    const parsed = [];

    lines.forEach((line) => {
      // Match timestamp format [00:12.34] or [00:12]
      const match = line.match(/\[(\d{2}):(\d{2})(?:\.(\d{2}))?\](.*)/);
      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseInt(match[2]);
        const centiseconds = match[3] ? parseInt(match[3]) : 0;
        const timeInSeconds = minutes * 60 + seconds + centiseconds / 100;
        const text = match[4].trim();

        if (text) {
          // Filter out metadata lines (Lyrics by, Composed by, Produced by, etc.)
          const isMetadata =
            /^(Lyrics|Composed|Produced|Arranged|Music|Written|Mixed|Mastered|Recorded|Vocal|Chorus|Engineer|Mixing|Recording|作曲|作詞|作词|編曲|编曲|監製|监制|製作人|制作人|词|曲)\s*(by|:|：)/i.test(
              text
            );
          if (!isMetadata) {
            parsed.push({ time: timeInSeconds, text });
          }
        }
      }
    });

    return parsed;
  };

  // Check if lyrics indicate instrumental/pure music
  const isInstrumental = (lyricsText) => {
    if (!lyricsText) return false;
    const instrumentalKeywords = [
      '純音樂',
      '纯音乐',
      'Pure Music',
      'Instrumental',
      '此歌曲爲沒有填詞',
      '此歌曲为没有填词',
      'No lyrics',
    ];
    return instrumentalKeywords.some((keyword) => lyricsText.includes(keyword));
  };

  // Get current lyric line based on timer
  const getCurrentLyricIndex = () => {
    if (parsedLyrics.length === 0) return -1;

    // Use full timer for personal spotify, modulo for preview
    const currentTime = isPersonalSpotify ? timer : timer % 30;

    for (let i = parsedLyrics.length - 1; i >= 0; i--) {
      if (currentTime >= parsedLyrics[i].time) {
        return i;
      }
    }
    return -1;
  };

  const currentLyricIndex = getCurrentLyricIndex();

  // Calculate progress within current lyric line (0-100%) - Only for personal spotify
  const getCurrentLyricProgress = () => {
    if (
      !isPersonalSpotify ||
      currentLyricIndex === -1 ||
      parsedLyrics.length === 0
    )
      return 0;

    const currentTime = timer;
    const currentLyric = parsedLyrics[currentLyricIndex];
    const nextLyric = parsedLyrics[currentLyricIndex + 1];

    if (!nextLyric) return 100;

    const duration = nextLyric.time - currentLyric.time;
    const elapsed = currentTime - currentLyric.time;

    return Math.min(100, Math.max(0, (elapsed / duration) * 100));
  };

  const lyricProgress = getCurrentLyricProgress();
  function searchSongMID(songName, singerName) {
    fetch(
      `/api/music?provider=qq&path=search&pageSize=3&key=${encodeURIComponent(songName + ' ' + singerName)}`
    )
      .then((response) => response.json())
      .then((data) => {
        // QQ Music API returns data nested under data.song.list
        const songList = data?.data?.song?.list || [];
        if (songList.length === 0) {
          setLyrics('');
          return;
        }
        fetchLyrics(songList[0].songmid);
      })
      .catch((err) => {
        console.error('Search error:', err);
        setLyrics('');
      });
  }
  // Decode HTML entities in lyrics
  function decodeHtmlEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }

  function fetchLyrics(songmid) {
    fetch(`/api/music?provider=qq&path=lyric&songmid=${songmid}`)
      .then((response) => response.json())
      .then((data) => {
        // QQ Music returns base64 encoded lyrics
        if (data.lyric) {
          try {
            let decodedLyrics = atob(data.lyric);
            // Decode HTML entities like &apos; to '
            decodedLyrics = decodeHtmlEntities(decodedLyrics);
            setLyrics(decodedLyrics);
            setParsedLyrics(parseLyricsWithTimestamps(decodedLyrics));
          } catch (e) {
            // If not base64, decode HTML entities and use as-is
            const decodedLyrics = decodeHtmlEntities(data.lyric);
            setLyrics(decodedLyrics);
            setParsedLyrics(parseLyricsWithTimestamps(decodedLyrics));
          }
        } else {
          setLyrics('');
        }
      })
      .catch((err) => {
        console.error('Lyrics error:', err);
        setLyrics('');
      });
  }

  // Translate lyrics function
  const translateLyrics = async () => {
    if (!parsedLyrics || parsedLyrics.length === 0) return;

    setIsTranslating(true);
    try {
      const targetLocale = props.locale || 'en';
      console.log('Translating to locale:', targetLocale);

      // Combine all lyrics into a single text with newline separators
      const combinedText = parsedLyrics.map((line) => line.text).join('\n');

      // Make a single API call for all lyrics
      const response = await fetch(
        `/api/translate?text=${encodeURIComponent(combinedText)}&from=auto&to=${targetLocale}`
      );
      const data = await response.json();

      // Split the translated text back into individual lines
      const translatedLines = (data.output || combinedText).split('\n');

      // Map back to the original structure with timestamps
      const translated = parsedLyrics.map((line, index) => ({
        ...line,
        text: translatedLines[index] || line.text,
      }));

      setTranslatedLyrics(translated);
      setIsTranslated(true);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  // Toggle translation
  const toggleTranslation = () => {
    if (isTranslated) {
      setIsTranslated(false);
    } else if (translatedLyrics.length > 0) {
      setIsTranslated(true);
    } else {
      translateLyrics();
    }
  };
  useEffect(() => {
    if (currentPlaying.id) {
      setLyrics(null); // Set to null to show loading state
      setParsedLyrics([]);
      setIsTranslated(false);
      setTranslatedLyrics([]);
      searchSongMID(
        currentPlaying.attributes.name,
        currentPlaying.attributes.artistName
      );
    }
  }, [currentPlaying]);

  // Handle manual scroll detection
  const handleLyricsScroll = () => {
    setIsUserScrolling(true);
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 3000);
  };

  // Auto-scroll to current lyric (only for personal spotify)
  useEffect(() => {
    if (
      isPersonalSpotify &&
      currentLyricIndex >= 0 &&
      lyricsContainerRef.current &&
      !isUserScrolling
    ) {
      const activeElement = lyricsContainerRef.current.querySelector(
        `[data-lyric-index="${currentLyricIndex}"]`
      );
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentLyricIndex, isUserScrolling, parsedLyrics, isPersonalSpotify]);
  // Calculate progress percentage (0-100)
  const duration = currentPlaying.attributes?.durationInMillis / 1000 || 30;
  const progress = isPersonalSpotify
    ? (timer / duration) * 100
    : ((timer % 30) / 30) * 100;

  if (!music || music.length === 0 || !currentPlaying) return null;

  return (
    <div
      className={`${!props.interacted ? 'hidden' : 'fixed'} max-w-full w-full flex items-center justify-center bottom-0 md:bottom-5 z-[10] pointer-events-none left-0 right-0`}
    >
      <div className="group relative flex items-center w-full md:w-fit h-[90px] md:h-[80px] p-1 shadow bg-white/50 dark:bg-black/50 dark:hover:bg-black dark:shadow-black backdrop-blur-lg md:rounded-xl transition-all pointer-events-auto">
        {/* Progress bar border - Light mode */}
        <div
          className="hidden md:block dark:hidden absolute inset-0 rounded-xl pointer-events-none z-[1]"
          style={{
            background: `conic-gradient(from 0deg, ${musicSource === 'spotify' ? '#22c55e' : '#ef4444'} 0%, ${musicSource === 'spotify' ? '#22c55e' : '#ef4444'} ${progress}%, #000000 ${progress}%, #000000 100%)`,
            padding: '2px',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
        {/* Progress bar border - Dark mode */}
        <div
          className="hidden md:dark:block absolute inset-0 rounded-xl pointer-events-none z-[1]"
          style={{
            background: `conic-gradient(from 0deg, ${musicSource === 'spotify' ? '#22c55e' : '#ef4444'} 0%, ${musicSource === 'spotify' ? '#22c55e' : '#ef4444'} ${progress}%, #ffffff ${progress}%, #ffffff 100%)`,
            padding: '2px',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
        <Tooltip
          isDisabled={isMobile}
          content={
            <div className="flex flex-col max-h-[50vh]">
              <div className="sticky top-0 z-10 flex items-start justify-between text-sm md:text-2xl font-bold dark:text-white p-2 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 rounded-t-xl md:rounded-t-2xl">
                {i18n('My Recent Playlist')}
                <span
                  className={`text-sm ml-3 ${musicSource === 'spotify' ? 'text-green-600' : 'text-red-600'}`}
                >
                  {musicSource === 'spotify' ? (
                    <>
                      <i className="fab fa-spotify mr-1"></i>Spotify
                    </>
                  ) : (
                    i18n(' Music')
                  )}
                </span>
              </div>
              <div className="overflow-auto">
                {music.map((item, index) => (
                  <a
                    key={index}
                    href={item.attributes.url}
                    target="_blank"
                    className={`p-3 flex items-center justify-between gap-4 ${index === music.findIndex((music) => music.id === currentPlaying.id) ? (musicSource === 'spotify' ? 'bg-green-600 text-white animate-pulse' : 'bg-red-600 text-white animate-pulse') : 'hover:bg-black/10 dark:text-white dark:hover:bg-white/10'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="relative group/playlistitem w-10 h-10 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          const isCurrentSong = item.id === currentPlaying.id;
                          if (isCurrentSong) {
                            togglePlayPause(e);
                          } else {
                            // Switch to new song
                            setCurrentPlaying(item);
                            setTimer(0);
                            if (audioRef.current) {
                              audioRef.current.play();
                              setIsPlaying(true);
                            }
                          }
                        }}
                      >
                        <img
                          alt={item.attributes.name}
                          loading="lazy"
                          src={item.attributes.artwork.url
                            .replace('{w}', '50')
                            .replace('{h}', '50')}
                          className="w-10 h-10 rounded-xl shadow-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover/playlistitem:opacity-100 transition-opacity">
                          <i
                            className={`fa ${item.id === currentPlaying.id && isPlaying ? 'fa-pause' : 'fa-play'} text-white text-sm`}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-xs font-bold whitespace-nowrap">
                          {item.attributes.name}
                        </div>
                        <div
                          className={`text-[10px]  ${index === music.findIndex((music) => music.id === currentPlaying.id) ? 'text-gray-100' : 'text-gray-500'} whitespace-nowrap`}
                        >
                          {item.attributes.artistName}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`text-[10px] ${index === music.findIndex((music) => music.id === currentPlaying.id) ? 'text-gray-100' : 'text-gray-500'} text-right`}
                    >
                      <span>
                        {index ===
                          music.findIndex(
                            (music) => music.id === currentPlaying.id
                          ) && i18n('Now Playing')}
                      </span>
                      <br />
                      <span>
                        {Math.floor(item.attributes.durationInMillis / 60000)}:
                        {(
                          '0' +
                          Math.floor(
                            (item.attributes.durationInMillis % 60000) / 1000
                          )
                        ).slice(-2)}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          }
          placement="top-center"
          offset={20}
          className="min-w-[50px] p-0 border text-xs dark:text-white bg-white/50 dark:bg-black backdrop-blur-lg rounded-xl md:rounded-2xl"
        >
          <div className="relative group/album ml-2 md:ml-0 md:absolute md:-left-7 md:top-2 min-w-[65px] h-[65px] z-[2]">
            <a
              href={currentPlaying.attributes?.url}
              target="_blank"
              className="block"
            >
              <img
                alt={currentPlaying.attributes.name}
                loading="lazy"
                src={currentPlaying.attributes.artwork.url
                  .replace('{w}', '500')
                  .replace('{h}', '500')}
                className="min-w-[65px] h-[65px] rounded-xl shadow-lg md:border-2 md:border-black dark:md:border-white transition-all"
              />
            </a>
            <button
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                togglePlayPause(e);
              }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl opacity-0 group-hover/album:opacity-100 transition-opacity z-10"
            >
              <i
                className={`fa ${isPlaying ? 'fa-pause' : 'fa-play'} text-white text-2xl pointer-events-none`}
              />
            </button>
          </div>
        </Tooltip>
        <div className="ml-12 flex items-center w-full h-full">
          <Tooltip
            isDisabled={isMobile}
            content={
              <div className="flex flex-col max-w-[450px] max-h-[40vh]">
                <div className="sticky top-0 z-10 flex items-center justify-between text-sm md:text-xl font-bold dark:text-white p-2 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 rounded-t-xl md:rounded-t-2xl">
                  <span>{i18n('Lyrics')}</span>
                  <div className="flex items-center gap-2">
                    <a
                      href="/api/spotify/login"
                      className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${isPersonalSpotify ? 'bg-green-600/20 text-green-600 border border-green-600/30' : 'bg-green-600 text-white hover:bg-green-700 shadow-sm'}`}
                    >
                      <i className="fab fa-spotify"></i>
                      {isPersonalSpotify ? 'Logged in' : 'Login'}
                    </a>
                    <button
                      onClick={toggleTranslation}
                      disabled={
                        isTranslating ||
                        !parsedLyrics ||
                        parsedLyrics.length === 0
                      }
                      className={`px-3 py-1 rounded-md text-[10px] md:text-xs font-bold transition-all ${
                        isTranslated
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-gray-500 dark:text-gray-400 hover:dark:text-white'
                      } ${isTranslating || !parsedLyrics || parsedLyrics.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isTranslating ? (
                        <i className="fa fa-circle-notch fa-spin" />
                      ) : (
                        <i className="fa fa-language" />
                      )}
                    </button>
                  </div>
                </div>
                {/* Lyrics Content */}
                <div
                  ref={lyricsContainerRef}
                  className="text-sm py-2 pr-2 overflow-x-hidden overflow-y-auto"
                  onScroll={handleLyricsScroll}
                  onWheel={handleLyricsScroll}
                  onTouchMove={handleLyricsScroll}
                >
                  {lyrics === null ? (
                    // Loading state
                    <div className="text-center">
                      <i className="fa fa-circle-notch fa-spin" />
                    </div>
                  ) : lyrics === '' ? (
                    // No lyrics found
                    <div className="text-gray-400 dark:text-gray-500 text-center py-8 flex flex-col items-center gap-2">
                      <i className="fa fa-music-slash text-3xl" />
                      <div className="text-base">No lyrics available</div>
                    </div>
                  ) : isInstrumental(lyrics) ? (
                    // Show instrumental message
                    <div className="text-gray-400 dark:text-gray-500 text-center py-8 flex flex-col items-center gap-2">
                      <i className="fa fa-music text-3xl" />
                      <div className="text-base">Pure Music</div>
                      <div className="text-sm">No lyrics</div>
                    </div>
                  ) : parsedLyrics.length > 0 ? (
                    // Karaoke-style view with timestamps and auto-scroll
                    <div className="flex flex-col gap-3 py-2">
                      {parsedLyrics.map((line, index) => {
                        const translatedLine = isTranslated
                          ? translatedLyrics[index]
                          : null;

                        // Helper function for word-by-word highlighting (Personal Spotify only)
                        const renderKaraokeLine = (
                          text,
                          activeClass,
                          inactiveClass
                        ) => {
                          if (
                            !isPersonalSpotify ||
                            index !== currentLyricIndex
                          ) {
                            return (
                              <span className={inactiveClass}>{text}</span>
                            );
                          }

                          // Split by words and spaces to preserve formatting
                          const words = text.split(/(\s+)/);
                          const totalChars = text.length || 1;
                          let charCount = 0;

                          return (
                            <div className="inline">
                              {words.map((word, i) => {
                                const wordLen = word.length;
                                const startPct = (charCount / totalChars) * 100;
                                const endPct =
                                  ((charCount + wordLen) / totalChars) * 100;
                                charCount += wordLen;

                                let wordProgress = 0;
                                if (lyricProgress >= endPct) wordProgress = 100;
                                else if (lyricProgress > startPct) {
                                  wordProgress =
                                    ((lyricProgress - startPct) /
                                      (endPct - startPct)) *
                                    100;
                                }

                                return (
                                  <span
                                    key={i}
                                    className="relative inline-block whitespace-pre"
                                  >
                                    <span className={inactiveClass}>
                                      {word}
                                    </span>
                                    <span
                                      className={`absolute top-0 left-0 overflow-hidden ${activeClass} whitespace-pre pointer-events-none`}
                                      style={{
                                        width: `${wordProgress}%`,
                                        transition: 'width 0.05s linear',
                                      }}
                                    >
                                      {word}
                                    </span>
                                  </span>
                                );
                              })}
                            </div>
                          );
                        };

                        return (
                          <div
                            key={index}
                            data-lyric-index={index}
                            onClick={() => {
                              // Jump to this timestamp when clicked
                              if (isPersonalSpotify && sdkPlayer) {
                                sdkPlayer.seek(line.time * 1000);
                                if (!isPlaying) {
                                  sdkPlayer.togglePlay();
                                  setIsPlaying(true);
                                }
                              } else if (audioRef.current) {
                                audioRef.current.currentTime = line.time;
                                setTimer(line.time);
                                if (!isPlaying) {
                                  audioRef.current.play();
                                  setIsPlaying(true);
                                }
                              }
                            }}
                            className={`transition-all duration-300 text-left pl-2 pr-4 py-1 relative break-words cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg ${isPersonalSpotify && index === currentLyricIndex ? 'font-bold' : ''}`}
                          >
                            {/* Translated lyrics (if available) - TOP and BIGGER */}
                            {isTranslated && translatedLine ? (
                              <div
                                className={`${isPersonalSpotify && index === currentLyricIndex ? 'text-xl md:text-2xl font-bold' : 'text-base md:text-lg text-gray-500 dark:text-gray-400'}`}
                              >
                                {isPersonalSpotify
                                  ? renderKaraokeLine(
                                      translatedLine.text,
                                      'text-gray-900 dark:text-white',
                                      'text-gray-400 dark:text-gray-500'
                                    )
                                  : translatedLine.text}
                              </div>
                            ) : (
                              !isTranslated && (
                                <div
                                  className={`${isPersonalSpotify && index === currentLyricIndex ? 'text-xl md:text-2xl font-bold' : 'text-base md:text-lg dark:text-white'}`}
                                >
                                  {isPersonalSpotify
                                    ? renderKaraokeLine(
                                        line.text,
                                        'text-gray-900 dark:text-white',
                                        'text-gray-400 dark:text-gray-500'
                                      )
                                    : line.text}
                                </div>
                              )
                            )}

                            {/* Original lyrics (if translation is enabled) - BOTTOM and SMALLER */}
                            {isTranslated && translatedLine && (
                              <div
                                className={`mt-1 ${isPersonalSpotify && index === currentLyricIndex ? 'text-base md:text-lg' : 'text-sm md:text-base text-gray-500 dark:text-gray-400'}`}
                              >
                                {isPersonalSpotify
                                  ? renderKaraokeLine(
                                      line.text,
                                      'text-gray-600 dark:text-gray-400',
                                      'text-gray-400 dark:text-gray-500'
                                    )
                                  : line.text}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-gray-400 dark:text-gray-500 text-center">
                      No synced lyrics available
                    </div>
                  )}
                </div>
              </div>
            }
            placement="top-center"
            offset={25}
            className="min-w-[50px] p-0 border text-xs dark:text-white bg-white/80 dark:bg-black backdrop-blur-lg rounded-xl md:rounded-2xl"
          >
            <a
              href={currentPlaying.attributes?.url}
              target="_blank"
              className="flex flex-col justify-center items-start min-w-40"
            >
              <div className="text-sm font-bold text-left dark:text-white">
                {currentPlaying.attributes.name}
              </div>
              <div className="text-xs text-gray-500">
                {currentPlaying.attributes.artistName}
              </div>
            </a>
          </Tooltip>

          {/* Hidden audio element for playback */}
          <div className="hidden relative text-right">
            {currentPlaying.attributes.previews?.length > 0 && (
              <audio
                ref={audioRef}
                key={currentPlaying.attributes.previews[0].url}
              >
                <source
                  src={currentPlaying.attributes.previews[0].url}
                  type="audio/mpeg"
                />
                {i18n('Your browser does not support the audio element.')}
              </audio>
            )}
            {!isPersonalSpotify && (
              <div className="hidden md:group-hover:block absolute -bottom-3.5 right-5 text-[10px] text-gray-400 dark:text-gray-600 z-[1] whitespace-nowrap animate-pulse transition-all">
                {i18n('Next')}:{' '}
                <b>
                  {
                    music[
                      (music.findIndex(
                        (item) => item.id === currentPlaying.id
                      ) +
                        1) %
                        music.length
                    ].attributes.name
                  }
                </b>{' '}
                in {30 - (timer % 30)}s
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
