import { Database } from './database';

export type SpeciesRow = Database['public']['Tables']['species']['Row'];
export type ProductRow = Database['public']['Tables']['products']['Row'];
export type ProductVariantRow = Database['public']['Tables']['product_variants']['Row'];
export type NutritionFactRow = Database['public']['Tables']['nutrition_facts']['Row'];
export type FeedingGuidanceRow = Database['public']['Tables']['feeding_guidance']['Row'];
export type ReviewRow = Database['public']['Tables']['reviews']['Row'];
export type CartRow = Database['public']['Tables']['carts']['Row'];
export type CartItemRow = Database['public']['Tables']['cart_items']['Row'];
export type OrderRow = Database['public']['Tables']['orders']['Row'];
export type OrderItemRow = Database['public']['Tables']['order_items']['Row'];

export type SpeciesSlug = 'budgerigar' | 'lovebird' | 'finch';

export interface SpeciesWithLane extends SpeciesRow {
  slug: SpeciesSlug;
}

export interface ProductWithDetails extends ProductRow {
  primary_species?: SpeciesRow | null;
  variants: ProductVariantRow[];
  nutrition_facts: NutritionFactRow[];
  feeding_guidance?: FeedingGuidanceRow[];
  reviews?: ReviewRow[];
}
