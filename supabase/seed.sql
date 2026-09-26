-- =============================================================================
-- Tidbit Database Seed Data
-- Mirrors docs/architecture/system-overview.md and docs/specs/poc-scope.md
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. SPECIES SEED DATA (3 Canonical Species Lines)
-- -----------------------------------------------------------------------------
INSERT INTO species (
  id,
  slug,
  name,
  color_base,
  color_wash,
  color_accent,
  hero_image_url,
  short_description
) VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'budgerigar',
    'Budgerigar',
    '#2E7D32',
    '#E8F5E9',
    '#4CAF50',
    '/images/species/budgerigar-hero.png',
    'Pure, botanical nutrition tailored for the high metabolic rate and active vitality of Budgerigars and Parakeets.'
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'lovebird',
    'Lovebird & Cockatiel',
    '#AD1457',
    '#FCE4EC',
    '#D81B60',
    '/images/species/lovebird-hero.png',
    'Rich amino acids, healthy seed oils, and calcium formulated for the active foraging behavior of Lovebirds and Cockatiels.'
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'finch',
    'Finch & Canary',
    '#F57F17',
    '#FFF8E1',
    '#FBC02D',
    '/images/species/finch-hero.png',
    'Precision-sized micro-seeds and delicate grains tailored for the small beaks and rapid digestion of Finches and Canaries.'
  )
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  name = EXCLUDED.name,
  color_base = EXCLUDED.color_base,
  color_wash = EXCLUDED.color_wash,
  color_accent = EXCLUDED.color_accent,
  hero_image_url = EXCLUDED.hero_image_url,
  short_description = EXCLUDED.short_description;

-- -----------------------------------------------------------------------------
-- 2. PRODUCTS SEED DATA (3 POC Products)
-- -----------------------------------------------------------------------------
INSERT INTO products (
  id,
  slug,
  title,
  subtitle,
  description,
  primary_species_id,
  additional_species_ids,
  base_price_cents,
  compare_at_price_cents,
  badges,
  rating_avg,
  rating_count,
  milled_on,
  best_by,
  ingredients,
  image_urls
) VALUES
  (
    '10000000-0000-0000-0000-000000000001',
    'parakeet-budgerigar-daily-vitality',
    'Tidbit Parakeet & Budgerigar Daily Vitality',
    'Whole-grain botanical vitality blend with chelated minerals and cold-pressed seed oils.',
    'Scientifically balanced daily nutrition formulated specifically for budgerigars and parakeets. Features clean Canary grass seed, golden millet, red millet, oat groats, and flaxseed enriched with bioavailable calcium and essential amino acids for vibrant plumage and daily energy.',
    '00000000-0000-0000-0000-000000000001',
    ARRAY[]::UUID[],
    1299,
    1899,
    ARRAY['advanced-formula', 'non-gmo', 'vet-formulated'],
    4.90,
    208,
    '2026-09-14',
    '2027-08-31',
    ARRAY[
      'Canary Grass Seed',
      'Golden German Millet',
      'Red Siberian Millet',
      'Steel-Cut Oat Groats',
      'Flaxseed',
      'Canola Seed',
      'Sesame Seed',
      'Hemp Seed',
      'Ground Oyster Shell',
      'Avian Prebiotic Blend'
    ],
    ARRAY['/images/products/budgie-daily-vitality.png']
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    'premium-lovebird-cockatiel-seed-mix',
    'Tidbit Premium Lovebird & Cockatiel Seed Mix',
    'Diversified foraging blend with safflower, pumpkin kernels, and dried botanical herbs.',
    'A robust, nutrient-dense formula designed for medium hookbills. Rich in unsaturated fatty acids, balanced calcium-to-phosphorus ratio, and crunchy textures that satisfy natural beak foraging instincts.',
    '00000000-0000-0000-0000-000000000002',
    ARRAY[]::UUID[],
    1499,
    1999,
    ARRAY['bestseller', 'vet-formulated'],
    4.90,
    127,
    '2026-09-16',
    '2027-08-31',
    ARRAY[
      'White Proso Millet',
      'Safflower Seed',
      'Buckwheat',
      'Sunflower Kernels',
      'Canary Grass Seed',
      'Pecan Pieces',
      'Dried Rosehips',
      'Papaya Dices',
      'Chelated Zinc',
      'Vitamin D3'
    ],
    ARRAY['/images/products/lovebird-premium-mix.png']
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    'goldfinch-french-canary-seed-formula',
    'Tidbit Goldfinch / French & Canary Seed Formula',
    'Triple-cleaned micro-seed blend formulated for delicate beaks and active metabolism.',
    'A specialized blend formulated with premium niger seed, perilla, rapeseed, and wild lettuce seed to support intense singing vitality, rapid feather replacement, and optimal digestion for all finches and canaries.',
    '00000000-0000-0000-0000-000000000003',
    ARRAY[]::UUID[],
    1349,
    1899,
    ARRAY['advanced', 'non-gmo'],
    4.80,
    127,
    '2026-09-12',
    '2027-08-31',
    ARRAY[
      'Grade A Niger Seed',
      'Canary Grass Seed',
      'White Lettuce Seed',
      'Red Rapeseed',
      'Golden Flaxseed',
      'White Perilla',
      'Anise Seed',
      'Alfalfa Leaf Flour',
      'Spirulina'
    ],
    ARRAY['/images/products/finch-goldfinch-formula.png']
  )
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  primary_species_id = EXCLUDED.primary_species_id,
  additional_species_ids = EXCLUDED.additional_species_ids,
  base_price_cents = EXCLUDED.base_price_cents,
  compare_at_price_cents = EXCLUDED.compare_at_price_cents,
  badges = EXCLUDED.badges,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count,
  milled_on = EXCLUDED.milled_on,
  best_by = EXCLUDED.best_by,
  ingredients = EXCLUDED.ingredients,
  image_urls = EXCLUDED.image_urls;

-- -----------------------------------------------------------------------------
-- 3. PRODUCT_VARIANTS SEED DATA (1kg, 3kg, 5kg variants for each product)
-- -----------------------------------------------------------------------------
INSERT INTO product_variants (
  id,
  product_id,
  label,
  price_cents,
  compare_at_price_cents,
  stock
) VALUES
  -- Budgerigar Daily Vitality Variants
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '1 kg', 1299, 1899, 150),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', '3 kg', 3299, 4499, 95),
  ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', '5 kg', 4999, 6999, 60),

  -- Lovebird & Cockatiel Seed Mix Variants
  ('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000002', '1 kg', 1499, 1999, 120),
  ('20000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000002', '3 kg', 3799, 4999, 80),
  ('20000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000002', '5 kg', 5799, 7499, 45),

  -- Finch & Canary Formula Variants
  ('20000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000003', '1 kg', 1349, 1899, 140),
  ('20000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000003', '3 kg', 3499, 4699, 75),
  ('20000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000003', '5 kg', 5299, 6999, 50)
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  label = EXCLUDED.label,
  price_cents = EXCLUDED.price_cents,
  compare_at_price_cents = EXCLUDED.compare_at_price_cents,
  stock = EXCLUDED.stock;

-- -----------------------------------------------------------------------------
-- 4. NUTRITION_FACTS SEED DATA (Canonical Cross-Species Table)
-- -----------------------------------------------------------------------------
INSERT INTO nutrition_facts (
  id,
  product_id,
  nutrient,
  value_text,
  value_numeric,
  unit,
  display_order
) VALUES
  -- Budgerigar Daily Vitality Nutrition Facts
  ('30000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Crude Protein', '11.5%', 11.50, '%', 1),
  ('30000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Crude Fat', '5.2%', 5.20, '%', 2),
  ('30000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'Crude Fiber', '6.8%', 6.80, '%', 3),
  ('30000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', 'Ca / P Ratio', '1.8 : 1', 1.80, 'ratio', 4),

  -- Lovebird & Cockatiel Seed Mix Nutrition Facts
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000002', 'Crude Protein', '14.2%', 14.20, '%', 1),
  ('30000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000002', 'Crude Fat', '8.9%', 8.90, '%', 2),
  ('30000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000002', 'Crude Fiber', '7.0%', 7.00, '%', 3),
  ('30000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000002', 'Ca / P Ratio', '1.9 : 1', 1.90, 'ratio', 4),

  -- Finch & Canary Formula Nutrition Facts
  ('30000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000003', 'Crude Protein', '13.8%', 13.80, '%', 1),
  ('30000000-0000-0000-0000-000000000010', '10000000-0000-0000-0000-000000000003', 'Crude Fat', '7.1%', 7.10, '%', 2),
  ('30000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000003', 'Crude Fiber', '6.4%', 6.40, '%', 3),
  ('30000000-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000003', 'Ca / P Ratio', '1.5 : 1', 1.50, 'ratio', 4)
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  nutrient = EXCLUDED.nutrient,
  value_text = EXCLUDED.value_text,
  value_numeric = EXCLUDED.value_numeric,
  unit = EXCLUDED.unit,
  display_order = EXCLUDED.display_order;

-- -----------------------------------------------------------------------------
-- 5. FEEDING_GUIDANCE SEED DATA
-- -----------------------------------------------------------------------------
INSERT INTO feeding_guidance (
  id,
  product_id,
  species_id,
  bird_weight_range_g,
  daily_amount_g,
  notes
) VALUES
  (
    '40000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    '30–45g',
    '4–8g (1–2 teaspoons)',
    'Provide fresh seed daily. Supplement with fresh leafy greens and clean water.'
  ),
  (
    '40000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000002',
    '45–90g',
    '12–18g (1.5–2 tablespoons)',
    'Remove hulls daily. Pair with fresh chopped vegetables and mineral block.'
  ),
  (
    '40000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000003',
    '10–25g',
    '3–6g (1–1.5 teaspoons)',
    'Scatter or feed in shallow dishes. Essential to keep dry and well-aerated.'
  )
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  species_id = EXCLUDED.species_id,
  bird_weight_range_g = EXCLUDED.bird_weight_range_g,
  daily_amount_g = EXCLUDED.daily_amount_g,
  notes = EXCLUDED.notes;

-- -----------------------------------------------------------------------------
-- 6. REVIEWS SEED DATA (Sarah Johnson, Marcus Vance, Dr. Elena Lin)
-- -----------------------------------------------------------------------------
INSERT INTO reviews (
  id,
  product_id,
  author_name,
  author_location,
  rating,
  title,
  body,
  verified_purchase
) VALUES
  (
    '50000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'Sarah Johnson',
    'Portland, OR',
    5,
    'My budgies love this mix!',
    'My budgies love this mix. Their plumage has never been brighter and the freshness right out of the vacuum seal is incredible. Zero dust or empty hulls.',
    TRUE
  ),
  (
    '50000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    'Marcus Vance',
    'Austin, TX',
    5,
    'The freshness is next level',
    'The freshness is next level. You can actually smell the freshly milled grains and clean botanicals. Both of my birds took to it immediately without any transition fuss.',
    TRUE
  ),
  (
    '50000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000001',
    'Dr. Elena Lin',
    'Resident Avian Clinician, Seattle',
    5,
    'Exceptional amino balance and bioavailable calcium',
    'Clean oils, chelated minerals, and proper Ca:P ratio make this formula stand out against typical seed diets. I routinely recommend Tidbit to companion avian caretakers.',
    TRUE
  )
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  author_name = EXCLUDED.author_name,
  author_location = EXCLUDED.author_location,
  rating = EXCLUDED.rating,
  title = EXCLUDED.title,
  body = EXCLUDED.body,
  verified_purchase = EXCLUDED.verified_purchase;
