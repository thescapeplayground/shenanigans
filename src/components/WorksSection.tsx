import { useState, useEffect } from 'react';

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
      photos: [
        'https://raw.githubusercontent.com/isaiahscape/windiffuse/main/assets/ss-3.png',
        'https://raw.githubusercontent.com/isaiahscape/windiffuse/main/assets/ss-1.png',
        'https://raw.githubusercontent.com/isaiahscape/windiffuse/main/assets/ss-2.png',
        'https://raw.githubusercontent.com/isaiahscape/windiffuse/main/assets/banner.png'
      ]
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
    }
  ],
  designs: {},
  logos: [],
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
    'composeui': 'jetpackcompose',
    'jetpackcompose': 'jetpackcompose',
    'kotlin': 'kotlin',
    'typescript': 'typescript',
    'materialdesign3': 'materialdesign',
    'markdown': 'markdown',
    'telegram': 'telegram',
    'python': 'python',
    'figma': 'figma',
    'csharp': 'dotnet',
    'net': 'dotnet',
    'winui3': 'windows11',
    'direct3d11': 'opengl',
    'shell': 'gnubash',
    'magisk': 'magisk',
    'githubactions': 'githubactions'
  };

  const finalSlug = customMapping[slug] || slug;
  return `https://cdn.simpleicons.org/${finalSlug}`;
}

const getProjectMockupData = (proj: Project) => {
  const logo = proj.title.charAt(0).toLowerCase();
  const photo = proj.photos && proj.photos.length > 0 ? proj.photos[0] : '';
  
  return {
    logo,
    mockups: {
      back: {
        title: 'Stack & Info',
        items: proj.tech.map((t, idx) => ({
          name: t,
          gradient: `linear-gradient(135deg, ${idx % 2 === 0 ? '#1f4068' : '#F1A5A0'}, ${idx % 2 === 0 ? '#162447' : '#4e1a3d'})`
        })).slice(0, 3)
      },
      middle: {
        gradient: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)'
      },
      front: {
        title: proj.title,
        photo: photo,
        walls: [
          'linear-gradient(to bottom, #30cfd0 0%, #330867 100%)',
          'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)'
        ]
      }
    }
  };
};

export function WorksSection() {
  const [projects, setProjects] = useState<Project[]>(LOCAL_DEFAULT_MANIFEST.projects);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [failedIcons, setFailedIcons] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch('/manifest.json')
      .then((res) => {
        if (!res.ok) throw new Error('Manifest not found');
        return res.json();
      })
      .then((data) => {
        if (data && data.projects) {
          setProjects(data.projects);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch manifest.json, using fallback data:', err);
        setProjects(LOCAL_DEFAULT_MANIFEST.projects);
      });
  }, []);

  const handleNext = () => {
    setActiveProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (projects.length === 0) return null;

  const project = projects[activeProjectIndex];
  const mockupData = getProjectMockupData(project);

  return (
    <section className="works-section" id="projects">
      <h2 className="works-section-title reveal-on-scroll reveal-left delay-1">stuff i have worked on</h2>

      <div className="works-container reveal-on-scroll delay-2">
        {/* Left Panel: Project Info */}
        <div className="project-info-panel">
          <div className="project-top-row">
            <span className="project-index">
              {String(activeProjectIndex + 1).padStart(2, '0')} of {String(projects.length).padStart(2, '0')}
            </span>
          </div>

          <div className="project-title-row">
            <h3 className="project-name">{project.title}</h3>
            <span className="project-logo-badge">{mockupData.logo}</span>
          </div>

          <p className="project-desc">{project.description}</p>

          <div className="project-tech-section">
            <p className="tech-title">Made with:</p>
            <div className="tech-icons-row">
              {project.tech
                .filter((techName) => !failedIcons[techName])
                .map((techName) => (
                  <div className="tech-icon-wrapper" key={techName} title={techName}>
                    <img 
                      src={getTechIconUrl(techName)} 
                      alt={techName} 
                      className="tech-icon-img" 
                      onError={() => setFailedIcons(prev => ({ ...prev, [techName]: true }))}
                      style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="project-actions-row">
            <div className="action-buttons">
              {project.visitUrl || project.githubUrl ? (
                <>
                  {project.visitUrl && (
                    <a href={project.visitUrl} target="_blank" rel="noopener noreferrer" className="btn-visit">
                      VISIT SITE <span className="arrow">↗</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-github">
                      GITHUB REPO <span className="arrow">↗</span>
                    </a>
                  )}
                </>
              ) : (
                <span className={`project-status-tag ${project.status.toLowerCase()}`}>
                  {project.status}
                </span>
              )}
            </div>

            <div className="pagination-buttons">
              <button onClick={handlePrev} className="pag-btn" aria-label="Previous project">
                &lt;
              </button>
              <button onClick={handleNext} className="pag-btn" aria-label="Next project">
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Interactive 3D Stack Mockup */}
        <div className="project-preview-panel">
          <div className="mockup-stack">
            <div className="mockup-card card-back">
              <div className="mockup-header-bar">
                <span className="mockup-dot"></span>
                <span className="mockup-dot"></span>
                <span className="mockup-dot"></span>
              </div>
              <div className="mockup-body">
                <h6 className="mockup-card-title">{mockupData.mockups.back.title}</h6>
                <div className="mockup-categories">
                  {mockupData.mockups.back.items.map((item: { name: string; gradient: string }, idx: number) => (
                    <div className="category-item" key={idx}>
                      <span className="cat-gradient" style={{ background: item.gradient }}></span>
                      <span className="cat-name">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mockup-card card-middle">
              <div className="mockup-header-bar">
                <span className="mockup-dot"></span>
                <span className="mockup-dot"></span>
                <span className="mockup-dot"></span>
              </div>
              <div className="mockup-body mockup-body-full" style={{ background: mockupData.mockups.middle.gradient }}>
                <div className="mockup-abstract-design"></div>
              </div>
            </div>

            <div 
              className="mockup-card card-front"
              style={mockupData.mockups.front.photo ? { overflow: 'hidden' } : undefined}
            >
              <div className="mockup-header-bar">
                <span className="mockup-dot"></span>
                <span className="mockup-dot"></span>
                <span className="mockup-dot"></span>
              </div>
              <div 
                className="mockup-body"
                style={mockupData.mockups.front.photo ? { 
                  backgroundImage: `url(${mockupData.mockups.front.photo})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center',
                  height: 'calc(100% - 24px)',
                  padding: 0
                } : undefined}
              >
                {!mockupData.mockups.front.photo && <h6 className="mockup-logo-text">{mockupData.mockups.front.title}</h6>}
                {!mockupData.mockups.front.photo && (
                  <div className="mockup-wallpapers-grid">
                    {mockupData.mockups.front.walls.map((wallBg: string, idx: number) => (
                      <div className="mockup-wall-thumb" key={idx} style={{ background: wallBg }}></div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="works-divider"></div>

      <div className="design-redirect-banner reveal-on-scroll delay-1">
        <div className="design-redirect-info">
          <span className="design-redirect-tag">// CREATIVE WORK</span>
          <h3 className="design-redirect-title">Looking for my design & photography?</h3>
          <p className="design-redirect-desc">
            Explore my projects, brand marks, visual experiments, and street photography work under The Scape Network.
          </p>
        </div>
        <div className="design-redirect-actions">
          <a href="/projects/photography" className="design-redirect-btn btn-photography">
            Photography <span className="arrow">↗</span>
          </a>
          <a href="/projects/graphic-design" className="design-redirect-btn btn-design">
            Graphic Design <span className="arrow">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
