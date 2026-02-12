
export enum View {
  ENTRANCE = 'ENTRANCE',
  INTRO = 'INTRO',
  TUTORIAL = 'TUTORIAL',
  GACHA = 'GACHA',
  BATTLE = 'BATTLE',
  COLLECTION = 'COLLECTION',
  TRAINING = 'TRAINING',
  COURSE = 'COURSE'
}

export type CardElement = 'Fire' | 'Water' | 'Earth' | 'Light' | 'Dark';

export interface AICard {
  id: string;
  name: string;
  description: string;
  element: CardElement;
  power: number;
  health: number;
  imageUrl: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface TrainingLevel {
  id: string;
  name: string;
  difficulty: '简单' | '进阶' | '深渊';
  opponent: AICard;
  description: string;
}

export interface PlayerStats {
  hp: number;
  energy: number;
  hand: AICard[];
}
