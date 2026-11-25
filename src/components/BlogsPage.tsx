import { useState, useEffect } from 'react';
import { marked } from 'marked';

// Markdown Blog Content Imports
import remakingSnapseedContent from '../content/blogs/remaking-snapseed-on-web.md?raw';
import recreatingShenanigansContent from '../content/blogs/recreating-shenanigans.md?raw';
import helloWorldContent from '../content/blogs/hello-world.md?raw';

type Post = {
  id: string;
  category: string;
  title: string;
  date: string;
  readTime?: string;
  excerpt: string;
  content: string;
  resources?: {
    title: string;
    links: { label: string; href: string }[];
  }[];
};

const BLOG_POSTS: Post[] = [
  {
    id: 'remaking-snapseed-on-web',
    category: 'Dev & Photography',
    title: 'Remaking Snapseed on the Web from Scratch',
    date: 'Aug 29, 2026',
    readTime: '6 min read',
    excerpt: "How I rebuilt Google's iconic Snapseed photo editing experience for the browser using client-side HTML5 Canvas, WebGL, custom adjustment pipelines, and zero server dependencies.",
    content: remakingSnapseedContent,
    resources: [
      {
        title: 'SnapWeb Links',
        links: [
          { label: 'Live Web App (snapweb.isaiahthings.me)', href: 'https://snapweb.isaiahthings.me/' },
          { label: 'GitHub: isaiahscape/snapweb-remixed', href: 'https://github.com/isaiahscape/snapweb-remixed' }
        ]
      }
    ]
  },
  {
    id: 'recreating-shenanigans',
    category: 'Design & Architecture',
    title: 'Recreating Shenanigans',
    date: 'Aug 29, 2026',
    readTime: '5 min read',
    excerpt: 'A complete walkthrough of tearing down the old site architecture, reconsidering the visual palette, and rebuilding with modern components, tactile aesthetics, and curated features.',
    content: recreatingShenanigansContent,
    resources: [
      {
        title: 'Site & Collective',
        links: [
          { label: 'GitHub: thescapeplayground/shenanigans', href: 'https://github.com/thescapeplayground/shenanigans' },
          { label: 'The Scape Network on Telegram', href: 'https://telegram.me/thescapenetwork' }
        ]
      }
    ]
  },
  {
    id: 'hello-world',
    category: 'Personal',
    title: 'Hello World',
    date: 'Jun 26, 2026',
    readTime: '2 min read',
    excerpt: 'A new beginning — welcome to the blog: dev logs, photography notes, and random thoughts.',
    content: helloWorldContent
  }
];

function renderMarkdown(raw: string): string {
  if (!raw) return '';
  const lines = raw.split('\n');
  let minIndent = Infinity;
  for (const line of lines) {
    if (line.trim().length > 0) {
      const match = line.match(/^(\s*)/);
      const indent = match ? match[1].length : 0;
      if (indent < minIndent) minIndent = indent;
    }
  }
  const cleanContent = minIndent !== Infinity && minIndent > 0
    ? lines.map(line => (line.length >= minIndent ? line.slice(minIndent) : line.trimStart())).join('\n').trim()
    : raw.trim();

  return marked.parse(cleanContent, { async: false, breaks: true, gfm: true }) as string;
}

function ShareButton({ postId, label = "COPY LINK" }: { postId: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/blogs/${postId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      className={`blog-share-btn ${copied ? 'copied' : ''}`}
      onClick={handleShare}
      title="Copy link to this blog post"
    >
      {copied ? (
        <>
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>COPIED!</span>
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

function getPostIdFromLocation(): string | null {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  const hash = window.location.hash.replace(/^#\/?/, '');
  const route = path || hash;
  if (route.startsWith('blogs/')) {
    return route.replace(/^blogs\//, '') || null;
  }
  if (route.startsWith('blog/')) {
    return route.replace(/^blog\//, '') || null;
  }
  return null;
}

export function BlogsPage() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(() => getPostIdFromLocation());

  useEffect(() => {
    const handlePopState = () => {
      setSelectedPostId(getPostIdFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectPost = (postId: string) => {
    setSelectedPostId(postId);
    window.history.pushState(null, '', `/blogs/${postId}`);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleBack = () => {
    setSelectedPostId(null);
    window.history.pushState(null, '', '/blogs');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  if (selectedPostId) {
    const article = BLOG_POSTS.find(p => p.id === selectedPostId);
    return (
      <div className="page-view-container fade-in">
        <div className="blog-top-bar">
          <button className="back-btn" onClick={handleBack}>
            ← BACK TO LOGS
          </button>
          {article && <ShareButton postId={article.id} label="SHARE ARTICLE" />}
        </div>

        <article className="blog-article">
          <header className="page-header" style={{ marginBottom: '24px' }}>
            <span className="page-label">
              {article?.category} • {article?.date} {article?.readTime ? `• ${article.readTime}` : ''}
            </span>
            <h1 className="page-title">
              {article?.title || 'Post not found'}
            </h1>
          </header>

          {article?.content && (
            <div className="article-body">
              <div
                className="blog-markdown-content"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
              />

              {article.resources && (
                <div style={{ marginTop: '32px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <h3 className="body-heading" style={{ marginTop: 0 }}>Resources & Links</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginTop: '16px' }}>
                    {article.resources.map((res, i) => (
                      <div key={i} className="rom-download-subcard" style={{ padding: '16px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '600', display: 'block', color: 'var(--text-dark)', marginBottom: '8px' }}>{res.title}</span>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {res.links.map((link, idx) => (
                            <li key={idx}>
                              <a href={link.href} target="_blank" rel="noopener noreferrer" className="read-more-link" style={{ fontSize: '12px' }}>
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </article>
      </div>
    );
  }

  return (
    <div className="page-view-container fade-in">
      <header className="page-header">
        <span className="page-label">dev logs // photography notes // thoughts</span>
        <h1 className="page-title">blogs & build logs.</h1>
      </header>

      <h2 className="category-title" style={{ marginTop: '24px' }}>POSTS & ARCHIVES</h2>
      <div className="blog-posts-list">
        {BLOG_POSTS.map((post) => (
          <div key={post.id} className="blog-summary-card" onClick={() => handleSelectPost(post.id)}>
            <div className="blog-meta-row">
              <span className="blog-date">{post.date}</span>
              <span className="meta-divider">•</span>
              <span className="blog-readtime">{post.readTime}</span>
              <span className="meta-divider">•</span>
              <span style={{ color: 'var(--accent)' }}>{post.category}</span>
            </div>
            <h2 className="blog-summary-title">{post.title}</h2>
            <p className="blog-summary-excerpt">{post.excerpt}</p>
            <div className="blog-card-footer">
              <span className="read-more-link">READ LOG ↗</span>
              <ShareButton postId={post.id} label="COPY LINK" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
