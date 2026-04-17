# NX Cross-Project Test Targeting Demo

Demonstrates how [`code-governance`](https://github.com/useparadigm/code-governance) solves the NX + Jest test targeting gap.

## The problem

In NX monorepos, **NX** knows project-level dependencies and **Jest** knows file-level dependencies — but they don't talk to each other.

When you change `libs/shared/src/pricing.ts`:
- NX correctly triggers `backend:test` and `marketplace:test`
- But Jest inside each project sees no changed files in *its* directory
- Jest runs **zero tests** — a false positive

## The solution

`code-governance` builds a **file-level dependency graph across the entire workspace** using static analysis, then walks it in reverse from changed files to find every affected test.

```
libs/shared/src/pricing.ts          ← you change this
  ↑ imported by
libs/shared/src/index.ts            ← barrel re-export
  ↑ imported by
libs/marketplace/src/product.service.ts
  ↑ imported by
libs/marketplace/src/index.ts       ← barrel re-export
  ↑ imported by
apps/backend/src/catalog.controller.ts
  ↑ tested by
apps/backend/src/catalog.controller.spec.ts  ← this test must run
```

## Repo structure

```
├── tsconfig.base.json              # @org/shared, @org/marketplace aliases
├── libs/
│   ├── shared/                     # formatPrice, validateEmail
│   │   └── src/pricing.ts          # ← the file we change in the PR
│   └── marketplace/                # ProductService (imports @org/shared)
└── apps/
    └── backend/                    # CatalogController (imports @org/marketplace)
        └── src/catalog.controller.spec.ts  # ← must be caught
```

## Usage

```bash
# Install
pip install code-governance
# or: uv tool install code-governance

# Analyze (outputs commands)
governance-ast --affected-tests . --base-ref origin/main --nx

# Analyze and run via NX
governance-ast --affected-tests . --base-ref origin/main --nx --run
```

## CI integration

See [`.github/workflows/test.yml`](.github/workflows/test.yml) — one-line drop-in for `nx affected:test`.
