import pytest
from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_query_no_index():
    resp = client.post("/query", json={"tenant_id": "t1", "query": "hello world"})
    assert resp.status_code == 200
    body = resp.json()
    assert "answer" in body
