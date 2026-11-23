export type ToolId =
  | 'select'
  | 'directSelect'
  | 'pen'
  | 'curvature'
  | 'rect'
  | 'ellipse'
  | 'line'
  | 'text'
  | 'rotate'
  | 'scale'
  | 'eyedropper'
  | 'gradient'
  | 'shapeBuilder'
  | 'artboard';

export interface CanvasElement {
  id: string;
  type: 'rect' | 'ellipse' | 'line' | 'text' | 'path';
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  blendMode: string;
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  textureUrl?: string;
  points?: { x: number; y: number }[];
}

export interface CustomAsset {
  id: string;
  name: string;
  category: 'font' | 'texture' | 'background';
  url: string;
}

export interface UserProfile {
  name: string;
  email: string;
  provider: 'email' | 'google' | 'guest';
}
