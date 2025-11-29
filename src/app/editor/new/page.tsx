'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { EditorLayout } from '@/modules/editor/components';
import { useEditorStore } from '@/modules/editor/store/editorStore';
import { getUserId, getUserName } from '@/shared/lib/userSession';

export default function NewEditorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateId = searchParams.get('templateId');
  const [creating, setCreating] = useState(false);
  const { loadTemplate, structure, pageId } = useEditorStore();

  useEffect(() => {
    const createPageFromTemplate = async () => {
      if (!templateId || creating || pageId) return;

      try {
        setCreating(true);
        
        // Load template into editor first
        await loadTemplate(templateId);

        // Create page in database immediately
        const userId = getUserId();
        const username = getUserName();
        const response = await fetch('/api/pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            templateId,
            userId,
            username,
            title: 'Untitled Page',
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to create page');
        }

        const page = await response.json();
        
        // Set pageId in store and redirect
        useEditorStore.getState().loadPage(page.pageId);
        router.replace(`/editor/${page.pageId}`);
      } catch (error) {
        console.error('Error creating page:', error);
        alert(error instanceof Error ? error.message : 'Failed to create page. Please try again.');
      } finally {
        setCreating(false);
      }
    };

    createPageFromTemplate();
  }, [templateId, creating, pageId, loadTemplate, router]);

  if (creating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg">Creating page...</p>
        </div>
      </div>
    );
  }

  return <EditorLayout templateId={templateId || undefined} />;
}

