/**
 * ElementEditor - Property panel for editing selected element
 */

'use client';

import React from 'react';
import { useEditorStore } from '../../store/editorStore';
import type { EditorElement, TextElementContent, HeadingElementContent, ImageElementContent, ButtonElementContent, CardElementContent, SpacerElementContent, CustomElementContent } from '../../types/elements';

export const ElementEditor: React.FC = () => {
  const { structure, selectedElement, updateElement, theme } = useEditorStore();

  if (!selectedElement || !structure) {
    return (
      <div className="p-4">
        <p className="text-sm text-gray-500 text-center">Select an element to edit</p>
      </div>
    );
  }

  const section = structure.sections.find((s) => s.id === selectedElement.sectionId);
  const element = section?.elements?.find((e) => e.id === selectedElement.elementId);

  if (!element) {
    return (
      <div className="p-4">
        <p className="text-sm text-gray-500 text-center">Element not found</p>
      </div>
    );
  }

  const handleUpdate = (updates: Partial<EditorElement>) => {
    updateElement(selectedElement.sectionId, selectedElement.elementId, updates);
  };

  const handleContentUpdate = (contentUpdates: any) => {
    handleUpdate({
      content: {
        ...element.content,
        ...contentUpdates,
      },
    });
  };

  const handleStyleUpdate = (styleUpdates: any) => {
    handleUpdate({
      style: {
        ...element.style,
        ...styleUpdates,
      },
    });
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-4 capitalize">
        Edit {element.type}
      </h3>

      {/* Text Element Editor */}
      {element.type === 'text' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Text</label>
            <textarea
              value={(element.content as TextElementContent).text || ''}
              onChange={(e) => handleContentUpdate({ text: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              rows={4}
              title="Text content"
              aria-label="Text content"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Font Size</label>
            <input
              type="text"
              value={element.style?.fontSize || '16px'}
              onChange={(e) => handleStyleUpdate({ fontSize: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              placeholder="16px"
              title="Font size"
              aria-label="Font size"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Text Color</label>
            <input
              type="color"
              value={element.style?.color || '#1f2937'}
              onChange={(e) => handleStyleUpdate({ color: e.target.value })}
              className="w-full h-10 border border-gray-300 rounded cursor-pointer"
              title="Text color"
              aria-label="Text color"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Text Align</label>
            <select
              value={element.style?.textAlign || 'left'}
              onChange={(e) => handleStyleUpdate({ textAlign: e.target.value as any })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              title="Text alignment"
              aria-label="Text alignment"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
              <option value="justify">Justify</option>
            </select>
          </div>
        </div>
      )}

      {/* Heading Element Editor */}
      {element.type === 'heading' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Heading Text</label>
            <input
              type="text"
              value={(element.content as HeadingElementContent).text || ''}
              onChange={(e) => handleContentUpdate({ text: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              title="Heading text"
              aria-label="Heading text"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Heading Level</label>
            <select
              value={(element.content as HeadingElementContent).level || 2}
              onChange={(e) => handleContentUpdate({ level: parseInt(e.target.value) as any })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              title="Heading level"
              aria-label="Heading level"
            >
              <option value={1}>H1</option>
              <option value={2}>H2</option>
              <option value={3}>H3</option>
              <option value={4}>H4</option>
              <option value={5}>H5</option>
              <option value={6}>H6</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Font Size</label>
            <input
              type="text"
              value={element.style?.fontSize || '32px'}
              onChange={(e) => handleStyleUpdate({ fontSize: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              placeholder="32px"
              title="Font size"
              aria-label="Font size"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Text Color</label>
            <input
              type="color"
              value={element.style?.color || '#1f2937'}
              onChange={(e) => handleStyleUpdate({ color: e.target.value })}
              className="w-full h-10 border border-gray-300 rounded cursor-pointer"
              title="Text color"
              aria-label="Text color"
            />
          </div>
        </div>
      )}

      {/* Image Element Editor */}
      {element.type === 'image' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              value={(element.content as ImageElementContent).url || ''}
              onChange={(e) => handleContentUpdate({ url: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              placeholder="https://example.com/image.jpg"
              title="Image URL"
              aria-label="Image URL"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Alt Text</label>
            <input
              type="text"
              value={(element.content as ImageElementContent).alt || ''}
              onChange={(e) => handleContentUpdate({ alt: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              placeholder="Image description"
              title="Alt text"
              aria-label="Alt text"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Width</label>
            <input
              type="text"
              value={(element.content as ImageElementContent).width || '100%'}
              onChange={(e) => handleContentUpdate({ width: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              placeholder="100%"
              title="Image width"
              aria-label="Image width"
            />
          </div>
        </div>
      )}

      {/* Button Element Editor */}
      {element.type === 'button' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Button Text</label>
            <input
              type="text"
              value={(element.content as ButtonElementContent).text || ''}
              onChange={(e) => handleContentUpdate({ text: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              title="Button text"
              aria-label="Button text"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Link URL</label>
            <input
              type="url"
              value={(element.content as ButtonElementContent).link || ''}
              onChange={(e) => handleContentUpdate({ link: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              placeholder="#"
              title="Button link"
              aria-label="Button link"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Button Variant</label>
            <select
              value={(element.content as ButtonElementContent).variant || 'primary'}
              onChange={(e) => handleContentUpdate({ variant: e.target.value as any })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              title="Button variant"
              aria-label="Button variant"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="outline">Outline</option>
            </select>
          </div>
        </div>
      )}

      {/* Spacer Element Editor */}
      {element.type === 'spacer' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Height</label>
            <input
              type="text"
              value={(element.content as SpacerElementContent).height || '40px'}
              onChange={(e) => handleContentUpdate({ height: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              placeholder="40px"
              title="Spacer height"
              aria-label="Spacer height"
            />
          </div>
        </div>
      )}

      {/* Custom Element Editor */}
      {element.type === 'custom' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">HTML Code</label>
            <textarea
              value={(element.content as CustomElementContent).html || ''}
              onChange={(e) => handleContentUpdate({ html: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white font-mono"
              rows={8}
              title="Custom HTML"
              aria-label="Custom HTML"
            />
          </div>
        </div>
      )}
    </div>
  );
};

