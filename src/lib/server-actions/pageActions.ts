'use server';

import {
  createPage as createPageService,
  getPage,
  getUserPages,
  updatePage,
  deletePage as deletePageService,
  publishPage as publishPageService,
} from '@/modules/pages/services/pageService';
import type { PageDocument, CreatePageInput, UpdatePageInput } from '@/modules/pages/types';
import type { TemplateStructure, ThemeSettings } from '@/modules/templates/types';

export async function createPage(input: CreatePageInput): Promise<PageDocument> {
  try {
    return await createPageService(input);
  } catch (error) {
    console.error('Error creating page:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to create page');
  }
}

export async function loadPage(pageId: string): Promise<PageDocument | null> {
  try {
    return await getPage(pageId);
  } catch (error) {
    console.error('Error loading page:', error);
    throw new Error('Failed to load page');
  }
}

export async function getPages(userId: string): Promise<PageDocument[]> {
  try {
    return await getUserPages(userId);
  } catch (error) {
    console.error('Error fetching pages:', error);
    throw new Error('Failed to fetch pages');
  }
}

export async function savePage(
  pageId: string,
  structure: TemplateStructure,
  theme: ThemeSettings
): Promise<PageDocument | null> {
  try {
    return await updatePage(pageId, { structure, theme });
  } catch (error) {
    console.error('Error saving page:', error);
    throw new Error('Failed to save page');
  }
}

export async function publishPage(
  pageId: string,
  slug?: string
): Promise<PageDocument | null> {
  try {
    return await publishPageService(pageId, slug);
  } catch (error) {
    console.error('Error publishing page:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to publish page');
  }
}

export async function deletePage(pageId: string): Promise<boolean> {
  try {
    return await deletePageService(pageId);
  } catch (error) {
    console.error('Error deleting page:', error);
    throw new Error('Failed to delete page');
  }
}

export async function exportPage(pageId: string): Promise<{ html: string; css: string }> {
  try {
    const page = await getPage(pageId);
    if (!page) {
      throw new Error('Page not found');
    }
    
    // TODO: Implement HTML/CSS export
    // This will generate static HTML and CSS from the page structure
    return {
      html: '<html>...</html>',
      css: '/* styles */',
    };
  } catch (error) {
    console.error('Error exporting page:', error);
    throw new Error('Failed to export page');
  }
}


