import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import { getPostMetaBySlug, getPublishedPosts } from "@/lib/types/posts/data";
import { Post } from "@/lib/types/posts/index";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  // Return list of published post metadata
  if (!slug) {
    const posts = getPublishedPosts();
    return NextResponse.json(posts);
  }

  // Return a single post with HTML content
  const meta = getPostMetaBySlug(slug);
  if (!meta) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), "posts", `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Post file not found" }, { status: 404 });
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");

  // Strip frontmatter (lines between --- delimiters)
  const contentWithoutFrontmatter = fileContent.replace(/^---[\s\S]*?---\n?/, "").trim();

  const result = await remark().use(html).process(contentWithoutFrontmatter);
  const contentHtml = result.toString();

  const post: Post = {
    ...meta,
    content: contentHtml,
  };

  return NextResponse.json(post);
}