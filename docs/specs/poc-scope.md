# POC Scope — Budgerigar Vertical Slice

## Goal
A visitor can land on the Budgerigar species page, browse products, open a PDP,
add a variant to cart, and complete a Stripe test-mode checkout.

## Seed Data (from approved mockup)

### Species
- Budgerigar — base `#2E7D32`, wash `#E8F5E9`
- Lovebird & Cockatiel — base `#AD1457`, wash `#FCE4EC`
- Finch & Canary — base `#F57F17`, wash `#FFF8E1`

### Products (minimum for POC)
1. **Tidbit Premium Lovebird & Cockatiel Seed Mix** — lovebird lane
   - $14.99 (was $19.99) · Bestseller · 4.9 ★ (127) · variants 1kg / 3kg / 5kg
2. **Tidbit Parakeet & Budgerigar Daily Vitality** — budgerigar lane
   - $12.99 (was $18.99) · Advanced Formula · 4.9 ★ (208) · variants 1kg / 3kg / 5kg
3. **Tidbit Goldfinch / French & Canary Seed Formula** — finch lane
   - $13.49 (was $18.99) · Advanced · 4.8 ★ (127) · variants 1kg / 3kg / 5kg

### Nutrition (canonical cross-species table)
| Nutrient | Budgerigar | Lovebird & Cockatiel | Finch & Canary |
|---|---|---|---|
| Crude Protein | 11.5% | 14.2% | 13.8% |
| Crude Fat | 5.2% | 8.9% | 7.1% |
| Crude Fiber | 6.8% | 7.0% | 6.4% |
| Ca / P Ratio | 1.8 : 1 | 1.9 : 1 | 1.5 : 1 |

### Reviews (seed)
- Sarah Johnson — Verified — "My budgies love this mix..."
- Marcus Vance — Verified — "The freshness is next level..."
- Dr. Elena Lin — Resident Avian Clinician — "Clean oils, chelated minerals, and proper Ca:P ratio..."

## Acceptance Criteria

### Species page (`/budgerigar`)
- [ ] Page renders with Budgerigar species wash as the hero background
- [ ] Product grid shows only products tagged for the budgerigar lane
- [ ] Every product card uses the Budgerigar base color for "Add to Cart"
- [ ] Filter chips (All / 1kg / 3kg / 5kg) filter without page reload
- [ ] Loading state uses skeleton cards

### PDP (`/budgerigar/[slug]`)
- [ ] Buy box shows species badge, title, rating, price block, savings pill
- [ ] Weight variant chips switch price without reload
- [ ] Quantity stepper operates correctly
- [ ] Guaranteed Nutritional Analysis table renders with `tabular-nums`, right-aligned figures, alternating row tint, no vertical grid lines
- [ ] Freshness Window badge shows `milled_on` and `best_by`
- [ ] Related products section shows only budgerigar-lane items

### Cart
- [ ] Mini-cart drawer opens with Level 3 elevation + scrim
- [ ] Line items display product image on species wash
- [ ] Free-shipping progress bar fills correctly toward the threshold
- [ ] Quantity changes persist across reloads

### Checkout
- [ ] Stripe Elements collects payment in test mode
- [ ] Successful payment creates `orders` + `order_items`
- [ ] Redirect to `/thank-you?order={id}`
- [ ] `order_items` snapshot price, title, species, and weight at purchase

### Cross-cutting
- [ ] Every color used exists in the `design-system` skill (no hard-coded hex)
- [ ] All headings use Plus Jakarta Sans; all body/data uses Inter
- [ ] Buttons are 48px min-height, pill-shaped
- [ ] E2E test passes: homepage → species page → PDP → add to cart → checkout → thank-you

## Out of Scope (post-POC)
- Auth
- Admin / inventory dashboard
- Wholesale / bulk pricing
- Email notifications
- Multi-currency
- Lovebird and Finch species pages (build after Budgerigar proves the pattern)

## Definition of Done
- All acceptance criteria pass
- `pnpm typecheck`, `pnpm lint`, `pnpm test` all green
- PR opened with design-token audit checklist filled in
- Screenshots attached to PR for UI changes