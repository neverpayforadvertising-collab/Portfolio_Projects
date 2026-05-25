# Self Healing RAG Runtime

Production-grade self-improving RAG system

Overview
- FastAPI backend orchestrating retrieval, reranking, and LLM generation.
- In-memory vector adapter (pluggable) with per-tenant indexes.
- Self-healing engine skeleton and evaluation harness for regression tests.
- Docker Compose for local Postgres during development.

Quick start

1. Create a virtualenv and install dependencies:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

2. Start Postgres (optional):

```bash
docker compose up -d
```

3. Run the API locally:

```bash
uvicorn app.main:app --reload
```

4. Run tests:

```bash
pytest -q
```

