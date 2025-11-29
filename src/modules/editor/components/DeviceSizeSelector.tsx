'use client';

import React from 'react';
import { useEditorStore } from '../store/editorStore';

export const DeviceSizeSelector: React.FC = () => {
  const { deviceSize, setDeviceSize } = useEditorStore();

  const devices = [
    { id: 'desktop' as const, label: 'Desktop', icon: '🖥️', width: '1920px' },
    { id: 'tablet' as const, label: 'Tablet', icon: '📱', width: '768px' },
    { id: 'mobile' as const, label: 'Mobile', icon: '📱', width: '375px' },
  ];

  return (
    <div className="flex items-center gap-2 px-2">
      {devices.map((device) => (
        <button
          key={device.id}
          onClick={() => setDeviceSize(device.id)}
          className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
            deviceSize === device.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title={`${device.label} (${device.width})`}
        >
          <span className="mr-1">{device.icon}</span>
          {device.label}
        </button>
      ))}
    </div>
  );
};

