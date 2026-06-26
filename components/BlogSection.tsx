"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Calendar, Tag, Book, Newspaper } from "lucide-react";
import { PostMeta, Post } from "@/lib/types/posts/index";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

function parseHeadings(html: string): HeadingItem[] {
  const matches = html.matchAll(/<h([2-3])\b[^>]*>(.*?)<\/h[2-3]>/gi);
  const items: HeadingItem[] = [];
  for (const match of matches) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    items.push({ id, text, level });
  }
  return items;
}

function getReadingTime(text: string): string {
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function PostDetailView({
  post,
  onBack,
}: {
  post: Post;
  onBack: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Parse headings from HTML content
  useEffect(() => {
    const parsed = parseHeadings(post.content);
    setHeadings(parsed);
  }, [post.content]);

  // Inject IDs into rendered heading elements and observe them
  useEffect(() => {
    if (headings.length === 0) return;

    const timer = setTimeout(() => {
      if (!contentRef.current) return;
      const headingEls = contentRef.current.querySelectorAll("h2, h3");
      headingEls.forEach((el) => {
        const text = (el as HTMLElement).innerText?.trim();
        if (!text) return;
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        el.id = id;
      });
    }, 50);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    const observerTimer = setTimeout(() => {
      if (!contentRef.current) return;
      const els = contentRef.current.querySelectorAll("h2, h3");
      els.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      clearTimeout(observerTimer);
      observer.disconnect();
    };
  }, [headings]);

  const scrollToHeading = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  }, []);

  return (
    <motion.div
      key="post-detail"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
    >
      {/* Layout: sidebar + main content */}
      <div className="relative flex gap-10">
        {/* Timeline sidebar - hidden on smaller screens */}
        {headings.length > 0 && (
          <aside className="hidden xl:block w-52 shrink-0">
            <nav className="sticky top-24 space-y-1">
              {headings.map((h) => (
                <button
                  key={h.id}
                  onClick={() => scrollToHeading(h.id)}
                  className={`w-full text-left py-1 transition-all group ${
                    h.level === 2 ? "pl-0" : "pl-4"
                  }`}
                >
                  <span
                    className={`text-xs leading-snug transition-all ${
                      activeId === h.id
                        ? "text-red-500 font-bold"
                        : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                    }`}
                  >
                    {h.text}
                  </span>
                </button>
              ))}
            </nav>
          </aside>
        )}

        {/* Main article content */}
        <main className="w-full max-w-3xl min-w-0">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 text-sm font-medium transition-all rounded-md px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 self-start mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </button>
          <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-sans prose-headings:tracking-tight prose-a:text-red-500 dark:prose-a:text-red-400 prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-blockquote:border-red-500/30 prose-blockquote:text-zinc-500 dark:prose-blockquote:text-zinc-400 prose-headings:scroll-mt-24">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-neutral-950 dark:text-neutral-50">
              {post.title}
            </h1>
            <p className="text-muted-foreground mb-1 text-sm text-zinc-500 dark:text-zinc-400">
              {post.description}
            </p>
            <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-6">
              Published on {post.date}
            </p>
            <div
              ref={contentRef}
              className="leading-relaxed text-neutral-700 dark:text-neutral-300 space-y-4 text-sm sm:text-base pt-5 border-t border-zinc-200/40 dark:border-zinc-800/30"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </main>
      </div>

      {/* Mobile heading indicator */}
      {headings.length > 0 && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1.5 xl:hidden">
          {headings.map((h) => (
            <button
              key={h.id}
              onClick={() => scrollToHeading(h.id)}
              className={`text-[10px] leading-none text-right transition-all ${
                activeId === h.id
                  ? "text-red-500 font-bold scale-110"
                  : "text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400"
              }`}
              aria-label={h.text}
            >
              {h.text.split(" ")[0]}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function BlogSection() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPost, setLoadingPost] = useState(false);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data: PostMeta[]) => setPosts(data))
      .finally(() => setLoading(false));
  }, []);

  const openPost = async (slug: string) => {
    setLoadingPost(true);
    try {
      const res = await fetch(`/api/posts?slug=${slug}`);
      const data: Post = await res.json();
      setSelectedPost(data);
    } finally {
      setLoadingPost(false);
    }
  };

  const closePost = () => setSelectedPost(null);

  return (
    <div className="space-y-6 py-4" id="blog-section">
      <AnimatePresence mode="wait">
        {selectedPost ? (
          <PostDetailView post={selectedPost} onBack={closePost} />
        ) : (
          <motion.div
            key="post-list"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            {/* Blog header */}
            <div className="space-y-2" id="blog-header">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 font-sans">
                Blog
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xl font-sans">
                Thoughts, build logs, and other shenanigans.
              </p>
            </div>

            {/* DETAILS.md card */}
            <div className="w-full bg-white/50 dark:bg-zinc-900/20 rounded-xl border border-zinc-200/60 dark:border-zinc-800/50">
              <h3 className="w-full flex items-center gap-3 text-zinc-400 dark:text-zinc-500 px-5 py-3 border-b border-zinc-200/60 dark:border-zinc-800/50">
                <Book className="w-4 h-4" />
                <span className="text-xs font-mono tracking-wide">DETAILS.md</span>
              </h3>
              <p className="px-5 py-3 text-sm text-zinc-600 dark:text-zinc-400">
                In case you were wondering — yes, I write things. Mostly build logs,
                thoughts on design and code, and whatever else feels worth putting down.
              </p>
            </div>

            {/* ALL_POSTS.md card */}
            <div className="w-full bg-white/50 dark:bg-zinc-900/20 rounded-xl border border-zinc-200/60 dark:border-zinc-800/50 flex flex-col overflow-hidden">
              <div className="w-full flex items-center gap-3 text-zinc-400 dark:text-zinc-500 px-5 py-3 border-b border-zinc-200/60 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/10 sticky top-0 z-10">
                <Newspaper className="w-4 h-4" />
                <span className="text-xs font-mono tracking-wide">ALL_POSTS.md</span>
              </div>

              <div className="p-4 flex flex-col gap-4">
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="animate-pulse rounded-lg border border-zinc-200/60 dark:border-zinc-800/50 p-4 space-y-2"
                      >
                        <div className="h-5 w-48 bg-zinc-200 dark:bg-zinc-800 rounded" />
                        <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
                        <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
                      </div>
                    ))}
                  </div>
                ) : posts.length === 0 ? (
                  <p className="text-sm text-zinc-400 dark:text-zinc-500 italic px-1">
                    No posts yet. Stay tuned.
                  </p>
                ) : (
                  posts.map((post) => (
                    <motion.button
                      key={post.slug}
                      onClick={() => openPost(post.slug)}
                      className="w-full text-left rounded-lg border border-zinc-200/60 dark:border-zinc-800/50 bg-zinc-50/30 dark:bg-zinc-900/10 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/20 transition-all cursor-pointer group overflow-hidden"
                    >
                      <div className="w-full flex flex-col px-4 pt-3 gap-1">
                        <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500">
                          Published on {post.date} &bull; {getReadingTime(post.description)}
                        </p>
                      </div>
                      <p className="w-full px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {post.description}
                      </p>
                      <div className="w-full px-4 pb-3 flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2.5 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-700/50 text-zinc-500 dark:text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.button>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}