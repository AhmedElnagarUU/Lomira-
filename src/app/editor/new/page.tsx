'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { EditorLayout } from '@/modules/editor/components';
import { useEditorStore } from '@/modules/editor/store/editorStore';
import { getUserId, getUserName } from '@/shared/lib/userSession';

export default function NewEditorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateId = searchParams.get('templateId');
  const [creating, setCreating] = useState(false);
  const loadingRef = useRef(false);
  const { templateId: loadedTemplateId, structure, pageId } = useEditorStore();
  const loadTemplate = useEditorStore((state) => state.loadTemplate);

  useEffect(() => {
    const createPageFromTemplate = async () => {
      // Guard: Don't run if no templateId, already creating, already have pageId, or already loading
      if (!templateId || creating || pageId || loadingRef.current) return;
      
      // Guard: Don't reload if template is already loaded and we have structure
      if (loadedTemplateId === templateId && structure) return;

      loadingRef.current = true;

      const createPromise = async () => {
        setCreating(true);
        
        try {
          // Load template into editor first (only if not already loaded)
          if (loadedTemplateId !== templateId || !structure) {
        await loadTemplate(templateId);
          }

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
          
          return 'Page created successfully';
      } finally {
        setCreating(false);
          loadingRef.current = false;
        }
      };

      toast.promise(createPromise(), {
        loading: 'Creating page from template...',
        success: 'Page created successfully!',
        error: (err) => {
          console.error('Error creating page:', err);
          loadingRef.current = false;
          return err instanceof Error ? err.message : 'Failed to create page. Please try again.';
        },
      });
    };

    createPageFromTemplate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId]); // Only depend on templateId - other values are checked inside

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

