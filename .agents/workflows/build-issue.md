---
description: 
---

---
title: Build Tidbit GitHub Issue
description: Picks up a GitHub Issue, plans, implements to design-system spec, tests, debugs, opens a PR.
---

# Build Issue Workflow

## Step 1 — Read the Issue
Use the GitHub MCP server to fetch Issue #{issue_number}.
Extract: title, description, acceptance criteria, technical constraints, labels.

## Step 2 — Load Skills
- Always: `design-system`, `testing-conventions`, `brand-voice`
- If customer-facing UI: `ecommerce-patterns`
- If deployment-related: `deployment-process`
- If nutrition table or ingredient data: `ecommerce-patterns` + `nutrition` label

## Step 3 — Plan
Produce an implementation plan:
- Files to create / modify
- Which design tokens and species lane apply
- Test strategy (unit + integration + E2E where relevant)
- Order of implementation

## Step 4 — Branch
Create: `feature/issue-{issue_number}-{slug}`
Conventional Commits only.

## Step 5 — Implement
Write code inside the `frontend/` directory following the loaded skills exactly.
After each logical unit: run `cd frontend && pnpm typecheck` and `cd frontend && pnpm lint`.

## Step 6 — Test
Write tests. Run `pnpm test`.

## Step 7 — Debug Loop
On failure: analyze → hypothesize → minimal fix → re-run failing test → full suite.
**Always run commands from inside the `frontend/` directory.**
Max 3 retries. On 4th failure: comment on the issue with error log + hypothesis + attempted fixes, then stop.

## Step 8 — Visual Verification
For any UI change:
- Confirm every color used exists in the `design-system` skill
- Confirm species theming matches the product's primary species
- Confirm radii and shadows match the tokens
- Confirm typography uses Plus Jakarta Sans (headlines/labels) or Inter (body/data)

## Step 9 — Open PR
- Title: `feat: {issue_title}`
- Body: link to issue, summary, test output, screenshots (for UI), design-token audit checklist
- Label: `ready-for-review`
- Request review from the human maintainer

## Step 10 — Link
Comment on the issue with the PR link. The issue auto-closes on merge.