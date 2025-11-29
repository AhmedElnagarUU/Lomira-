import { getDatabase } from '@/shared/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';
import type { PageDocument, CreatePageInput, UpdatePageInput } from '../types';
import type { TemplateDocument } from '@/modules/templates/types';
import { generateHTML, generateCSS } from './htmlCssGenerator';

// Helper to get username (for server-side, will be passed from client)
function getUsernameFromInput(input: CreatePageInput & { username?: string }): string {
  return input.username || 'user';
}

export async function createPage(input: CreatePageInput): Promise<PageDocument> {
  const db = await getDatabase();
  const pagesCollection = db.collection<PageDocument>('pages');
  const templatesCollection = db.collection<TemplateDocument>('templates');
  
  // Get template
  const template = await templatesCollection.findOne({ templateId: input.templateId });
  if (!template) {
    throw new Error(`Template not found: ${input.templateId}`);
  }
  
  const pageId = `${input.userId}-${uuidv4().split('-')[0]}`;
  const username = getUsernameFromInput(input);
  const shortUuid = uuidv4().split('-')[0];
  const slug = `${username}-${shortUuid}`;
  
  const page: PageDocument = {
    pageId,
    userId: input.userId,
    title: input.title,
    slug,
    templateId: input.templateId,
    structure: template.structure,
    theme: template.defaultTheme,
    seo: {
      title: input.title,
      description: '',
      ogImage: '',
      keywords: [],
    },
    customDomain: null,
    publishedAt: null,
    publishedUrl: '',
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  await pagesCollection.insertOne(page);
  return page;
}

export async function getPage(pageId: string): Promise<PageDocument | null> {
  const db = await getDatabase();
  const collection = db.collection<PageDocument>('pages');
  return collection.findOne({ pageId });
}

export async function getPageBySlug(slug: string): Promise<PageDocument | null> {
  const db = await getDatabase();
  const collection = db.collection<PageDocument>('pages');
  return collection.findOne({ slug, status: 'published' });
}

export async function getUserPages(userId: string): Promise<PageDocument[]> {
  const db = await getDatabase();
  const collection = db.collection<PageDocument>('pages');
  return collection.find({ userId }).sort({ updatedAt: -1 }).toArray();
}

export async function updatePage(
  pageId: string,
  updates: UpdatePageInput
): Promise<PageDocument | null> {
  const db = await getDatabase();
  const collection = db.collection<PageDocument>('pages');
  
  const updateData: any = {
    ...updates,
    updatedAt: new Date(),
  };
  
  if (updates.title && !updates.slug) {
    updateData.slug = updates.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  
  const result = await collection.findOneAndUpdate(
    { pageId },
    { $set: updateData },
    { returnDocument: 'after' }
  );
  
  return result || null;
}

export async function deletePage(pageId: string): Promise<boolean> {
  const db = await getDatabase();
  const collection = db.collection<PageDocument>('pages');
  const result = await collection.deleteOne({ pageId });
  return result.deletedCount > 0;
}

export async function publishPage(pageId: string, slug?: string): Promise<PageDocument | null> {
  const db = await getDatabase();
  const collection = db.collection<PageDocument>('pages');
  
  const page = await collection.findOne({ pageId });
  if (!page) {
    return null;
  }
  
  const finalSlug = slug || page.slug;
  
  // Check if slug is already taken
  const existing = await collection.findOne({
    slug: finalSlug,
    status: 'published',
    pageId: { $ne: pageId },
  });
  
  if (existing) {
    throw new Error('Slug already taken');
  }
  
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const publishedUrl = `${appUrl}/${finalSlug}`;
  
  // Generate HTML and CSS
  const generatedHtml = generateHTML(page);
  const generatedCss = generateCSS(page.theme);
  
  const result = await collection.findOneAndUpdate(
    { pageId },
    {
      $set: {
        slug: finalSlug,
        status: 'published',
        publishedAt: new Date(),
        publishedUrl,
        generatedHtml,
        generatedCss,
        updatedAt: new Date(),
      },
    },
    { returnDocument: 'after' }
  );
  
  return result || null;
}


