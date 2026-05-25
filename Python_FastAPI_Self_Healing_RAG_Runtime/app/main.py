from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

from app.core.config import settings
from app.services.retriever import Retriever
from app.services.generator import Generator


class QueryRequest(BaseModel):
    tenant_id: str
    query: str
    top_k: int = 5


app = FastAPI(title=settings.APP_NAME)


@app.on_event("startup")
async def startup_event():
    app.state.retriever = Retriever()
    app.state.generator = Generator()


@app.post("/query")
async def query_endpoint(req: QueryRequest):
    retriever: Retriever = app.state.retriever
    generator: Generator = app.state.generator
    docs = retriever.retrieve(req.tenant_id, req.query, top_k=req.top_k)
    answer = generator.generate(req.query, docs, tenant_id=req.tenant_id)
    return {"answer": answer, "retrieved": docs}
