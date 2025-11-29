'use client';

import React, { useState } from 'react';
import { useEditorStore } from '../store/editorStore';
import { useRouter } from 'next/navigation';
import { DeviceSizeSelector } from './DeviceSizeSelector';

interface EditorHeaderProps {
  pageId?: string;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({ pageId }) => {
  const { savePage, publish, isSaving, isPublishing, structure, theme, pageId: storePageId } = useEditorStore();
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

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-900">Page Editor</h1>
          <DeviceSizeSelector />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={() => setShowPublishModal(true)}
            disabled={isPublishing || !currentPageId}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
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


