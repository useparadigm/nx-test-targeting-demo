# NX Cross-Project Test Targeting Demo

Demonstrates how [`code-governance`](https://github.com/useparadigm/code-governance) gives you file-level precision on top of NX's project-level test targeting.

## The problem

`nx affected:test` works at **project granularity** — when you change one file in `libs/shared/`, NX runs *every* test in every affected project (`shared:test`, `marketplace:test`, `backend:test`). In large monorepos this means hundreds of unrelated tests run on every PR.

## The solution

`code-governance` builds a **file-level dependency graph** across the entire workspace using static analysis, then walks it in reverse from changed files to find only the tests that actually depend on the change.

```
libs/shared/src/pricing.ts          <- you change this
  ^ imported by
libs/shared/src/index.ts            <- barrel re-export
  ^ imported by
libs/marketplace/src/product.service.ts
  ^ imported by
libs/marketplace/src/index.ts       <- barrel re-export
  ^ imported by
apps/backend/src/catalog.controller.ts
  ^ tested by
apps/backend/src/catalog.controller.spec.ts  <- only this test runs in backend
```

### NX alone vs NX + code-governance

| | `nx affected:test` | `governance-ast --affected-tests --nx --run` |
|---|---|---|
| **Granularity** | Project-level: runs *all* tests in affected projects | File-level: runs only tests that depend on the changed files |
| **What runs** | Every test in `shared`, `marketplace`, `backend` | `pricing.spec.ts`, `product.service.spec.ts`, `catalog.controller.spec.ts` — 3 specific files |
| **Skips unrelated tests** | No | Yes |
| **Uses NX for execution** | Yes | Yes (`nx run <project>:test -- --findRelatedTests`) |

## Repo structure

```
├── tsconfig.base.json              # @org/shared, @org/marketplace aliases
├── libs/
│   ├── shared/                     # formatPrice, validateEmail
│   │   └── src/pricing.ts          # <- the file we change in the PR
│   └── marketplace/                # ProductService (imports @org/shared)
└── apps/
    └── backend/                    # CatalogController (imports @org/marketplace)
        └── src/catalog.controller.spec.ts  # <- targeted precisely
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

See [`.github/workflows/test.yml`](.github/workflows/test.yml) — drop-in addition to your CI pipeline.
