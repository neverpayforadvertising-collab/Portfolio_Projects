from typing import List, Dict


class Generator:
    """Pluggable generator shim. Replace with an LLM client (OpenAI, Anthropic, local LLM) in production."""

    def __init__(self):
        pass

    def generate(self, query: str, docs: List[Dict], tenant_id: str | None = None) -> str:
        # Minimal stub: synthesizes a short answer from retrieved docs
        if not docs:
            return "No supporting documents found; answer could be hallucinated."
        context = "\n\n".join([d["doc"]["text"] for d in docs[:3]])
        return f"[Stubbed answer for tenant={tenant_id}] Based on retrieved context:\n{context[:800]}"
