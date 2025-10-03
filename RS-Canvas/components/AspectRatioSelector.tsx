import React from 'react';
import { AspectRatio } from '../types';
import { ASPECT_RATIOS } from '../constants';

interface AspectRatioSelectorProps {
  selected: AspectRatio;
  setSelected: (ratio: AspectRatio) => void;
}

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selected, setSelected }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Proporção</label>
      <div className="grid grid-cols-5 gap-2">
        {ASPECT_RATIOS.map(({ name, w, h }) => (
          <button
            key={name}
            onClick={() => setSelected(name)}
            className={`flex flex-col items-center justify-between p-2 h-20 rounded-md border transition-colors ${
              selected === name
                ? 'border-yellow-500 bg-yellow-500/10'
                : 'border-slate-700 hover:border-slate-600 bg-slate-800'
            }`}
          >
            <div className="flex-grow w-full flex items-center justify-center">
                <div
                className={`bg-slate-600 rounded-sm transition-colors ${selected === name ? 'bg-yellow-600' : ''}`}
                style={{
                    width: w > h ? '100%' : `${(w / h) * 2.5}rem`,
                    height: h > w ? '100%' : `${(h / w) * 2.5}rem`,
                    maxHeight: '2.5rem',
                    maxWidth: '2.5rem',
                }}
                ></div>
            </div>
            <span className={`text-xs ${selected === name ? 'text-yellow-400' : 'text-slate-400'}`}>
              {name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AspectRatioSelector;