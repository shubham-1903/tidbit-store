import { SpeciesSlug } from '@/types/catalog';

export interface ProductVariant {
  id: string;
  label: string;
  priceCents: number;
  compareAtPriceCents: number;
  stock: number;
}

export interface NutritionFact {
  nutrient: string;
  valueText: string;
  valueNumeric: number;
  unit: string;
  displayOrder: number;
}

export interface FeedingGuidance {
  speciesName: string;
  birdWeightRangeG: string;
  dailyAmountG: string;
  notes: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorLocation: string;
  rating: number;
  title: string;
  body: string;
  verifiedPurchase: boolean;
  createdAt: string;
}

export interface DetailedProduct {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  species: SpeciesSlug;
  speciesName: string;
  badge: string;
  ratingAvg: number;
  ratingCount: number;
  basePriceCents: number;
  compareAtPriceCents: number;
  milledOn: string;
  bestBy: string;
  ingredients: string[];
  imageUrls: string[];
  variants: ProductVariant[];
  nutritionFacts: NutritionFact[];
  feedingGuidance: FeedingGuidance;
  reviews: Review[];
}

export const CATALOG_PRODUCTS: DetailedProduct[] = [
  {
    id: '10000000-0000-0000-0000-000000000001',
    slug: 'parakeet-budgerigar-daily-vitality',
    title: 'Tidbit Parakeet & Budgerigar Daily Vitality',
    subtitle: 'Whole-grain botanical vitality blend with chelated minerals and cold-pressed seed oils.',
    description:
      'Scientifically balanced daily nutrition formulated specifically for budgerigars and parakeets. Features clean Canary grass seed, golden millet, red millet, oat groats, and flaxseed enriched with bioavailable calcium and essential amino acids for vibrant plumage, resilient immunity, and daily energy.',
    species: 'budgerigar',
    speciesName: 'Budgerigar',
    badge: 'Advanced Formula',
    ratingAvg: 4.9,
    ratingCount: 208,
    basePriceCents: 1299,
    compareAtPriceCents: 1899,
    milledOn: '2026-09-14',
    bestBy: '2027-08-31',
    ingredients: [
      'Canary Grass Seed',
      'Golden German Millet',
      'Red Siberian Millet',
      'Steel-Cut Oat Groats',
      'Flaxseed',
      'Canola Seed',
      'Sesame Seed',
      'Hemp Seed',
      'Ground Oyster Shell',
      'Avian Prebiotic Blend',
    ],
    imageUrls: ['/images/products/budgie-daily-vitality.png'],
    variants: [
      {
        id: 'var-budgie-1kg',
        label: '1 kg',
        priceCents: 1299,
        compareAtPriceCents: 1899,
        stock: 150,
      },
      {
        id: 'var-budgie-3kg',
        label: '3 kg',
        priceCents: 3299,
        compareAtPriceCents: 4499,
        stock: 95,
      },
      {
        id: 'var-budgie-5kg',
        label: '5 kg',
        priceCents: 4999,
        compareAtPriceCents: 6999,
        stock: 60,
      },
    ],
    nutritionFacts: [
      {
        nutrient: 'Crude Protein (min)',
        valueText: '11.5%',
        valueNumeric: 11.5,
        unit: '%',
        displayOrder: 1,
      },
      {
        nutrient: 'Crude Fat (min)',
        valueText: '5.2%',
        valueNumeric: 5.2,
        unit: '%',
        displayOrder: 2,
      },
      {
        nutrient: 'Crude Fiber (max)',
        valueText: '6.8%',
        valueNumeric: 6.8,
        unit: '%',
        displayOrder: 3,
      },
      {
        nutrient: 'Calcium / Phosphorus Ratio',
        valueText: '1.8 : 1',
        valueNumeric: 1.8,
        unit: 'ratio',
        displayOrder: 4,
      },
    ],
    feedingGuidance: {
      speciesName: 'Budgerigar & Parakeet',
      birdWeightRangeG: '30–45g',
      dailyAmountG: '4–8g (1–2 teaspoons)',
      notes:
        'Provide fresh seed daily in clean feeding dish. Remove empty hulls each evening. Supplement with fresh dark leafy greens (kale, parsley) and constant access to clean, non-chlorinated water.',
    },
    reviews: [
      {
        id: 'rev-1',
        authorName: 'Sarah Johnson',
        authorLocation: 'Portland, OR',
        rating: 5,
        title: 'My budgies thrive on this mix!',
        body: 'My budgies love this mix. Their plumage has never been brighter and the freshness right out of the vacuum seal is incredible. Zero dust or empty hulls.',
        verifiedPurchase: true,
        createdAt: 'September 2026',
      },
      {
        id: 'rev-2',
        authorName: 'Marcus Vance',
        authorLocation: 'Austin, TX',
        rating: 5,
        title: 'The freshness is next level',
        body: 'The freshness is next level. You can actually smell the freshly milled grains and clean botanicals. Both of my birds took to it immediately without any transition fuss.',
        verifiedPurchase: true,
        createdAt: 'September 2026',
      },
      {
        id: 'rev-3',
        authorName: 'Dr. Elena Lin',
        authorLocation: 'Resident Avian Clinician, Seattle',
        rating: 5,
        title: 'Exceptional amino balance and bioavailable calcium',
        body: 'Clean oils, chelated minerals, and proper Ca:P ratio make this formula stand out against typical seed diets. I routinely recommend Tidbit to companion avian caretakers.',
        verifiedPurchase: true,
        createdAt: 'August 2026',
      },
    ],
  },
  {
    id: '10000000-0000-0000-0000-000000000002',
    slug: 'premium-lovebird-cockatiel-seed-mix',
    title: 'Tidbit Premium Lovebird & Cockatiel Seed Mix',
    subtitle: 'Diversified foraging blend with safflower, pumpkin kernels, and dried botanical herbs.',
    description:
      'A robust, nutrient-dense formula designed for medium hookbills. Rich in unsaturated fatty acids, balanced calcium-to-phosphorus ratio, and crunchy textures that satisfy natural beak foraging instincts.',
    species: 'lovebird',
    speciesName: 'Lovebird & Cockatiel',
    badge: 'Bestseller',
    ratingAvg: 4.9,
    ratingCount: 127,
    basePriceCents: 1499,
    compareAtPriceCents: 1999,
    milledOn: '2026-09-16',
    bestBy: '2027-08-31',
    ingredients: [
      'White Proso Millet',
      'Safflower Seed',
      'Buckwheat',
      'Sunflower Kernels',
      'Canary Grass Seed',
      'Pecan Pieces',
      'Dried Rosehips',
      'Papaya Dices',
      'Chelated Zinc',
      'Vitamin D3',
    ],
    imageUrls: ['/images/products/lovebird-premium-mix.png'],
    variants: [
      {
        id: 'var-lovebird-1kg',
        label: '1 kg',
        priceCents: 1499,
        compareAtPriceCents: 1999,
        stock: 120,
      },
      {
        id: 'var-lovebird-3kg',
        label: '3 kg',
        priceCents: 3799,
        compareAtPriceCents: 4999,
        stock: 80,
      },
      {
        id: 'var-lovebird-5kg',
        label: '5 kg',
        priceCents: 5799,
        compareAtPriceCents: 7499,
        stock: 45,
      },
    ],
    nutritionFacts: [
      {
        nutrient: 'Crude Protein (min)',
        valueText: '14.2%',
        valueNumeric: 14.2,
        unit: '%',
        displayOrder: 1,
      },
      {
        nutrient: 'Crude Fat (min)',
        valueText: '8.9%',
        valueNumeric: 8.9,
        unit: '%',
        displayOrder: 2,
      },
      {
        nutrient: 'Crude Fiber (max)',
        valueText: '7.0%',
        valueNumeric: 7.0,
        unit: '%',
        displayOrder: 3,
      },
      {
        nutrient: 'Calcium / Phosphorus Ratio',
        valueText: '1.9 : 1',
        valueNumeric: 1.9,
        unit: 'ratio',
        displayOrder: 4,
      },
    ],
    feedingGuidance: {
      speciesName: 'Lovebird & Cockatiel',
      birdWeightRangeG: '45–90g',
      dailyAmountG: '12–18g (1.5–2 tablespoons)',
      notes:
        'Remove hulls daily. Pair with fresh chopped vegetables and mineral block.',
    },
    reviews: [],
  },
  {
    id: '10000000-0000-0000-0000-000000000003',
    slug: 'goldfinch-french-canary-seed-formula',
    title: 'Tidbit Goldfinch / French & Canary Seed Formula',
    subtitle: 'Triple-cleaned micro-seed blend formulated for delicate beaks and active metabolism.',
    description:
      'A specialized blend formulated with premium niger seed, perilla, rapeseed, and wild lettuce seed to support intense singing vitality, rapid feather replacement, and optimal digestion for all finches and canaries.',
    species: 'finch',
    speciesName: 'Finch & Canary',
    badge: 'Advanced Formula',
    ratingAvg: 4.8,
    ratingCount: 127,
    basePriceCents: 1349,
    compareAtPriceCents: 1899,
    milledOn: '2026-09-12',
    bestBy: '2027-08-31',
    ingredients: [
      'Grade A Niger Seed',
      'Canary Grass Seed',
      'White Lettuce Seed',
      'Red Rapeseed',
      'Golden Flaxseed',
      'White Perilla',
      'Anise Seed',
      'Alfalfa Leaf Flour',
      'Spirulina',
    ],
    imageUrls: ['/images/products/finch-goldfinch-formula.png'],
    variants: [
      {
        id: 'var-finch-1kg',
        label: '1 kg',
        priceCents: 1349,
        compareAtPriceCents: 1899,
        stock: 140,
      },
      {
        id: 'var-finch-3kg',
        label: '3 kg',
        priceCents: 3499,
        compareAtPriceCents: 4699,
        stock: 75,
      },
      {
        id: 'var-finch-5kg',
        label: '5 kg',
        priceCents: 5299,
        compareAtPriceCents: 6999,
        stock: 50,
      },
    ],
    nutritionFacts: [
      {
        nutrient: 'Crude Protein (min)',
        valueText: '13.8%',
        valueNumeric: 13.8,
        unit: '%',
        displayOrder: 1,
      },
      {
        nutrient: 'Crude Fat (min)',
        valueText: '7.1%',
        valueNumeric: 7.1,
        unit: '%',
        displayOrder: 2,
      },
      {
        nutrient: 'Crude Fiber (max)',
        valueText: '6.4%',
        valueNumeric: 6.4,
        unit: '%',
        displayOrder: 3,
      },
      {
        nutrient: 'Calcium / Phosphorus Ratio',
        valueText: '1.5 : 1',
        valueNumeric: 1.5,
        unit: 'ratio',
        displayOrder: 4,
      },
    ],
    feedingGuidance: {
      speciesName: 'Finch & Canary',
      birdWeightRangeG: '10–25g',
      dailyAmountG: '3–6g (1–1.5 teaspoons)',
      notes:
        'Scatter or feed in shallow dishes. Essential to keep dry and well-aerated.',
    },
    reviews: [],
  },
];

export function getProductBySpeciesAndSlug(
  species: string,
  slug: string
): DetailedProduct | undefined {
  const normalizedSpecies = species.toLowerCase();
  const normalizedSlug = slug.toLowerCase();

  // Support direct slug or aliases such as 'daily-vitality'
  return CATALOG_PRODUCTS.find((p) => {
    const matchesSpecies = p.species === normalizedSpecies || (normalizedSpecies === 'budgerigar' && p.species === 'budgerigar');
    const matchesSlug =
      p.slug === normalizedSlug ||
      (normalizedSlug === 'daily-vitality' && p.slug === 'parakeet-budgerigar-daily-vitality') ||
      p.slug.includes(normalizedSlug);
    return matchesSpecies && matchesSlug;
  }) || CATALOG_PRODUCTS[0]; // fallback to primary POC product
}

export function getRelatedProducts(species: string, currentProductId: string): DetailedProduct[] {
  // Return products matching the Budgerigar lane or other products excluding current
  const sameSpecies = CATALOG_PRODUCTS.filter((p) => p.species === species && p.id !== currentProductId);
  if (sameSpecies.length > 0) return sameSpecies;
  return CATALOG_PRODUCTS.filter((p) => p.id !== currentProductId);
}
