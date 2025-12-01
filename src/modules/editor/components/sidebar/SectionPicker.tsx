/**
 * SectionPicker - Modal component for selecting section types to add
 */

'use client';

import React from 'react';

interface SectionPickerProps {
  onSelect: (sectionType: string) => void;
  onClose: () => void;
}

const sectionTypes = [
  { id: 'hero', label: 'Hero', description: 'Main banner section with headline and CTA' },
  { id: 'features', label: 'Features', description: 'Showcase key features or benefits' },
  { id: 'stats', label: 'Stats', description: 'Display statistics or numbers' },
  { id: 'testimonials', label: 'Testimonials', description: 'Customer reviews and quotes' },
  { id: 'pricing', label: 'Pricing', description: 'Pricing plans and packages' },
  { id: 'cta', label: 'Call to Action', description: 'Final conversion section' },
];

export const SectionPicker: React.FC<SectionPickerProps> = ({ onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Add Section</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sectionTypes.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                onSelect(section.id);
                onClose();
              }}
              className="p-4 text-left border border-gray-200 rounded hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">{section.label}</h3>
              <p className="text-sm text-gray-600">{section.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

