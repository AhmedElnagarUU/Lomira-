/**
 * ImageElement - Draggable image component
 */

import React from 'react';
import type { EditorElement, ImageElementContent } from '@/modules/editor/types/elements';

interface ImageElementProps {
  element: EditorElement;
  isEditorMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const ImageElement: React.FC<ImageElementProps> = ({
  element,
  isEditorMode = false,
  isSelected = false,
  onSelect,
}) => {
  const content = element.content as ImageElementContent;
  const style = element.style || {};

  const imageStyle: React.CSSProperties = {
    width: content.width || style.width || '100%',
    height: content.height || style.height || 'auto',
    maxWidth: style.maxWidth || '100%',
    objectFit: 'cover' as const,
  };

  const containerStyle: React.CSSProperties = {
    textAlign: style.textAlign || 'left',
    padding: style.padding
      ? `${style.padding.top || '0'} ${style.padding.right || '0'} ${style.padding.bottom || '0'} ${style.padding.left || '0'}`
      : undefined,
    margin: style.margin
      ? `${style.margin.top || '0'} ${style.margin.right || '0'} ${style.margin.bottom || '0'} ${style.margin.left || '0'}`
      : undefined,
  };

  return (
    <div
      className={`${isEditorMode ? 'relative inline-block' : ''} ${isSelected && isEditorMode ? 'ring-2 ring-blue-500' : ''}`}
      style={containerStyle}
      onClick={isEditorMode ? onSelect : undefined}
      onDoubleClick={isEditorMode ? (e) => e.stopPropagation() : undefined}
    >
      {isEditorMode && isSelected && (
        <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded z-10">
          Image
        </div>
      )}
      {content.url ? (
        <img
          src={content.url}
          alt={content.alt || 'Image'}
          style={imageStyle}
          className={isEditorMode ? 'cursor-pointer' : ''}
        />
      ) : (
        <div
          className="border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center"
          style={{ minHeight: '200px', ...imageStyle }}
        >
          <span className="text-gray-400 text-sm">No image</span>
        </div>
      )}
    </div>
  );
};




