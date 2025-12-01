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
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
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
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-base sm:text-lg mb-1 line-clamp-1">{template.name.en}</h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 capitalize">{template.category}</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
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
          className="w-full px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base mt-auto"
        >
          Use Template
        </button>
      </div>
    </div>
  );
};


