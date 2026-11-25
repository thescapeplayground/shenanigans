import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LazyImage } from './LazyImage';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  visitUrl: string;
  githubUrl: string;
  status: string;
  photos: string[];
}

interface Logo {
  id: string;
  title: string;
  tag: string;
  desc: string;
  imagePath: string;
}

interface GalleryImage {
  path: string;
  aspect: number;
}

interface Manifest {
  projects: Project[];
  designs: Record<string, (string | GalleryImage)[]>;
  logos: Logo[];
  photography: (string | GalleryImage)[];
}

const LOCAL_DEFAULT_MANIFEST: Manifest = {
  projects: [
    {
      id: '00-windiffuse',
      title: 'Diffuse for Windows',
      category: 'Windows App',
      description: 'A native Windows 11 port of Diffuse Music Live Wallpaper featuring a WinUI 3 floating tray flyout, Direct3D 11 + DirectComposition fluid shaders, SMTC Now Playing sync, and WASAPI Live Beats.',
      tech: ['C#', '.NET', 'WinUI 3', 'Direct3D 11'],
      visitUrl: 'https://github.com/isaiahscape/windiffuse/releases',
      githubUrl: 'https://github.com/isaiahscape/windiffuse',
      status: 'Active',
      photos: ['/projects/00-windiffuse/preview.svg']
    },
    {
      id: '01-material-explorer',
      title: 'Material Explorer',
      category: 'Android App',
      description: 'An Android APK explorer and file manager built with Material Design 3 principles for intuitive navigation, APK inspection, and dynamic theming.',
      tech: ['Android', 'Kotlin', 'Material Design 3'],
      visitUrl: 'https://github.com/isaiahscape/materialexp/releases',
      githubUrl: 'https://github.com/isaiahscape/materialexp',
      status: 'Active',
      photos: ['/projects/01-material-explorer/preview.svg']
    },
    {
      id: '02-bedrock',
      title: 'Bedrock',
      category: 'Android App',
      description: 'A minimalist monochrome notes editor for Android with Markdown live preview, interactive checklists, SHA-256 local encryption, and offline sync.',
      tech: ['Kotlin', 'Jetpack Compose', 'Android', 'Markdown'],
      visitUrl: 'https://foss.isaiahthings.me',
      githubUrl: 'https://github.com/isaiahscape/bedrock',
      status: 'Active',
      photos: ['/projects/02-bedrock/preview.svg']
    },
    {
      id: '03-snapweb',
      title: 'Snapseed for Web',
      category: 'Web App',
      description: 'A zero-server client-side photo processing web app inspired by Snapseed, featuring tactile gesture tuning, histograms, and RAW-like filters.',
      tech: ['TypeScript', 'Tailwind CSS', 'HTML5'],
      visitUrl: 'https://snapweb.isaiahthings.me/',
      githubUrl: 'https://github.com/isaiahscape/snapweb-remixed',
      status: 'Active',
      photos: ['/projects/03-snapweb/preview.svg']
    },
    {
      id: '04-mikrotik-manager',
      title: 'Mikrotik Manager',
      category: 'Network Utility',
      description: 'An automated helper utility designed to manage DHCP & IP allocations, prevent IP conflicts, and query active subnets on Mikrotik routers.',
      tech: ['TypeScript', 'Node.js'],
      visitUrl: '',
      githubUrl: 'https://github.com/isaiahscape/mikrotik-ipoemgr',
      status: 'Completed',
      photos: ['/projects/04-mikrotik-manager/preview.svg']
    },
    {
      id: '05-the-scape-network',
      title: 'The Scape Network',
      category: 'Community',
      description: 'A digital social update log, creative archive channel, and interactive developer/design hub built around Telegram under the Scape Sandbox banner.',
      tech: ['Telegram', 'Figma'],
      visitUrl: 'https://telegram.me/thescapenetwork',
      githubUrl: '',
      status: 'Active',
      photos: ['/projects/05-the-scape-network/preview.svg']
    },
    {
      id: '06-kairo-bot',
      title: "Kairo's Old Bot",
      category: 'Automation',
      description: 'A legacy open-source modular Telegram utility bot built for fast channel administrative workflows, automated triggers, and group utilities.',
      tech: ['Python', 'Telegram'],
      visitUrl: '',
      githubUrl: 'https://github.com/isaiahscape/KairoKangedBot',
      status: 'Archived',
      photos: ['/projects/06-kairo-bot/preview.svg']
    },
    {
      id: '07-nectarlink-services',
      title: 'Nectarlink Services',
      category: 'Android System',
      description: 'A privileged Android priv-app AIDL Binder service for custom ROMs providing screen mirroring, input injection, virtual displays, device/call audio streaming, and clipboard sync for NectarLink without ADB or root.',
      tech: ['Android', 'Kotlin', 'AIDL', 'AOSP'],
      visitUrl: '',
      githubUrl: 'https://github.com/isaiahscape/nectarlink-services',
      status: 'Active',
      photos: ['/projects/07-nectarlink-services/preview.svg']
    },
    {
      id: '08-nectarlink-module',
      title: 'Nectarlink Module',
      category: 'Root Module',
      description: 'A systemless root module for Magisk, KernelSU, and APatch/FolkPatch that deploys Nectarlink Services as a privileged system_ext app with SELinux UHID rules and automated CI release bundling.',
      tech: ['Android', 'Shell', 'Magisk', 'GitHub Actions'],
      visitUrl: 'https://github.com/isaiahscape/nectarlink-module/releases',
      githubUrl: 'https://github.com/isaiahscape/nectarlink-module',
      status: 'Active',
      photos: ['/projects/08-nectarlink-module/preview.svg']
    }
  ],
  designs: {},
  logos: [
    {
      id: 'shenanigans',
      title: 'Shenanigans',
      tag: '// PERSONAL MONOGRAM',
      desc: "Primary geometric glyph for Shenanigans / Leonardo's Terrace, built with adaptive light and dark contrast.",
      imagePath: '/logos/shenanigans/logo.svg'
    },
    {
      id: 'the-scape-network',
      title: 'The Scape Network',
      tag: '// COLLECTIVE EMBLEM',
      desc: 'Minimalist aperture and frame mark for The Scape Network — photography, visual design, and creative tech.',
      imagePath: '/logos/the-scape-network/logo.svg'
    },
    {
      id: 'snapweb',
      title: 'Snapweb',
      tag: '// PHOTO EDITOR',
      desc: 'Tactile curve and shutter emblem for Snapseed for Web, a zero-server browser photo processing tool.',
      imagePath: '/logos/snapweb/logo.svg'
    },
    {
      id: 'bedrock',
      title: 'Bedrock',
      tag: '// ANDROID APP',
      desc: 'Monochrome stone-cut block mark for Bedrock, a distraction-free encrypted Markdown notes app.',
      imagePath: '/logos/bedrock/logo.svg'
    }
  ],
  photography: []
};

function getTechIconUrl(tech: string): string {
  const slug = tech
    .toLowerCase()
    .trim()
    .replace(/\.js$/, 'js')
    .replace(/\+/g, 'plus')
    .replace(/#/g, 'sharp')
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  
  const customMapping: Record<string, string> = {
    'css': 'css3',
    'css3': 'css3',
    'html': 'html5',
    'html5': 'html5',
    'cpp': 'cplusplus',
    'cplusplus': 'cplusplus',
    'c': 'c',
    'motion': 'framer',
    'framermotion': 'framer',
    'framer': 'framer',
    'designplatform': 'figma',
    'nextjs': 'nextdotjs',
    'node': 'nodedotjs',
    'nodejs': 'nodedotjs',
    'threejs': 'threedotjs',
    'vue': 'vuedotjs',
    'nuxt': 'nuxtdotjs',
    'tailwind': 'tailwindcss',
    'tailwindcss': 'tailwindcss',
    'radix': 'radixui',
    'radixui': 'radixui',
    'linux': 'linux',
    'android': 'android',
    'java': 'openjdk',
    'kotlin': 'kotlin',
    'jetpackcompose': 'jetpackcompose',
    'materialdesign3': 'materialdesign',
    'markdown': 'markdown',
    'telegram': 'telegram',
    'python': 'python',
    'figma': 'figma',
    'typescript': 'typescript',
    'csharp': 'dotnet',
    'net': 'dotnet',
    'winui3': 'windows11',
    'direct3d11': 'opengl',
    'shell': 'gnubash',
    'magisk': 'magisk',
    'githubactions': 'githubactions',
  };

  const finalSlug = customMapping[slug] || slug;
  return `https://cdn.simpleicons.org/${finalSlug}`;
}

function InlineSVG({ url, className }: { url: string; className?: string }) {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    if (!url.endsWith('.svg')) {
      return;
    }

    let active = true;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load SVG');
        return res.text();
      })
      .then((text) => {
        if (!active) return;
        const svgMatch = text.match(/<svg[\s\S]*<\/svg>/i);
        if (svgMatch) {
          const cleanSvg = svgMatch[0]
            .replace(/width="[^"]*"/gi, '')
            .replace(/height="[^"]*"/gi, '');
          setSvgContent(cleanSvg);
        } else {
          setSvgContent(text);
        }
      })
      .catch((err) => {
        console.error('Error loading inline SVG:', err);
        if (active) setSvgContent(null);
      });

    return () => {
      active = false;
    };
  }, [url]);

  if (!url.endsWith('.svg')) {
    return <img src={url} alt="" className={className} loading="lazy" decoding="async" />;
  }

  if (!svgContent) {
    return <div className={`${className} logo-svg-skeleton`} />;
  }

  return (
    <div 
      className={className} 
      dangerouslySetInnerHTML={{ __html: svgContent }} 
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    />
  );
}

interface ProjectsPageProps {
  initialScrollTarget?: string;
  clearScrollTarget?: () => void;
}

export function ProjectsPage({ initialScrollTarget, clearScrollTarget }: ProjectsPageProps) {
  const [manifest, setManifest] = useState<Manifest>(LOCAL_DEFAULT_MANIFEST);
  const [filter, setFilter] = useState<string>('All');
  const [expandedPhoto, setExpandedPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (initialScrollTarget) {
      const scroll = () => {
        const el = document.getElementById(initialScrollTarget);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (clearScrollTarget) {
            clearScrollTarget();
          }
          return true;
        }
        return false;
      };

      if (!scroll()) {
        const timer = setTimeout(() => {
          scroll();
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [initialScrollTarget, manifest, clearScrollTarget]);

  useEffect(() => {
    fetch('/manifest.json')
      .then((res) => {
        if (!res.ok) throw new Error('Manifest not found');
        return res.json();
      })
      .then((data) => {
        setManifest(data);
      })
      .catch((err) => {
        console.warn('Could not fetch manifest.json, using fallback data:', err);
        setManifest(LOCAL_DEFAULT_MANIFEST);
      });
  }, []);

  const categories = ['All', ...new Set(manifest.projects.map(p => p.category))];

  const filteredProjects = filter === 'All' 
    ? manifest.projects 
    : manifest.projects.filter(p => p.category === filter);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const hasDesigns = manifest.designs && Object.keys(manifest.designs).length > 0;
  const hasPhotography = manifest.photography && manifest.photography.length > 0;

  return (
    <div className="page-view-container fade-in">
      <header className="page-header">
        <h1 className="page-title">creations.</h1>
        <p className="page-description-sub">
          A catalog of software builds, brand identities, visual design, and photography.
        </p>

        {/* Section Navigation Header */}
        <nav className="projects-section-nav">
          <button onClick={() => scrollToSection('dev-projects')} className="nav-anchor-btn">
            <span className="nav-anchor-dot"></span>DEV PROJECTS
          </button>
          <button onClick={() => scrollToSection('logo-design')} className="nav-anchor-btn">
            <span className="nav-anchor-dot"></span>LOGOS
          </button>
          <button onClick={() => scrollToSection('graphic-design')} className="nav-anchor-btn">
            <span className="nav-anchor-dot"></span>DESIGNS
          </button>
          <button onClick={() => scrollToSection('photography')} className="nav-anchor-btn">
            <span className="nav-anchor-dot"></span>PHOTOGRAPHY
          </button>
        </nav>
      </header>

      {/* SECTION 1: DEV PROJECTS */}
      <section className="projects-sub-section" id="dev-projects">
        <div className="section-meta-header">
          <h2 className="section-section-title">development projects</h2>
        </div>

        {/* Filter Tabs */}
        <div className="projects-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-list-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} id={project.id} className={`project-detail-card ${initialScrollTarget === project.id ? 'highlight-pulse' : ''}`} style={{ overflow: 'hidden' }}>
              {project.photos && project.photos.length > 0 && (
                <div 
                  className="project-card-banner-frame" 
                  onClick={() => setExpandedPhoto(project.photos[0])}
                  style={{ 
                    width: '100%', 
                    height: '180px', 
                    overflow: 'hidden', 
                    borderRadius: '18px', 
                    marginBottom: '8px',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <LazyImage 
                    src={project.photos[0]} 
                    alt={project.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
              )}

              <div className="project-card-header">
                <span className="project-category-tag">{project.category}</span>
                <span className={`project-status-dot ${project.status.toLowerCase()}`}>
                  {project.status}
                </span>
              </div>

              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-description">{project.description}</p>

              {project.photos && project.photos.length > 1 && (
                <div 
                  className="project-mini-gallery" 
                  style={{ 
                    display: 'flex', 
                    gap: '8px', 
                    marginBottom: '8px', 
                    overflowX: 'auto', 
                    paddingBottom: '6px'
                  }}
                >
                  {project.photos.slice(1).map((photo, pIdx) => (
                    <LazyImage 
                      key={pIdx} 
                      src={photo} 
                      alt="" 
                      onClick={() => setExpandedPhoto(photo)}
                      style={{ 
                        width: '60px', 
                        height: '45px', 
                        objectFit: 'cover', 
                        borderRadius: '8px', 
                        border: '1px solid var(--border-color)', 
                        flexShrink: 0 
                      }} 
                    />
                  ))}
                </div>
              )}

              <div className="project-tech-tags">
                {project.tech.map((t, idx) => (
                  <span key={idx} className="tech-tag" style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <img 
                      src={getTechIconUrl(t)} 
                      alt="" 
                      className="tech-icon-img" 
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      style={{ width: '14px', height: '14px', marginRight: '6px', verticalAlign: 'middle' }}
                    />
                    {t}
                  </span>
                ))}
              </div>

              <div className="project-card-links">
                {project.visitUrl && (
                  <a href={project.visitUrl} target="_blank" rel="noopener noreferrer" className="proj-link visit-btn">
                    Visit Project ↗
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="proj-link github-btn">
                    Source Code ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: LOGOS */}
      <section className="projects-sub-section" id="logo-design">
        <div className="section-meta-header">
          <h2 className="section-section-title">logo & branding marks</h2>
        </div>
        <p className="section-intro-text">
          A collection of geometric logotypes and branding marks built for personal and collective projects.
        </p>

        <div className="logo-designs-grid">
          {manifest.logos.map((logo) => (
            <div key={logo.id} className="logo-design-card">
              <div className="logo-visual-box">
                <InlineSVG url={logo.imagePath} className="logo-svg-mark" />
                <div className="blueprint-grid-overlay"></div>
              </div>
              <div className="logo-info">
                <h4 className="logo-title">{logo.title}</h4>
                <p className="logo-desc">{logo.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: DESIGNS */}
      <section className="projects-sub-section" id="graphic-design">
        <div className="section-meta-header">
          <h2 className="section-section-title">designs & poster art</h2>
        </div>
        <p className="section-intro-text">
          Minimalist layouts, event graphics, banners, and visual experiments.
        </p>

        {hasDesigns ? (
          <div className="designs-subsections-container" style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginTop: '32px' }}>
            {Object.keys(manifest.designs).map((folderName) => (
              <div key={folderName} className="graphic-subsection">
                <div className="subsection-header">
                  <h3 className="subsection-title">{folderName.replace(/-/g, ' ')}</h3>
                  <span className="subsection-line"></span>
                </div>

                <div className="masonry-grid">
                  {manifest.designs[folderName]?.map((imgItem, idx) => {
                    const isObj = typeof imgItem === 'object' && imgItem !== null;
                    const imagePath = isObj ? (imgItem as GalleryImage).path : (imgItem as string);
                    const aspect = isObj ? (imgItem as GalleryImage).aspect : undefined;
                    const fileName = imagePath.split('/').pop()?.split('.')[0]?.replace(/_/g, ' ') || 'Design';
                    return (
                      <div 
                        key={idx} 
                        className="photo-card-wrapper masonry-item" 
                        onClick={() => setExpandedPhoto(imagePath)}
                        style={aspect ? { aspectRatio: String(aspect) } : undefined}
                      >
                        <div 
                          className="photo-frame masonry-frame"
                          style={aspect ? { aspectRatio: String(aspect) } : undefined}
                        >
                          <LazyImage src={imagePath} alt={fileName} className="gallery-photo" native />
                          <div className="photo-overlay"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rom-info-card" style={{ marginTop: '24px' }}>
            <p className="body-para" style={{ fontSize: '14px', marginBottom: '12px' }}>
              Graphic design sets and commissioned visuals are curated on Instagram and The Scape Network. Drop image folders into <code>public/designs/</code> to render them here automatically.
            </p>
            <div className="support-actions">
              <a href="https://instagram.com/isaiahscape" target="_blank" rel="noopener noreferrer" className="support-action-btn">
                @isaiahscape on Instagram ↗
              </a>
              <a href="https://telegram.me/thescapenetwork" target="_blank" rel="noopener noreferrer" className="support-action-btn">
                The Scape Network ↗
              </a>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 4: PHOTOGRAPHY */}
      <section className="projects-sub-section" id="photography">
        <div className="section-meta-header">
          <h2 className="section-section-title">photography</h2>
        </div>
        <p className="section-intro-text">
          Street captures, urban perspectives, portraits, and light studies shot on Canon EOS 700D.
        </p>

        {hasPhotography ? (
          <div className="masonry-grid">
            {manifest.photography.map((imgItem, idx) => {
              const isObj = typeof imgItem === 'object' && imgItem !== null;
              const imagePath = isObj ? (imgItem as GalleryImage).path : (imgItem as string);
              const aspect = isObj ? (imgItem as GalleryImage).aspect : undefined;
              const fileName = imagePath.split('/').pop()?.split('.')[0]?.replace(/_/g, ' ') || 'Photo';
              return (
                <div 
                  key={idx} 
                  className="photo-card-wrapper masonry-item" 
                  onClick={() => setExpandedPhoto(imagePath)}
                  style={aspect ? { aspectRatio: String(aspect) } : undefined}
                >
                  <div 
                    className="photo-frame masonry-frame"
                    style={aspect ? { aspectRatio: String(aspect) } : undefined}
                  >
                    <LazyImage src={imagePath} alt={fileName} className="gallery-photo" native />
                    <div className="photo-overlay"></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rom-info-card" style={{ marginTop: '24px' }}>
            <p className="body-para" style={{ fontSize: '14px', marginBottom: '12px' }}>
              Photography archives are stored in the private gallery repo and shared on Instagram (@isaiahscape). Add photos to <code>public/photography/</code> and run <code>npm run build</code> to display them in this masonry grid.
            </p>
            <div className="support-actions">
              <a href="https://instagram.com/isaiahscape" target="_blank" rel="noopener noreferrer" className="support-action-btn">
                View Photography on Instagram ↗
              </a>
            </div>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {expandedPhoto && createPortal(
        <div 
          className="photo-lightbox-overlay" 
          onClick={() => setExpandedPhoto(null)}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={expandedPhoto} alt="" className="lightbox-img" />
            <button className="lightbox-close-btn" onClick={() => setExpandedPhoto(null)}>×</button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
