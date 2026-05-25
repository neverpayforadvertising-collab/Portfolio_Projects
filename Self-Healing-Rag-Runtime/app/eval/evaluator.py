from typing import List, Dict


class Evaluator:
    """Minimal evaluation harness for running regression-style checks.

    Extend with metrics (groundedness, hallucination, relevance) and automated regression jobs.
    """

    def __init__(self, retriever, generator):
        self.retriever = retriever
        self.generator = generator

    def run_case(self, tenant_id: str, query: str, expected_contains: str | None = None):
        docs = self.retriever.retrieve(tenant_id, query)
        out = self.generator.generate(query, docs, tenant_id=tenant_id)
        score = {"has_docs": bool(docs), "output_len": len(out)}
        pass_fail = True
        if expected_contains:
            pass_fail = expected_contains.lower() in out.lower()
        return {"pass": pass_fail, "score": score, "output": out}
