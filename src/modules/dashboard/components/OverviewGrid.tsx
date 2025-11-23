import React from 'react';
import { Card } from '@/shared/components/Card';
import type { KpiMetric } from '../types';

interface OverviewGridProps {
  metrics: KpiMetric[];
}

const trendColor = {
  up: 'text-emerald-600',
  down: 'text-rose-600',
} as const;

export const OverviewGrid: React.FC<OverviewGridProps> = ({ metrics }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.id} hover>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {metric.label}
          </p>
          <p className="mt-3 text-3xl font-bold text-slate-900">
            {metric.value}
          </p>
          <p className={`mt-1 text-sm ${trendColor[metric.trend]}`}>
            {metric.delta}
          </p>
        </Card>
      ))}
    </div>
  );
};
