/**
 * EditorLayout - Main layout component for the editor
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useEditorStore } from '../../store/editorStore';
import { EditorCanvas } from './EditorCanvas';
import { EditorHeader } from './EditorHeader';
import { EditorSidebar } from '../sidebar/EditorSidebar';
import { SectionEditor } from '../panels/SectionEditor';
import { ThemeControls } from '../panels/ThemeControls';

interface EditorLayoutProps {
  pageId?: string;
  templateId?: string;
}

export const EditorLayout: React.FC<EditorLayoutProps> = ({ pageId, templateId }) => {
  const loadedPageId = useEditorStore((state) => state.pageId);
  const structure = useEditorStore((state) => state.structure);
  const theme = useEditorStore((state) => state.theme);
  const loadPage = useEditorStore((state) => state.loadPage);
  const loadingRef = useRef(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  useEffect(() => {
    // Only load pages here, not templates
    // Templates are loaded by the parent component (NewEditorPage)
    if (pageId && pageId !== loadedPageId && !loadingRef.current) {
      loadingRef.current = true;
      loadPage(pageId).finally(() => {
        loadingRef.current = false;
      });
    }
    // Note: We don't load templates here to avoid duplicate loading
    // The parent component (NewEditorPage) handles template loading
  }, [pageId, loadedPageId, loadPage]);

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
      <EditorHeader 
        pageId={pageId} 
        onToggleLeftSidebar={() => setLeftSidebarOpen(!leftSidebarOpen)}
        onToggleRightSidebar={() => setRightSidebarOpen(!rightSidebarOpen)}
        leftSidebarOpen={leftSidebarOpen}
        rightSidebarOpen={rightSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <EditorSidebar />
        </aside>

        {/* Left Sidebar - Mobile/Tablet Drawer */}
        {leftSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
              onClick={() => setLeftSidebarOpen(false)}
            />
            <aside
              className={`fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto z-50 lg:hidden shadow-xl transition-transform duration-300 ${
                leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">Sections</h2>
                <button
                  onClick={() => setLeftSidebarOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <EditorSidebar />
            </aside>
          </>
        )}

        {/* Center Canvas */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <EditorCanvas />
        </main>

        {/* Right Settings Panel - Desktop */}
        <aside className="hidden lg:block w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <ThemeControls />
          <SectionEditor />
        </aside>

        {/* Right Settings Panel - Mobile/Tablet Drawer */}
        {rightSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
              onClick={() => setRightSidebarOpen(false)}
            />
            <aside
              className={`fixed right-0 top-0 bottom-0 w-80 bg-white border-l border-gray-200 overflow-y-auto z-50 lg:hidden shadow-xl transition-transform duration-300 ${
                rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">Settings</h2>
                <button
                  onClick={() => setRightSidebarOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <ThemeControls />
              <SectionEditor />
            </aside>
          </>
        )}
      </div>
    </div>
  );
};

