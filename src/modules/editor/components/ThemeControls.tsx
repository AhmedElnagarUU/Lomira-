'use client';

import React from 'react';
import { useEditorStore } from '../store/editorStore';

const ARABIC_FONTS = ['Cairo', 'Tajawal', 'IBM Plex Sans Arabic', 'Almarai'];
const ENGLISH_FONTS = ['Inter', 'Roboto', 'Poppins', 'Montserrat', 'Open Sans'];

export const ThemeControls: React.FC = () => {
  const { theme, updateTheme, toggleLanguage } = useEditorStore();

  if (!theme) {
    return null;
  }

  const fonts = theme.language === 'ar' ? ARABIC_FONTS : ENGLISH_FONTS;

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Theme Settings</h3>

      {/* Language Toggle */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Language
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => updateTheme({ language: 'en' })}
            className={`flex-1 px-3 py-2 text-sm rounded border ${
              theme.language === 'en'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            English
          </button>
          <button
            onClick={() => updateTheme({ language: 'ar' })}
            className={`flex-1 px-3 py-2 text-sm rounded border ${
              theme.language === 'ar'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            العربية
          </button>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Primary Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={theme.colors.primary}
              onChange={(e) =>
                updateTheme({
                  colors: { ...theme.colors, primary: e.target.value },
                })
              }
              className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={theme.colors.primary}
              onChange={(e) =>
                updateTheme({
                  colors: { ...theme.colors, primary: e.target.value },
                })
              }
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Secondary Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={theme.colors.secondary}
              onChange={(e) =>
                updateTheme({
                  colors: { ...theme.colors, secondary: e.target.value },
                })
              }
              className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={theme.colors.secondary}
              onChange={(e) =>
                updateTheme({
                  colors: { ...theme.colors, secondary: e.target.value },
                })
              }
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Fonts */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Heading Font
          </label>
          <select
            value={theme.fonts.heading}
            onChange={(e) =>
              updateTheme({
                fonts: { ...theme.fonts, heading: e.target.value },
              })
            }
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
          >
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Body Font
          </label>
          <select
            value={theme.fonts.body}
            onChange={(e) =>
              updateTheme({
                fonts: { ...theme.fonts, body: e.target.value },
              })
            }
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
          >
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};


