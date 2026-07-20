# Catalog Management Platform

Full-stack operations platform for catalog, pricing, and inventory workflows.

## Features

- React 18 + TypeScript frontend (Vite, TanStack Query v5) with reusable tables, filters, and form-driven workflows
- Express backend with layered routing, controllers, services, and SQL Server data access
- Redis caching for frequently accessed catalog queries
- Background job processing with BullMQ for long-running bulk updates
- Joi request validation, centralized error handling, structured Winston logging, and API key auth middleware
- Public `/api/v1/health` endpoint (no API key required) for container and load balancer health checks
- Docker Compose for local development with SQL Server and Redis
- GitHub Actions CI workflow for install, test, and build

## Directory structure

```
React_Node.js_Catalog_Management/
├── package.json                  # npm workspaces root (backend + frontend)
├── docker-compose.yml            # SQL Server, Redis, backend, frontend
├── .gitignore
├── README.md
├── .github/
│   └── workflows/
│       └── ci.yml                # CI: install → test → build
├── database/
│   └── schema.sql                # CatalogOps DB, tables, and indexes
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── jest.config.js
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example              # copy to .env for local development
│   └── src/
│       ├── index.ts              # entrypoint (loads dotenv first, starts server + workers)
│       ├── app.ts                # Express app wiring (health, auth, routes, errors)
│       ├── controllers/
│       │   ├── catalogController.ts
│       │   ├── pricingController.ts
│       │   └── inventoryController.ts
│       ├── services/
│       │   ├── catalogService.ts     # Redis-cached catalog search
│       │   ├── pricingService.ts
│       │   ├── inventoryService.ts
│       │   └── taskService.ts        # BullMQ queue producers
│       ├── repositories/
│       │   ├── db.ts                 # mssql connection pool
│       │   ├── catalogRepository.ts
│       │   ├── pricingRepository.ts
│       │   └── inventoryRepository.ts
│       ├── routes/
│       │   ├── index.ts
│       │   ├── catalogRoutes.ts
│       │   ├── pricingRoutes.ts
│       │   └── inventoryRoutes.ts
│       ├── middleware/
│       │   ├── auth.ts               # x-api-key validation
│       │   ├── validation.ts         # Joi schema middleware
│       │   ├── errorHandler.ts
│       │   ├── logger.ts             # Winston logger
│       │   └── logging.ts            # request logging
│       ├── models/
│       │   ├── product.ts
│       │   ├── pricingRule.ts
│       │   └── inventory.ts
│       ├── utils/
│       │   ├── validationSchemas.ts
│       │   ├── redisClient.ts
│       │   └── __tests__/
│       │       └── validationSchemas.test.ts
│       └── jobs/
│           └── worker.ts             # BullMQ bulk-update worker
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts            # dev + preview proxy for /api → backend
    ├── index.html                # Vite entry (must live at frontend root)
    ├── Dockerfile
    ├── .dockerignore
    ├── public/                   # static assets
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── env.d.ts              # typings for VITE_* env vars
        ├── api/
        │   ├── apiClient.ts      # axios instance (env-driven base URL + API key)
        │   ├── catalog.ts
        │   ├── pricing.ts
        │   └── inventory.ts
        ├── components/
        │   ├── DataTable.tsx
        │   ├── FilterPanel.tsx
        │   └── ProductForm.tsx
        ├── pages/
        │   ├── CatalogPage.tsx
        │   ├── PricingPage.tsx
        │   └── InventoryPage.tsx
        ├── styles/
        │   └── app.css
        └── types/
            └── index.ts
```

## Prerequisites

- Node.js 20+
- Docker and Docker Compose (for the containerized setup)
- SQL Server and Redis if running the backend outside Docker

## Local setup (Docker)

1. Start everything:
   ```bash
   docker-compose up --build
   ```
2. Create the database and tables (first run only):
   ```bash
   docker exec -i catalog_mssql /opt/mssql-tools/bin/sqlcmd \
     -S localhost -U sa -P "YourStrong!Passw0rd" -i /dev/stdin < database/schema.sql
   ```
3. Open the frontend at http://localhost:4173. The backend is at http://localhost:4000/api/v1 (health check: `GET /api/v1/health`, no API key needed; all other routes require the `x-api-key` header).

## Local setup (without Docker)

1. Install dependencies from the workspace root:
   ```bash
   npm install
   ```
2. Copy `backend/.env.example` to `backend/.env` and adjust values for your local SQL Server and Redis.
3. Apply `database/schema.sql` to your SQL Server instance.
4. Run both apps:
   ```bash
   npm run dev
   ```
   The Vite dev server (http://localhost:4173) proxies `/api` requests to the backend on port 4000.

## Environment variables

Backend (`backend/.env`): `PORT`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`, `REDIS_HOST`, `REDIS_PORT`, `API_KEY`, `LOG_LEVEL`.

Frontend (build-time, optional): `VITE_API_BASE_URL` (defaults to the relative `/api/v1`, which works with the Vite proxy) and `VITE_API_KEY` (must match the backend `API_KEY`).

## Scripts

- `npm run dev` — run frontend and backend concurrently
- `npm run build` — compile backend (tsc) and frontend (tsc + vite build)
- `npm test` — run backend Jest tests and the frontend test placeholder
- `npm start` — start the compiled backend production server

## API overview

All routes are prefixed with `/api/v1` and (except `/health`) require the `x-api-key` header.

| Method | Path                    | Description                                  |
| ------ | ----------------------- | -------------------------------------------- |
| GET    | `/health`               | Health probe (public)                        |
| GET    | `/catalog`              | Search products (`term`, `category`, `region`, `status`) |
| GET    | `/catalog/:id`          | Fetch a single product                       |
| POST   | `/catalog`              | Create or update a product by SKU (upsert)   |
| POST   | `/catalog/bulk-update`  | Enqueue a background bulk update (BullMQ)    |
| GET    | `/pricing`              | List pricing rules (`sku`, `region`)         |
| POST   | `/pricing/override`     | Create a pricing override                    |
| GET    | `/inventory`            | List inventory records (`sku`, `region`)     |
| POST   | `/inventory/update`     | Upsert an inventory quantity                 |
