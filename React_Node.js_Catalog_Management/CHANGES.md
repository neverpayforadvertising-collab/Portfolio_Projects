# Change log (backend + frontend updates)

Inline `// CHANGED:` comments mark every modified line in source files.
JSON files cannot carry comments, so those changes are documented here.

## JSON / comment-free files

### backend/package.json
- `bullmq` `^2.15.0` → `^5.34.0` — pinned version does not exist on npm; `npm install` failed.
- `mssql` `^10.3.0` → `^10.0.4` — pinned version does not exist on npm.
- `supertest` `^6.4.3` → `^6.3.4` — pinned version does not exist on npm.
- `@types/supertest` `^2.0.13` → `^2.0.16` to match.
- Added devDeps `@types/mssql`, `@types/cors` — strict `tsc` build failed without them.
- `test` script: added `--passWithNoTests` as a CI safety net (real tests now exist too).

### frontend/package.json
- Unchanged deps; `serve` still runs `vite preview` (host binding moved into vite.config.ts `preview` block).

### root package.json / .gitignore / database/schema.sql
- Unchanged.

## Files with inline CHANGED comments
- backend/src/app.ts — public health endpoint registered before API-key auth.
- backend/src/index.ts — dotenv loaded before env-reading imports.
- backend/src/routes/index.ts — health route relocated to app.ts.
- backend/tsconfig.json — jest types added; tests excluded from dist build.
- backend/jest.config.js — moduleNameMapper for ".js" import suffixes.
- backend/Dockerfile — full install → build → prune (was --production before build).
- backend/src/utils/__tests__/validationSchemas.test.ts — new test suite (5 tests).
- frontend/index.html — moved from public/ to frontend root (Vite requirement).
- frontend/src/api/apiClient.ts — env-driven base URL and API key.
- frontend/src/env.d.ts — new env var typings.
- frontend/src/pages/{Catalog,Pricing,Inventory}Page.tsx — TanStack Query v4 → v5 API.
- frontend/vite.config.ts — shared proxy for dev + preview; preview binds 0.0.0.0.
- frontend/Dockerfile — new file (referenced by docker-compose but missing).
- docker-compose.yml — Vite vars as build args; backend healthcheck added.

## Removed
- Root-level `Dockerfile.backend` / `Dockerfile.frontend` — stale duplicates never
  referenced by docker-compose (it uses backend/Dockerfile and frontend/Dockerfile).
- `frontend/public/index.html` — superseded by `frontend/index.html`.
