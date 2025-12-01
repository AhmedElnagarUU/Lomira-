/**
 * EditorHeader - Header component for the editor with actions and controls
 */

'use client';

import React, { useState } from 'react';
import { useEditorStore } from '../../store/editorStore';
import { useRouter } from 'next/navigation';
import { DeviceSizeSelector } from '../ui/DeviceSizeSelector';
import { exportToJson, downloadJson } from '../../services/exportService';
import { toast } from 'sonner';

interface EditorHeaderProps {
  pageId?: string;
  onToggleLeftSidebar?: () => void;
  onToggleRightSidebar?: () => void;
  leftSidebarOpen?: boolean;
  rightSidebarOpen?: boolean;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({ 
  pageId,
  onToggleLeftSidebar,
  onToggleRightSidebar,
  leftSidebarOpen,
  rightSidebarOpen,
}) => {
  const { savePage, publish, isSaving, isPublishing, structure, theme, pageId: storePageId, selectedSectionId, copySection, pasteSection, clipboard } = useEditorStore();
  const router = useRouter();
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [slug, setSlug] = useState('');
  
  const currentPageId = pageId || storePageId;

  const handleSave = async () => {
    try {
      await savePage();
      alert('Page saved successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save page';
      alert(errorMessage);
      console.error(error);
    }
  };

  const handlePublish = async () => {
    if (!currentPageId) {
      alert('Please save the page first');
      return;
    }
    try {
      await publish(slug || undefined);
      alert('Page published successfully!');
      setShowPublishModal(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to publish page');
      console.error(error);
    }
  };

  const handleExport = () => {
    if (!structure || !theme) {
      toast.error('No page data to export');
      return;
    }
    try {
      const jsonString = exportToJson(structure, theme, currentPageId);
      const filename = `page-export-${new Date().toISOString().split('T')[0]}.json`;
      downloadJson(jsonString, filename);
      toast.success('Page exported successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to export page');
      console.error(error);
    }
  };

  const handleCopySection = () => {
    if (!selectedSectionId) {
      toast.error('Please select a section first');
      return;
    }
    copySection(selectedSectionId);
    toast.success('Section copied!');
  };

  const handlePasteSection = () => {
    if (!clipboard || clipboard.type !== 'section') {
      toast.error('No section in clipboard');
      return;
    }
    if (!structure) return;
    const maxOrder = Math.max(...structure.sections.map((s) => s.order), -1);
    pasteSection(maxOrder + 1);
    toast.success('Section pasted!');
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-2 sm:px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile menu buttons */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              onClick={onToggleLeftSidebar}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
              aria-label="Toggle sections sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={onToggleRightSidebar}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
              aria-label="Toggle settings sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <h1 className="text-base sm:text-lg font-semibold text-gray-900">Page Editor</h1>
          <div className="hidden sm:block">
            <DeviceSizeSelector />
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden sm:block">
            <DeviceSizeSelector />
          </div>
          {selectedSectionId && (
            <>
              <button
                onClick={handleCopySection}
                className="px-2 sm:px-4 py-2 text-xs sm:text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-700"
                title="Copy section (Ctrl+C)"
                aria-label="Copy section"
              >
                Copy
              </button>
              <button
                onClick={handlePasteSection}
                disabled={!clipboard || clipboard.type !== 'section'}
                className="px-2 sm:px-4 py-2 text-xs sm:text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
                title="Paste section (Ctrl+V)"
                aria-label="Paste section"
              >
                Paste
              </button>
            </>
          )}
          <button
            onClick={handleExport}
            className="px-2 sm:px-4 py-2 text-xs sm:text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-700"
            title="Export as JSON"
            aria-label="Export page as JSON"
          >
            Export
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-2 sm:px-4 py-2 text-xs sm:text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={() => setShowPublishModal(true)}
            disabled={isPublishing || !currentPageId}
            className="px-2 sm:px-4 py-2 text-xs sm:text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPublishing ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </header>

      {showPublishModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Publish Page</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug (optional)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="my-landing-page"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to auto-generate from page title
              </p>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowPublishModal(false)}
                className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isPublishing ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

