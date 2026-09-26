---
name: ecommerce-patterns
description: Tidbit-specific e-commerce conventions — species taxonomy, product cards, species pages, PDPs, cart, and checkout. Load when building any customer-facing storefront feature.
---

# Tidbit E-commerce Patterns

## Species Taxonomy (Core to Everything)

Tidbit sells by **species line**, not generic "bird food." Every product belongs to at least one lane:

| Lane | Species | Color Theme |
|---|---|---|
| `budgerigar` | Budgerigar, Parakeet | Green (`#2E7D32` base / `#E8F5E9` wash) |
| `lovebird` | Lovebird, Cockatiel | Magenta (`#AD1457` base / `#FCE4EC` wash) |
| `finch` | Finch, Canary, Goldfinch | Amber (`#F57F17` base / `#FFF8E1` wash) |

**Data rule:** A product may be tagged for multiple species (e.g., a "Small Beak Blend" for both budgies and finches), but the **primary species** determines its visual lane.

## Header / Navigation

Required nav items (from approved mockup):
- Logo: **Tidbit** (with a small icon)
- Links: Quick Shop · Shop by Species · Best Sellers · Ingredients & Quality · Wholesale / Bulk · About Us
- Icons: Search · Wishlist (heart) · Account · Cart
- Sticky announcement bar above: promo message + free-shipping threshold

## Homepage Section Order

1. Announcement bar
2. Header
3. Hero — "Pure Nutrition for Every Feather." with three trust badges (100% Organic, Vet Formulated, Non-GMO), primary CTA "Shop All Bird Food", secondary "Find Your Bird's Mix"
4. Trust strip — Avian Nutritionist Approved · 100% Organic Ingredients · 30+ Years Combined Experience
5. **Tailored by Species** — 3 species cards (one per lane) with a species-colored CTA at the bottom of each
6. **Fresh Batches Ready to Ship** — filter chips (All, Budgerigars, Cockatiel & Lovebird, Finches & Canaries) + product grid
7. **Why Avian Caretakers Trust Tidbit** — 4 feature cards (Complete Amino Acids, Calcium + Vitamin D3, 9x Cleaned Seeds, Clear Freshness Window)
8. **Guaranteed Nutritional Analysis** — cross-species comparison table
9. **Loved by Thousands of Happy Wings** — 3 testimonials + Resident Avian Clinician block
10. Newsletter — "Get weekly avian care guides & 15% off first order"
11. Footer — 4 columns (Shop by Species, Scientific Nutrition, Customer Care, Wholesale & Brand) + payment icons

## Species Card (Homepage)

- `rounded-xl` (24px), Level 1 elevation, `1px solid #E7E5E4`
- Image stage background: species **wash**
- Top-left badge: e.g. "Budgie", "Lovebird", "Finch" — pill, species base text on species wash
- Title: `headline-sm` (Plus Jakarta Sans 22/600)
- Subtitle: species description in `body-sm`, `--text-muted`
- Feature bullets: 4 checkmark items in `body-sm`
- CTA: **"«Species» Recipe →"** — pill button in species base color, label-lg, white text

## Product Card

- `rounded-lg`, Level 1 elevation → Level 2 on hover
- Image stage on species wash
- Top-left floating badge pill: `BESTSELLER`, `ADVANCED FORMULA`, `ADVANCED`, `NON-GMO`, `VET FORMULATED` — caption typography
- Title: `title-sm` (Plus Jakarta Sans 16/600)
- Rating row: star cluster + review count in `body-sm` `--text-muted`
- Price row: current price in `title-md`, original price struck-through in `body-sm` `--text-subtle`, savings pill (e.g., "Save 25%") in species wash
- CTA: **"Add to Cart"** — species-colored pill button, icon + label
- Variant selector (weight: 1kg / 3kg / 5kg) as chips above CTA when applicable

## Product Detail Page (PDP)

Sections in order:
1. Breadcrumb
2. Gallery (left) + Buy box (right)
3. Guaranteed Nutritional Analysis table
4. Ingredients list
5. Feeding guidance (per species, per weight)
6. Freshness window / milling date note
7. Reviews
8. Related products (same species lane)

**Buy box contains:** species badge, product title, rating, price block with savings pill, weight variant chips, quantity stepper, Add to Cart, wishlist, ship-by promise.

## Guaranteed Analysis Table — Schema

Columns vary by product, but the canonical cross-species table on the homepage has:

| Nutrient | Budgerigar Daily Intake | Lovebird & Cockatiel Mix | Finch & Canary Formula |
|---|---|---|---|
| Crude Protein | 11.5% | 14.2% | 13.8% |
| Crude Fat | 5.2% | 8.9% | 7.1% |
| Crude Fiber | 6.8% | 7.0% | 6.4% |
| Calcium / Phosphorus Ratio | 1.8 : 1 | 1.9 : 1 | 1.5 : 1 |

Rendered with `tabular-nums`, right-aligned figures, alternating row tint. Row headers in Inter `body-sm`.

## Cart & Checkout

- Mini-cart: `rounded-lg` drawer, Level 3 elevation, scrim `rgba(33,33,33,0.35)` + `8px` blur
- Cart line item: product image on species wash, title, weight variant, quantity stepper, line price
- Free-shipping progress bar: fill in `#2E7D32` on `#F3F2ED` track
- Checkout: 2-column (form left, order summary right). Stripe Elements for payment.
- Post-purchase: `/thank-you` page with order ID and next-order discount code

## "Freshness Window"

Every product carries a `milled_on` date and a `best_by` date. Display as a **"Clear Freshness Window"** badge with the milled date and a progress indicator. This is a brand differentiator — always surface it on PDP and cart.

## When to Use This Skill
- Building or editing any species page, PDP, cart, or checkout flow.
- Generating the product grid, filter chips, or species cards.
- Writing any query that filters products by species.