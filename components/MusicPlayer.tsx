import React, { useContext, useRef, useState, useEffect } from 'react';
import { MusicContext } from '../App';
import LOFI_SRC from '../assets/lofi-beat.webm';

const MusicPlayer: React.FC = () => {
  const { isPlaying, setIsPlaying } = useContext(MusicContext);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0.3);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-white/80 dark:bg-[#1a1a24]/90 backdrop-blur-md border border-gray-200 dark:border-white/10 p-3 rounded-2xl shadow-xl">
      <button 
        onClick={togglePlay}
        className="w-10 h-10 flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition-colors shadow-sm"
      >
        {isPlaying ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" /></svg>
        ) : (
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M6 4l10 6-10 6V4z" /></svg>
        )}
      </button>
      
      <div className="flex flex-col">
        <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Lo-Fi Beats</span>
        <span className="text-[10px] text-gray-500 dark:text-gray-400">focus mode</span>
      </div>

      <input 
        type="range" 
        min="0" max="1" step="0.01" 
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-16 ml-2 accent-indigo-500 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />

      <audio 
        ref={audioRef}
        src={LOFI_SRC}
        loop
      />
    </div>
  );
};

export default MusicPlayer;
