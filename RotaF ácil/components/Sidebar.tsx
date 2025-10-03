import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';
import { MenuItem as MenuItemType } from '../types';
import { ChevronDownIcon, XMarkIcon } from './icons';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

interface NavLinkProps {
  item: MenuItemType;
  isActive: boolean;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, isActive, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleItemClick = () => {
    if (item.subItems) {
      setIsExpanded(!isExpanded);
    } else {
      onClick();
    }
  };

  const baseClasses = 'flex items-center px-4 py-3 text-zinc-300 transition-colors duration-200 transform rounded-lg';
  const activeClasses = 'bg-zinc-800 text-amber-400';
  const hoverClasses = 'hover:bg-zinc-800 hover:text-white';
  
  const linkIsActive = isActive && !item.subItems;

  return (
    <div>
      <a
        href="#"
        className={`${baseClasses} ${linkIsActive ? activeClasses : hoverClasses}`}
        onClick={(e) => {
          e.preventDefault();
          handleItemClick();
        }}
      >
        <item.icon className="w-5 h-5" />
        <span className="mx-4 font-medium">{item.name}</span>
        {item.subItems && (
          <ChevronDownIcon
            className={`w-5 h-5 ml-auto transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          />
        )}
      </a>
      {isExpanded && item.subItems && (
        <div className="pl-8 py-2 bg-black/30 rounded-b-lg">
          {item.subItems.map(subItem => (
            <a
              href="#"
              key={subItem.name}
              className="block px-4 py-2 mt-1 text-sm text-zinc-400 rounded-lg hover:bg-zinc-700 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick(); // For now, sub-item clicks navigate to the parent's view
              }}
            >
              {subItem.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, activeView, setActiveView }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 z-30 w-72 bg-zinc-900 shadow-lg px-4 py-5 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4">
          <a href="#" className="text-2xl font-bold text-white">
            Rota<span className="text-amber-400">Fácil</span>
          </a>
          <button
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-white lg:hidden"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-10 space-y-2">
          {MENU_ITEMS.map((item) => (
            <NavLink
              key={item.name}
              item={item}
              isActive={activeView === item.name}
              onClick={() => {
                setActiveView(item.name);
                setIsOpen(false);
              }}
            />
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;