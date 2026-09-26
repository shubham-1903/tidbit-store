---
name: testing-conventions
description: Testing standards for all Tidbit code. Load when writing tests, running suites, or entering the debug loop.
---

> **Project Structure:** All test commands (`pnpm test`, `pnpm typecheck`) must be run from inside the `frontend/` directory.

# Tidbit Testing Conventions

## Frameworks
- **Vitest** — unit and integration tests
- **Playwright** — end-to-end tests
- **@testing-library/react** — component tests

## Coverage
- Every component: test file with ≥80% coverage
- Every API route: integration test covering success + error paths
- Every species lane: at least one E2E test traversing species → PDP → cart → checkout

## Naming
- Component tests: `ComponentName.test.tsx` next to the component
- API tests: `route.test.ts` next to `route.ts`
- E2E: `e2e/<flow-name>.spec.ts`

## Debug Loop Protocol
When a test fails:
1. Read the full error and stack trace.
2. Identify the file and line.
3. Form a specific hypothesis about the root cause (not "something's wrong").
4. Apply the **minimal** fix.
5. Re-run the failing test only.
6. If it passes, run the full suite to catch regressions.
7. If it fails after 3 attempts, stop and escalate with:
   - The error log
   - Your hypothesis
   - What you tried and why it didn't work

## Design-System Test Targets
- Every species-themed component renders with the correct base/wash color
- Guaranteed Analysis table renders with `font-variant-numeric: tabular-nums`
- Chip selected state uses the correct species border + tint
- Buttons meet the 48px height minimum

## When to Use This Skill
- Any time code is generated that needs tests.
- When entering the debug loop after a failure.