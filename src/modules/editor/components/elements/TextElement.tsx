/**
 * TextElement - Draggable text block component
 */

import React from 'react';
import type { EditorElement, TextElementContent } from '@/modules/editor/types/elements';

interface TextElementProps {
  element: EditorElement;
  isEditorMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const TextElement: React.FC<TextElementProps> = ({
  element,
  isEditorMode = false,
  isSelected = false,
  onSelect,
}) => {
  const content = element.content as TextElementContent;
  const style = element.style || {};

  const elementStyle: React.CSSProperties = {
    fontSize: style.fontSize || '16px',
    fontWeight: style.fontWeight || 'normal',
    color: style.color || '#1f2937',
    textAlign: style.textAlign || 'left',
    padding: style.padding
      ? `${style.padding.top || '0'} ${style.padding.right || '0'} ${style.padding.bottom || '0'} ${style.padding.left || '0'}`
      : undefined,
    margin: style.margin
      ? `${style.margin.top || '0'} ${style.margin.right || '0'} ${style.margin.bottom || '0'} ${style.margin.left || '0'}`
      : undefined,
    backgroundColor: style.backgroundColor,
    width: style.width,
    maxWidth: style.maxWidth,
  };

  return (
    <div
      className={`${isEditorMode ? 'relative' : ''} ${isSelected && isEditorMode ? 'ring-2 ring-blue-500' : ''}`}
      style={elementStyle}
      onClick={isEditorMode ? onSelect : undefined}
      onDoubleClick={isEditorMode ? (e) => e.stopPropagation() : undefined}
    >
      {isEditorMode && isSelected && (
        <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded">
          Text Block
        </div>
      )}
      <p style={{ margin: 0 }}>{content.text || 'Enter text...'}</p>
    </div>
  );
};




