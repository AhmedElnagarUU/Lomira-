'use client';

import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { TemplateStructure, Section } from '@/modules/templates/types';
import type { ThemeSettings } from '@/shared/types';
import type { EditorElement, ElementType, ElementContent } from '@/modules/editor/types/elements';
import { ELEMENT_METADATA } from '@/modules/editor/types/elements';
import {
  loadPage,
  savePage as savePageAction,
  publishPage as publishPageAction,
  exportPage as exportPageAction,
} from '@/lib/server-actions/pageActions';

interface EditorState {
  // Page data
  pageId: string | null;
  templateId: string | null;
  structure: TemplateStructure | null;
  theme: ThemeSettings | null;
  
  // UI state
  selectedSectionId: string | null;
  selectedElement: { sectionId: string; elementId: string } | null;
  isPreviewMode: boolean;
  isPublishing: boolean;
  isSaving: boolean;
  deviceSize: 'desktop' | 'tablet' | 'mobile';
  clipboard: { type: 'section' | 'element'; data: Section | EditorElement } | null;
  
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
  setSelectedElement: (element: { sectionId: string; elementId: string } | null) => void;
  setPreviewMode: (isPreview: boolean) => void;
  setDeviceSize: (size: 'desktop' | 'tablet' | 'mobile') => void;
  // Element management
  addElement: (sectionId: string, elementType: ElementType, position?: number) => void;
  updateElement: (sectionId: string, elementId: string, updates: Partial<EditorElement>) => void;
  deleteElement: (sectionId: string, elementId: string) => void;
  reorderElements: (sectionId: string, elementIds: string[]) => void;
  // Copy/Paste
  copySection: (sectionId: string) => void;
  pasteSection: (position: number) => void;
  copyElement: (sectionId: string, elementId: string) => void;
  pasteElement: (sectionId: string, position?: number) => void;
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
  selectedElement: null,
  isPreviewMode: false,
  isPublishing: false,
  isSaving: false,
  deviceSize: 'desktop',
  clipboard: null,

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
      const response = await fetch(`/api/templates/${templateId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Template not found');
        }
        throw new Error('Failed to fetch template');
      }
      
      const template = await response.json();
      
      if (template) {
        set({
          pageId: null,
          templateId,
          structure: template.structure,
          theme: template.defaultTheme,
          selectedSectionId: null,
        });
      } else {
        throw new Error('Template data is invalid');
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
    set({ selectedSectionId: sectionId, selectedElement: null });
  },

  setSelectedElement: (element: { sectionId: string; elementId: string } | null) => {
    set({ selectedElement: element });
  },

  addElement: (sectionId: string, elementType: ElementType, position?: number) => {
    const { structure } = get();
    if (!structure) return;

    const metadata = ELEMENT_METADATA[elementType];
    const newElement: EditorElement = {
      id: uuidv4(),
      type: elementType,
      order: 0,
      content: metadata.defaultContent(),
      style: metadata.defaultStyle,
    };

    const updatedSections = structure.sections.map((section) => {
      if (section.id === sectionId) {
        const elements = section.elements || [];
        const maxOrder = Math.max(...elements.map((e) => e.order), -1);
        newElement.order = position !== undefined ? position : maxOrder + 1;

        // Reorder elements if inserting at specific position
        const updatedElements = [...elements, newElement];
        if (position !== undefined) {
          updatedElements.sort((a, b) => a.order - b.order);
          updatedElements.forEach((el, idx) => {
            el.order = idx;
          });
        }

        return {
          ...section,
          elements: updatedElements,
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

  updateElement: (sectionId: string, elementId: string, updates: Partial<EditorElement>) => {
    const { structure } = get();
    if (!structure) return;

    const updatedSections = structure.sections.map((section) => {
      if (section.id === sectionId && section.elements) {
        return {
          ...section,
          elements: section.elements.map((element) =>
            element.id === elementId ? { ...element, ...updates } : element
          ),
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

  deleteElement: (sectionId: string, elementId: string) => {
    const { structure } = get();
    if (!structure) return;

    const updatedSections = structure.sections.map((section) => {
      if (section.id === sectionId && section.elements) {
        const filteredElements = section.elements
          .filter((element) => element.id !== elementId)
          .map((element, index) => ({ ...element, order: index }));
        return {
          ...section,
          elements: filteredElements,
        };
      }
      return section;
    });

    set({
      structure: {
        ...structure,
        sections: updatedSections,
      },
      selectedElement: null,
    });
  },

  reorderElements: (sectionId: string, elementIds: string[]) => {
    const { structure } = get();
    if (!structure) return;

    const updatedSections = structure.sections.map((section) => {
      if (section.id === sectionId && section.elements) {
        const elementsMap = new Map(section.elements.map((e) => [e.id, e]));
        const reorderedElements = elementIds
          .map((id) => elementsMap.get(id))
          .filter((e): e is EditorElement => e !== undefined)
          .map((element, index) => ({ ...element, order: index }));

        return {
          ...section,
          elements: reorderedElements,
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

  copySection: (sectionId: string) => {
    const { structure } = get();
    if (!structure) return;

    const section = structure.sections.find((s) => s.id === sectionId);
    if (section) {
      set({ clipboard: { type: 'section', data: { ...section, id: uuidv4() } } });
    }
  },

  pasteSection: (position: number) => {
    const { structure, clipboard } = get();
    if (!structure || !clipboard || clipboard.type !== 'section') return;

    const section = clipboard.data as Section;
    const maxOrder = Math.max(...structure.sections.map((s) => s.order), -1);
    const newSection = {
      ...section,
      id: uuidv4(),
      order: position !== undefined ? position : maxOrder + 1,
      elements: section.elements?.map((el) => ({ ...el, id: uuidv4() })),
    };

    const updatedSections = [...structure.sections, newSection].sort((a, b) => a.order - b.order);
    updatedSections.forEach((s, idx) => {
      s.order = idx;
    });

    set({
      structure: {
        ...structure,
        sections: updatedSections,
      },
    });
  },

  copyElement: (sectionId: string, elementId: string) => {
    const { structure } = get();
    if (!structure) return;

    const section = structure.sections.find((s) => s.id === sectionId);
    const element = section?.elements?.find((e) => e.id === elementId);
    if (element) {
      set({ clipboard: { type: 'element', data: { ...element, id: uuidv4() } } });
    }
  },

  pasteElement: (sectionId: string, position?: number) => {
    const { structure, clipboard } = get();
    if (!structure || !clipboard || clipboard.type !== 'element') return;

    const element = clipboard.data as EditorElement;
    const updatedSections = structure.sections.map((section) => {
      if (section.id === sectionId) {
        const elements = section.elements || [];
        const maxOrder = Math.max(...elements.map((e) => e.order), -1);
        const newElement = {
          ...element,
          id: uuidv4(),
          order: position !== undefined ? position : maxOrder + 1,
        };

        const updatedElements = [...elements, newElement];
        if (position !== undefined) {
          updatedElements.sort((a, b) => a.order - b.order);
          updatedElements.forEach((el, idx) => {
            el.order = idx;
          });
        }

        return {
          ...section,
          elements: updatedElements,
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
      selectedElement: null,
      isPreviewMode: false,
      isPublishing: false,
      isSaving: false,
      deviceSize: 'desktop',
      clipboard: null,
    });
  },
}));


