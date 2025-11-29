'use client';

import React, { useState } from 'react';
import { useEditorStore } from '../store/editorStore';
import { SectionPicker } from './SectionPicker';
import { v4 as uuidv4 } from 'uuid';
import type { Section } from '@/modules/templates/types';

// Helper to create default section content
const createDefaultSection = (type: string): Section => {
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
};

export const EditorSidebar: React.FC = () => {
  const { structure, selectedSectionId, setSelectedSection, deleteSection, addSection } = useEditorStore();
  const [showSectionPicker, setShowSectionPicker] = useState(false);

  if (!structure) {
    return (
      <div className="p-4">
        <p className="text-sm text-gray-500">No sections yet</p>
        <button
          onClick={() => setShowSectionPicker(true)}
          className="mt-2 w-full px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add First Section
        </button>
      </div>
    );
  }

  const sortedSections = [...structure.sections].sort((a, b) => a.order - b.order);

  const handleAddSection = (sectionType: string) => {
    const newSection = createDefaultSection(sectionType);
    // Set order based on existing sections
    const maxOrder = Math.max(...structure.sections.map((s) => s.order), -1);
    newSection.order = maxOrder + 1;
    addSection(newSection);
  };

  return (
    <>
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Sections</h2>
          <button
            onClick={() => setShowSectionPicker(true)}
            className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Section
          </button>
        </div>

        <div className="space-y-2">
          {sortedSections.map((section) => (
            <div
              key={section.id}
              className={`p-3 rounded border cursor-pointer transition-colors ${
                selectedSectionId === section.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedSection(section.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {section.type}
                  </p>
                  <p className="text-xs text-gray-500">Section {section.order + 1}</p>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Delete this section?')) {
                      deleteSection(section.id);
                    }
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showSectionPicker && (
        <SectionPicker
          onSelect={handleAddSection}
          onClose={() => setShowSectionPicker(false)}
        />
      )}
    </>
  );
};


