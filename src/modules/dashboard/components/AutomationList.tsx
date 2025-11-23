import React from 'react';
import { Card } from '@/shared/components/Card';
import type { AutomationFlow } from '../types';

interface AutomationListProps {
  flows: AutomationFlow[];
}

const statusColor: Record<AutomationFlow['status'], string> = {
  Healthy: 'bg-emerald-50 text-emerald-700',
  'Needs review': 'bg-amber-50 text-amber-700',
  Paused: 'bg-slate-50 text-slate-600',
};

export const AutomationList: React.FC<AutomationListProps> = ({ flows }) => {
  return (
    <div className="space-y-4">
      {flows.map((flow) => (
        <Card
          key={flow.id}
          className="flex items-center justify-between bg-gradient-to-r from-white to-slate-50"
          data-testid={`automation-card-${flow.id}`}
        >
          <div>
            <p className="text-sm font-semibold text-slate-900">{flow.name}</p>
            <p className="text-xs text-slate-500">{flow.summary}</p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[flow.status]}`}
            data-testid={`automation-status-${flow.id}`}
          >
            {flow.status}
          </span>
        </Card>
      ))}
    </div>
  );
};
