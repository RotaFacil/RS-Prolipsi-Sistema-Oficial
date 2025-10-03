
export type Mode = 'Image' | 'Video';

export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

export interface MediaResult {
  type: 'image' | 'video';
  url: string;
  text: string;
  base64: string;
}

export interface AppState {
  id: string;
  mode: Mode;
  prompt: string;
  negativePrompt: string;
  baseImage: string | null;
  baseImageMimeType: string | null;
  blendImage: string | null;
  blendImageMimeType: string | null;
  aspectRatio: AspectRatio;
}

export interface Creation extends AppState {
  mediaResult: MediaResult;
  createdAt: Date;
}
