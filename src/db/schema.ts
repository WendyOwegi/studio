import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const blogs = sqliteTable('blogs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  author: text('author').notNull(),
  date: text('date').notNull(),
  imageId: text('image_id').notNull(),
  imageUrl: text('image_url').notNull(),
  imageHint: text('image_hint').notNull(),
  imageDescription: text('image_description').notNull(),
  featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull().default(new Date().toISOString()),
  updatedAt: text('updated_at').notNull().default(new Date().toISOString()),
});

export const vendors = sqliteTable('vendors', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  vendorId: text('vendor_id').notNull().unique(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  rating: integer('rating').notNull(),
  description: text('description').notNull(),
  imageId: text('image_id').notNull(),
  imageUrl: text('image_url').notNull(),
  imageHint: text('image_hint').notNull(),
  imageDescription: text('image_description').notNull(),
  createdAt: text('created_at').notNull().default(new Date().toISOString()),
  updatedAt: text('updated_at').notNull().default(new Date().toISOString()),
});

export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;
export type Vendor = typeof vendors.$inferSelect;
export type NewVendor = typeof vendors.$inferInsert;
