/**
 * Editor constants and configuration
 */

export const DEVICE_SIZES = {
  desktop: {
    label: 'Desktop',
    icon: '🖥️',
    width: '100%',
  },
  tablet: {
    label: 'Tablet',
    icon: '📱',
    width: '768px',
  },
  mobile: {
    label: 'Mobile',
    icon: '📱',
    width: '375px',
  },
} as const;

export const DEFAULT_SECTION_CONFIG = {
  backgroundColor: '#ffffff',
  padding: {
    top: '4rem',
    bottom: '4rem',
    left: '1rem',
    right: '1rem',
  },
} as const;

export const DRAG_CONFIG = {
  activationDistance: 8, // pixels before drag activates
  transition: {
    duration: 200, // milliseconds
  },
} as const;

