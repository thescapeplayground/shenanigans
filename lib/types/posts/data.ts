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
    slug: "building-shenanigans-v2",
    title: "Building Shenanigans v2",
    description: "What went into rebuilding this site from the ground up.",
    date: "2026-06-24",
    tags: ["dev", "design", "nextjs"],
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