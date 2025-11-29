'use server';

import { getAllTemplates, getTemplate, getTemplatesByCategory } from '@/modules/templates/data/templateService';
import type { TemplateDocument, TemplateMetadata } from '@/modules/templates/types';

export async function getTemplates(filters?: {
  category?: string;
  premium?: boolean;
}): Promise<TemplateMetadata[]> {
  try {
    if (filters?.category) {
      const templates = await getTemplatesByCategory(filters.category);
      if (filters.premium !== undefined) {
        return templates.filter((t) => t.isPremium === filters.premium);
      }
      return templates;
    }
    
    const templates = await getAllTemplates();
    if (filters?.premium !== undefined) {
      return templates.filter((t) => t.isPremium === filters.premium);
    }
    return templates;
  } catch (error) {
    console.error('Error fetching templates:', error);
    throw new Error('Failed to fetch templates');
  }
}

export async function getTemplateById(templateId: string): Promise<TemplateDocument | null> {
  try {
    return await getTemplate(templateId);
  } catch (error) {
    console.error('Error fetching template:', error);
    throw new Error('Failed to fetch template');
  }
}


