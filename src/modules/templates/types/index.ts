import type { TemplateCategory, Language, ThemeSettings } from '@/shared/types';
import type { EditorElement } from '@/modules/editor/types/elements';

// Template Structure Types
export interface TemplateStructure {
  sections: Section[];
  globalStyles?: {
    spacing: {
      sectionPadding: string;
      containerMaxWidth: string;
    };
  };
}

export interface ResponsiveConfig {
  padding?: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  };
  display?: 'block' | 'none' | 'flex' | 'grid';
  layout?: string;
}

export interface Section {
  id: string;
  type: 'hero' | 'features' | 'pricing' | 'testimonials' | 'cta' | 'form' | 'gallery' | 'stats' | 'about';
  order: number;
  config: {
    backgroundColor?: string;
    padding?: {
      top: string;
      bottom: string;
      left: string;
      right: string;
    };
    responsive?: {
      mobile?: ResponsiveConfig;
      tablet?: ResponsiveConfig;
      desktop?: ResponsiveConfig;
    };
  };
  content: {
    en: Record<string, any>;
    ar: Record<string, any>;
  };
  elements?: EditorElement[]; // Draggable elements within the section
}

// Hero Section Content
export interface HeroSectionContent {
  heading: string;
  subheading: string;
  description: string;
  primaryButton: {
    text: string;
    link: string;
    style: 'primary' | 'secondary' | 'outline';
  };
  secondaryButton?: {
    text: string;
    link: string;
    style: 'primary' | 'secondary' | 'outline';
  };
  image: {
    url: string;
    alt: string;
  };
  backgroundImage?: string;
}

// Features Section Content
export interface FeaturesSectionContent {
  heading: string;
  subheading?: string;
  items: {
    icon: string;
    title: string;
    description: string;
  }[];
  layout: 'grid-2' | 'grid-3' | 'grid-4' | 'list';
}

// Database Template Document
export interface TemplateDocument {
  _id?: string;
  templateId: string;
  name: {
    en: string;
    ar: string;
  };
  category: TemplateCategory;
  thumbnail: string;
  previewImages: string[];
  structure: TemplateStructure;
  defaultTheme: ThemeSettings;
  tags: string[];
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Template Metadata (for listing)
export interface TemplateMetadata {
  templateId: string;
  name: {
    en: string;
    ar: string;
  };
  category: TemplateCategory;
  thumbnail: string;
  tags: string[];
  isPremium: boolean;
}


