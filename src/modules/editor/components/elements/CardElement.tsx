/**
 * CardElement - Draggable card component
 */

import React from 'react';
import type { EditorElement, CardElementContent } from '@/modules/editor/types/elements';

interface CardElementProps {
  element: EditorElement;
  isEditorMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const CardElement: React.FC<CardElementProps> = ({
  element,
  isEditorMode = false,
  isSelected = false,
  onSelect,
}) => {
  const content = element.content as CardElementContent;
  const style = element.style || {};

  const cardStyle: React.CSSProperties = {
    padding: style.padding
      ? `${style.padding.top || '1rem'} ${style.padding.right || '1rem'} ${style.padding.bottom || '1rem'} ${style.padding.left || '1rem'}`
      : '1rem',
    margin: style.margin
      ? `${style.margin.top || '0'} ${style.margin.right || '0'} ${style.margin.bottom || '0'} ${style.margin.left || '0'}`
      : undefined,
    backgroundColor: style.backgroundColor || '#ffffff',
    borderWidth: style.border?.width || '1px',
    borderStyle: style.border?.style || 'solid',
    borderColor: style.border?.color || '#e5e7eb',
    borderRadius: style.border?.radius || '8px',
    width: style.width,
    maxWidth: style.maxWidth,
  };

  return (
    <div
      className={`${isEditorMode ? 'relative' : ''} ${isSelected && isEditorMode ? 'ring-2 ring-blue-500' : ''}`}
      style={cardStyle}
      onClick={isEditorMode ? onSelect : undefined}
      onDoubleClick={isEditorMode ? (e) => e.stopPropagation() : undefined}
    >
      {isEditorMode && isSelected && (
        <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded z-10">
          Card
        </div>
      )}
      {content.image?.url && (
        <img
          src={content.image.url}
          alt={content.image.alt || 'Card image'}
          className="w-full h-48 object-cover rounded-t mb-4"
        />
      )}
      <h3 className="text-xl font-semibold mb-2" style={{ color: style.color || '#1f2937' }}>
        {content.title || 'Card Title'}
      </h3>
      <p className="text-gray-600 mb-4">{content.description || 'Card description...'}</p>
      {content.button && (
        <a
          href={content.button.link}
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {content.button.text}
        </a>
      )}
    </div>
  );
};




