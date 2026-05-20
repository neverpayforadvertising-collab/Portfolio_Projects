# Catalog Management Platform

Full-stack operations platform for catalog, pricing, and inventory workflows.

## Features

- React + TypeScript frontend with reusable tables, filters, and form-driven workflows
- Express backend with layered routing, services, and SQL Server data access
- Redis caching for frequently accessed catalog queries
- Background job processing with BullMQ for long-running bulk updates
- API validation, error handling, logging, and API key auth middleware
- Docker Compose for local development with SQL Server and Redis
- GitHub Actions CI workflow for install, test, and build

## Local Setup

1. Install dependencies from the workspace root:
   ```bash
   npm install
   ```

2. Create the SQL Server database and tables using `database/schema.sql`.

3. Start the services:
   ```bash
   docker-compose up --build
   ```

4. Access the frontend at `http://localhost:4173` and backend at `http://localhost:4000/api/v1`.

## Scripts

- `npm run dev` — run frontend and backend concurrently
- `npm run build` — compile backend and frontend
- `npm test` — run backend Jest tests and frontend test command placeholder
- `npm start` — start backend production server
