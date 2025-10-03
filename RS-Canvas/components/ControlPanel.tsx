import React from 'react';
import { AppState, Mode, AspectRatio } from '../types';
import ModeToggle from './ModeToggle';
import PromptInput from './PromptInput';
import ImageUploader from './ImageUploader';
import AspectRatioSelector from './AspectRatioSelector';
import ActionButton from './ActionButton';

interface ControlPanelProps {
  state: AppState;
  onStateChange: <K extends keyof AppState>(key: K, value: AppState[K]) => void;
  onGenerate: () => void;
  onClear: () => void;
  isLoading: boolean;
  loadingMessage: string;
}

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);


const ControlPanel: React.FC<ControlPanelProps> = ({
  state, onStateChange, onGenerate, onClear, isLoading, loadingMessage
}) => {

  const handleImageUpload = (type: 'baseImage' | 'blendImage', file: File | null) => {
    if (!file) {
      onStateChange(type, null);
      onStateChange(type === 'baseImage' ? 'baseImageMimeType' : 'blendImageMimeType', null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      onStateChange(type, base64String);
      onStateChange(type === 'baseImage' ? 'baseImageMimeType' : 'blendImageMimeType', file.type);
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <aside className="w-full lg:w-1/3 xl:w-1/4 bg-gray-900 border-r border-slate-800 p-6 overflow-y-auto flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Controles</h2>
        <ModeToggle mode={state.mode} setMode={(mode) => onStateChange('mode', mode)} />
      </div>

      <PromptInput 
        prompt={state.prompt} 
        setPrompt={(p) => onStateChange('prompt', p)} 
        negativePrompt={state.negativePrompt}
        setNegativePrompt={(p) => onStateChange('negativePrompt', p)}
        isNegativeVisible={state.mode === 'Image' && !state.baseImage}
      />
      
      <ImageUploader
        title="Imagem Base"
        onFileUpload={(file) => handleImageUpload('baseImage', file)}
        currentImage={state.baseImage}
      />
      
      {state.mode === 'Image' && state.baseImage && (
        <ImageUploader
          title="Imagem de Mesclagem (Opcional)"
          onFileUpload={(file) => handleImageUpload('blendImage', file)}
          currentImage={state.blendImage}
        />
      )}
      
      {state.mode === 'Image' && !state.baseImage && (
        <AspectRatioSelector 
          selected={state.aspectRatio} 
          setSelected={(ratio) => onStateChange('aspectRatio', ratio)}
        />
      )}
      
      <div className="flex-grow"></div>
      
      <div className="space-y-3 pt-4 border-t border-slate-700">
        <ActionButton 
          mode={state.mode}
          hasBaseImage={!!state.baseImage}
          isLoading={isLoading}
          loadingMessage={loadingMessage}
          onGenerate={onGenerate}
        />
        <button
          onClick={onClear}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white rounded-md transition-colors duration-200 text-sm font-medium"
        >
          <TrashIcon />
          Limpar Tudo
        </button>
      </div>
    </aside>
  );
};

export default ControlPanel;