/**
 * SectionEditor - Panel for editing section content and elements
 */

'use client';

import React, { useState } from 'react';
import { useEditorStore } from '../../store/editorStore';
import { ElementPalette } from '../modals/ElementPalette';
import { ElementEditor } from './ElementEditor';

export const SectionEditor: React.FC = () => {
  const { structure, selectedSectionId, updateSectionContent, theme, selectedElement, deleteElement } = useEditorStore();
  const [showElementPalette, setShowElementPalette] = useState(false);

  if (!selectedSectionId || !structure) {
    return (
      <div className="p-4">
        <p className="text-sm text-gray-500 text-center">Select a section to edit</p>
      </div>
    );
  }

  const section = structure.sections.find((s) => s.id === selectedSectionId);
  if (!section) {
    return null;
  }

  const langContent = section.content[theme.language];
  const elements = section.elements || [];

  // If an element is selected, show element editor instead
  if (selectedElement && selectedElement.sectionId === selectedSectionId) {
    return <ElementEditor />;
  }

  const handleUpdate = (field: string, value: any) => {
    if (section.type === 'hero') {
      updateSectionContent(selectedSectionId, theme.language, {
        [field]: value,
      });
    } else if (section.type === 'features') {
      updateSectionContent(selectedSectionId, theme.language, {
        [field]: value,
      });
    }
  };

  return (
    <div className="p-3 sm:p-4 border-t border-gray-200">
      <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 sm:mb-4 capitalize">
        Edit {section.type}
      </h3>

      {section.type === 'hero' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Heading
            </label>
            <input
              type="text"
              value={langContent.heading || ''}
              onChange={(e) => handleUpdate('heading', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white touch-manipulation"
              title="Section heading"
              aria-label="Section heading"
              placeholder="Enter heading"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Subheading
            </label>
            <input
              type="text"
              value={langContent.subheading || ''}
              onChange={(e) => handleUpdate('subheading', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white touch-manipulation"
              title="Section subheading"
              aria-label="Section subheading"
              placeholder="Enter subheading"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={langContent.description || ''}
              onChange={(e) => handleUpdate('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white touch-manipulation"
              title="Section description"
              aria-label="Section description"
              placeholder="Enter description"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Primary Button Text
            </label>
            <input
              type="text"
              value={langContent.primaryButton?.text || ''}
              onChange={(e) =>
                handleUpdate('primaryButton', {
                  ...langContent.primaryButton,
                  text: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white touch-manipulation"
              title="Primary button text"
              aria-label="Primary button text"
              placeholder="Button text"
            />
          </div>
        </div>
      )}

      {section.type === 'features' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Heading
            </label>
            <input
              type="text"
              value={langContent.heading || ''}
              onChange={(e) => handleUpdate('heading', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white touch-manipulation"
              title="Features section heading"
              aria-label="Features section heading"
              placeholder="Enter heading"
            />
          </div>
          {langContent.items?.map((item: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded p-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Feature {index + 1} Title
              </label>
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => {
                  const updatedItems = [...langContent.items];
                  updatedItems[index] = { ...item, title: e.target.value };
                  handleUpdate('items', updatedItems);
                }}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white touch-manipulation"
                title={`Feature ${index + 1} title`}
                aria-label={`Feature ${index + 1} title`}
                placeholder="Feature title"
              />
            </div>
          ))}
        </div>
      )}

      {/* Elements Section */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-semibold text-gray-700">Elements ({elements.length})</h4>
          <button
            onClick={() => setShowElementPalette(true)}
            className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Element
          </button>
        </div>
        <div className="space-y-2">
          {elements.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-4">No elements. Click "Add Element" to add one.</p>
          ) : (
            elements
              .sort((a, b) => a.order - b.order)
              .map((element) => (
                <div
                  key={element.id}
                  className={`p-2 rounded border text-xs ${
                    selectedElement?.elementId === element.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="capitalize">{element.type}</span>
                    <button
                      onClick={() => deleteElement(selectedSectionId, element.id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Delete element"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      {showElementPalette && selectedSectionId && (
        <ElementPalette
          sectionId={selectedSectionId}
          onClose={() => setShowElementPalette(false)}
        />
      )}
    </div>
  );
};

