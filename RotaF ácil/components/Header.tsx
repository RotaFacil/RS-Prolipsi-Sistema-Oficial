import React, { useState, useRef, useEffect } from 'react';
import { Bars3Icon, ArrowRightOnRectangleIcon, StarIcon, Cog6ToothIcon, UserCircleIcon } from './icons';

interface HeaderProps {
  sidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarToggle }) => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="relative z-10 bg-zinc-900 shadow-md shadow-black/50">
      <div className="flex items-center justify-between px-6 py-3 h-16">
        {/* Mobile menu button */}
        <button onClick={sidebarToggle} className="text-zinc-400 focus:outline-none lg:hidden">
          <Bars3Icon className="h-6 w-6" />
        </button>

        {/* Placeholder for search or other left-aligned content on desktop */}
        <div className="hidden lg:block"></div>

        <div className="flex items-center space-x-4">
          <button className="hidden sm:flex items-center justify-center px-4 py-2 text-sm font-medium text-zinc-100 bg-zinc-700 rounded-lg hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-white transition-colors duration-200">
            Sair
            <ArrowRightOnRectangleIcon className="w-5 h-5 ml-2" />
          </button>
          <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-amber-400 rounded-lg hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-amber-400 transition-colors duration-200">
            Upgrade
            <StarIcon className="w-5 h-5 ml-2" />
          </button>
          <div className="relative" ref={profileMenuRef}>
            <button onClick={() => setProfileMenuOpen(!isProfileMenuOpen)} className="block w-10 h-10 overflow-hidden rounded-full border-2 border-amber-400 focus:outline-none focus:border-white">
              <img className="object-cover w-full h-full" src="https://picsum.photos/100" alt="Your avatar" />
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 w-48 mt-2 py-2 bg-zinc-800 rounded-md shadow-xl z-20">
                <a href="#" className="flex items-center px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700">
                  <UserCircleIcon className="w-5 h-5 mr-2" />
                  Perfil
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700">
                  <Cog6ToothIcon className="w-5 h-5 mr-2" />
                  Configurações
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700 sm:hidden">
                  <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                  Sair
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;