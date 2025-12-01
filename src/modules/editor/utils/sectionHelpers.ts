/**
 * Section-related utility functions
 */

import { v4 as uuidv4 } from 'uuid';
import type { Section } from '@/modules/templates/types';
import type { ResponsiveConfig } from '@/modules/templates/types';

/**
 * Create a default section with type-specific content
 */
export function createDefaultSection(type: string): Section {
  const baseSection: Section = {
    id: uuidv4(),
    type: type as Section['type'],
    order: 0,
    config: {
      backgroundColor: '#ffffff',
      padding: {
        top: '4rem',
        bottom: '4rem',
        left: '1rem',
        right: '1rem',
      },
    },
    content: {
      en: {},
      ar: {},
    },
  };

  // Add type-specific default content
  switch (type) {
    case 'hero':
      baseSection.content = {
        en: {
          heading: 'Welcome to Our Platform',
          subheading: 'Build amazing landing pages',
          description: 'Create beautiful, responsive landing pages in minutes.',
          primaryButton: { text: 'Get Started', link: '#', style: 'primary' },
          image: { url: '', alt: 'Hero image' },
        },
        ar: {
          heading: 'مرحباً بكم في منصتنا',
          subheading: 'أنشئ صفحات هبوط رائعة',
          description: 'أنشئ صفحات هبوط جميلة ومتجاوبة في دقائق.',
          primaryButton: { text: 'ابدأ الآن', link: '#', style: 'primary' },
          image: { url: '', alt: 'صورة البطل' },
        },
      };
      break;
    case 'features':
      baseSection.content = {
        en: {
          heading: 'Key Features',
          items: [
            { icon: '✨', title: 'Feature 1', description: 'Description of feature 1' },
            { icon: '🚀', title: 'Feature 2', description: 'Description of feature 2' },
            { icon: '💎', title: 'Feature 3', description: 'Description of feature 3' },
          ],
          layout: 'grid-3',
        },
        ar: {
          heading: 'الميزات الرئيسية',
          items: [
            { icon: '✨', title: 'ميزة 1', description: 'وصف الميزة 1' },
            { icon: '🚀', title: 'ميزة 2', description: 'وصف الميزة 2' },
            { icon: '💎', title: 'ميزة 3', description: 'وصف الميزة 3' },
          ],
          layout: 'grid-3',
        },
      };
      break;
    case 'stats':
      baseSection.content = {
        en: {
          heading: 'Our Numbers',
          items: [
            { value: '1000+', label: 'Users' },
            { value: '500+', label: 'Projects' },
            { value: '99%', label: 'Satisfaction' },
          ],
        },
        ar: {
          heading: 'أرقامنا',
          items: [
            { value: '1000+', label: 'مستخدم' },
            { value: '500+', label: 'مشروع' },
            { value: '99%', label: 'رضا' },
          ],
        },
      };
      break;
    case 'testimonials':
      baseSection.content = {
        en: {
          heading: 'What Our Clients Say',
          items: [
            { name: 'John Doe', role: 'CEO', quote: 'Great service!', avatar: '' },
            { name: 'Jane Smith', role: 'Founder', quote: 'Highly recommended!', avatar: '' },
          ],
        },
        ar: {
          heading: 'ماذا يقول عملاؤنا',
          items: [
            { name: 'أحمد محمد', role: 'مدير', quote: 'خدمة رائعة!', avatar: '' },
            { name: 'فاطمة علي', role: 'مؤسس', quote: 'موصى به بشدة!', avatar: '' },
          ],
        },
      };
      break;
    case 'pricing':
      baseSection.content = {
        en: {
          heading: 'Pricing Plans',
          items: [
            { name: 'Basic', price: '$9', features: ['Feature 1', 'Feature 2'] },
            { name: 'Pro', price: '$29', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
          ],
        },
        ar: {
          heading: 'خطط الأسعار',
          items: [
            { name: 'أساسي', price: '9$', features: ['ميزة 1', 'ميزة 2'] },
            { name: 'احترافي', price: '29$', features: ['ميزة 1', 'ميزة 2', 'ميزة 3'] },
          ],
        },
      };
      break;
    case 'cta':
      baseSection.content = {
        en: {
          heading: 'Ready to Get Started?',
          description: 'Join thousands of satisfied customers today.',
          primaryButton: { text: 'Start Now', link: '#', style: 'primary' },
        },
        ar: {
          heading: 'هل أنت مستعد للبدء؟',
          description: 'انضم إلى آلاف العملاء الراضين اليوم.',
          primaryButton: { text: 'ابدأ الآن', link: '#', style: 'primary' },
        },
      };
      break;
    default:
      baseSection.content = {
        en: { heading: 'New Section' },
        ar: { heading: 'قسم جديد' },
      };
  }

  return baseSection;
}

/**
 * Get responsive configuration for a section based on device size
 */
export function getResponsiveConfig(
  section: Section,
  deviceSize: 'desktop' | 'tablet' | 'mobile'
): ResponsiveConfig | null {
  const responsive = section.config?.responsive;
  if (!responsive) return null;

  switch (deviceSize) {
    case 'mobile':
      return responsive.mobile || null;
    case 'tablet':
      return responsive.tablet || null;
    case 'desktop':
      return responsive.desktop || null;
    default:
      return responsive.desktop || null;
  }
}

/**
 * Sort sections by order
 */
export function sortSectionsByOrder(sections: Section[]): Section[] {
  return [...sections].sort((a, b) => a.order - b.order);
}

