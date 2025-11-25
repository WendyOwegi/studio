import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CalendarDays, User } from 'lucide-react';

import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const blogPosts = await getAllBlogPosts();
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src={post.image.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          priority
          data-ai-hint={post.image.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="container relative flex h-full flex-col justify-end pb-8 text-white">
          <Badge variant="secondary" className="mb-4 w-fit">{post.category}</Badge>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center space-x-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-3xl py-12">
        <div
          className="prose dark:prose-invert max-w-none text-foreground prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
