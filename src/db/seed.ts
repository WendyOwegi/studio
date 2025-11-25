import { db, blogs, vendors } from './index';
import { blogPosts, vendors as vendorData } from '@/lib/data';

async function seed() {
  console.log('Starting database seed...');

  // Clear existing data
  await db.delete(blogs);
  console.log('Cleared existing blog data');
  
  await db.delete(vendors);
  console.log('Cleared existing vendor data');

  // Insert blog posts
  for (const post of blogPosts) {
    await db.insert(blogs).values({
      slug: post.slug,
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      date: post.date,
      imageId: post.image.id,
      imageUrl: post.image.imageUrl,
      imageHint: post.image.imageHint,
      imageDescription: post.image.description,
      featured: post.featured,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    console.log(`Seeded blog post: ${post.title}`);
  }

  // Insert vendors
  for (const vendor of vendorData) {
    await db.insert(vendors).values({
      vendorId: vendor.id,
      name: vendor.name,
      category: vendor.category,
      rating: vendor.rating,
      description: vendor.description,
      imageId: vendor.image.id,
      imageUrl: vendor.image.imageUrl,
      imageHint: vendor.image.imageHint,
      imageDescription: vendor.image.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    console.log(`Seeded vendor: ${vendor.name}`);
  }

  console.log('Database seeded successfully!');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
