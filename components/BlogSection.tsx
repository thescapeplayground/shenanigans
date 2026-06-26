"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Book, Newspaper } from "lucide-react";
import { PostMeta } from "@/lib/types/posts/index";

function getReadingTime(text: string): string {
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function BlogSection() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data: PostMeta[]) => setPosts(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 py-4" id="blog-section">
      <motion.div
        key="post-list"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
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
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
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
                </Link>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
