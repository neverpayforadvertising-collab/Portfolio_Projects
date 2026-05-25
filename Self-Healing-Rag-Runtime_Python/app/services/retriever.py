from sentence_transformers import SentenceTransformer
from sklearn.neighbors import NearestNeighbors
import numpy as np
from typing import List, Dict
import threading


class VectorStore:
    """Simple in-memory vector store per-tenant using SentenceTransformers + NearestNeighbors.

    This is a small, pluggable adapter suitable for testing and local development.
    """

    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        self.model = SentenceTransformer(model_name)
        self._indexes: Dict[str, Dict] = {}
        self._lock = threading.Lock()

    def index_documents(self, tenant_id: str, docs: List[Dict]):
        texts = [d["text"] for d in docs]
        embs = np.array(self.model.encode(texts, convert_to_numpy=True))
        n_neighbors = min(len(texts), 10)
        nn = NearestNeighbors(n_neighbors=n_neighbors, metric="cosine").fit(embs)
        with self._lock:
            self._indexes[tenant_id] = {"embs": embs, "docs": docs, "nn": nn}

    def retrieve(self, tenant_id: str, query: str, top_k: int = 5):
        with self._lock:
            idx = self._indexes.get(tenant_id)
        if not idx:
            return []
        q_emb = self.model.encode([query], convert_to_numpy=True)
        k = min(top_k, len(idx["docs"]))
        dists, inds = idx["nn"].kneighbors(q_emb, n_neighbors=k)
        results = []
        for dist, i in zip(dists[0], inds[0]):
            results.append({"score": float(dist), "doc": idx["docs"][i]})
        return results


class Retriever:
    def __init__(self):
        self.vs = VectorStore()

    def index(self, tenant_id: str, docs: List[Dict]):
        self.vs.index_documents(tenant_id, docs)

    def retrieve(self, tenant_id: str, query: str, top_k: int = 5):
        return self.vs.retrieve(tenant_id, query, top_k=top_k)
