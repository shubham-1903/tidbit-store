-- =============================================================================
-- Tidbit Initial Database Schema
-- Supabase / PostgreSQL Migration
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Helper function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -----------------------------------------------------------------------------
-- 1. SPECIES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS species (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  color_base TEXT NOT NULL,
  color_wash TEXT NOT NULL,
  color_accent TEXT,
  hero_image_url TEXT,
  short_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 2. PRODUCTS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  primary_species_id UUID REFERENCES species(id) ON DELETE SET NULL,
  additional_species_ids UUID[] NOT NULL DEFAULT '{}',
  base_price_cents INTEGER NOT NULL CHECK (base_price_cents >= 0),
  compare_at_price_cents INTEGER CHECK (compare_at_price_cents IS NULL OR compare_at_price_cents >= 0),
  badges TEXT[] NOT NULL DEFAULT '{}',
  rating_avg NUMERIC(3, 2) NOT NULL DEFAULT 0.00 CHECK (rating_avg >= 0 AND rating_avg <= 5.00),
  rating_count INTEGER NOT NULL DEFAULT 0 CHECK (rating_count >= 0),
  milled_on DATE,
  best_by DATE,
  ingredients TEXT[] NOT NULL DEFAULT '{}',
  image_urls TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER trigger_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- 3. PRODUCT_VARIANTS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  compare_at_price_cents INTEGER CHECK (compare_at_price_cents IS NULL OR compare_at_price_cents >= 0),
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 4. NUTRITION_FACTS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS nutrition_facts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  nutrient TEXT NOT NULL,
  value_text TEXT NOT NULL,
  value_numeric NUMERIC(10, 2),
  unit TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 5. FEEDING_GUIDANCE TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS feeding_guidance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  species_id UUID REFERENCES species(id) ON DELETE SET NULL,
  bird_weight_range_g TEXT NOT NULL,
  daily_amount_g TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 6. REVIEWS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_location TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  body TEXT NOT NULL,
  verified_purchase BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 7. CARTS & CART_ITEMS TABLES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT UNIQUE,
  user_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER trigger_carts_updated_at
  BEFORE UPDATE ON carts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_variant_id UUID NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_cart_variant UNIQUE (cart_id, product_variant_id)
);

CREATE OR REPLACE TRIGGER trigger_cart_items_updated_at
  BEFORE UPDATE ON cart_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- 8. ORDERS & ORDER_ITEMS TABLES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  email TEXT NOT NULL,
  total_cents INTEGER NOT NULL CHECK (total_cents >= 0),
  subtotal_cents INTEGER NOT NULL CHECK (subtotal_cents >= 0),
  shipping_cents INTEGER NOT NULL DEFAULT 0 CHECK (shipping_cents >= 0),
  tax_cents INTEGER NOT NULL DEFAULT 0 CHECK (tax_cents >= 0),
  status TEXT NOT NULL DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  shipping_address JSONB,
  billing_address JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER trigger_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  product_title TEXT NOT NULL,
  species_name TEXT,
  variant_label TEXT NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 9. NEWSLETTER SUBSCRIBERS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'homepage',
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- INDEXES
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_species_slug ON species(slug);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_primary_species ON products(primary_species_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_nutrition_facts_product_id ON nutrition_facts(product_id);
CREATE INDEX IF NOT EXISTS idx_nutrition_facts_display_order ON nutrition_facts(product_id, display_order);
CREATE INDEX IF NOT EXISTS idx_feeding_guidance_product_id ON feeding_guidance(product_id);
CREATE INDEX IF NOT EXISTS idx_feeding_guidance_species_id ON feeding_guidance(species_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_carts_session_id ON carts(session_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_pi ON orders(stripe_payment_intent_id);

-- -----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------

-- Enable RLS on catalog tables
ALTER TABLE species ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE feeding_guidance ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Enable RLS on cart and order tables
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public read access policies for catalog data
DO $$
BEGIN
  -- species
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'species' AND policyname = 'Public read species') THEN
    CREATE POLICY "Public read species" ON species FOR SELECT USING (true);
  END IF;

  -- products
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'products' AND policyname = 'Public read products') THEN
    CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
  END IF;

  -- product_variants
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'product_variants' AND policyname = 'Public read product_variants') THEN
    CREATE POLICY "Public read product_variants" ON product_variants FOR SELECT USING (true);
  END IF;

  -- nutrition_facts
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'nutrition_facts' AND policyname = 'Public read nutrition_facts') THEN
    CREATE POLICY "Public read nutrition_facts" ON nutrition_facts FOR SELECT USING (true);
  END IF;

  -- feeding_guidance
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'feeding_guidance' AND policyname = 'Public read feeding_guidance') THEN
    CREATE POLICY "Public read feeding_guidance" ON feeding_guidance FOR SELECT USING (true);
  END IF;

  -- reviews
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'reviews' AND policyname = 'Public read reviews') THEN
    CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);
  END IF;

  -- carts: allow public access for anonymous sessions
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'carts' AND policyname = 'Public access carts') THEN
    CREATE POLICY "Public access carts" ON carts FOR ALL USING (true) WITH CHECK (true);
  END IF;

  -- cart_items: allow public access for cart operations
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cart_items' AND policyname = 'Public access cart_items') THEN
    CREATE POLICY "Public access cart_items" ON cart_items FOR ALL USING (true) WITH CHECK (true);
  END IF;

  -- orders: allow public read and insert
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'orders' AND policyname = 'Public insert orders') THEN
    CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'orders' AND policyname = 'Public select orders') THEN
    CREATE POLICY "Public select orders" ON orders FOR SELECT USING (true);
  END IF;

  -- order_items: allow public read and insert
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'order_items' AND policyname = 'Public insert order_items') THEN
    CREATE POLICY "Public insert order_items" ON order_items FOR INSERT WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'order_items' AND policyname = 'Public select order_items') THEN
    CREATE POLICY "Public select order_items" ON order_items FOR SELECT USING (true);
  END IF;

  -- newsletter: allow public insert
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'newsletter_subscribers' AND policyname = 'Public insert newsletter') THEN
    CREATE POLICY "Public insert newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
  END IF;
END $$;
