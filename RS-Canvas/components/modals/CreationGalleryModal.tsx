import React, { useState, useEffect } from 'react';
import { Creation } from '../../types';
import { getCreations, deleteCreation } from '../../services/dbService';

interface CreationGalleryModalProps {
  onClose: () => void;
  onReload: (creation: Creation) => void;
}

const PlayIcon = () => (
    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-white/80" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const CreationCard: React.FC<{ creation: Creation; onReload: (c: Creation) => void; onDelete: (id: string) => void; }> = ({ creation, onReload, onDelete }) => {
    
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if(window.confirm('Tem certeza que deseja excluir esta criação permanentemente?')) {
            onDelete(creation.id);
        }
    }
    
    return (
        <div onClick={() => onReload(creation)} className="relative aspect-square bg-slate-800 rounded-lg overflow-hidden cursor-pointer group transition-transform transform hover:scale-105">
            {creation.mediaResult.type === 'image' ? (
                <img src={creation.mediaResult.url} className="w-full h-full object-cover" alt="creation"/>
            ) : (
                <video src={creation.mediaResult.url} className="w-full h-full object-cover" preload="metadata"></video>
            )}
            {creation.mediaResult.type === 'video' && <PlayIcon />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <p className="text-white text-sm font-semibold line-clamp-3">{creation.prompt}</p>
                <button onClick={handleDelete} className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-500/80 text-white rounded-full p-1.5 transition-opacity">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                </button>
            </div>
        </div>
    );
}


const CreationGalleryModal: React.FC<CreationGalleryModalProps> = ({ onClose, onReload }) => {
  const [creations, setCreations] = useState<Creation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCreations = async () => {
    setLoading(true);
    const savedCreations = await getCreations();
    setCreations(savedCreations);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchCreations();
  }, []);
  
  const handleDelete = async (id: string) => {
      await deleteCreation(id);
      fetchCreations(); // Refresh the list
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Minhas Criações</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
        </div>
        <div className="p-6 overflow-y-auto">
          {loading ? (
            <p className="text-center text-slate-400">Carregando criações...</p>
          ) : creations.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {creations.map(c => <CreationCard key={c.id} creation={c} onReload={onReload} onDelete={handleDelete}/>)}
            </div>
          ) : (
            <p className="text-center text-slate-400">Nenhuma criação salva ainda. Comece a criar!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreationGalleryModal;