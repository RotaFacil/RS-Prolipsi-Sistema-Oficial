import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TabView from './components/TabView';
import { MENU_ITEMS } from './constants';

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('Dashboard');

  const renderContent = () => {
    const activeMenuItem = MENU_ITEMS.find(item => item.name === activeView);

    if (!activeMenuItem) {
      return (
        <div className="p-8 text-white">
          <h1 className="text-3xl font-bold text-red-500">Erro</h1>
          <p className="mt-4 text-zinc-400">Visualização não encontrada.</p>
        </div>
      );
    }

    switch (activeMenuItem.name) {
      case 'Dashboard':
        return <Dashboard />;
      
      default:
        if (activeMenuItem.subItems && activeMenuItem.subItems.length > 0) {
          return <TabView key={activeMenuItem.name} title={activeMenuItem.name} tabs={activeMenuItem.subItems} />;
        }
        return (
          <div className="p-8 text-white">
            <h1 className="text-3xl font-bold text-amber-400 border-b-2 border-amber-400 pb-2 mb-8">{activeMenuItem.name}</h1>
            <p className="mt-4 text-zinc-400">Conteúdo para {activeMenuItem.name} em desenvolvimento.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-black text-zinc-100">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setSidebarOpen} 
        activeView={activeView} 
        setActiveView={setActiveView} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarToggle={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-black">
          <div className="container mx-auto px-6 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;