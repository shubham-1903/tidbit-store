---
name: design-system
description: Tidbit brand design tokens and component rules. Load for ANY UI work — components, pages, tables, buttons, chips, cards. This is the single source of truth for visual output.
---

# Tidbit Design System

> Full reference: `docs/design/DESIGN.md`. This file is the agent-executable summary.
> ⚠️ Where DESIGN.md YAML and narrative conflict, the **narrative section values win** (they match the approved mockup).

> **Project Structure:** All frontend code lives inside the `frontend/` directory. 
> The Tailwind config is at `frontend/tailwind.config.ts`. 
> Components are at `frontend/src/components/`.

## Color Tokens — Foundation

| Token | Value | Use |
|---|---|---|
| `--canvas` | `#F9F9F6` | Page background (Soft Stone Linen) |
| `--surface` | `#FFFFFF` | Cards, elevated containers |
| `--surface-subtle` | `#F3F2ED` | Input backgrounds, disabled states, quantity stepper shell |
| `--border` | `#E7E5E4` | Hairline separators, card outlines |
| `--text-primary` | `#212121` | Headlines, prices, body |
| `--text-muted` | `#57534E` | Supporting copy, meta tags |
| `--text-subtle` | `#78716C` | Placeholders, deactivated labels |

## Color Tokens — Species Taxonomy (STRICT LANES)

Every product, badge, chip, and CTA belongs to exactly one species lane.

### Budgerigar Line (Primary — Green)
- Base: `#2E7D32`
- Interactive / hover: `#4CAF50`
- Wash / tint: `#E8F5E9`
- Hover deepen: `#276A2B`

### Lovebird & Cockatiel Line (Secondary — Magenta)
- Base: `#AD1457`
- Interactive / hover: `#D81B60`
- Wash / tint: `#FCE4EC`

### Finch & Canary Line (Tertiary — Amber)
- Base: `#F57F17`
- Interactive / hover: `#FBC02D`
- Wash / tint: `#FFF8E1`

**Rules for species lanes:**
- Use the **wash** only as badge backdrops, highlighted table rows, image-stage backgrounds, and packaging accents.
- **Never** flood a full viewport with a species wash.
- Category buy buttons inherit the species base color.
- Chips in selected state: tinted background + `1.5px` border in base + text in base color (label-sm typography).

## Typography

| Role | Family | Size / Weight / LH |
|---|---|---|
| display-lg | Plus Jakarta Sans | 56 / 700 / 64, ls -0.02em |
| display-lg-mobile | Plus Jakarta Sans | 36 / 700 / 44 |
| headline-lg | Plus Jakarta Sans | 40 / 700 / 48, ls -0.015em |
| headline-lg-mobile | Plus Jakarta Sans | 28 / 700 / 36 |
| headline-md | Plus Jakarta Sans | 28 / 600 / 36 |
| headline-sm | Plus Jakarta Sans | 22 / 600 / 30 |
| title-md | Plus Jakarta Sans | 18 / 600 / 26 |
| title-sm | Plus Jakarta Sans | 16 / 600 / 24 |
| body-lg | Inter | 18 / 400 / 28, ls -0.005em |
| body-md | Inter | 15 / 400 / 24 |
| body-sm | Inter | 13 / 400 / 20 |
| label-lg | Plus Jakarta Sans | 14 / 600 / 20, ls 0.02em |
| label-sm | Plus Jakarta Sans | 12 / 600 / 16, ls 0.03em |
| caption | Inter | 11 / 500 / 14, ls 0.04em |

**Headlines and labels → Plus Jakarta Sans. Body and data → Inter.**
**Nutrition tables, prices, weights, order totals → Inter with `font-variant-numeric: tabular-nums`.**

## Spacing (8pt base, 4pt sub-grid)

`space-xs 4 · space-sm 8 · space-md 16 · space-lg 24 · space-xl 40`
Gutter `24px` desktop / `16px` mobile. Margin `40px` desktop / `16px` mobile. Max container `1280px`.

## Radii

| Token | Value | Apply to |
|---|---|---|
| `rounded-sm` | 4px | — |
| `rounded` | 8px | Inputs, chips, dropdowns, table cell groupings |
| `rounded-md` | 12px | — |
| `rounded-lg` | 16px | Nutrition cards, reviews, recipe breakdown, mini-cart |
| `rounded-xl` | 24px | Product showpieces, species hero banners, bundle cards |
| `rounded-full` | 9999px | Status tags, species badges, pill filters, steppers, CTAs |

## Elevation — Tonal, Not Dark

Never use black or gray drop shadows. Use warm, low-contrast diffusion.

| Level | Usage | Value |
|---|---|---|
| 0 | Base ground | `#F9F9F6` |
| 1 | Elevated cards | `0 2px 8px -2px rgba(33,33,33,0.04), 0 1px 4px -1px rgba(33,33,33,0.02)` + `1px solid #E7E5E4` |
| 2 | Interactive / hover | `0 12px 24px -6px rgba(46,125,50,0.06), 0 4px 12px -2px rgba(33,33,33,0.04)` |
| 3 | Modals, cart drawer | `0 24px 48px -12px rgba(33,33,33,0.12)` + scrim `rgba(33,33,33,0.35)` w/ `8px` blur |

## Component Recipes

### Primary Button
- `rounded-full`, height `48px`, padding `0 28px`
- Bg `#2E7D32`, text `#FFFFFF`, label-lg
- Hover: bg `#276A2B` + Level 2 elevation
- Active: `transform: scale(0.98)`
- Species variants: swap base for the species lane base color

### Secondary Button
- White fill, `1.5px solid #E7E5E4`, text `#212121`
- Hover: border → `#2E7D32`, bg → `#E8F5E9`

### Species / Dietary Chip
- Height `28–32px`, pill
- Default: `#FFFFFF` bg, `1px solid #E7E5E4`, text `#57534E`
- Selected: species wash bg, `1.5px` species base border, species base text (label-sm)

### Product Card
- `rounded-lg` or `rounded-xl`, `#FFFFFF`, `1px solid #E7E5E4`, Level 1 elevation
- Image stage sits on the species **wash** background
- Badges (Bestseller, Non-GMO, Vet Formulated, Advanced Formula) float top-left as pill tags, `space-xs` padding, caption typography
- Hover: Level 2 elevation

### Quantity Stepper
- Pill-shaped shell in `#F3F2ED`
- Decrement / increment / numeric count inside

### Input Fields
- Height `48px`, `#FFFFFF`, `1px solid #E7E5E4`, radius 8px
- Focus: `2px` ring in `#2E7D32`

### Guaranteed Analysis Table
- Alternating rows: `#FFFFFF` / `#F9F9F6`
- No vertical grid lines
- Top + bottom dividers only: `#E7E5E4`
- Row headers: Inter `body-sm` (13px) medium
- Numerical data: right-aligned, `tabular-nums`, `#212121`
- Species columns use the species base color as the header accent

### Checkbox / Radio
- Checkbox: `6px` radius. Radio: circular.
- Unchecked: `1.5px solid #E7E5E4` on white
- Checked: `#2E7D32` fill, white glyph, animated scale bounce

## When to Use This Skill
- Any time you create, edit, or review a component, page, table, or style.
- Before generating any Tailwind config, CSS variables, or theme file.
- When in doubt about a color, radius, or shadow — consult this file, not your own preference.