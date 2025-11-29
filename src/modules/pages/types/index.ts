import type { TemplateStructure, ThemeSettings } from '@/modules/templates/types';
import type { PageStatus } from '@/shared/types';

export interface PageDocument {
  _id?: string;
  pageId: string;
  userId: string;
  title: string;
  slug: string;
  templateId: string;
  structure: TemplateStructure;
  theme: ThemeSettings;
  seo: {
    title: string;
    description: string;
    ogImage: string;
    keywords: string[];
  };
  customDomain: string | null;
  publishedAt: Date | null;
  publishedUrl: string;
  status: PageStatus;
  generatedHtml?: string;
  generatedCss?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePageInput {
  templateId: string;
  userId: string;
  title: string;
  username?: string;
}

export interface UpdatePageInput {
  structure?: TemplateStructure;
  theme?: ThemeSettings;
  title?: string;
  seo?: Partial<PageDocument['seo']>;
}


