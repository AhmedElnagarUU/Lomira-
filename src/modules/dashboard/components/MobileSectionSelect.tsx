import React from 'react';
import type { DashboardNavItem, DashboardSectionId } from '../types';

interface MobileSectionSelectProps {
  items: DashboardNavItem[];
  active: DashboardSectionId;
  onSelect: (value: DashboardSectionId) => void;
}

export const MobileSectionSelect: React.FC<MobileSectionSelectProps> = ({
  items,
  active,
  onSelect,
}) => {
  return (
    <div className="lg:hidden">
      <label className="block text-xs font-semibold uppercase text-slate-500">
        Sections
        <select
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
          value={active}
          onChange={(event) => onSelect(event.target.value as DashboardSectionId)}
          data-testid="mobile-section-select"
        >
          {items.map((item) => (
            <option value={item.id} key={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
