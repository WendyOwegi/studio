import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string): ImagePlaceholder => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    // Fallback to a default image if not found
    return {
      id: 'fallback',
      description: 'A placeholder image',
      imageUrl: 'https://picsum.photos/seed/fallback/600/400',
      imageHint: 'placeholder',
    };
  }
  return image;
};

export interface BlogPost {
  slug: string;
  title: string;
  category: 'Weddings' | 'Corporate' | 'Birthdays' | 'DIY';
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: ImagePlaceholder;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: '10-steps-to-planning-the-perfect-wedding',
    title: '10 Steps to Planning the Perfect Wedding',
    category: 'Weddings',
    excerpt: 'From guest lists to venue selection, our comprehensive guide covers everything you need to know for your big day.',
    content: '<p>Planning a wedding can be a monumental task, but with the right approach, it can also be an incredibly rewarding experience. This guide will walk you through the 10 essential steps to ensure your wedding day is as perfect as you’ve always dreamed.</p><h3>1. Set a Budget</h3><p>Before you start planning, it’s crucial to determine your budget. This will influence every decision you make, from the venue to the guest list.</p><h3>2. Create a Guest List</h3><p>Decide on the size of your wedding. An intimate gathering or a large celebration? Your guest list will be a major factor in your venue choice and budget.</p>',
    author: 'Jane Doe',
    date: '2023-10-26',
    image: findImage('blog-wedding-planning'),
    featured: true,
  },
  {
    slug: 'how-to-host-a-memorable-corporate-gala',
    title: 'How to Host a Memorable Corporate Gala',
    category: 'Corporate',
    excerpt: 'Elevate your company’s next event with these tips for hosting a corporate gala that employees and clients will talk about for years.',
    content: '<p>A corporate gala is more than just a party; it’s a reflection of your company’s brand and values. Here’s how to make it a night to remember.</p><h3>1. Define Your Objectives</h3><p>What is the goal of the gala? Fundraising, networking, celebrating a milestone? Clear objectives will guide your planning.</p>',
    author: 'John Smith',
    date: '2023-10-20',
    image: findImage('blog-corporate-gala'),
    featured: true,
  },
  {
    slug: 'planning-a-birthday-bash-on-a-budget',
    title: 'Planning a Birthday Bash on a Budget',
    category: 'Birthdays',
    excerpt: 'You don’t need to break the bank to throw an amazing birthday party. Discover our secrets for a fabulous and frugal celebration.',
    content: '<p>Budgets are tight, but that doesn’t mean you have to skimp on fun. Learn how to plan a fantastic birthday party without overspending.</p>',
    author: 'Emily White',
    date: '2023-09-15',
    image: findImage('blog-birthday-bash'),
    featured: false,
  },
  {
    slug: 'top-5-diy-decorations-for-any-event',
    title: 'Top 5 DIY Decorations for Any Event',
    category: 'DIY',
    excerpt: 'Get creative and add a personal touch to your next event with these simple and stunning DIY decoration ideas.',
    content: '<p>DIY decorations can save you money and make your event unique. Here are five easy ideas to get you started.</p>',
    author: 'Chris Green',
    date: '2023-09-05',
    image: findImage('blog-diy-decor'),
    featured: true,
  },
];

export interface Vendor {
    id: string;
    name: string;
    category: 'Caterer' | 'Photographer' | 'Decorator' | 'Venue';
    rating: number;
    description: string;
    image: ImagePlaceholder;
}

export const vendors: Vendor[] = [
    {
        id: '1',
        name: 'Gourmet Delights Catering',
        category: 'Caterer',
        rating: 5,
        description: 'Exquisite cuisine for unforgettable events. We specialize in custom menus tailored to your taste.',
        image: findImage('vendor-caterer'),
    },
    {
        id: '2',
        name: 'Everlasting Moments Photography',
        category: 'Photographer',
        rating: 5,
        description: 'Capturing the magic of your special day with artistic and timeless photography.',
        image: findImage('vendor-photographer'),
    },
    {
        id: '3',
        name: 'Enchanted Spaces Decor',
        category: 'Decorator',
        rating: 4,
        description: 'Transforming venues into dreamscapes with our creative and elegant decor solutions.',
        image: findImage('vendor-decorator'),
    },
    {
        id: '4',
        name: 'The Grand Oak Venue',
        category: 'Venue',
        rating: 4,
        description: 'A stunning and versatile venue perfect for weddings, corporate events, and private parties.',
        image: findImage('gallery-1'),
    }
];

export interface ChecklistCategory {
    title: string;
    tasks: { id: string; text: string }[];
}

export const eventChecklist: ChecklistCategory[] = [
    {
        title: '10-12 Months Out',
        tasks: [
            { id: 't1', text: 'Set a budget' },
            { id: 't2', text: 'Choose your wedding party' },
            { id: 't3', text: 'Start a guest list' },
            { id: 't4', text: 'Hire a planner' },
            { id: 't5', text: 'Pick a date and book venue' },
        ],
    },
    {
        title: '6-9 Months Out',
        tasks: [
            { id: 't6', text: 'Book photographer, videographer, and entertainment' },
            { id: 't7', text: 'Send save-the-dates' },
            { id: 't8', text: 'Shop for wedding dress/attire' },
            { id: 't9', text: 'Book caterer and florist' },
        ],
    },
    {
        title: '3-5 Months Out',
        tasks: [
            { id: 't10', text: 'Order invitations' },
            { id: 't11', text: 'Finalize guest list' },
            { id: 't12', text: 'Book accommodations for guests' },
            { id: 't13', text: 'Arrange transportation' },
        ],
    },
    {
        title: '1-2 Months Out',
        tasks: [
            { id: 't14', text: 'Mail invitations' },
            { id: 't15', text: 'Get marriage license' },
            { id: 't16', text: 'Have final dress fitting' },
            { id: 't17', text: 'Confirm all vendors' },
        ],
    },
     {
        title: 'Week of the Wedding',
        tasks: [
            { id: 't18', text: 'Give final headcount to caterer' },
            { id: 't19', text: 'Create seating chart' },
            { id: 't20', text: 'Pack for honeymoon' },
            { id: 't21', text: 'Enjoy your special day!' },
        ],
    },
];

