import React, { useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { BACKGROUND_IMAGE_URL, BACKGROUND_MUSIC_URL } from '../utils/constants';

interface BackgroundProps {
  isRevealed: boolean;
}

const Background: React.FC<BackgroundProps> = ({ isRevealed }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = React.useState(false);
  const [volume, setVolume] = React.useState(0.5);

  useEffect(() => {
    if (isRevealed && audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
  }, [isRevealed, volume]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden transition-all duration-1000"
        style={{ 
          backgroundColor: '#000000',
          backgroundImage: isRevealed ? `url(${BACKGROUND_IMAGE_URL})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {isRevealed && (
          <div 
            className="absolute inset-0 transition-opacity duration-1000" 
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
            }} 
          />
        )}
      </div>
      
      {isRevealed && (
        <div className="fixed bottom-5 right-5 bg-black/70 backdrop-blur-sm p-3 rounded-full flex items-center gap-2 z-10 transition-opacity duration-500 opacity-100 hover:opacity-100">
          <button 
            onClick={toggleMute} 
            className="text-white p-1 rounded-full hover:bg-white/10"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 accent-white"
          />
          <audio ref={audioRef} src={BACKGROUND_MUSIC_URL} loop />
        </div>
      )}
    </>
  );
};

export default Background;