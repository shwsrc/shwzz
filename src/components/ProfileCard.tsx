import React from 'react';
import { Music, Gamepad2, Clock } from 'lucide-react';
import { LanyardData } from '../types/lanyard';

interface ProfileCardProps {
  data: LanyardData;
  isAnimating: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ data, isAnimating }) => {
  const { discord_user, activities, discord_status, listening_to_spotify } = data;
  
  const avatarUrl = discord_user.avatar 
    ? `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.${discord_user.avatar.startsWith('a_') ? 'gif' : 'png'}`
    : `https://cdn.discordapp.com/embed/avatars/${parseInt(discord_user.discriminator) % 5}.png`;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#43b581';
      case 'idle': return '#faa61a';
      case 'dnd': return '#f04747';
      default: return '#747f8d';
    }
  };

  const currentActivity = activities && activities.length > 0 
    ? activities[0] 
    : null;

  const getActivityIcon = () => {
    if (listening_to_spotify) return <Music size={20} />;
    if (currentActivity?.application_id) return <Gamepad2 size={20} />;
    return <Clock size={20} />;
  };

  return (
    <div 
      className={`w-72 h-96 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl flex flex-col ${isAnimating ? 'transition-transform duration-300' : ''}`}
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="relative mx-auto mt-8">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10">
          <img 
            src={avatarUrl} 
            alt={discord_user.username}
            className="w-full h-full object-cover"
          />
        </div>
        <div 
          className="absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-black/50"
          style={{ backgroundColor: getStatusColor(discord_status) }}
        />
      </div>
      
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-white/90 mb-1">
          {discord_user.global_name || discord_user.username}
        </h2>
      </div>
      
      <div className="p-4 flex-1">
        {currentActivity || listening_to_spotify ? (
          <div className="bg-black/20 p-3 rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2 text-white/80">
              {getActivityIcon()}
              <span className="text-sm font-medium">
                {listening_to_spotify ? 'Listening to Spotify' : currentActivity?.name}
              </span>
            </div>
            
            {listening_to_spotify && data.spotify ? (
              <div className="text-white/60 text-xs">
                <p className="truncate">{data.spotify.song}</p>
                <p className="text-white/40 truncate">by {data.spotify.artist}</p>
              </div>
            ) : currentActivity ? (
              <div className="text-white/60 text-xs">
                <p className="truncate">{currentActivity.details}</p>
                <p className="text-white/40 truncate">{currentActivity.state}</p>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-white/40 text-sm"></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;