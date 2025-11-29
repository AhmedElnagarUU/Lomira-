'use client';

import { create } from 'zustand';
import type { TemplateStructure, Section } from '@/modules/templates/types';
import type { ThemeSettings } from '@/shared/types';
import {
  loadPage,
  savePage as savePageAction,
  publishPage as publishPageAction,
  exportPage as exportPageAction,
} from '@/lib/server-actions/pageActions';
import { getTemplateById } from '@/lib/server-actions/templateActions';

interface EditorState {
  // Page data
  pageId: string | null;
  templateId: string | null;
  structure: TemplateStructure | null;
  theme: ThemeSettings | null;
  
  // UI state
  selectedSectionId: string | null;
  isPreviewMode: boolean;
  isPublishing: boolean;
  isSaving: boolean;
  deviceSize: 'desktop' | 'tablet' | 'mobile';
  
  // Actions
  loadPage: (pageId: string) => Promise<void>;
  loadTemplate: (templateId: string) => Promise<void>;
  updateSection: (sectionId: string, updates: Partial<Section>) => void;
  updateTheme: (theme: Partial<ThemeSettings>) => void;
  updateSectionContent: (sectionId: string, language: 'en' | 'ar', content: any) => void;
  reorderSections: (sectionIds: string[]) => void;
  deleteSection: (sectionId: string) => void;
  addSection: (section: Section) => void;
  toggleLanguage: () => void;
  savePage: () => Promise<void>;
  exportHTML: () => Promise<string>;
  publish: (slug?: string) => Promise<void>;
  setSelectedSection: (sectionId: string | null) => void;
  setPreviewMode: (isPreview: boolean) => void;
  setDeviceSize: (size: 'desktop' | 'tablet' | 'mobile') => void;
  reset: () => void;
}

const defaultTheme: ThemeSettings = {
  language: 'en',
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#ffffff',
    text: '#1f2937',
    accent: '#f59e0b',
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
};

export const useEditorStore = create<EditorState>((set, get) => ({
  pageId: null,
  templateId: null,
  structure: null,
  theme: defaultTheme,
  selectedSectionId: null,
  isPreviewMode: false,
  isPublishing: false,
  isSaving: false,
  deviceSize: 'desktop',

  loadPage: async (pageId: string) => {
    try {
      const page = await loadPage(pageId);
      if (page) {
        set({
          pageId: page.pageId,
          templateId: page.templateId,
          structure: page.structure,
          theme: page.theme,
          selectedSectionId: null,
        });
      }
    } catch (error) {
      console.error('Error loading page:', error);
      throw error;
    }
  },

  loadTemplate: async (templateId: string) => {
    try {
      const template = await getTemplateById(templateId);
      if (template) {
        set({
          pageId: null,
          templateId,
          structure: template.structure,
          theme: template.defaultTheme,
          selectedSectionId: null,
        });
      }
    } catch (error) {
      console.error('Error loading template:', error);
      throw error;
    }
  },

  updateSection: (sectionId: string, updates: Partial<Section>) => {
    const { structure } = get();
    if (!structure) return;

    const updatedSections = structure.sections.map((section) =>
      section.id === sectionId ? { ...section, ...updates } : section
    );

    set({
      structure: {
        ...structure,
        sections: updatedSections,
      },
    });
  },

  updateTheme: (themeUpdates: Partial<ThemeSettings>) => {
    const { theme } = get();
    if (!theme) return;

    set({
      theme: {
        ...theme,
        ...themeUpdates,
        colors: themeUpdates.colors ? { ...theme.colors, ...themeUpdates.colors } : theme.colors,
        fonts: themeUpdates.fonts ? { ...theme.fonts, ...themeUpdates.fonts } : theme.fonts,
      },
    });
  },

  updateSectionContent: (sectionId: string, language: 'en' | 'ar', content: any) => {
    const { structure } = get();
    if (!structure) return;

    const updatedSections = structure.sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          content: {
            ...section.content,
            [language]: {
              ...section.content[language],
              ...content,
            },
          },
        };
      }
      return section;
    });

    set({
      structure: {
        ...structure,
        sections: updatedSections,
      },
    });
  },

  reorderSections: (sectionIds: string[]) => {
    const { structure } = get();
    if (!structure) return;

    const sectionsMap = new Map(structure.sections.map((s) => [s.id, s]));
    const reorderedSections = sectionIds
      .map((id) => sectionsMap.get(id))
      .filter((s): s is Section => s !== undefined)
      .map((section, index) => ({ ...section, order: index }));

    set({
      structure: {
        ...structure,
        sections: reorderedSections,
      },
    });
  },

  deleteSection: (sectionId: string) => {
    const { structure } = get();
    if (!structure) return;

    const updatedSections = structure.sections
      .filter((section) => section.id !== sectionId)
      .map((section, index) => ({ ...section, order: index }));

    set({
      structure: {
        ...structure,
        sections: updatedSections,
      },
      selectedSectionId: null,
    });
  },

  addSection: (section: Section) => {
    const { structure } = get();
    if (!structure) return;

    const maxOrder = Math.max(...structure.sections.map((s) => s.order), -1);
    const newSection = {
      ...section,
      order: maxOrder + 1,
    };

    set({
      structure: {
        ...structure,
        sections: [...structure.sections, newSection].sort((a, b) => a.order - b.order),
      },
    });
  },

  toggleLanguage: () => {
    const { theme } = get();
    if (!theme) return;

    set({
      theme: {
        ...theme,
        language: theme.language === 'en' ? 'ar' : 'en',
      },
    });
  },

  savePage: async () => {
    const { pageId, structure, theme } = get();
    if (!structure || !theme) {
      throw new Error('Cannot save: missing page data');
    }

    set({ isSaving: true });
    try {
      // If pageId is null, create page first
      if (!pageId) {
        const { createPage } = await import('@/lib/server-actions/pageActions');
        const { getUserId, getUserName } = await import('@/shared/lib/userSession');
        
        // Get templateId from store or use default
        const { templateId: storeTemplateId } = get();
        const templateId = storeTemplateId || 'default-template';
        const userId = getUserId();
        const username = getUserName();
        
        const newPage = await createPage({
          templateId,
          userId,
          username,
          title: 'Untitled Page',
        });
        
        // Update store with new pageId
        set({ pageId: newPage.pageId });
        
        // Now save the structure and theme
        await savePageAction(newPage.pageId, structure, theme);
      } else {
        await savePageAction(pageId, structure, theme);
      }
    } finally {
      set({ isSaving: false });
    }
  },

  exportHTML: async () => {
    const { pageId } = get();
    if (!pageId) {
      throw new Error('Cannot export: no page loaded');
    }

    const result = await exportPageAction(pageId);
    return result.html;
  },

  publish: async (slug?: string) => {
    const { pageId } = get();
    if (!pageId) {
      throw new Error('Cannot publish: no page loaded');
    }

    set({ isPublishing: true });
    try {
      await publishPageAction(pageId, slug);
    } finally {
      set({ isPublishing: false });
    }
  },

  setSelectedSection: (sectionId: string | null) => {
    set({ selectedSectionId: sectionId });
  },

  setPreviewMode: (isPreview: boolean) => {
    set({ isPreviewMode: isPreview, selectedSectionId: null });
  },

  setDeviceSize: (size: 'desktop' | 'tablet' | 'mobile') => {
    set({ deviceSize: size });
  },

  reset: () => {
    set({
      pageId: null,
      templateId: null,
      structure: null,
      theme: defaultTheme,
      selectedSectionId: null,
      isPreviewMode: false,
      isPublishing: false,
      isSaving: false,
      deviceSize: 'desktop',
    });
  },
}));


