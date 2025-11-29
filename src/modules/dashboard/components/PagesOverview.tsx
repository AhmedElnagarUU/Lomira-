'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/shared/components/Card';
import type { PageDocument } from '@/modules/pages/types';
import type { AnalyticsSummary } from '@/modules/analytics/types';
import type { TemplateMetadata } from '@/modules/templates/types';
import { getUserId } from '@/shared/lib/userSession';

interface PagesOverviewProps {
  pages: PageDocument[];
  analytics?: AnalyticsSummary;
}

export const PagesOverview: React.FC<PagesOverviewProps> = ({ pages, analytics }) => {
  const router = useRouter();
  const [popularTemplates, setPopularTemplates] = useState<TemplateMetadata[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  const totalPages = pages.length;
  const publishedPages = pages.filter((p) => p.status === 'published').length;
  const draftPages = pages.filter((p) => p.status === 'draft').length;

  // Fetch popular templates (first 3 templates)
  useEffect(() => {
    const fetchPopularTemplates = async () => {
      try {
        setLoadingTemplates(true);
        const response = await fetch('/api/templates');
        if (response.ok) {
          const data = await response.json();
          setPopularTemplates(data.slice(0, 3)); // Show first 3 templates
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoadingTemplates(false);
      }
    };

    fetchPopularTemplates();
  }, []);

  const handleCreateFromTemplate = async (templateId: string) => {
    try {
      const userId = getUserId();
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId,
          userId,
          title: 'Untitled Page',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create page');
      }

      const page = await response.json();
      router.push(`/editor/${page.pageId}`);
    } catch (error) {
      console.error('Error creating page:', error);
      alert('Failed to create page. Please try again.');
    }
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Overview</h2>
          <p className="text-slate-600">Your landing pages at a glance</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowTemplateSelector(!showTemplateSelector)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            + Create from Template
          </button>
          <Link
            href="/templates"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            Browse All
          </Link>
        </div>
      </div>

      {/* Quick Template Selector */}
      {showTemplateSelector && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Quick Start Templates</h3>
            <button
              onClick={() => setShowTemplateSelector(false)}
              className="text-gray-400 hover:text-gray-600"
              title="Close template selector"
              aria-label="Close template selector"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {loadingTemplates ? (
            <p className="text-gray-500 text-center py-4">Loading templates...</p>
          ) : popularTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {popularTemplates.map((template) => (
                <div
                  key={template.templateId}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleCreateFromTemplate(template.templateId)}
                >
                  <div className="relative aspect-video bg-gray-100">
                    <img
                      src={template.thumbnail || '/placeholder-template.jpg'}
                      alt={template.name.en}
                      className="w-full h-full object-cover"
                    />
                    {template.isPremium && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        Premium
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-sm mb-1">{template.name.en}</h4>
                    <p className="text-xs text-gray-500 capitalize">{template.category}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No templates available</p>
          )}
          <div className="mt-4 text-center">
            <Link
              href="/templates"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View all templates →
            </Link>
          </div>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.id} hover>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {metric.label}
            </p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{metric.value}</p>
            <p className="mt-1 text-sm text-slate-600">{metric.delta}</p>
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

