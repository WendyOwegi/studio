import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Calculator,
  CheckSquare,
  List,
  Palette,
} from 'lucide-react';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { blogPosts, BlogPost } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-main');
const featuredPosts = blogPosts.filter((post) => post.featured).slice(0, 3);

const tools = [
  {
    title: 'Budget Calculator',
    description: 'Estimate costs and manage your event spending.',
    icon: Calculator,
    href: '/tools/budget-calculator',
    color: 'text-emerald-500',
  },
  {
    title: 'RSVP Tracker',
    description: 'Manage your guest list with real-time status updates.',
    icon: List,
    href: '/tools/rsvp-tracker',
    color: 'text-blue-500',
  },
  {
    title: 'Event Checklist',
    description: 'Stay organized with an interactive to-do list.',
    icon: CheckSquare,
    href: '/tools/event-checklist',
    color: 'text-purple-500',
  },
  {
    title: 'AI Theme Generator',
    description: 'Get inspired with AI-powered theme and color ideas.',
    icon: Palette,
    href: '/tools/theme-generator',
    color: 'text-pink-500',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold md:text-6xl drop-shadow-lg">
            Crafting Unforgettable Moments
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow-md">
            Your ultimate guide to event planning. Discover tips, tools, and
            inspiration to make your next event a masterpiece.
          </p>
          <Button asChild className="mt-8" size="lg" variant="accent">
            <Link href="/blog">
              Explore Ideas <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-16 sm:py-24">
        <div className="container">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Featured Inspiration
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Get the latest tips and trends from our event planning experts.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="bg-card py-16 sm:py-24">
        <div className="container">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Your Planning Toolkit
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Powerful, easy-to-use tools to simplify your event planning
            process.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool) => (
              <Card
                key={tool.title}
                className="flex transform flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <CardHeader className="items-center text-center">
                  <div
                    className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-opacity-10 ${tool.color.replace('text-', 'bg-')}`}
                  >
                    <tool.icon className={`h-8 w-8 ${tool.color}`} />
                  </div>
                  <CardTitle>{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <p className="text-muted-foreground">{tool.description}</p>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button asChild variant="secondary" className="w-full">
                    <Link href={tool.href}>Use Tool</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative h-56 w-full">
          <Image
            src={post.image.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={post.image.imageHint}
          />
        </div>
      </Link>
      <CardHeader>
        <div className="flex items-center gap-2">
            <Badge variant="outline">{post.category}</Badge>
        </div>
        <CardTitle className="mt-2 text-xl">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{post.excerpt}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <span>By {post.author}</span>
        <span>{post.date}</span>
      </CardFooter>
    </Card>
  );
}
