/**
 * EditorCanvas - Main canvas component for rendering and editing sections
 */

'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEditorStore } from '../../store/editorStore';
import { EditableSection } from '../dnd/EditableSection';
import { SortableSection } from '../dnd/SortableSection';
import { useSectionSensors, handleSectionDragEnd, getResponsiveConfig, sortSectionsByOrder } from '../../utils';
import { DEVICE_SIZES } from '../../constants';

/**
 * EditorCanvas component that displays the page structure with drag-and-drop support
 */
export const EditorCanvas: React.FC = () => {
  const {
    structure,
    theme,
    selectedSectionId,
    setSelectedSection,
    isPreviewMode,
    deviceSize,
    reorderSections,
  } = useEditorStore();
  const [draggedSectionId, setDraggedSectionId] = useState<string | null>(null);

  if (!structure || !theme) {
    return null;
  }

  const sortedSections = sortSectionsByOrder(structure.sections);
  const sensors = useSectionSensors();

  // Device size styles
  const deviceWidths = {
    desktop: DEVICE_SIZES.desktop.width,
    tablet: DEVICE_SIZES.tablet.width,
    mobile: DEVICE_SIZES.mobile.width,
  };

  const maxWidth = deviceWidths[deviceSize || 'desktop'];
  const isResponsive = deviceSize !== 'desktop';

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggedSectionId(null);
    handleSectionDragEnd(event, sortedSections, (sectionIds) => {
      reorderSections(sectionIds);
    });
  };

  const handleDragStart = (event: any) => {
    setDraggedSectionId(event.active.id);
  };

  return (
    <div className="min-h-full bg-gray-100 flex items-start justify-center p-2 sm:p-4">
      <div
        className={`bg-white shadow-lg transition-all duration-300 ${theme.language === 'ar' ? 'rtl' : 'ltr'}`}
        style={{
          width: isResponsive ? maxWidth : '100%',
          maxWidth: isResponsive ? maxWidth : 'none',
          minHeight: '100vh',
        }}
        dir={theme.language === 'ar' ? 'rtl' : 'ltr'}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortedSections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-0">
              {sortedSections.map((section) => {
                const isSelected = selectedSectionId === section.id;
                const responsiveConfig = getResponsiveConfig(section, deviceSize || 'desktop');
                const sectionPadding = responsiveConfig?.padding || section.config?.padding;

                return (
                  <SortableSection
                    key={section.id}
                    section={section}
                    isSelected={isSelected}
                    isPreviewMode={isPreviewMode}
                    draggedSectionId={draggedSectionId}
                    onSelect={() => setSelectedSection(section.id)}
                  >
                    {/* Section content with responsive padding */}
                    <div
                      style={{
                        pointerEvents: isPreviewMode ? 'auto' : 'none',
                        paddingTop: sectionPadding?.top || section.config?.padding?.top || '0',
                        paddingBottom: sectionPadding?.bottom || section.config?.padding?.bottom || '0',
                        paddingLeft: sectionPadding?.left || section.config?.padding?.left || '0',
                        paddingRight: sectionPadding?.right || section.config?.padding?.right || '0',
                        backgroundColor: section.config?.backgroundColor || 'transparent',
                      }}
                    >
                      <EditableSection
                        section={section}
                        theme={theme}
                        isPreviewMode={isPreviewMode}
                        isSelected={isSelected}
                        onSelect={() => setSelectedSection(section.id)}
                      />
                    </div>
                  </SortableSection>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

