import { getAllVendors } from '@/lib/vendor';
import { VendorsPageClient } from './vendors-client';

export default async function VendorsPage() {
  const vendors = await getAllVendors();

  return <VendorsPageClient vendors={vendors} />;
}
