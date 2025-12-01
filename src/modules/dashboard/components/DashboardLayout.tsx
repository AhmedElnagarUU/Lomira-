'use client';

import React, { useMemo, useState } from 'react';
import { Container } from '@/shared/components/Container';
import {
  DashboardHeader,
  ErrorState,
  LoadingState,
  MobileSectionSelect,
  SidebarNav,
  PagesOverview,
  PagesList,
} from '.';
import { AnalyticsDashboard } from '@/modules/analytics/components';
import type {
  DashboardSectionId,
  DashboardNavItem,
} from '../types';
import type { PageDocument } from '@/modules/pages/types';
import { useDashboardData } from '../data/useDashboardData';

interface DashboardLayoutProps {
  initialData?: {
    meta: { updatedAt: string };
    navigation: DashboardNavItem[];
    pages?: PageDocument[];
  };
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  initialData,
}) => {
  const { data, loading, error } = useDashboardData(initialData);
  const navItems = useMemo(
    () => (data?.navigation ?? []) as DashboardNavItem[],
    [data?.navigation]
  );
  const [activeSection, setActiveSection] =
    useState<DashboardSectionId>('overview');

  const activeLabel = useMemo(() => {
    return (
      navItems.find((item) => item.id === activeSection)?.label ?? 'Overview'
    );
  }, [navItems, activeSection]);

  const renderSection = () => {
    if (!data) return null;

    switch (activeSection) {
      case 'analytics':
        // TODO: Show analytics for all pages or selected page
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Analytics</h2>
              <p className="text-slate-600">Select a page to view detailed analytics</p>
            </div>
            {data.pages && data.pages.length > 0 ? (
              <div className="grid gap-4">
                {data.pages.map((page) => (
                  <div key={page.pageId} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">{page.title}</h3>
                    <AnalyticsDashboard pageId={page.pageId} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No pages to show analytics for yet.</p>
            )}
          </div>
        );
      case 'pages':
        return <PagesList pages={data.pages || []} />;
      case 'overview':
      default:
        return <PagesOverview pages={data.pages || []} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <SidebarNav
          items={navItems}
          activeItem={activeSection}
          onSelect={setActiveSection}
        />

        <div className="flex-1">
          <DashboardHeader
            sectionLabel={activeLabel}
            updatedAt={data?.meta.updatedAt ?? 'moments ago'}
          />

          <main className="pb-12 pt-8" aria-live="polite">
            <Container className="space-y-6" data-testid={`section-${activeSection}`}>
              <MobileSectionSelect
                items={navItems}
                active={activeSection}
                onSelect={setActiveSection}
              />

              {error && <ErrorState message={error} />}
              {loading && <LoadingState />}
              {!loading && !error && renderSection()}
            </Container>
          </main>
        </div>
      </div>
    </div>
  );
};
