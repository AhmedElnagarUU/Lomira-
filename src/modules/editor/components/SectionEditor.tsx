'use client';

import React from 'react';
import { useEditorStore } from '../store/editorStore';

export const SectionEditor: React.FC = () => {
  const { structure, selectedSectionId, updateSectionContent, theme } = useEditorStore();

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
    <div className="p-4 border-t border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-4 capitalize">
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
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
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
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
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
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
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
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
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
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
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
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


