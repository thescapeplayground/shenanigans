import type { ReactNode } from 'react';
import './CoreTechnologiesSection.css';

interface CoreTechItem {
  id: string;
  name: string;
  badge: string;
  description: string;
  href: string;
  icon: ReactNode;
}

const CORE_TECHNOLOGIES: CoreTechItem[] = [
  {
    id: 'react',
    name: 'React 19',
    badge: 'Core',
    description: 'Concurrent UI, lazy Suspense routing, and interactive views',
    href: 'https://react.dev',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <circle cx="12" cy="12" r="2.1" fill="currentColor" stroke="none" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    badge: 'Strict',
    description: 'Strict static type checking across client app and Vite config',
    href: 'https://www.typescriptlang.org',
    icon: (
      <span className="core-tech-monogram" aria-hidden="true">TS</span>
    ),
  },
  {
    id: 'vite',
    name: 'Vite 8',
    badge: 'Rolldown',
    description: 'ESM dev server, dynamic code-splitting, and vendor chunking',
    href: 'https://vite.dev',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2L4.5 13.5H11.5L10.5 22L19.5 10.5H12.5L13 2Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'paper-shaders',
    name: 'Paper Shaders',
    badge: 'WebGL',
    description: 'Procedural GLSL PaperTexture tactile canvas overlay across routes',
    href: 'https://shaders.paper.design',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </svg>
    ),
  },
  {
    id: 'motion',
    name: 'Motion',
    badge: 'v12.x',
    description: 'Physics-driven interactions, FAQ accordions, and micro-motion',
    href: 'https://motion.dev',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4 17V7l4.8 5L13.6 7v10h-2.8v-5.3L8.8 14l-2-2.3V17H4zm12-10h4v10h-4V7z" />
      </svg>
    ),
  },
  {
    id: 'lenis',
    name: 'Lenis',
    badge: 'v1.3',
    description: 'Smooth momentum-based scrolling calibrated across every route',
    href: 'https://lenis.darkroom.engineering',
    icon: (
      <span className="core-tech-serif" aria-hidden="true">L</span>
    ),
  },
  {
    id: 'marked',
    name: 'Marked',
    badge: 'v18.x',
    description: 'Fast Markdown compiler powering dev logs and technical notes',
    href: 'https://marked.js.org',
    icon: (
      <span className="core-tech-monogram" aria-hidden="true">M↓</span>
    ),
  },
  {
    id: 'serverless-api',
    name: 'Serverless APIs',
    badge: 'Node API',
    description: 'Resend contact delivery and private GitHub media proxy routes',
    href: 'https://github.com/thescapeplayground/shenanigans/tree/v3.0/api',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="6" rx="1.5" />
        <rect x="2" y="14" width="20" height="6" rx="1.5" />
        <circle cx="6.5" cy="7" r="1" fill="currentColor" stroke="none" />
        <circle cx="6.5" cy="17" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'vercel',
    name: 'Vercel',
    badge: 'Edge',
    description: 'Global Edge delivery, AVIF/WebP image optimization, and CI builds',
    href: 'https://vercel.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 4L21 19.5H3L12 4Z" />
      </svg>
    ),
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare Pages',
    badge: 'Wrangler',
    description: 'Wrangler static dist edge deployment and SPA fallback routing',
    href: 'https://pages.cloudflare.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17.5 19H7a4 4 0 0 1-.4-7.98A5.5 5.5 0 0 1 17.3 9.5a3.8 3.8 0 0 1 .2 7.5z" />
      </svg>
    ),
  },
];

export function CoreTechnologiesSection() {
  return (
    <section className="core-tech-section" aria-label="Core Technologies">
      <div className="core-tech-inner">
        <div className="core-tech-header">
          <svg
            className="core-tech-header-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
            <line x1="14" y1="4" x2="10" y2="20" />
          </svg>
          <span>CORE TECHNOLOGIES</span>
        </div>

        <div className="core-tech-grid">
          {CORE_TECHNOLOGIES.map((tech) => (
            <a
              key={tech.id}
              href={tech.href}
              target="_blank"
              rel="noopener noreferrer"
              className="core-tech-card"
            >
              <div className="core-tech-icon-box">{tech.icon}</div>

              <div className="core-tech-body">
                <div className="core-tech-title-row">
                  <span className="core-tech-name">{tech.name}</span>
                  <span className="core-tech-badge">{tech.badge}</span>
                </div>
                <p className="core-tech-desc">{tech.description}</p>
              </div>

              <svg
                className="core-tech-ext-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          ))}
        </div>

        <div className="core-opensource-bar">
          <div className="core-opensource-meta">
            <div className="core-opensource-icon-box" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="6" y1="3" x2="6" y2="15" />
                <circle cx="18" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <path d="M18 9a9 9 0 0 1-9 9" />
              </svg>
            </div>
            <div className="core-opensource-copy">
              <h3 className="core-opensource-title">Open Source &amp; Community Driven</h3>
              <p className="core-opensource-desc">
                Built in the open on GitHub. Inspect, fork, or learn from the source.
              </p>
            </div>
          </div>

          <div className="core-opensource-actions">
            <a
              href="https://github.com/thescapeplayground/shenanigans/tree/v3.0/api"
              target="_blank"
              rel="noopener noreferrer"
              className="core-os-btn secondary"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="6" rx="1.5" />
                <rect x="2" y="14" width="20" height="6" rx="1.5" />
                <circle cx="6.5" cy="7" r="1" fill="currentColor" stroke="none" />
                <circle cx="6.5" cy="17" r="1" fill="currentColor" stroke="none" />
              </svg>
              <span>API Routes</span>
            </a>
            <a
              href="https://github.com/thescapeplayground/shenanigans"
              target="_blank"
              rel="noopener noreferrer"
              className="core-os-btn primary"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
                <line x1="14" y1="4" x2="10" y2="20" />
              </svg>
              <span>View Source</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
