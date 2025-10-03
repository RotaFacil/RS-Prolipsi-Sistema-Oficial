import React from 'react';

interface HeaderProps {
  onGalleryClick: () => void;
}

const GalleryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ onGalleryClick }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-slate-700 h-16 flex items-center justify-between px-6 shadow-md sticky top-0 z-40">
      <div className="flex items-center space-x-3">
        <span className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
          Nano Banana Studio
        </span>
      </div>
      <button
        onClick={onGalleryClick}
        className="flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md transition-colors duration-200 text-sm font-medium"
      >
        <GalleryIcon />
        Minhas Criações
      </button>
    </header>
  );
};

export default Header;