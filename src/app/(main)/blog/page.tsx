import { getAllBlogPosts } from '@/lib/blog';
import { BlogPageClient } from './blog-client';

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();

  return (
    <BlogPageClient blogPosts={blogPosts} />
  );
}
