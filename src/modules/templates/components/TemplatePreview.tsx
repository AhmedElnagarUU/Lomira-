'use client';

import React from 'react';
import Link from 'next/link';
import type { TemplateMetadata } from '../types';

interface TemplatePreviewProps {
  template: TemplateMetadata;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template }) => {
  const handleUseTemplate = () => {
    // Navigate to editor with template
    window.location.href = `/editor/new?templateId=${template.templateId}`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-video bg-gray-100">
        <img
          src={template.thumbnail || '/placeholder-template.jpg'}
          alt={template.name.en}
          className="w-full h-full object-cover"
        />
        {template.isPremium && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Premium
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{template.name.en}</h3>
        <p className="text-sm text-gray-500 mb-3 capitalize">{template.category}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={handleUseTemplate}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Use Template
        </button>
      </div>
    </div>
  );
};


