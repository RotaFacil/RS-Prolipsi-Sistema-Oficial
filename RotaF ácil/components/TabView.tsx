import React, { useState } from 'react';
import { SubMenuItem } from '../types';

interface TabViewProps {
  title: string;
  tabs: SubMenuItem[];
}

const TabView: React.FC<TabViewProps> = ({ title, tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white border-b-2 border-amber-400 pb-2 mb-6">{title}</h1>

      <div className="border-b border-zinc-700">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(index)}
              className={`${
                activeTab === index
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-500'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-8 bg-zinc-900 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">{tabs[activeTab].name}</h2>
        <p className="text-zinc-300">
          Conteúdo para <span className="font-medium text-amber-400">{tabs[activeTab].name}</span> em desenvolvimento. 
          Aqui será exibida a funcionalidade correspondente.
        </p>
      </div>
    </div>
  );
};

export default TabView;