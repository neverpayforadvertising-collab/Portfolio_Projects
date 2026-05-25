#!/bin/bash
set -e

git add app/main.py
git commit --only app/main.py -m "Add query endpoint and app state setup"

git add app/services/retriever.py
git commit --only app/services/retriever.py -m "Implement in-memory vector retrieval service"

git add app/services/generator.py
git commit --only app/services/generator.py -m "Add stub generator for answer synthesis"

git add tests/test_api.py
git commit --only tests/test_api.py -m "Add API smoke test for query endpoint"

git add README.md
git commit --only README.md -m "Update README with project overview and quick start"

git push origin main
