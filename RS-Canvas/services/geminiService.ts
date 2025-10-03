import { GoogleGenAI, Modality } from '@google/genai';
import { MODELS } from '../constants';
import { AppState, MediaResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const fileToGenerativePart = (base64: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  };
};

export const generateImage = async (state: AppState): Promise<MediaResult> => {
    const response = await ai.models.generateImages({
        model: MODELS.IMAGE_GEN,
        prompt: `${state.prompt} --no ${state.negativePrompt}`,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: state.aspectRatio,
        },
    });

    const base64Image = response.generatedImages[0].image.imageBytes;
    return {
        type: 'image',
        url: `data:image/jpeg;base64,${base64Image}`,
        text: 'Imagem Gerada',
        base64: base64Image,
    };
};

export const editImage = async (state: AppState): Promise<MediaResult> => {
    if (!state.baseImage || !state.baseImageMimeType) throw new Error('Base image is required for editing.');

    const parts: any[] = [
        fileToGenerativePart(state.baseImage, state.baseImageMimeType),
        { text: state.prompt },
    ];

    if (state.blendImage && state.blendImageMimeType) {
        parts.push(fileToGenerativePart(state.blendImage, state.blendImageMimeType));
    }

    const response = await ai.models.generateContent({
        model: MODELS.IMAGE_EDIT,
        contents: { parts },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });
    
    let text = '';
    let imageBase64 = '';

    for (const part of response.candidates[0].content.parts) {
        if (part.text) {
            text += part.text;
        } else if (part.inlineData) {
            imageBase64 = part.inlineData.data;
        }
    }

    if (!imageBase64) throw new Error('API did not return an image.');

    return {
        type: 'image',
        url: `data:image/png;base64,${imageBase64}`,
        text: text || 'Imagem Editada',
        base64: imageBase64,
    };
};

export const generateVideo = async (state: AppState): Promise<any> => {
    const { prompt, baseImage, baseImageMimeType } = state;
    
    let operation;
    if (baseImage && baseImageMimeType) {
        operation = await ai.models.generateVideos({
            model: MODELS.VIDEO_GEN,
            prompt,
            image: {
                imageBytes: baseImage,
                mimeType: baseImageMimeType,
            },
            config: { numberOfVideos: 1 },
        });
    } else {
        operation = await ai.models.generateVideos({
            model: MODELS.VIDEO_GEN,
            prompt,
            config: { numberOfVideos: 1 },
        });
    }
    return operation;
};

export const pollVideoStatus = async (operation: any): Promise<any> => {
    return await ai.operations.getVideosOperation({ operation });
};

export const fetchVideo = async (uri: string): Promise<MediaResult> => {
    const response = await fetch(`${uri}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = () => {
            const base64data = (reader.result as string).split(',')[1];
            resolve({
                type: 'video',
                url: URL.createObjectURL(blob),
                text: 'Vídeo Gerado',
                base64: base64data,
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export const translateText = async (text: string): Promise<string> => {
    if (!text.trim()) return '';
    const response = await ai.models.generateContent({
        model: MODELS.TEXT,
        contents: `Translate the following text to English: "${text}"`,
    });
    return response.text.trim();
};

export const buildPrompt = async (details: {type: string, subject: string, style: string, details: string}): Promise<string> => {
    const query = `Create a creative, well-structured image generation prompt.
    - Type: ${details.type}
    - Subject: ${details.subject}
    - Style: ${details.style}
    - Extra Details: ${details.details}
    
    Combine these into a single, powerful prompt.`;

    const response = await ai.models.generateContent({
        model: MODELS.TEXT,
        contents: query,
    });
    return response.text.trim();
};