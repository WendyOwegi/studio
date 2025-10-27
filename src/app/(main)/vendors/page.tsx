'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Star, Search } from 'lucide-react';

import { vendors, Vendor } from '@/lib/data';
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
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categories = ['All', 'Caterer', 'Photographer', 'Decorator', 'Venue'];
const ratings = ['All', '5 Stars', '4+ Stars', '3+ Stars'];

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const matchesCategory =
        selectedCategory === 'All' || vendor.category === selectedCategory;
      
      const ratingThreshold = selectedRating === 'All' ? 0 : parseInt(selectedRating);
      const matchesRating = vendor.rating >= ratingThreshold;

      const matchesSearch =
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesRating && matchesSearch;
    });
  }, [searchTerm, selectedCategory, selectedRating]);

  return (
    <div className="container py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Find Your Perfect Vendor
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Browse our curated list of trusted event professionals.
        </p>
      </div>

      <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative md:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search vendors..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full">
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
        <Select value={selectedRating} onValueChange={setSelectedRating}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by rating" />
          </SelectTrigger>
          <SelectContent>
            {ratings.map((rating) => (
              <SelectItem key={rating} value={rating}>
                {rating}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredVendors.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl font-semibold">No vendors found</p>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}

function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <div className="relative h-56 w-full">
        <Image
          src={vendor.image.imageUrl}
          alt={vendor.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          data-ai-hint={vendor.image.imageHint}
        />
        <Badge className="absolute top-2 right-2">{vendor.category}</Badge>
      </div>
      <CardHeader>
        <CardTitle>{vendor.name}</CardTitle>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < vendor.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">({vendor.rating}.0)</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{vendor.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
