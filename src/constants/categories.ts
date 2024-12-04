import { Cat, Package, Gift, Coffee } from 'lucide-react';

export const categories = [
  { name: 'All', icon: Cat },
  { name: 'Furniture', icon: Package },
  { name: 'Toys', icon: Gift },
  { name: 'Food', icon: Coffee },
] as const;