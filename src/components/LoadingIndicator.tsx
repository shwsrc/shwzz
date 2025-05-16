import React from 'react';

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message = '' }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-16 h-16 mb-4">
        <div 
          className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: 'rgba(255, 255, 255, 0.4)', borderTopColor: 'white' }}
        />
        <div 
          className="absolute inset-2 rounded-full border-4 border-t-transparent animate-spin"
          style={{ 
            borderColor: 'rgba(255, 255, 255, 0.4)', 
            borderTopColor: 'white',
            animationDirection: 'reverse',
            animationDuration: '1.5s'
          }}
        />
      </div>
      <p className="text-white text-lg">{message}</p>
    </div>
  );
};

export default LoadingIndicator;
