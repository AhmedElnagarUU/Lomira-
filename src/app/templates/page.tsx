import React from 'react';
import { TemplateGrid } from '@/modules/templates/components';

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Choose a Template</h1>
          <p className="text-gray-600">
            Select a template to start building your landing page
          </p>
        </div>
        <TemplateGrid />
      </div>
    </div>
  );
}


