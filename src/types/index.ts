export type Lang = 'en' | 'ru';
export type Gender = 'female' | 'male';
export type Style = 'realism' | 'anime';
export type DiscoverTab = 'all' | 'mine' | 'gallery';
export type GalleryFilter = 'all' | 'photo' | 'video';

export interface Model {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  style: Style;
  avatar: string;
  personality?: string;
  voice?: string;
  bio?: string;
  featured?: boolean;
  isMine?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  createdAt: number;
}

export interface ChatThread {
  id: string;
  modelId: string;
  messages: ChatMessage[];
  updatedAt: number;
}

export interface FeedItem {
  id: string;
  modelId: string;
  type: 'photo' | 'video';
  caption: string;
  blur?: boolean;
}

export interface WizardState {
  step: number;
  gender: Gender;
  style: Style;
  appearance: string;
  hair: string;
  eyes: string;
  body: string;
  personality: string;
  voice: string;
  name: string;
  age: number;
}

export interface GemPack {
  id: string;
  gems: number;
  stars: number;
  best?: boolean;
  icon: 'stack' | 'pile' | 'bag' | 'chest';
}
