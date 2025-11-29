'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/shared/components/Card';
import type { PageDocument } from '@/modules/pages/types';

interface PagesListProps {
  pages: PageDocument[];
}

const statusColor: Record<PageDocument['status'], string> = {
  published: 'bg-emerald-50 text-emerald-700',
  draft: 'bg-amber-50 text-amber-700',
};

export const PagesList: React.FC<PagesListProps> = ({ pages }) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (pageId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    setDeleting(pageId);
    try {
      const response = await fetch(`/api/pages/${pageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete page');
      }

      // Refresh the page list
      router.refresh();
    } catch (error) {
      console.error('Error deleting page:', error);
      alert('Failed to delete page. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  if (pages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No pages yet. Create your first landing page!</p>
        <Link
          href="/templates"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Browse Templates
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">My Pages</h2>
        <p className="text-slate-600">Manage your landing pages</p>
      </div>
      {pages.map((page) => (
        <Card
          key={page.pageId}
          className="flex items-center justify-between hover:shadow-md transition-shadow"
        >
          <div className="flex-1">
            <Link href={`/editor/${page.pageId}`} className="block">
              <p className="text-sm font-semibold text-slate-900 hover:text-blue-600">
                {page.title}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Created {new Date(page.createdAt).toLocaleDateString()} • 
                Updated {new Date(page.updatedAt).toLocaleDateString()}
              </p>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                statusColor[page.status]
              }`}
            >
              {page.status}
            </span>
            {page.status === 'published' && page.publishedUrl && (
              <>
                <button
                  onClick={() => copyLink(`${window.location.origin}${page.publishedUrl}`)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                  title="Copy link"
                >
                  📋
                </button>
                <Link
                  href={page.publishedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View →
                </Link>
              </>
            )}
            <Link
              href={`/editor/${page.pageId}`}
              className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded hover:bg-gray-50"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(page.pageId, page.title)}
              disabled={deleting === page.pageId}
              className="px-3 py-1 text-sm text-red-600 hover:text-red-700 border border-red-300 rounded hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting === page.pageId ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
};

