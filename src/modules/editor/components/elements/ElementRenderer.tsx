/**
 * ElementRenderer - Renders the appropriate element component based on type
 */

import React from 'react';
import type { EditorElement } from '@/modules/editor/types/elements';
import { TextElement } from './TextElement';
import { HeadingElement } from './HeadingElement';
import { ImageElement } from './ImageElement';
import { ButtonElement } from './ButtonElement';
import { CardElement } from './CardElement';
import { SpacerElement } from './SpacerElement';
import { CustomElement } from './CustomElement';

interface ElementRendererProps {
  element: EditorElement;
  isEditorMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const ElementRenderer: React.FC<ElementRendererProps> = ({
  element,
  isEditorMode = false,
  isSelected = false,
  onSelect,
}) => {
  const commonProps = {
    element,
    isEditorMode,
    isSelected,
    onSelect,
  };

  switch (element.type) {
    case 'text':
      return <TextElement {...commonProps} />;
    case 'heading':
      return <HeadingElement {...commonProps} />;
    case 'image':
      return <ImageElement {...commonProps} />;
    case 'button':
      return <ButtonElement {...commonProps} />;
    case 'card':
      return <CardElement {...commonProps} />;
    case 'spacer':
      return <SpacerElement {...commonProps} />;
    case 'custom':
      return <CustomElement {...commonProps} />;
    default:
      return (
        <div className="p-4 border border-gray-300 rounded">
          <p className="text-sm text-gray-500">Unknown element type: {element.type}</p>
        </div>
      );
  }
};




