import React from 'react';
import { Mode } from '../types';

interface ModeToggleProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ mode, setMode }) => {
  const isImage = mode === 'Image';
  return (
    <div className="flex items-center bg-slate-800 rounded-full p-1">
      <button
        onClick={() => setMode('Image')}
        className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
          isImage ? 'bg-yellow-500 text-gray-900' : 'text-slate-300 hover:bg-slate-700'
        }`}
      >
        Imagem
      </button>
      <button
        onClick={() => setMode('Video')}
        className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
          !isImage ? 'bg-yellow-500 text-gray-900' : 'text-slate-300 hover:bg-slate-700'
        }`}
      >
        Vídeo
      </button>
    </div>
  );
};

export default ModeToggle;