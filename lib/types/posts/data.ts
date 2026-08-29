import { PostMeta } from './index';

export const POSTS_META: PostMeta[] = [
  {
    slug: "hello-world",
    title: "Hello World",
    description: "A new beginning — welcome to the blog.",
    date: "2026-06-26",
    tags: ["meta", "personal"],
    published: true,
  },
  {
    slug: "remaking-snapseed-on-web",
    title: "Remaking Snapseed on the Web from Scratch",
    description: "How I rebuilt Google's iconic Snapseed photo editing experience for the browser using client-side HTML5 Canvas, WebGL, custom adjustment pipelines, and zero server dependencies.",
    date: "2026-08-29",
    tags: ["dev", "canvas", "typescript", "design", "photography"],
    published: true,
  },
  {
    slug: "recreating-shenanigans",
    title: "Recreating Shenanigans",
    description: "A complete walkthrough of tearing down the old site architecture, reconsidering the visual palette, and rebuilding with modern Next.js, tactile aesthetics, and curated features.",
    date: "2026-08-29",
    tags: ["dev", "design", "nextjs", "tailwind"],
    published: true,
  },
];

export function getPublishedPosts(): PostMeta[] {
  return POSTS_META.filter((p) => p.published).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostMetaBySlug(slug: string): PostMeta | undefined {
  return POSTS_META.find((p) => p.slug === slug);
}