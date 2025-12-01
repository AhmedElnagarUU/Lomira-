/**
 * SpacerElement - Draggable spacer/divider component
 */

import React from 'react';
import type { EditorElement, SpacerElementContent } from '@/modules/editor/types/elements';

interface SpacerElementProps {
  element: EditorElement;
  isEditorMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const SpacerElement: React.FC<SpacerElementProps> = ({
  element,
  isEditorMode = false,
  isSelected = false,
  onSelect,
}) => {
  const content = element.content as SpacerElementContent;
  const style = element.style || {};

  const spacerStyle: React.CSSProperties = {
    height: content.height || style.height || '40px',
    width: '100%',
    backgroundColor: style.backgroundColor || 'transparent',
    borderTop: style.border ? `${style.border.width || '1px'} ${style.border.style || 'solid'} ${style.border.color || '#e5e7eb'}` : undefined,
  };

  return (
    <div
      className={`${isEditorMode ? 'relative' : ''} ${isSelected && isEditorMode ? 'ring-2 ring-blue-500' : ''}`}
      style={spacerStyle}
      onClick={isEditorMode ? onSelect : undefined}
      onDoubleClick={isEditorMode ? (e) => e.stopPropagation() : undefined}
    >
      {isEditorMode && isSelected && (
        <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded z-10">
          Spacer ({content.height || '40px'})
        </div>
      )}
      {isEditorMode && !isSelected && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xs text-gray-400">Spacer</div>
        </div>
      )}
    </div>
  );
};




