/**
 * SortableElement - Draggable element component using @dnd-kit
 */

'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { EditorElement } from '@/modules/editor/types/elements';
import { ElementRenderer } from '../elements/ElementRenderer';
import { useEditorStore } from '../../store/editorStore';

interface SortableElementProps {
  element: EditorElement;
  sectionId: string;
  isSelected: boolean;
  isPreviewMode: boolean;
}

/**
 * SortableElement component that wraps an element for drag-and-drop functionality
 */
export const SortableElement: React.FC<SortableElementProps> = ({
  element,
  sectionId,
  isSelected,
  isPreviewMode,
}) => {
  const { setSelectedElement } = useEditorStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isPreviewMode ? '' : 'relative group'} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      {...attributes}
      {...(!isPreviewMode ? listeners : {})}
      onClick={(e) => {
        if (!isPreviewMode) {
          e.stopPropagation();
          setSelectedElement({ sectionId, elementId: element.id });
        }
      }}
    >
      {!isPreviewMode && (
        <div className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <span>⋮⋮</span>
            <span>Drag</span>
          </div>
        </div>
      )}
      <ElementRenderer
        element={element}
        isEditorMode={!isPreviewMode}
        isSelected={isSelected}
        onSelect={() => setSelectedElement({ sectionId, elementId: element.id })}
      />
    </div>
  );
};

