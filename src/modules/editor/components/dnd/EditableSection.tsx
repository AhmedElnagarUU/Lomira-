/**
 * EditableSection - Wrapper component for sections in editor mode
 * Handles drag-and-drop for elements within the section
 */

'use client';

import React from 'react';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { Section } from '@/modules/templates/types';
import { ElementRenderer } from '../elements/ElementRenderer';
import { SectionRenderer } from '@/modules/sections/SectionRenderer';
import { useEditorStore } from '../../store/editorStore';
import { SortableElement } from './SortableElement';
import { useElementSensors, handleElementDragEnd } from '../../utils';

interface EditableSectionProps {
  section: Section;
  theme: any;
  isPreviewMode: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

export const EditableSection: React.FC<EditableSectionProps> = ({
  section,
  theme,
  isPreviewMode,
  isSelected,
  onSelect,
}) => {
  const { reorderElements, selectedElement } = useEditorStore();
  const elements = section.elements || [];

  const sensors = useElementSensors();

  const handleDragEnd = (event: DragEndEvent) => {
    handleElementDragEnd(event, elements, (elementIds) => {
      reorderElements(section.id, elementIds);
    });
  };

  // Render section with elements support
  return (
    <div
      className={`relative ${isSelected && !isPreviewMode ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
      onClick={onSelect}
    >
      {/* Render elements if they exist */}
      {elements.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={elements.map((el) => el.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2 p-4">
              {elements.map((element) => (
                <SortableElement
                  key={element.id}
                  element={element}
                  sectionId={section.id}
                  isSelected={selectedElement?.sectionId === section.id && selectedElement?.elementId === element.id}
                  isPreviewMode={isPreviewMode}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
      
      {/* Render section content (for sections that don't use elements) */}
      {elements.length === 0 && <SectionRenderer section={section} theme={theme} />}
      
      {/* Show placeholder in editor mode when no elements */}
      {elements.length === 0 && !isPreviewMode && (
        <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded m-4">
          <p className="text-gray-400 text-sm">No elements. Add elements to customize this section.</p>
        </div>
      )}
    </div>
  );
};

