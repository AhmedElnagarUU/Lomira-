import React from 'react';
import { Card } from '@/shared/components/Card';
import type { EngagementChannel } from '../types';

interface EngagementTableProps {
  channels: EngagementChannel[];
}

const trendColor = {
  up: 'text-emerald-600',
  down: 'text-rose-600',
} as const;

export const EngagementTable: React.FC<EngagementTableProps> = ({
  channels,
}) => {
  return (
    <Card className="p-0">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-3">Channel</th>
              <th className="px-6 py-3">Reach</th>
              <th className="px-6 py-3">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {channels.map((channel) => (
              <tr key={channel.id}>
                <td className="px-6 py-4 font-medium">{channel.name}</td>
                <td className="px-6 py-4">{channel.reach}</td>
                <td
                  className={`px-6 py-4 font-medium ${trendColor[channel.trendDirection]}`}
                >
                  {channel.trend}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
