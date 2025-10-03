import { AspectRatio } from './types';

export const MODELS = {
  IMAGE_GEN: 'imagen-4.0-generate-001',
  IMAGE_EDIT: 'gemini-2.5-flash-image-preview',
  VIDEO_GEN: 'veo-2.0-generate-001',
  TEXT: 'gemini-2.5-flash',
};

export const ASPECT_RATIOS: { name: AspectRatio; w: number; h: number }[] = [
  { name: '1:1', w: 1, h: 1 },
  { name: '16:9', w: 16, h: 9 },
  { name: '9:16', w: 9, h: 16 },
  { name: '4:3', w: 4, h: 3 },
  { name: '3:4', w: 3, h: 4 },
];

export const VIDEO_GENERATION_MESSAGES = [
    "Inicializando síntese de vídeo...",
    "Aquecendo os motores de renderização...",
    "Consultando o resultado inicial...",
    "Analisando a semântica do prompt...",
    "Construindo quadros temporais...",
    "Verificando o status da operação...",
    "Aplicando efeitos visuais...",
    "Renderizando canais de áudio (se houver)...",
    "Consultando a composição final...",
    "Quase lá, finalizando o vídeo...",
    "Juntando as cenas...",
    "Finalizando o fluxo de vídeo...",
];