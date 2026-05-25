# ExperimentFlow

Product Experimentation & Growth Analytics Platform

Stack:
- Frontend: Vue 3 + Vite + TypeScript + Pinia + Tailwind CSS
- Backend: Node.js (NestJS)
- Database: PostgreSQL
- Cache / Events: Redis + Kafka
- Auth: JWT + OAuth2
- Infra: Docker + Kubernetes
- Observability: Prometheus + Grafana + OpenTelemetry

Quick start (dev):

1. Start services:

```bash
# from repo root
cd backend && npm install
cd ../frontend && npm install
# start local infra like Postgres/Redis/Kafka via docker-compose
docker compose up -d
# run backend and frontend in separate terminals
cd backend && npm run dev
cd frontend && npm run dev
```

