'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/shared/components/Card';
import type { PageDocument } from '@/modules/pages/types';
import type { AnalyticsSummary } from '@/modules/analytics/types';

interface PagesOverviewProps {
  pages: PageDocument[];
  analytics?: AnalyticsSummary;
}

export const PagesOverview: React.FC<PagesOverviewProps> = ({ pages, analytics }) => {
  const totalPages = pages.length;
  const publishedPages = pages.filter((p) => p.status === 'published').length;
  const draftPages = pages.filter((p) => p.status === 'draft').length;

  const metrics = [
    {
      id: 'total_pages',
      label: 'Total Pages',
      value: totalPages.toString(),
      delta: `${publishedPages} published`,
      trend: 'up' as const,
    },
    {
      id: 'total_views',
      label: 'Total Views',
      value: analytics?.totalVisits.toLocaleString() || '0',
      delta: analytics ? `${analytics.uniqueVisitors} unique visitors` : 'No data yet',
      trend: 'up' as const,
    },
    {
      id: 'conversions',
      label: 'Conversions',
      value: analytics?.totalConversions.toLocaleString() || '0',
      delta: analytics && analytics.totalConversions > 0 ? 'Tracked' : 'No conversions yet',
      trend: 'up' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Overview</h2>
          <p className="text-slate-600">Your landing pages at a glance</p>
        </div>
        <Link
          href="/templates"
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          + Create from Template
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.id} hover className="p-4 sm:p-6">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {metric.label}
            </p>
            <p className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">{metric.value}</p>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">{metric.delta}</p>
          </Card>
        ))}
      </div>

      {draftPages > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            You have <strong>{draftPages}</strong> draft {draftPages === 1 ? 'page' : 'pages'}{' '}
            waiting to be published.
          </p>
        </div>
      )}
    </div>
  );
};

