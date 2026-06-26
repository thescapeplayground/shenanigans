import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import { getPostMetaBySlug, getPublishedPosts } from "./data";
import { Post, PostMeta } from "./index";

/**
 * Read a markdown post from disk, strip frontmatter, and render it to HTML.
 * Returns null if the post does not exist or is not published.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const meta = getPostMetaBySlug(slug);
  if (!meta || !meta.published) return null;

  const filePath = path.join(process.cwd(), "posts", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const contentWithoutFrontmatter = fileContent
    .replace(/^---[\s\S]*?---\n?/, "")
    .trim();

  const result = await remark().use(html).process(contentWithoutFrontmatter);
  const contentHtml = result.toString();

  return { ...meta, content: contentHtml };
}

/** All published posts, newest first. */
export function listPublishedPosts(): PostMeta[] {
  return getPublishedPosts();
}
