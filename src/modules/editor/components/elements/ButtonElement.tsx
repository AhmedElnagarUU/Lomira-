/**
 * ButtonElement - Draggable button component
 */

import React from 'react';
import type { EditorElement, ButtonElementContent } from '@/modules/editor/types/elements';
import { Button } from '@/shared/components/Button';

interface ButtonElementProps {
  element: EditorElement;
  isEditorMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const ButtonElement: React.FC<ButtonElementProps> = ({
  element,
  isEditorMode = false,
  isSelected = false,
  onSelect,
}) => {
  const content = element.content as ButtonElementContent;
  const style = element.style || {};

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
      className={`${isEditorMode ? 'relative inline-block' : ''} ${isSelected && isEditorMode ? 'ring-2 ring-blue-500 rounded' : ''}`}
      style={containerStyle}
      onClick={isEditorMode ? onSelect : undefined}
      onDoubleClick={isEditorMode ? (e) => e.stopPropagation() : undefined}
    >
      {isEditorMode && isSelected && (
        <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded z-10">
          Button
        </div>
      )}
      <button
        type="button"
        onClick={isEditorMode ? (e: React.MouseEvent) => e.preventDefault() : undefined}
        className="px-6 py-3 text-base font-semibold rounded-full transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
        style={{
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          color: style.color,
          backgroundColor: style.backgroundColor,
        }}
      >
        {content.text || 'Button'}
      </button>
    </div>
  );
};




