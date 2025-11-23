import React from 'react';
import { Button } from '@/shared/components/Button';

interface DashboardHeaderProps {
  sectionLabel: string;
  updatedAt: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  sectionLabel,
  updatedAt,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 pb-6 pt-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Active section
          </p>
          <h1
            className="mt-2 text-3xl font-semibold text-slate-900"
            data-testid="dashboard-heading"
          >
            Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            {sectionLabel} · refreshed {updatedAt}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">Share</Button>
          <Button>New report</Button>
        </div>
      </div>
    </header>
  );
};
