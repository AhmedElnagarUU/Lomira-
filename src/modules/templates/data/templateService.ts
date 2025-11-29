import { getDatabase } from '@/shared/lib/mongodb';
import type { TemplateDocument, TemplateMetadata } from '../types';
import { allProfessionalTemplates } from './professionalTemplates';

/**
 * Get all templates from database, with fallback to code templates if database is empty
 */
export async function getAllTemplates(): Promise<TemplateMetadata[]> {
  try {
    const db = await getDatabase();
    const collection = db.collection<TemplateDocument>('templates');
    
    const templates = await collection.find({}).toArray();
    
    // If database is empty, fallback to code templates
    if (templates.length === 0) {
      console.warn('Templates collection is empty, using fallback from code');
      return allProfessionalTemplates.map((t) => ({
        templateId: t.templateId,
        name: t.name,
        category: t.category,
        thumbnail: t.thumbnail,
        tags: t.tags,
        isPremium: t.isPremium,
      }));
    }
    
    return templates.map((t) => ({
      templateId: t.templateId,
      name: t.name,
      category: t.category,
      thumbnail: t.thumbnail,
      tags: t.tags,
      isPremium: t.isPremium,
    }));
  } catch (error) {
    // If database connection fails, fallback to code templates
    console.error('Error fetching templates from database, using fallback:', error);
    return allProfessionalTemplates.map((t) => ({
      templateId: t.templateId,
      name: t.name,
      category: t.category,
      thumbnail: t.thumbnail,
      tags: t.tags,
      isPremium: t.isPremium,
    }));
  }
}

export async function getTemplate(templateId: string): Promise<TemplateDocument | null> {
  try {
    const db = await getDatabase();
    const collection = db.collection<TemplateDocument>('templates');
    const template = await collection.findOne({ templateId });
    
    // If not found in database, try code templates
    if (!template) {
      const codeTemplate = allProfessionalTemplates.find((t) => t.templateId === templateId);
      if (codeTemplate) {
        console.warn(`Template ${templateId} not found in database, using fallback from code`);
        return codeTemplate;
      }
    }
    
    return template;
  } catch (error) {
    // If database connection fails, fallback to code templates
    console.error('Error fetching template, using fallback:', error);
    return allProfessionalTemplates.find((t) => t.templateId === templateId) || null;
  }
}

export async function getTemplatesByCategory(category: string): Promise<TemplateMetadata[]> {
  try {
    const db = await getDatabase();
    const collection = db.collection<TemplateDocument>('templates');
    
    const templates = await collection.find({ category }).toArray();
    
    // If no templates found in database, fallback to code templates
    if (templates.length === 0) {
      const codeTemplates = allProfessionalTemplates.filter((t) => t.category === category);
      if (codeTemplates.length > 0) {
        console.warn(`No templates found for category ${category} in database, using fallback from code`);
        return codeTemplates.map((t) => ({
          templateId: t.templateId,
          name: t.name,
          category: t.category,
          thumbnail: t.thumbnail,
          tags: t.tags,
          isPremium: t.isPremium,
        }));
      }
    }
    
    return templates.map((t) => ({
      templateId: t.templateId,
      name: t.name,
      category: t.category,
      thumbnail: t.thumbnail,
      tags: t.tags,
      isPremium: t.isPremium,
    }));
  } catch (error) {
    // If database connection fails, fallback to code templates
    console.error('Error fetching templates by category, using fallback:', error);
    const codeTemplates = allProfessionalTemplates.filter((t) => t.category === category);
    return codeTemplates.map((t) => ({
      templateId: t.templateId,
      name: t.name,
      category: t.category,
      thumbnail: t.thumbnail,
      tags: t.tags,
      isPremium: t.isPremium,
    }));
  }
}

export async function insertTemplate(template: TemplateDocument): Promise<void> {
  const db = await getDatabase();
  const collection = db.collection<TemplateDocument>('templates');
  await collection.insertOne(template);
}


