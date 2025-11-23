'use client';

import React from 'react';
import clsx from 'clsx';
import type { DashboardNavItem, DashboardSectionId } from '../types';

interface SidebarNavProps {
  items: DashboardNavItem[];
  activeItem: DashboardSectionId;
  onSelect: (value: DashboardSectionId) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  items,
  activeItem,
  onSelect,
}) => {
  return (
    <nav
      aria-label="Dashboard navigation"
      className="hidden w-72 border-r border-slate-200 bg-white p-6 lg:block"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        Workspace
      </p>
      <ul className="mt-4 space-y-2">
        {items.map((item) => {
          const isActive = item.id === activeItem;
          return (
            <li key={item.id}>
              <button
                type="button"
                data-testid={`sidebar-item-${item.id}`}
                onClick={() => onSelect(item.id)}
                className={clsx(
                  'w-full rounded-xl border p-4 text-left transition-all',
                  isActive
                    ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                    : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
                )}
              >
                <span className="block text-sm font-semibold text-slate-900">
                  {item.label}
                </span>
                <span className="mt-1 block text-xs text-slate-500">
                  {item.description}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
