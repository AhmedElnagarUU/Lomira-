'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { TemplatePreview } from './TemplatePreview';
import type { TemplateMetadata } from '../types';
import type { TemplateCategory } from '@/shared/types';

interface TemplateGridProps {
  category?: string;
  premium?: boolean;
}

const ALL_CATEGORIES: TemplateCategory[] = ['product', 'real-estate', 'clinic', 'restaurant', 'service', 'general'];

export const TemplateGrid: React.FC<TemplateGridProps> = ({ category, premium }) => {
  const [allTemplates, setAllTemplates] = useState<TemplateMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [showPremiumOnly, setShowPremiumOnly] = useState<boolean | null>(null);
  const [initializing, setInitializing] = useState(false);
  const [initStatus, setInitStatus] = useState<string | null>(null);

  // Fetch all templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/templates');
        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }
        
        const data = await response.json();
        setAllTemplates(data);
        
        // Check if database needs initialization
        if (data.length === 0) {
          const statusResponse = await fetch('/api/templates/init');
          if (statusResponse.ok) {
            const status = await statusResponse.json();
            if (status.needsInitialization) {
              setInitStatus('Database is empty. Click "Initialize Templates" to load templates.');
            }
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // Initialize templates in database
  const handleInitializeTemplates = async () => {
    try {
      setInitializing(true);
      setInitStatus(null);
      const response = await fetch('/api/templates/init', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to initialize templates');
      }
      
      const result = await response.json();
      setInitStatus(result.message || 'Templates initialized successfully!');
      
      // Reload templates
      const templatesResponse = await fetch('/api/templates');
      if (templatesResponse.ok) {
        const data = await templatesResponse.json();
        setAllTemplates(data);
      }
    } catch (err) {
      setInitStatus(err instanceof Error ? err.message : 'Failed to initialize templates');
    } finally {
      setInitializing(false);
    }
  };

  // Apply initial props
  useEffect(() => {
    if (category) {
      setSelectedCategory(category as TemplateCategory);
    }
    if (premium !== undefined) {
      setShowPremiumOnly(premium);
    }
  }, [category, premium]);

  // Filter templates based on search, category, and premium
  const filteredTemplates = useMemo(() => {
    let filtered = [...allTemplates];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((template) => {
        const nameEn = template.name.en.toLowerCase();
        const nameAr = template.name.ar.toLowerCase();
        const tags = template.tags.join(' ').toLowerCase();
        return nameEn.includes(query) || nameAr.includes(query) || tags.includes(query);
      });
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((template) => template.category === selectedCategory);
    }

    // Premium filter
    if (showPremiumOnly !== null) {
      filtered = filtered.filter((template) => template.isPremium === showPremiumOnly);
    }

    return filtered;
  }, [allTemplates, searchQuery, selectedCategory, showPremiumOnly]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Loading templates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="text-center">
          <p className="text-red-500 font-medium mb-2">Error: {error}</p>
          <p className="text-sm text-gray-500">
            Templates are being loaded from code as fallback. You can still use them, but consider initializing the database.
          </p>
        </div>
        <button
          onClick={handleInitializeTemplates}
          disabled={initializing}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {initializing ? 'Initializing...' : 'Initialize Templates in Database'}
        </button>
        {initStatus && (
          <p className={`text-sm ${initStatus.includes('success') ? 'text-green-600' : 'text-gray-600'}`}>
            {initStatus}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search templates by name or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as TemplateCategory | 'all')}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              {ALL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Premium Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Premium:</label>
            <select
              value={showPremiumOnly === null ? 'all' : showPremiumOnly ? 'premium' : 'free'}
              onChange={(e) => {
                const value = e.target.value;
                setShowPremiumOnly(value === 'all' ? null : value === 'premium');
              }}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Filter by premium status"
            >
              <option value="all">All Templates</option>
              <option value="premium">Premium Only</option>
              <option value="free">Free Only</option>
            </select>
          </div>

          {/* Clear Filters */}
          {(searchQuery || selectedCategory !== 'all' || showPremiumOnly !== null) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setShowPremiumOnly(null);
              }}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600">
          {filteredTemplates.length === allTemplates.length ? (
            <span>Showing all {filteredTemplates.length} templates</span>
          ) : (
            <span>
              Showing {filteredTemplates.length} of {allTemplates.length} templates
            </span>
          )}
        </div>
      </div>

      {/* Initialization Status */}
      {initStatus && (
        <div className={`p-4 rounded-lg ${
          initStatus.includes('success') || initStatus.includes('initialized')
            ? 'bg-green-50 border border-green-200'
            : 'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex items-center justify-between">
            <p className={`text-sm ${
              initStatus.includes('success') || initStatus.includes('initialized')
                ? 'text-green-800'
                : 'text-blue-800'
            }`}>
              {initStatus}
            </p>
            {initStatus.includes('empty') && (
              <button
                onClick={handleInitializeTemplates}
                disabled={initializing}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {initializing ? 'Initializing...' : 'Initialize Now'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border border-gray-200 rounded-lg bg-gray-50">
          <svg
            className="w-12 h-12 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-500 font-medium mb-1">No templates found</p>
          <p className="text-sm text-gray-400 mb-4">
            {allTemplates.length === 0
              ? 'No templates available. Try initializing the database.'
              : 'Try adjusting your search or filters'}
          </p>
          {allTemplates.length === 0 && (
            <button
              onClick={handleInitializeTemplates}
              disabled={initializing}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {initializing ? 'Initializing...' : 'Initialize Templates'}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <TemplatePreview key={template.templateId} template={template} />
          ))}
        </div>
      )}
    </div>
  );
};


