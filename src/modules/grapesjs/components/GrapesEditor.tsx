'use client';

import { useEffect, useRef, useState } from 'react';
import type { Editor } from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

import {
  fetchGrapesTemplate,
  persistGrapesTemplate,
} from '../data/grapesTemplateService';
import type { GrapesTemplateResponse } from '../types';

type EditorStatus = 'loading' | 'ready' | 'error';

export function GrapesEditor() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const blocksPanelRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Editor | null>(null);
  const [status, setStatus] = useState<EditorStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [templateMeta, setTemplateMeta] =
    useState<Pick<GrapesTemplateResponse, 'projectId' | 'title'> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    const abortController = new AbortController();

    async function bootstrapEditor() {
      setStatus('loading');
      setError(null);

      try {
        const [{ default: grapesjs }, presetModule, template] = await Promise.all(
          [
            import('grapesjs'),
            import('grapesjs-preset-webpage'),
            fetchGrapesTemplate(abortController.signal),
          ],
        );

        if (!mounted || !containerRef.current) {
          return;
        }

        if (!grapesjs.plugins.get('gjs-preset-webpage')) {
          grapesjs.plugins.add('gjs-preset-webpage', presetModule.default);
        }

        editorRef.current?.destroy();

        const editor = grapesjs.init({
          container: containerRef.current,
          height: '100%',
          width: 'auto',
          fromElement: false,
          storageManager: false,
          blockManager: {
            appendTo: blocksPanelRef.current ?? undefined,
          },
          deviceManager: {
            devices: [
              { name: 'Desktop', width: '' },
              { name: 'Tablet', width: '768px' },
              { name: 'Mobile', width: '375px' },
            ],
          },
          selectorManager: {
            componentFirst: true,
          },
          plugins: ['gjs-preset-webpage'],
          pluginsOpts: {
            'gjs-preset-webpage': {
              modalTitle: 'Starter blocks',
            },
          },
        });

        editorRef.current = editor;
        setTemplateMeta({ projectId: template.projectId, title: template.title });

        if (template.assets?.length) {
          editor.AssetManager.add(
            template.assets.map((asset) => ({
              id: asset.id,
              src: asset.src,
              name: asset.name ?? asset.id,
              type: asset.type ?? 'image',
            })),
          );
        }

        editor.BlockManager.clear();
        template.blocks.forEach((block) => {
          editor.BlockManager.add(block.id, {
            label: block.label,
            category: block.category,
            media: block.media,
            attributes: block.attributes,
            content: block.content,
          });
        });

        editor.setComponents(template.components);
        editor.setStyle(template.styles);

        setStatus('ready');
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Failed to load GrapesJS');
        setStatus('error');
      }
    }

    bootstrapEditor();

    return () => {
      mounted = false;
      abortController.abort();
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, []);

  const handleSave = async () => {
    if (!editorRef.current || !templateMeta) {
      return;
    }

    const editor = editorRef.current;
    setIsSaving(true);

    try {
      await persistGrapesTemplate({
        projectId: templateMeta.projectId,
        components: editor.getHtml(),
        styles: editor.getCss(),
        updatedAt: new Date().toISOString(),
      });
      setLastSavedAt(new Date().toLocaleTimeString());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to persist builder output',
      );
      setStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="flex h-full flex-col bg-slate-950 text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            GrapesJS module
          </p>
          <h1 className="text-lg font-semibold text-white">
            {templateMeta?.title ?? 'Loading template...'}
          </h1>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-400">
          <span>
            {status === 'loading' && 'Syncing template...'}
            {status === 'ready' && lastSavedAt && `Last saved at ${lastSavedAt}`}
            {status === 'ready' && !lastSavedAt && 'Not saved yet'}
            {status === 'error' && error}
          </span>
          <button
            type="button"
            onClick={handleSave}
            disabled={status !== 'ready' || isSaving}
            className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-white/20"
          >
            {isSaving ? 'Saving…' : 'Save draft'}
          </button>
        </div>
      </header>

      {error && (
        <div className="border-b border-rose-500/30 bg-rose-500/10 px-6 py-3 text-sm text-rose-200">
          {error}
        </div>
      )}

      <div className="flex flex-1 min-h-0">
        <aside
          ref={blocksPanelRef}
          className="w-64 border-r border-white/10 bg-slate-900/60 text-slate-200"
        >
          <div className="border-b border-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Blocks
          </div>
        </aside>

        <div className="flex-1 bg-slate-900/70">
          <div
            ref={containerRef}
            className="grapes-container h-[calc(100vh-8.5rem)] min-h-full"
          />
        </div>
      </div>
    </section>
  );
}

