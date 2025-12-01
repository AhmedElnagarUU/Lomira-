/**
 * ElementPalette - Panel showing available element types to add
 */

'use client';

import React from 'react';
import { ELEMENT_METADATA, type ElementType } from '../../types/elements';
import { useEditorStore } from '../../store/editorStore';

interface ElementPaletteProps {
  sectionId: string;
  onClose: () => void;
}

export const ElementPalette: React.FC<ElementPaletteProps> = ({ sectionId, onClose }) => {
  const { addElement } = useEditorStore();

  const handleAddElement = (elementType: ElementType) => {
    addElement(sectionId, elementType);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Add Element</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.values(ELEMENT_METADATA).map((metadata) => (
            <button
              key={metadata.type}
              onClick={() => handleAddElement(metadata.type)}
              className="p-4 text-left border border-gray-200 rounded hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className="text-2xl mb-2">{metadata.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{metadata.label}</h3>
              <p className="text-xs text-gray-600">{metadata.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

