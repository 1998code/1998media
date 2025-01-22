import { useEffect, useState, useRef } from 'react';
import { Tooltip } from '@nextui-org/tooltip';

export default function Music(props) {
  function i18n(key) {
    if (props.i18n && props.i18n['music'] && !props.i18n['music'][key]) {
      console.log('music Missing Translation: ' + key);
    }
    return props.i18n && props.i18n['music'] && props.i18n['music'][key]
      ? props.i18n['music'][key]
      : key;
  }

  useEffect(() => {
    fetchMusicList();
  }, []);

  const [timer, setTimer] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const [music, setMusic] = useState([]);
  const [currentPlaying, setCurrentPlaying] = useState({});
  function fetchMusicList() {
    fetch(`/api/music?path=me/recent/played/tracks`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setMusic(data.data);
          setCurrentPlaying(data.data[0]);
        } 
        else { }
      });
  }

  const audioRef = useRef();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setTimeout(() => {
        audioRef.current.muted = false;
      }, 1000);
    }
  }, [currentPlaying]); // Run this effect whenever currentPlaying changes

  // Switch to next song per 30 sec
  useEffect(() => {
    if (timer % 30 === 0 && music.length > 0) {
      const currentIndex = music.findIndex(
        (item) => item.id === currentPlaying.id
      );
      const nextIndex = currentIndex + 1 === music.length ? 0 : currentIndex + 1;
      setCurrentPlaying(music[nextIndex]);
      audioRef.current.play();
    }
  }, [timer]);

  // Get Lyrics
  // Need to search /api/music?provider=qq&path=search/quick&key={songName} to get songmid
  // Then get lyrics via /api/music?provider=qq&path=lyric&songmid=001IhSxX225n1g
  const [lyrics, setLyrics] = useState('');
  function searchSongMID(songName, singerName) {
    fetch(`/api/music?provider=qq&path=search&pageSize=3&key=${songName} ${singerName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.list.length === 0) {
          setLyrics('');
          return;
        }
        fetchLyrics(data.list[0].songmid);
      });
  }
  function fetchLyrics(songmid) {
    fetch(`/api/music?provider=qq&path=lyric&songmid=${songmid}`)
      .then((response) => response.json())
      .then((data) => {
        setLyrics(data.lyric);
      });
  }
  useEffect(() => {
    if (currentPlaying.id) {
      setLyrics('');
      searchSongMID(currentPlaying.attributes.name, currentPlaying.attributes.artistName);
    }
  }, [currentPlaying]);
  
  return (
    <div className="fixed w-screen flex items-center justify-center bottom-0 md:bottom-5 z-[10]">
      {music && music.length > 0 && currentPlaying ? (
        // <div
        //   className="group flex items-center w-full md:w-fit h-[90px] md:h-[80px] p-1 shadow md:border border-white bg-white/50 dark:bg-black/50 hover:bg-gradient-to-r from-white/50 via-white to-white dark:from-black/50 dark:via-[#808080] dark:to-white dark:shadow-black backdrop-blur-lg md:rounded-xl">
        <div
          className="group flex items-center w-full md:w-fit h-[90px] md:h-[80px] p-1 shadow md:border border-white bg-white/50 dark:bg-black/50 dark:hover:bg-black dark:shadow-black backdrop-blur-lg md:rounded-xl transition-all">
          <Tooltip
            content={
              <div className="flex flex-col max-h-[50vh] overflow-auto">
                <div className="flex items-start justify-between text-sm md:text-2xl font-bold dark:text-white p-2">
                  {i18n('My Recent Playlist')} {' '}
                  <span class="text-red-600 text-sm">{i18n(' Music')}</span>
                </div>
                {music.map((item, index) => (
                  <a
                    key={index}
                    href={item.attributes.url}
                    target="_blank"
                    className={`p-3 flex items-center justify-between ${index === music.findIndex((music) => music.id === currentPlaying.id) ? 'bg-red-600 text-white' : 'hover:bg-black/10 dark:text-white dark:hover:bg-white/10'}`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.attributes.artwork.url
                          .replace('{w}', '50')
                          .replace('{h}', '50')}
                        className="w-10 h-10 rounded-lg shadow-lg"
                      />
                      <div className="flex flex-col">
                        <div className="text-xs font-bold whitespace-nowrap">
                          {item.attributes.name}
                        </div>
                        <div className={`text-[10px]  ${index === music.findIndex((music) => music.id === currentPlaying.id) ? 'text-gray-100' : 'text-gray-500'} whitespace-nowrap`}>
                          {item.attributes.artistName}
                        </div>
                      </div>
                    </div>
                    <div className={`text-[10px] ${index === music.findIndex((music) => music.id === currentPlaying.id) ? 'text-gray-100' : 'text-gray-500'} text-right`}>
                      <span>
                        {index ===
                          music.findIndex(
                            (music) => music.id === currentPlaying.id
                          ) && i18n('Now Playing')}
                      </span>
                      <br />
                      <span>
                        {Math.floor(item.attributes.durationInMillis / 60000)}:
                        {("0" + Math.floor((item.attributes.durationInMillis % 60000) / 1000)).slice(-2)}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            }
            placement="top-start"
            className="min-w-[50px] mb-2 md:mb-10 p-0 border text-xs dark:text-white bg-white/50 dark:bg-black backdrop-blur-lg rounded-lg md:rounded-2xl"
          >
            <a href={currentPlaying.attributes?.url} target="_blank">
              <img
                src={currentPlaying.attributes.artwork.url
                  .replace('{w}', '500')
                  .replace('{h}', '500')}
                className="md:absolute md:-left-7 top-2 min-w-[65px] h-[65px] rounded-xl shadow-lg hover:border transition-all"
              />
            </a>
          </Tooltip>
          <div className="ml-12 flex items-center w-full h-full">
            <Tooltip
              content={
                <div className="flex flex-col max-w-[450px] max-h-[50vh] overflow-auto">
                  <div className="text-sm md:text-2xl font-bold dark:text-white p-2">
                    {i18n('Lyrics')}
                  </div>
                  <div className="text-sm p-2 whitespace-pre-wrap dark:text-white">
                    { 
                      lyrics ? lyrics.replace(/\[\d{2}:\d{2}\.\d{2}\]/g, '') : (<i className="fa fa-circle-notch fa-spin" />)
                    }
                  </div>
                </div>
              }
              placement="top-start"
              className="min-w-[50px] mb-5 p-0 border text-xs dark:text-white bg-white/50 dark:bg-black backdrop-blur-lg rounded-lg md:rounded-2xl"
            >
              <a href={currentPlaying.attributes?.url} target="_blank" className="flex flex-col justify-center items-start w-40">
                <div className="text-sm font-bold text-left dark:text-white">
                  {currentPlaying.attributes.name}
                </div>
                <div className="text-xs text-gray-500">
                  {currentPlaying.attributes.artistName}
                </div>
              </a>
            </Tooltip>
            
            {/* No longer display player control */}
            <div className="hidden relative text-right">
              <audio
                controls
                muted
                ref={audioRef}
                key={currentPlaying.attributes.previews[0].url}
                className="w-0 opacity-0 md:group-hover:opacity-100 md:group-hover:w-[250px] relative transition-all"
              >
                <source
                  src={currentPlaying.attributes.previews[0].url}
                  type="audio/mpeg"
                />
                {i18n('Your browser does not support the audio element.')}
              </audio>
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
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
