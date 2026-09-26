# Tidbit System Architecture

## Stack
- **Frontend + API:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Database:** PostgreSQL via Supabase
- **Auth:** NextAuth.js (email magic link + optional Google)
- **Payments:** Stripe (test mode for POC)
- **Email:** Resend
- **Deployment:** Vercel + Supabase
- **Fonts:** Plus Jakarta Sans, Inter (self-hosted via `next/font`)

## Design Tokens
Canonical source: `docs/design/DESIGN.md`. Agent-executable summary: `.agents/skills/design-system/SKILL.md`. Every component must consume tokens via CSS variables, never hard-coded hex.

## Data Model

### `species`
- `id` (uuid, pk)
- `slug` ('budgerigar' | 'lovebird' | 'finch')
- `name` ('Budgerigar', 'Lovebird & Cockatiel', 'Finch & Canary')
- `color_base`, `color_wash`, `color_accent` (hex — mirrors design-system)
- `hero_image_url`
- `short_description`

### `products`
- `id` (uuid, pk)
- `slug`
- `title`
- `subtitle`
- `description`
- `primary_species_id` (fk → species.id)  ← determines visual lane
- `additional_species_ids` (uuid[])       ← cross-lane products
- `base_price_cents`
- `compare_at_price_cents` (nullable)
- `badges` (text[] — 'bestseller', 'advanced-formula', 'non-gmo', 'vet-formulated')
- `rating_avg`, `rating_count`
- `milled_on` (date)                      ← freshness window
- `best_by` (date)
- `ingredients` (text[])
- `image_urls` (text[])
- `created_at`, `updated_at`

### `product_variants`
- `id` (uuid, pk)
- `product_id` (fk)
- `label` ('1 kg', '3 kg', '5 kg', '10 kg')
- `price_cents`
- `compare_at_price_cents`
- `stock`

### `nutrition_facts`
- `id` (uuid, pk)
- `product_id` (fk)
- `nutrient` ('crude_protein', 'crude_fat', 'crude_fiber', 'calcium_phosphorus_ratio', ...)
- `value_text` (e.g., '11.5%', '1.8 : 1')
- `value_numeric` (decimal, for sorting)
- `unit` ('%', 'ratio', 'mg/kg')
- `display_order` (int)

### `feeding_guidance`
- `id` (uuid, pk)
- `product_id` (fk)
- `species_id` (fk)
- `bird_weight_range_g` (text)
- `daily_amount_g` (text)
- `notes`

### `reviews`
- `id` (uuid, pk)
- `product_id` (fk)
- `author_name`, `author_location`
- `rating` (1–5)
- `title`, `body`
- `verified_purchase` (bool)
- `created_at`

### `carts` / `cart_items` / `orders` / `order_items`
Standard e-commerce shape. `cart_items` reference `product_variant_id`. `order_items` snapshot price, title, species, and weight at purchase time.

### `newsletter_subscribers`
- `email`, `subscribed_at`, `source`

## API Contracts

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/species` | List species with colors + hero images |
| GET | `/api/products` | List products; supports `?species=`, `?badge=`, `?sort=`, `?search=` |
| GET | `/api/products/:slug` | PDP data (includes nutrition_facts, feeding_guidance, reviews) |
| GET | `/api/products/:slug/related` | Same species lane, excluding self |
| POST | `/api/cart` | Add variant to cart |
| PATCH | `/api/cart/items/:id` | Update quantity |
| DELETE | `/api/cart/items/:id` | Remove |
| GET | `/api/cart` | Current cart with species metadata for theming |
| POST | `/api/checkout` | Create Stripe PaymentIntent |
| POST | `/api/webhooks/stripe` | Order creation on `payment_intent.succeeded` |
| POST | `/api/newsletter` | Subscribe |

## SEO
- Species pages: `/{species-slug}` e.g. `/budgerigar`
- PDPs: `/{species-slug}/{product-slug}` e.g. `/budgerigar/daily-vitality`
- Structured data: `Product` + `AggregateRating` on PDPs, `Organization` on homepage
- OG images generated per species lane using the wash background