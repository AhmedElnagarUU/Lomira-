/**
 * Element type definitions for the drag-and-drop editor
 * Elements are draggable components that can be placed inside sections
 */

export type ElementType = 'text' | 'heading' | 'image' | 'button' | 'card' | 'spacer' | 'custom';

export interface ElementStyle {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  padding?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  margin?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  border?: {
    width?: string;
    style?: string;
    color?: string;
    radius?: string;
  };
  width?: string;
  height?: string;
  maxWidth?: string;
}

export interface TextElementContent {
  text: string;
  language?: 'en' | 'ar';
}

export interface HeadingElementContent {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  language?: 'en' | 'ar';
}

export interface ImageElementContent {
  url: string;
  alt: string;
  width?: string;
  height?: string;
}

export interface ButtonElementContent {
  text: string;
  link: string;
  variant: 'primary' | 'secondary' | 'outline';
  language?: 'en' | 'ar';
}

export interface CardElementContent {
  title: string;
  description: string;
  image?: {
    url: string;
    alt: string;
  };
  button?: {
    text: string;
    link: string;
  };
  language?: 'en' | 'ar';
}

export interface SpacerElementContent {
  height: string;
}

export interface CustomElementContent {
  html: string;
}

export type ElementContent =
  | TextElementContent
  | HeadingElementContent
  | ImageElementContent
  | ButtonElementContent
  | CardElementContent
  | SpacerElementContent
  | CustomElementContent;

export interface EditorElement {
  id: string;
  type: ElementType;
  order: number;
  content: ElementContent;
  style?: ElementStyle;
  config?: {
    className?: string;
    [key: string]: any;
  };
}

export interface ElementMetadata {
  type: ElementType;
  label: string;
  icon: string;
  description: string;
  defaultContent: () => ElementContent;
  defaultStyle?: ElementStyle;
}

export const ELEMENT_METADATA: Record<ElementType, ElementMetadata> = {
  text: {
    type: 'text',
    label: 'Text Block',
    icon: '📝',
    description: 'Add a text block with customizable styling',
    defaultContent: (): TextElementContent => ({
      text: 'Enter your text here...',
      language: 'en',
    }),
    defaultStyle: {
      fontSize: '16px',
      color: '#1f2937',
      textAlign: 'left',
    },
  },
  heading: {
    type: 'heading',
    label: 'Heading',
    icon: '📰',
    description: 'Add a heading (H1-H6)',
    defaultContent: (): HeadingElementContent => ({
      text: 'Heading Text',
      level: 2,
      language: 'en',
    }),
    defaultStyle: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1f2937',
      textAlign: 'left',
    },
  },
  image: {
    type: 'image',
    label: 'Image',
    icon: '🖼️',
    description: 'Add an image with alt text',
    defaultContent: (): ImageElementContent => ({
      url: '',
      alt: 'Image description',
      width: '100%',
    }),
    defaultStyle: {
      width: '100%',
      maxWidth: '100%',
    },
  },
  button: {
    type: 'button',
    label: 'Button',
    icon: '🔘',
    description: 'Add a clickable button',
    defaultContent: (): ButtonElementContent => ({
      text: 'Click Me',
      link: '#',
      variant: 'primary',
      language: 'en',
    }),
  },
  card: {
    type: 'card',
    label: 'Card',
    icon: '🃏',
    description: 'Add a card with title, description, and optional image',
    defaultContent: (): CardElementContent => ({
      title: 'Card Title',
      description: 'Card description goes here...',
      language: 'en',
    }),
    defaultStyle: {
      padding: {
        top: '1rem',
        bottom: '1rem',
        left: '1rem',
        right: '1rem',
      },
      backgroundColor: '#ffffff',
      border: {
        width: '1px',
        style: 'solid',
        color: '#e5e7eb',
        radius: '8px',
      },
    },
  },
  spacer: {
    type: 'spacer',
    label: 'Spacer',
    icon: '↕️',
    description: 'Add vertical spacing',
    defaultContent: (): SpacerElementContent => ({
      height: '40px',
    }),
  },
  custom: {
    type: 'custom',
    label: 'Custom HTML',
    icon: '⚙️',
    description: 'Add custom HTML code',
    defaultContent: (): CustomElementContent => ({
      html: '<div>Custom HTML</div>',
    }),
  },
};




