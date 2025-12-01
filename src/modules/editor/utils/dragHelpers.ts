/**
 * Drag-and-drop helper functions for the editor
 */

import {
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import type { Section } from '@/modules/templates/types';
import type { EditorElement } from '@/modules/editor/types/elements';

/**
 * Create sensors for section dragging (hook)
 * Note: This must be called from within a React component
 */
export function useSectionSensors() {
  return useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
}

/**
 * Create sensors for element dragging (hook)
 * Note: This must be called from within a React component
 */
export function useElementSensors() {
  return useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
}

/**
 * Handle section drag end event
 */
export function handleSectionDragEnd(
  event: DragEndEvent,
  sections: Section[],
  onReorder: (sectionIds: string[]) => void
) {
  const { active, over } = event;

  if (over && active.id !== over.id) {
    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const reorderedSections = arrayMove(sections, oldIndex, newIndex);
      const sectionIds = reorderedSections.map((s) => s.id);
      onReorder(sectionIds);
    }
  }
}

/**
 * Handle element drag end event
 */
export function handleElementDragEnd(
  event: DragEndEvent,
  elements: EditorElement[],
  onReorder: (elementIds: string[]) => void
) {
  const { active, over } = event;

  if (over && active.id !== over.id) {
    const oldIndex = elements.findIndex((el) => el.id === active.id);
    const newIndex = elements.findIndex((el) => el.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const reorderedElements = arrayMove(elements, oldIndex, newIndex);
      const elementIds = reorderedElements.map((el) => el.id);
      onReorder(elementIds);
    }
  }
}

