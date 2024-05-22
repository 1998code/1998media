import { sign } from 'jsonwebtoken';
import { useEffect, useState, useRef } from 'react';

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
      setTimer(prevTimer => prevTimer + 1);
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
        setMusic(data.data);
        setCurrentPlaying(data.data[0]);
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

  // switch to next song per 30 sec
  useEffect(() => {
    if (timer % 30 === 0 && music.length > 0) {
      const currentIndex = music.findIndex((item) => item.id === currentPlaying.id);
      const nextIndex = currentIndex + 1 === music.length ? 0 : currentIndex + 1;
      // setCurrentPlaying({});
      setCurrentPlaying(music[nextIndex]);
      audioRef.current.play();
    }
  }, [timer]);

  return (
    <div className="fixed w-screen flex items-center justify-center bottom-0 sm:bottom-5 z-[10]">
      { music.length > 0 && currentPlaying ? (
      <div className="group flex items-center min-w-[300px] h-[80px] p-1 shadow bg-gradient-to-r from-white/50 via-white to-white dark:from-black/50 dark:via-[#808080] dark:to-white dark:shadow-black backdrop-blur-lg rounded-xl">
        <img src={currentPlaying.attributes.artwork.url.replace("{w}","500").replace("{h}","500")} className="sm:absolute sm:-left-7 top-2 w-[65px] h-[65px] rounded-xl shadow-lg hover:border transition-all" />
        <div className="ml-12 flex items-center w-full h-full">
          <div className="flex flex-col justify-center items-start w-40">
            <div className="text-sm font-bold text-left dark:text-white">
              {currentPlaying.attributes.name}
            </div>
            <div className="text-xs text-gray-500">
              {currentPlaying.attributes.artistName}
            </div>
          </div>
          <div className="relative text-right">
            <audio controls muted ref={audioRef} key={currentPlaying.attributes.previews[0].url} className="invisible sm:visible relative">
              <source src={currentPlaying.attributes.previews[0].url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div className="hidden group-hover:block absolute -bottom-2 right-5 text-[10px] text-gray-400 z-[1] whitespace-nowrap animate-pulse transition-all">
              My Recent Playlist | Next: <b>{music[(music.findIndex((item) => item.id === currentPlaying.id) + 1) % music.length].attributes.name}</b> in {30 - (timer % 30)}s
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
