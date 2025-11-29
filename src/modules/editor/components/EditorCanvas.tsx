'use client';

import React from 'react';
import { useEditorStore } from '../store/editorStore';
import { SectionRenderer } from '@/modules/sections/SectionRenderer';

export const EditorCanvas: React.FC = () => {
  const { structure, theme, selectedSectionId, setSelectedSection, isPreviewMode, deviceSize } = useEditorStore();

  if (!structure || !theme) {
    return null;
  }

  const sortedSections = [...structure.sections].sort((a, b) => a.order - b.order);

  // Device size styles
  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  const maxWidth = deviceWidths[deviceSize || 'desktop'];
  const isResponsive = deviceSize !== 'desktop';

  return (
    <div className="min-h-full bg-gray-100 flex items-start justify-center p-4">
      <div
        className={`bg-white shadow-lg transition-all duration-300 ${theme.language === 'ar' ? 'rtl' : 'ltr'}`}
        style={{
          width: isResponsive ? maxWidth : '100%',
          maxWidth: isResponsive ? maxWidth : 'none',
          minHeight: '100vh',
        }}
        dir={theme.language === 'ar' ? 'rtl' : 'ltr'}
      >
        {sortedSections.map((section) => (
          <div
            key={section.id}
            className={`relative group cursor-pointer ${
              selectedSectionId === section.id && !isPreviewMode
                ? 'ring-4 ring-blue-500 ring-offset-2'
                : 'hover:ring-2 hover:ring-blue-300'
            }`}
            onClick={(e) => {
              if (!isPreviewMode) {
                e.stopPropagation();
                setSelectedSection(section.id);
              }
            }}
            style={{
              pointerEvents: isPreviewMode ? 'auto' : 'auto',
            }}
          >
            {/* Selection overlay */}
            {!isPreviewMode && (
              <div
                className={`absolute inset-0 z-10 ${
                  selectedSectionId === section.id
                    ? 'bg-blue-500 bg-opacity-10 border-2 border-blue-500'
                    : 'bg-transparent border-2 border-transparent group-hover:border-blue-300 group-hover:bg-blue-50 group-hover:bg-opacity-30'
                } transition-all`}
                style={{ pointerEvents: 'none' }}
              />
            )}
            
            {/* Section label */}
            {!isPreviewMode && (
              <div className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-blue-600 text-white px-3 py-1.5 text-xs font-semibold rounded shadow-lg">
                  {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                </div>
              </div>
            )}
            
            {/* Section content - pointer events handled by container */}
            <div style={{ pointerEvents: isPreviewMode ? 'auto' : 'none' }}>
              <SectionRenderer section={section} theme={theme} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


