import type { GrapesTemplateResponse } from '../types';

export const mockLandingComponents = `
  <section class="hero">
    <div class="hero__content">
      <span class="chip">Product launch</span>
      <h1>A visual builder your marketing team will love</h1>
      <p>Orchestrate, test, and publish high-converting pages in minutes.</p>
      <div class="hero__cta">
        <a class="btn btn--primary" href="#">Launch editor</a>
        <a class="btn btn--ghost" href="#">View docs</a>
      </div>
    </div>
    <div class="hero__preview"></div>
  </section>

  <section class="feature-grid">
    <article class="feature-card">
      <h3>Reusable blocks</h3>
      <p>Compose sections from your approved library and stay on brand.</p>
    </article>
    <article class="feature-card">
      <h3>Team workflows</h3>
      <p>Review, comment, and version your iterations before publishing.</p>
    </article>
    <article class="feature-card">
      <h3>Multi-channel ready</h3>
      <p>Export responsive code or push directly into your campaign stack.</p>
    </article>
  </section>
`;

export const mockLandingStyles = `
  :root {
    --bg: #050816;
    --card: rgba(255, 255, 255, 0.05);
    --copy: #f3f4ff;
    --muted: #94a3b8;
    --accent: #8b5cf6;
    --border: rgba(255, 255, 255, 0.08);
  }

  body {
    font-family: 'Inter', sans-serif;
    color: var(--copy);
    background-color: var(--bg);
  }

  .hero {
    min-height: 80vh;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2.5rem;
    align-items: center;
    padding: 3.5rem;
  }

  .hero__content {
    max-width: 560px;
  }

  .chip {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    background: rgba(139, 92, 246, 0.15);
    color: var(--accent);
    font-size: 0.875rem;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
  }

  .hero__cta {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }

  .btn {
    padding: 0.85rem 1.75rem;
    border-radius: 999px;
    text-decoration: none;
    text-align: center;
    border: 1px solid transparent;
  }

  .btn--primary {
    background: linear-gradient(120deg, #6366f1, #a855f7);
    color: white;
  }

  .btn--ghost {
    border-color: var(--border);
    color: var(--copy);
  }

  .hero__preview {
    min-height: 420px;
    border-radius: 1.5rem;
    border: 1px solid var(--border);
    background: radial-gradient(circle at top, rgba(99, 102, 241, 0.45), transparent),
      var(--card);
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    padding: 0 3.5rem 3rem;
  }

  .feature-card {
    border: 1px solid var(--border);
    border-radius: 1rem;
    padding: 1.5rem;
    background: var(--card);
    backdrop-filter: blur(16px);
  }
`;

export const mockGrapesTemplate: GrapesTemplateResponse = {
  projectId: 'demo-landing-v1',
  title: 'Campaign landing starter',
  description: 'Mock data returned from the API route used to preload GrapesJS.',
  components: mockLandingComponents,
  styles: mockLandingStyles,
  assets: [
    {
      id: 'glow-bg',
      name: 'Glow gradient',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80',
    },
  ],
  blocks: [
    {
      id: 'hero-block',
      label: 'Hero split',
      category: 'Hero',
      media:
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="8" height="16" rx="1.5"/><rect x="13" y="4" width="8" height="8" rx="1.5"/><rect x="13" y="14" width="8" height="6" rx="1.5"/></svg>',
      attributes: { class: 'gjs-fonts gjs-f-hero' },
      content: `
        <section class="hero">
          <div>
            <span class="chip">New block</span>
            <h1>Composable hero block</h1>
            <p>Use this block to start a new hero layout for product or campaign launches.</p>
            <div class="hero__cta">
              <a class="btn btn--primary" href="#">Primary CTA</a>
              <a class="btn btn--ghost" href="#">Secondary CTA</a>
            </div>
          </div>
          <div class="hero__preview"></div>
        </section>
      `,
    },
    {
      id: 'features-block',
      label: 'Feature columns',
      category: 'Content',
      media:
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="4" rx="1.5"/><rect x="3" y="11" width="18" height="4" rx="1.5"/><rect x="3" y="17" width="18" height="4" rx="1.5"/></svg>',
      attributes: { class: 'gjs-fonts gjs-f-feature' },
      content: `
        <section class="feature-grid">
          <article class="feature-card">
            <h3>Composable sections</h3>
            <p>Mix and match any card style to tell product stories that convert.</p>
          </article>
          <article class="feature-card">
            <h3>Built for scale</h3>
            <p>Promote multiple personas or value props without rebuilding the page.</p>
          </article>
          <article class="feature-card">
            <h3>On-brand styling</h3>
            <p>Soft glassmorphism aesthetic with configurable tokens for your brand.</p>
          </article>
        </section>
      `,
    },
  ],
};

