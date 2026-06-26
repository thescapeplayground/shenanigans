"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Post } from "@/lib/types/posts/index";

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

export function PostDetailView({ post }: { post: Post }) {
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
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 text-sm font-medium transition-all rounded-md px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 self-start mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>
          <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-sans prose-headings:tracking-tight prose-a:text-red-500 dark:prose-a:text-red-400 prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-blockquote:border-red-500/30 prose-blockquote:text-zinc-500 dark:prose-blockquote:text-zinc-400 prose-headings:scroll-mt-24">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-neutral-950 dark:text-neutral-50">
              {post.title}
            </h1>
            <p className="text-muted-foreground mb-1 text-sm text-zinc-500 dark:text-zinc-400">
              {post.description}
            </p>
            <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-4">
              Published on {post.date}
            </p>
            <div
              ref={contentRef}
              className="leading-relaxed text-neutral-700 dark:text-neutral-300 space-y-4 text-sm sm:text-base pt-6 border-t border-zinc-200/40 dark:border-zinc-800/30 prose-headings:mt-0 [&>h2:first-child]:mt-0 [&>h3:first-child]:mt-0"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </main>
      </div>

    </motion.div>
  );
}
