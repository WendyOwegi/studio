import { db, blogs } from '@/db';
import type { Blog } from '@/db/schema';
import { eq } from 'drizzle-orm';

export interface BlogPost {
  slug: string;
  title: string;
  category: 'Weddings' | 'Corporate' | 'Birthdays' | 'DIY';
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: {
    id: string;
    imageUrl: string;
    imageHint: string;
    description: string;
  };
  featured: boolean;
}

function blogToPost(blog: Blog): BlogPost {
  return {
    slug: blog.slug,
    title: blog.title,
    category: blog.category as BlogPost['category'],
    excerpt: blog.excerpt,
    content: blog.content,
    author: blog.author,
    date: blog.date,
    image: {
      id: blog.imageId,
      imageUrl: blog.imageUrl,
      imageHint: blog.imageHint,
      description: blog.imageDescription,
    },
    featured: blog.featured,
  };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const allBlogs = await db.select().from(blogs).all();
  return allBlogs.map(blogToPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const blog = await db.select().from(blogs).where(eq(blogs.slug, slug)).get();
  return blog ? blogToPost(blog) : undefined;
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const featuredBlogs = await db.select().from(blogs).where(eq(blogs.featured, true)).all();
  return featuredBlogs.map(blogToPost);
}
