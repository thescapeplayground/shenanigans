import { notFound } from "next/navigation";
import { getPostBySlug, listPublishedPosts } from "@/lib/types/posts/render";
import { PostDetailView } from "@/components/PostDetailView";

export function generateStaticParams() {
  return listPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <PostDetailView post={post} />;
}
