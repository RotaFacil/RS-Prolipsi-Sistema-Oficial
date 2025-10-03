import React from 'react';
import { Mode } from '../types';

interface ActionButtonProps {
  mode: Mode;
  hasBaseImage: boolean;
  isLoading: boolean;
  loadingMessage: string;
  onGenerate: () => void;
}

const Spinner = () => (
    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
);

const ActionButton: React.FC<ActionButtonProps> = ({ mode, hasBaseImage, isLoading, loadingMessage, onGenerate }) => {
  const getButtonText = () => {
    if (isLoading) return loadingMessage;
    if (mode === 'Video') return 'Gerar Vídeo';
    return hasBaseImage ? 'Gerar Edição' : 'Criar Imagem';
  };

  return (
    <button
      onClick={onGenerate}
      disabled={isLoading}
      className="w-full flex items-center justify-center h-12 px-6 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-gray-900 font-bold rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
    >
      {isLoading && <Spinner />}
      {getButtonText()}
    </button>
  );
};

export default ActionButton;