import React from 'react';

interface RevealButtonProps {
  onClick: () => void;
  isRevealed: boolean;
}

const RevealButton: React.FC<RevealButtonProps> = ({ onClick, isRevealed }) => {
  if (isRevealed) return null;
  
  return (
    <button
      onClick={onClick}
      className="text-white text-2xl font-light hover:opacity-75 transition-opacity duration-300"
    >
      Click
    </button>
  );
};

export default RevealButton;