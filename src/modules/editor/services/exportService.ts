/**
 * Export Service - Handles exporting page structure as JSON
 */

import type { TemplateStructure, Section } from '@/modules/templates/types';
import type { ThemeSettings } from '@/shared/types';
import type { EditorElement } from '@/modules/editor/types/elements';

export interface ExportedPage {
  version: string;
  sections: Section[];
  theme: ThemeSettings;
  metadata: {
    exportedAt: string;
    pageId?: string;
  };
}

/**
 * Export page structure to JSON
 */
export function exportToJson(
  structure: TemplateStructure,
  theme: ThemeSettings,
  pageId?: string | null
): string {
  const exported: ExportedPage = {
    version: '1.0.0',
    sections: structure.sections.map((section) => ({
      ...section,
      // Ensure elements are included
      elements: section.elements || [],
    })),
    theme,
    metadata: {
      exportedAt: new Date().toISOString(),
      pageId: pageId || undefined,
    },
  };

  return JSON.stringify(exported, null, 2);
}

/**
 * Download JSON file
 */
export function downloadJson(jsonString: string, filename: string = 'page-export.json'): void {
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Import page structure from JSON
 */
export function importFromJson(jsonString: string): ExportedPage {
  try {
    const parsed = JSON.parse(jsonString);
    
    // Validate structure
    if (!parsed.sections || !Array.isArray(parsed.sections)) {
      throw new Error('Invalid JSON: missing sections array');
    }
    
    if (!parsed.theme) {
      throw new Error('Invalid JSON: missing theme');
    }
    
    return parsed as ExportedPage;
  } catch (error) {
    throw new Error(`Failed to parse JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}




