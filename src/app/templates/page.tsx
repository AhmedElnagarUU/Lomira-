import React from 'react';
import { TemplateGrid } from '@/modules/templates/components';

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 text-slate-900">
            Choose a Template
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Select a template to start building your landing page
          </p>
        </div>
        <TemplateGrid />
      </div>
    </div>
  );
}


