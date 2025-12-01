/**
 * SortableSection - Draggable section component using @dnd-kit
 */

'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Section } from '@/modules/templates/types';

interface SortableSectionProps {
  section: Section;
  isSelected: boolean;
  isPreviewMode: boolean;
  draggedSectionId: string | null;
  onSelect: () => void;
  children: React.ReactNode;
}

/**
 * SortableSection component that wraps a section for drag-and-drop functionality
 */
export const SortableSection: React.FC<SortableSectionProps> = ({
  section,
  isSelected,
  isPreviewMode,
  draggedSectionId,
  onSelect,
  children,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || draggedSectionId === section.id ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${
        isSelected && !isPreviewMode
          ? 'ring-2 ring-blue-500 ring-offset-1'
          : ''
      }`}
      {...attributes}
      {...(!isPreviewMode ? listeners : {})}
      onClick={(e) => {
        if (!isPreviewMode && !isDragging && !draggedSectionId) {
          e.stopPropagation();
          onSelect();
        }
      }}
    >
      {/* Selection overlay - only show on hover for non-selected sections */}
      {!isPreviewMode && (
        <div
          className={`absolute inset-0 z-10 transition-all ${
            isSelected
              ? 'bg-blue-500 bg-opacity-5 border-2 border-blue-500'
              : 'bg-transparent border-2 border-transparent group-hover:border-blue-300 group-hover:bg-blue-50 group-hover:bg-opacity-5'
          }`}
          style={{
            pointerEvents: 'none',
            ...(isSelected && {
              backgroundColor: 'transparent',
              borderColor: 'transparent',
            }),
          }}
        />
      )}

      {/* Drag handle indicator */}
      {!isPreviewMode && !isSelected && (
        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-gray-800 text-white px-2 py-1 text-xs rounded flex items-center gap-1">
            <span>⋮⋮</span>
            <span>Drag</span>
          </div>
        </div>
      )}

      {/* Section label - only show on hover for non-selected */}
      {!isPreviewMode && !isSelected && (
        <div className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-blue-600 text-white px-3 py-1.5 text-xs font-semibold rounded shadow-lg">
            {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
          </div>
        </div>
      )}

      {/* Selected section indicator */}
      {!isPreviewMode && isSelected && (
        <div className="absolute top-2 left-2 z-20 pointer-events-none">
          <div className="bg-blue-600 text-white px-3 py-1.5 text-xs font-semibold rounded shadow-lg">
            {section.type.charAt(0).toUpperCase() + section.type.slice(1)} (Selected)
          </div>
        </div>
      )}

      {/* Section content */}
      {children}
    </div>
  );
};

