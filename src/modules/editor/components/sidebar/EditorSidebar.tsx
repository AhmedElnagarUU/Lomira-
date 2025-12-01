/**
 * EditorSidebar - Sidebar component for managing sections
 */

'use client';

import React, { useState } from 'react';
import { useEditorStore } from '../../store/editorStore';
import { SectionPicker } from './SectionPicker';
import { createDefaultSection, sortSectionsByOrder } from '../../utils';
import type { Section } from '@/modules/templates/types';

export const EditorSidebar: React.FC = () => {
  const { structure, selectedSectionId, setSelectedSection, deleteSection, addSection } = useEditorStore();
  const [showSectionPicker, setShowSectionPicker] = useState(false);

  if (!structure) {
    return (
      <div className="p-4">
        <p className="text-sm text-gray-500">No sections yet</p>
        <button
          onClick={() => setShowSectionPicker(true)}
          className="mt-2 w-full px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add First Section
        </button>
      </div>
    );
  }

  const sortedSections = sortSectionsByOrder(structure.sections);

  const handleAddSection = (sectionType: string) => {
    const newSection = createDefaultSection(sectionType);
    // Set order based on existing sections
    const maxOrder = Math.max(...structure.sections.map((s) => s.order), -1);
    newSection.order = maxOrder + 1;
    addSection(newSection);
  };

  return (
    <>
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Sections</h2>
          <button
            onClick={() => setShowSectionPicker(true)}
            className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Section
          </button>
        </div>

        <div className="space-y-2">
          {sortedSections.map((section) => {
            const elements = section.elements || [];
            const isSelected = selectedSectionId === section.id;
            return (
              <div key={section.id}>
                <div
                  className={`p-2 sm:p-3 rounded border cursor-pointer transition-colors touch-manipulation ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedSection(section.id)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="text-gray-400 text-xs select-none">⋮⋮</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-900 capitalize truncate">
                          {section.type}
                        </p>
                        <p className="text-xs text-gray-500">
                          Section {section.order + 1} {elements.length > 0 && `(${elements.length} elements)`}
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700 text-lg sm:text-xl font-bold shrink-0 p-1 touch-manipulation"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this section?')) {
                          deleteSection(section.id);
                        }
                      }}
                      aria-label="Delete section"
                    >
                      ×
                    </button>
                  </div>
                </div>
                {/* Show elements if section is selected */}
                {isSelected && elements.length > 0 && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                    {elements
                      .sort((a, b) => a.order - b.order)
                      .map((element) => (
                        <div
                          key={element.id}
                          className="text-xs text-gray-600 py-1 px-2 rounded bg-gray-50"
                        >
                          {element.type} - {element.order + 1}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showSectionPicker && (
        <SectionPicker
          onSelect={handleAddSection}
          onClose={() => setShowSectionPicker(false)}
        />
      )}
    </>
  );
};

