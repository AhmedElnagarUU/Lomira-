/**
 * HeadingElement - Draggable heading component (H1-H6)
 */

import React from 'react';
import type { EditorElement, HeadingElementContent } from '@/modules/editor/types/elements';

interface HeadingElementProps {
  element: EditorElement;
  isEditorMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const HeadingElement: React.FC<HeadingElementProps> = ({
  element,
  isEditorMode = false,
  isSelected = false,
  onSelect,
}) => {
  const content = element.content as HeadingElementContent;
  const style = element.style || {};
  const HeadingTag = `h${content.level || 2}` as keyof JSX.IntrinsicElements;

  const elementStyle: React.CSSProperties = {
    fontSize: style.fontSize || (content.level === 1 ? '48px' : content.level === 2 ? '36px' : '24px'),
    fontWeight: style.fontWeight || 'bold',
    color: style.color || '#1f2937',
    textAlign: style.textAlign || 'left',
    padding: style.padding
      ? `${style.padding.top || '0'} ${style.padding.right || '0'} ${style.padding.bottom || '0'} ${style.padding.left || '0'}`
      : undefined,
    margin: style.margin
      ? `${style.margin.top || '0'} ${style.margin.right || '0'} ${style.margin.bottom || '0'} ${style.margin.left || '0'}`
      : undefined,
    backgroundColor: style.backgroundColor,
  };

  return (
    <div
      className={`${isEditorMode ? 'relative' : ''} ${isSelected && isEditorMode ? 'ring-2 ring-blue-500' : ''}`}
      onClick={isEditorMode ? onSelect : undefined}
      onDoubleClick={isEditorMode ? (e) => e.stopPropagation() : undefined}
    >
      {isEditorMode && isSelected && (
        <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded">
          Heading {content.level}
        </div>
      )}
      <HeadingTag style={elementStyle}>{content.text || 'Heading Text'}</HeadingTag>
    </div>
  );
};




