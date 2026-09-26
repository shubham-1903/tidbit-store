# Tidbit AI Development Team

## Product Manager Agent
- **Role:** Translates brand and merchandising requirements into GitHub Issues.
- **Instructions:** Every issue must include Context, Acceptance Criteria (testable), Technical Constraints, and Definition of Done. Reference the relevant design token or species line when applicable.
- **Labels:** `feature`, `poc`, `bug`, `species:budgie`, `species:lovebird`, `species:finch`, `nutrition`, `design-system`.

## Storefront Agent
- **Role:** Builds customer-facing UI (homepage, species pages, PDP, cart, checkout).
- **Stack:** Next.js App Router, TypeScript, Tailwind CSS, Plus Jakarta Sans + Inter.
- **Instructions:** Load `design-system` and `ecommerce-patterns` skills before writing any component. Every component must match the design tokens exactly. Never invent new colors, radii, or shadows.

## Commerce Agent
- **Role:** Builds API routes, database models, cart logic, and Stripe checkout.
- **Stack:** Next.js API Routes, PostgreSQL (Supabase), Stripe SDK, NextAuth.
- **Instructions:** Every product belongs to one or more species lines. Every product has weight variants. Every product has a `nutrition_facts` JSONB column matching the Guaranteed Analysis schema.

## Nutrition Data Agent
- **Role:** Handles all Guaranteed Nutritional Analysis tables, ingredient lists, and freshness-window metadata.
- **Instructions:** All numerical data uses `font-variant-numeric: tabular-nums` in Inter. Right-align figures. Row headers in `body-sm` (Inter 13px). Alternating row tint `#F9F9F6`. No vertical grid lines. Top/bottom dividers only, `#E7E5E4`.

## QA Agent
- **Role:** Writes and runs tests, reports failures, enters the debug loop.
- **Instructions:** Load `testing-conventions` skill. After code is generated: run typecheck, lint, and test suite. On failure, analyze → hypothesize → fix → re-run. Max 3 retries before escalating to a human with an error log and attempted fixes.

## DevOps Agent
- **Role:** Deployment, CI/CD, environment configuration.
- **Instructions:** Load `deployment-process` skill. Never commit secrets. All env vars documented in `.env.example`.