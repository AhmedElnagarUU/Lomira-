'use client';

import React, { useMemo, useState } from 'react';
import { Container } from '@/shared/components/Container';
import {
  AutomationList,
  DashboardHeader,
  EngagementTable,
  ErrorState,
  LoadingState,
  MobileSectionSelect,
  OverviewGrid,
  SidebarNav,
} from '.';
import type {
  DashboardResponse,
  DashboardSectionId,
} from '../types';
import { useDashboardData } from '../data/useDashboardData';

interface DashboardLayoutProps {
  initialData?: DashboardResponse;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  initialData,
}) => {
  const { data, loading, error } = useDashboardData(initialData);
  const navItems = useMemo(
    () => data?.navigation ?? [],
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
      case 'engagement':
        return <EngagementTable channels={data.engagement} />;
      case 'automation':
        return <AutomationList flows={data.automation} />;
      default:
        return <OverviewGrid metrics={data.overview} />;
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
