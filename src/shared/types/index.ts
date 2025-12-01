// Shared types across the application

import type { ReactNode } from 'react';

export interface BaseComponentProps {
  children?: ReactNode;
  className?: string;
}

export type Language = 'en' | 'ar';
export type PageStatus = 'draft' | 'published';
export type TemplateCategory = 'product' | 'real-estate' | 'clinic' | 'restaurant' | 'service' | 'general';
export type SectionType = 'hero' | 'features' | 'pricing' | 'testimonials' | 'cta' | 'form' | 'gallery' | 'stats' | 'about';

export interface ColorPalette {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

export interface FontSettings {
  heading: string;
  body: string;
}

export interface ThemeSettings {
  language: Language;
  colors: ColorPalette;
  fonts: FontSettings;
}
