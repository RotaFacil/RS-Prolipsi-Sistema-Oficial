import React, { useState, useCallback, useEffect } from 'react';
import { Creation, AppState, MediaResult, Mode } from './types';
import { generateImage, editImage, generateVideo, pollVideoStatus, fetchVideo } from './services/geminiService';
import { saveCreation } from './services/dbService';
import { VIDEO_GENERATION_MESSAGES } from './constants';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import MediaDisplay from './components/MediaDisplay';
import CreationGalleryModal from './components/modals/CreationGalleryModal';

const getInitialState = (): AppState => ({
  id: crypto.randomUUID(),
  mode: 'Image',
  prompt: '',
  negativePrompt: '',
  baseImage: null,
  baseImageMimeType: null,
  blendImage: null,
  blendImageMimeType: null,
  aspectRatio: '1:1',
});

function App() {
  const [state, setState] = useState<AppState>(getInitialState());
  const [mediaResult, setMediaResult] = useState<MediaResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Criando...');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleClear = useCallback(() => {
    setState(getInitialState());
    setMediaResult(null);
  }, []);

  const handleStateChange = useCallback(<K extends keyof AppState>(key: K, value: AppState[K]) => {
    setState(prevState => ({ ...prevState, [key]: value }));
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    setMediaResult(null);

    try {
      if (state.mode === 'Image') {
        setLoadingMessage('Gerando Imagem...');
        const result = state.baseImage ? await editImage(state) : await generateImage(state);
        setMediaResult(result);
        await saveCreation({ ...state, mediaResult: result, createdAt: new Date() });
      } else { // Video mode
        setLoadingMessage(VIDEO_GENERATION_MESSAGES[0]);
        let operation = await generateVideo(state);
        let messageIndex = 1;

        while (!operation.done) {
          await new Promise(resolve => setTimeout(resolve, 5000));
          operation = await pollVideoStatus(operation);
          setLoadingMessage(VIDEO_GENERATION_MESSAGES[messageIndex % VIDEO_GENERATION_MESSAGES.length]);
          messageIndex++;
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (downloadLink) {
          setLoadingMessage('Baixando vídeo...');
          const result = await fetchVideo(downloadLink);
          setMediaResult(result);
          await saveCreation({ ...state, mediaResult: result, createdAt: new Date() });
        } else {
          throw new Error('Video generation failed or returned no link.');
        }
      }
    } catch (error) {
      console.error('Generation failed:', error);
      alert(`Ocorreu um erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      setMediaResult(null);
    } finally {
      setIsLoading(false);
      setLoadingMessage('Criando...');
      setState(prevState => ({...prevState, id: crypto.randomUUID()}));
    }
  };

  const handleUseAsBase = useCallback(() => {
    if (mediaResult && mediaResult.type === 'image') {
      handleStateChange('baseImage', mediaResult.base64);
      handleStateChange('baseImageMimeType', 'image/png'); // Or jpeg depending on output
      handleStateChange('mode', 'Image');
      setMediaResult(null);
    }
  }, [mediaResult, handleStateChange]);

  const handleReloadCreation = useCallback((creation: Creation) => {
    setState({
      id: creation.id,
      mode: creation.mode,
      prompt: creation.prompt,
      negativePrompt: creation.negativePrompt,
      baseImage: creation.baseImage,
      baseImageMimeType: creation.baseImageMimeType,
      blendImage: creation.blendImage,
      blendImageMimeType: creation.blendImageMimeType,
      aspectRatio: creation.aspectRatio,
    });
    setMediaResult(creation.mediaResult);
    setIsGalleryOpen(false);
  }, []);

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
      <Header onGalleryClick={() => setIsGalleryOpen(true)} />
      <main className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
        <ControlPanel
          state={state}
          onStateChange={handleStateChange}
          onGenerate={handleGenerate}
          onClear={handleClear}
          isLoading={isLoading}
          loadingMessage={loadingMessage}
        />
        <MediaDisplay
          mediaResult={mediaResult}
          isLoading={isLoading}
          loadingMessage={loadingMessage}
          onUseAsBase={handleUseAsBase}
        />
      </main>
      {isGalleryOpen && (
        <CreationGalleryModal
          onClose={() => setIsGalleryOpen(false)}
          onReload={handleReloadCreation}
        />
      )}
    </div>
  );
}

export default App;