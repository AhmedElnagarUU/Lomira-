import { getDatabase } from '@/shared/lib/mongodb';
import type { TemplateDocument } from '../types';

/**
 * Export template as JSON string
 */
export async function exportTemplateToJson(templateId: string): Promise<string> {
  const db = await getDatabase();
  const collection = db.collection<TemplateDocument>('templates');
  
  const template = await collection.findOne({ templateId });
  if (!template) {
    throw new Error(`Template not found: ${templateId}`);
  }
  
  // Remove MongoDB _id field for clean JSON export
  const { _id, ...templateData } = template;
  
  return JSON.stringify(templateData, null, 2);
}

/**
 * Import template from JSON string
 */
export async function importTemplateFromJson(jsonString: string): Promise<TemplateDocument> {
  const templateData = JSON.parse(jsonString);
  
  // Validate JSON structure
  const isValid = validateTemplateJson(templateData);
  if (!isValid) {
    throw new Error('Invalid template JSON structure');
  }
  
  const db = await getDatabase();
  const collection = db.collection<TemplateDocument>('templates');
  
  // Check if template already exists
  const existing = await collection.findOne({ templateId: templateData.templateId });
  if (existing) {
    throw new Error(`Template with ID ${templateData.templateId} already exists`);
  }
  
  // Add timestamps
  const template: TemplateDocument = {
    ...templateData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  await collection.insertOne(template);
  return template;
}

/**
 * Validate template JSON structure
 */
export function validateTemplateJson(data: any): boolean {
  // Basic validation - check required fields
  if (!data.templateId || typeof data.templateId !== 'string') {
    return false;
  }
  
  if (!data.name || !data.name.en || !data.name.ar) {
    return false;
  }
  
  if (!data.structure || !Array.isArray(data.structure.sections)) {
    return false;
  }
  
  if (!data.defaultTheme || !data.defaultTheme.colors || !data.defaultTheme.fonts) {
    return false;
  }
  
  // Validate sections
  for (const section of data.structure.sections) {
    if (!section.id || !section.type || typeof section.order !== 'number') {
      return false;
    }
    
    if (!section.content || !section.content.en || !section.content.ar) {
      return false;
    }
  }
  
  return true;
}

/**
 * Get template as JSON object (for API responses)
 */
export async function getTemplateAsJson(templateId: string): Promise<any> {
  const db = await getDatabase();
  const collection = db.collection<TemplateDocument>('templates');
  
  const template = await collection.findOne({ templateId });
  if (!template) {
    throw new Error(`Template not found: ${templateId}`);
  }
  
  // Remove MongoDB _id field
  const { _id, ...templateData } = template;
  
  return templateData;
}

