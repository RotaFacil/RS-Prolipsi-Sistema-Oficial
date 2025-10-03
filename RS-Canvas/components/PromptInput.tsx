import React, { useState } from 'react';
import { translateText } from '../services/geminiService';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  negativePrompt: string;
  setNegativePrompt: (prompt: string) => void;
  isNegativeVisible: boolean;
}

const TranslateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m4 13-4-4-4 4M19 17v-2a4 4 0 00-4-4H9" />
    </svg>
);

const PromptInput: React.FC<PromptInputProps> = ({
  prompt, setPrompt, negativePrompt, setNegativePrompt, isNegativeVisible
}) => {
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async (text: string, setText: (text: string) => void) => {
    setIsTranslating(true);
    try {
      const translated = await translateText(text);
      setText(translated);
    } catch (error) {
      alert("A tradução falhou.");
      console.error(error);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-1">
          Descreva Sua Visão
        </label>
        <div className="relative">
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
            placeholder="ex: Um leão majestoso usando uma coroa, iluminação cinematográfica, hiper-realista..."
          />
           <button 
             onClick={() => handleTranslate(prompt, setPrompt)} 
             disabled={isTranslating}
             className="absolute bottom-2 right-2 text-xs bg-slate-600 hover:bg-slate-500 text-white px-2 py-1 rounded disabled:bg-slate-700">
            {isTranslating ? '...' : <TranslateIcon />}
          </button>
        </div>
      </div>
      {isNegativeVisible && (
        <div>
          <label htmlFor="negative-prompt" className="block text-sm font-medium text-slate-300 mb-1">
            Prompt Negativo (Opcional)
          </label>
           <div className="relative">
            <textarea
              id="negative-prompt"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              rows={2}
              className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
              placeholder="ex: embaçado, desenho, marca d'água, texto"
            />
            <button 
                onClick={() => handleTranslate(negativePrompt, setNegativePrompt)} 
                disabled={isTranslating}
                className="absolute bottom-2 right-2 text-xs bg-slate-600 hover:bg-slate-500 text-white px-2 py-1 rounded disabled:bg-slate-700">
                {isTranslating ? '...' : <TranslateIcon />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptInput;