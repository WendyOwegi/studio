'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';

import { blogPosts, BlogPost } from '@/lib/data';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categories = ['All', 'Weddings', 'Corporate', 'Birthdays', 'DIY'];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="container py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Event Planning Insights
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your source for tips, trends, and inspiration.
        </p>
      </div>

      <div className="my-8 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl font-semibold">No posts found</p>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filter.
          </p>
        </div>
      )}
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
