'use client';

import React, { useMemo, useState } from 'react';
import { Button } from '@/shared/components/Button';
import { Card } from '@/shared/components/Card';
import { Container } from '@/shared/components/Container';
import { SidebarNav } from './SidebarNav';
import type { DashboardNavItem } from '../types';

const NAV_ITEMS: DashboardNavItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    description: 'KPIs and health metrics',
  },
  {
    id: 'engagement',
    label: 'Engagement',
    description: 'Channel performance insights',
  },
  {
    id: 'automation',
    label: 'Automation',
    description: 'Workflow health and alerts',
  },
];

const KPI_CARDS = [
  { label: 'New signups', value: '1,248', delta: '+12.5%' },
  { label: 'Revenue', value: '$92.4k', delta: '+8.1%' },
  { label: 'Churn', value: '2.3%', delta: '-0.4%' },
];

const ENGAGEMENT_ROWS = [
  { channel: 'Email', reach: '82%', trend: '↑ 6%' },
  { channel: 'Paid social', reach: '64%', trend: '↑ 3%' },
  { channel: 'Organic social', reach: '58%', trend: '↓ 1%' },
];

const AUTOMATION_FLOWS = [
  { id: 'welcome_flow', name: 'Welcome flow', status: 'Healthy' },
  { id: 'winback', name: 'Win-back journey', status: 'Needs review' },
  { id: 'billing', name: 'Billing reminder', status: 'Healthy' },
];

export const DashboardLayout: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(NAV_ITEMS[0].id);
  const activeLabel = useMemo(
    () => NAV_ITEMS.find((item) => item.id === activeSection)?.label ?? '',
    [activeSection]
  );

  const renderSection = (section: string) => {
    switch (section) {
      case 'engagement':
        return (
          <Card className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-sm">
                <thead className="bg-slate-50 text-left uppercase text-xs font-semibold tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-3">Channel</th>
                    <th className="px-6 py-3">Reach</th>
                    <th className="px-6 py-3">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {ENGAGEMENT_ROWS.map((row) => (
                    <tr key={row.channel}>
                      <td className="px-6 py-4 font-medium">{row.channel}</td>
                      <td className="px-6 py-4">{row.reach}</td>
                      <td className="px-6 py-4">{row.trend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        );
      case 'automation':
        return (
          <div className="space-y-4">
            {AUTOMATION_FLOWS.map((flow) => (
              <Card
                key={flow.id}
                className="flex items-center justify-between bg-gradient-to-r from-white to-slate-50"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {flow.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    Triggered journeys with AI nudges
                  </p>
                </div>
                <span
                  className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-700"
                  data-testid={`automation-status-${flow.id}`}
                >
                  {flow.status}
                </span>
              </Card>
            ))}
          </div>
        );
      default:
        return (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {KPI_CARDS.map((kpi) => (
              <Card key={kpi.label} hover>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {kpi.label}
                </p>
                <p className="mt-3 text-3xl font-bold text-slate-900">
                  {kpi.value}
                </p>
                <p className="mt-1 text-sm text-emerald-600">{kpi.delta}</p>
              </Card>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <SidebarNav
          items={NAV_ITEMS}
          activeItem={activeSection}
          onSelect={setActiveSection}
        />

        <div className="flex-1">
          <header className="border-b border-slate-200 bg-white">
            <Container className="flex flex-col gap-4 pb-6 pt-8 lg:flex-row lg:items-center lg:justify-between">
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
                  {activeLabel} · refreshed moments ago
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">Share</Button>
                <Button>New report</Button>
              </div>
            </Container>
          </header>

          <main
            className="pb-12 pt-8"
            data-testid={`section-${activeSection}`}
            aria-live="polite"
          >
            <Container className="space-y-6">
              <div className="lg:hidden">
                <label className="block text-xs font-semibold uppercase text-slate-500">
                  Sections
                  <select
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
                    value={activeSection}
                    onChange={(event) => setActiveSection(event.target.value)}
                    data-testid="mobile-section-select"
                  >
                    {NAV_ITEMS.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {renderSection(activeSection)}
            </Container>
          </main>
        </div>
      </div>
    </div>
  );
};
