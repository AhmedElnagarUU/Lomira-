'use client';

import React, { useEffect } from 'react';
import { useEditorStore } from '../store/editorStore';
import { EditorCanvas } from './EditorCanvas';
import { EditorSidebar } from './EditorSidebar';
import { SectionEditor } from './SectionEditor';
import { ThemeControls } from './ThemeControls';
import { EditorHeader } from './EditorHeader';

interface EditorLayoutProps {
  pageId?: string;
  templateId?: string;
}

export const EditorLayout: React.FC<EditorLayoutProps> = ({ pageId, templateId }) => {
  const { loadPage, loadTemplate, structure, theme } = useEditorStore();

  useEffect(() => {
    if (pageId) {
      loadPage(pageId);
    } else if (templateId) {
      loadTemplate(templateId);
    }
  }, [pageId, templateId, loadPage, loadTemplate]);

  if (!structure || !theme) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <EditorHeader pageId={pageId} />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <EditorSidebar />
        </aside>

        {/* Center Canvas */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <EditorCanvas />
        </main>

        {/* Right Settings Panel */}
        <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <ThemeControls />
          <SectionEditor />
        </aside>
      </div>
    </div>
  );
};

