/**
 * DeviceSizeSelector - Component for switching between device preview sizes
 */

'use client';

import React from 'react';
import { useEditorStore } from '../../store/editorStore';
import { DEVICE_SIZES } from '../../constants';

export const DeviceSizeSelector: React.FC = () => {
  const { deviceSize, setDeviceSize } = useEditorStore();

  return (
    <div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-2">
      {Object.entries(DEVICE_SIZES).map(([key, device]) => (
        <button
          key={key}
          onClick={() => setDeviceSize(key as 'desktop' | 'tablet' | 'mobile')}
          className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium rounded transition-colors touch-manipulation ${
            deviceSize === key
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title={`${device.label} (${device.width})`}
          aria-label={`Switch to ${device.label} view`}
        >
          <span className="hidden sm:inline mr-1">{device.icon}</span>
          <span className="text-xs">{device.label}</span>
        </button>
      ))}
    </div>
  );
};

