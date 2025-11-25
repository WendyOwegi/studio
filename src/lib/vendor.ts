import { db, vendors } from '@/db';
import type { Vendor as DbVendor } from '@/db/schema';
import { eq, gte } from 'drizzle-orm';

export interface Vendor {
  id: string;
  name: string;
  category: 'Caterer' | 'Photographer' | 'Decorator' | 'Venue';
  rating: number;
  description: string;
  image: {
    id: string;
    imageUrl: string;
    imageHint: string;
    description: string;
  };
}

function dbVendorToVendor(vendor: DbVendor): Vendor {
  return {
    id: vendor.vendorId,
    name: vendor.name,
    category: vendor.category as Vendor['category'],
    rating: vendor.rating,
    description: vendor.description,
    image: {
      id: vendor.imageId,
      imageUrl: vendor.imageUrl,
      imageHint: vendor.imageHint,
      description: vendor.imageDescription,
    },
  };
}

export async function getAllVendors(): Promise<Vendor[]> {
  const allVendors = await db.select().from(vendors).all();
  return allVendors.map(dbVendorToVendor);
}

export async function getVendorById(id: string): Promise<Vendor | undefined> {
  const vendor = await db.select().from(vendors).where(eq(vendors.vendorId, id)).get();
  return vendor ? dbVendorToVendor(vendor) : undefined;
}

export async function getVendorsByCategory(category: string): Promise<Vendor[]> {
  const categoryVendors = await db.select().from(vendors).where(eq(vendors.category, category)).all();
  return categoryVendors.map(dbVendorToVendor);
}

export async function getVendorsByRating(minRating: number): Promise<Vendor[]> {
  const ratedVendors = await db.select().from(vendors).where(gte(vendors.rating, minRating)).all();
  return ratedVendors.map(dbVendorToVendor);
}
