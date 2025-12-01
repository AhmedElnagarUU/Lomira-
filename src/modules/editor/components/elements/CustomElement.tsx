/**
 * CustomElement - Draggable custom HTML component
 */

import React from 'react';
import type { EditorElement, CustomElementContent } from '@/modules/editor/types/elements';

interface CustomElementProps {
  element: EditorElement;
  isEditorMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const CustomElement: React.FC<CustomElementProps> = ({
  element,
  isEditorMode = false,
  isSelected = false,
  onSelect,
}) => {
  const content = element.content as CustomElementContent;
  const style = element.style || {};

  const containerStyle: React.CSSProperties = {
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
      style={containerStyle}
      onClick={isEditorMode ? onSelect : undefined}
      onDoubleClick={isEditorMode ? (e) => e.stopPropagation() : undefined}
    >
      {isEditorMode && isSelected && (
        <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded z-10">
          Custom HTML
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: content.html || '<div>Custom HTML</div>' }} />
    </div>
  );
};




