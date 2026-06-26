export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
}

export interface Post extends PostMeta {
  content: string;
}