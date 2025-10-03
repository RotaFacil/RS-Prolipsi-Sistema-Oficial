import React from 'react';
import { MediaResult } from '../types';

interface MediaDisplayProps {
  mediaResult: MediaResult | null;
  isLoading: boolean;
  loadingMessage: string;
  onUseAsBase: () => void;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const ReuseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
    </svg>
);


const MediaDisplay: React.FC<MediaDisplayProps> = ({ mediaResult, isLoading, loadingMessage, onUseAsBase }) => {

  const handleDownload = () => {
    if (!mediaResult) return;
    const link = document.createElement('a');
    link.href = mediaResult.url;
    link.download = `nano-banana-studio-${Date.now()}.${mediaResult.type === 'image' ? 'png' : 'mp4'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400 mb-4"></div>
          <p className="text-xl font-semibold text-white">{loadingMessage}</p>
          <p className="text-slate-400 mt-2">A IA está pensando, por favor aguarde...</p>
        </div>
      );
    }

    if (mediaResult) {
      return (
        <div className="w-full h-full p-4 md:p-8">
            <div className="relative w-full h-full group">
                {mediaResult.type === 'image' ? (
                    <img src={mediaResult.url} alt="Generated media" className="object-contain w-full h-full rounded-lg shadow-2xl" />
                ) : (
                    <video src={mediaResult.url} controls className="object-contain w-full h-full rounded-lg shadow-2xl" />
                )}
                {mediaResult.type === 'image' && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 rounded-lg">
                        <button onClick={handleDownload} className="flex items-center space-x-2 bg-slate-700/80 hover:bg-slate-600/80 text-white font-semibold py-2 px-4 rounded-md transition-transform transform hover:scale-105">
                            <DownloadIcon />
                            <span>Baixar</span>
                        </button>
                        <button onClick={onUseAsBase} className="flex items-center space-x-2 bg-slate-700/80 hover:bg-slate-600/80 text-white font-semibold py-2 px-4 rounded-md transition-transform transform hover:scale-105">
                            <ReuseIcon/>
                            <span>Usar como Base</span>
                        </button>
                    </div>
                )}
            </div>
             {mediaResult.text && <p className="text-center text-slate-400 mt-4 text-sm italic">{mediaResult.text}</p>}
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Bem-vindo ao Nano Banana Studio</h1>
        <p className="mt-4 text-lg text-slate-400 max-w-md">Sua tela criativa com IA. Descreva sua visão no painel à esquerda e veja-a ganhar vida.</p>
      </div>
    );
  };

  return (
    <section className="w-full lg:w-2/3 xl:w-3/4 bg-gray-900/50 flex items-center justify-center">
        {renderContent()}
    </section>
  );
};

export default MediaDisplay;