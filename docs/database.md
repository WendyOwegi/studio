# Database Setup

This project uses SQLite with Drizzle ORM to manage blog posts and vendors.

## Database Schema

### Blogs Table

The `blogs` table has the following columns:

- `id`: Auto-incrementing primary key
- `slug`: Unique URL-friendly identifier
- `title`: Blog post title
- `category`: Category (Weddings, Corporate, Birthdays, DIY)
- `excerpt`: Short description
- `content`: Full HTML content
- `author`: Author name
- `date`: Publication date
- `imageId`, `imageUrl`, `imageHint`, `imageDescription`: Image details
- `featured`: Boolean flag for featured posts
- `createdAt`, `updatedAt`: Timestamps

### Vendors Table

The `vendors` table has the following columns:

- `id`: Auto-incrementing primary key
- `vendorId`: Unique vendor identifier
- `name`: Vendor name
- `category`: Category (Caterer, Photographer, Decorator, Venue)
- `rating`: Rating (1-5)
- `description`: Vendor description
- `imageId`, `imageUrl`, `imageHint`, `imageDescription`: Image details
- `createdAt`, `updatedAt`: Timestamps

## Available Commands

```bash
# Generate migration files from schema changes
npm run db:generate

# Run migrations to update database
npm run db:migrate

# Open Drizzle Studio (database GUI)
npm run db:studio

# Seed database with initial data
npm run db:seed
```

## Setup Instructions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Generate and run migrations:

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

3. Seed the database:

   ```bash
   npm run db:seed
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## File Structure

- `src/db/schema.ts`: Database schema definition
- `src/db/index.ts`: Database connection and exports
- `src/db/seed.ts`: Database seeding script
- `src/lib/blog.ts`: Blog data access functions
- `src/lib/vendor.ts`: Vendor data access functions
- `drizzle.config.ts`: Drizzle Kit configuration
- `sqlite.db`: SQLite database file (gitignored)

## Adding New Blog Posts

To add new blog posts, you can either:

1. **Via code**: Add entries to the seed file and run `npm run db:seed`
2. **Via Drizzle Studio**: Run `npm run db:studio` and use the GUI
3. **Programmatically**: Use the Drizzle ORM methods in your code:

   ```typescript
   import { db, blogs } from "@/db";

   await db.insert(blogs).values({
     slug: "my-new-post",
     title: "My New Post",
     // ... other fields
   });
   ```

## Adding New Vendors

To add new vendors, you can either:

1. **Via code**: Add entries to the seed file and run `npm run db:seed`
2. **Via Drizzle Studio**: Run `npm run db:studio` and use the GUI
3. **Programmatically**: Use the Drizzle ORM methods in your code:

   ```typescript
   import { db, vendors } from "@/db";

   await db.insert(vendors).values({
     vendorId: "new-vendor",
     name: "New Vendor",
     category: "Caterer",
     rating: 5,
     // ... other fields
   });
   ```
