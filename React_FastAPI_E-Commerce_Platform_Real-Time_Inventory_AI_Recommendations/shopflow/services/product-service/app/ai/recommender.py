try:
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
    _HAS_SKLEARN = True
except Exception:
    TfidfVectorizer = None
    cosine_similarity = None
    _HAS_SKLEARN = False


class ProductRecommender:

    def __init__(self):
        if not _HAS_SKLEARN:
            self.vectorizer = None
        else:
            self.vectorizer = TfidfVectorizer(stop_words="english")

        self.tfidf_matrix = None
        self.products = []

    def fit(self, products):
        if not _HAS_SKLEARN:
            raise RuntimeError("scikit-learn is required for recommendations")

        self.products = products

        corpus = [
            (p["name"] + " " + (p.get("description") or ""))
            for p in products
        ]

        self.tfidf_matrix = self.vectorizer.fit_transform(corpus)

    def recommend(self, product_id, top_k=5):
        if not _HAS_SKLEARN:
            raise RuntimeError("scikit-learn is required for recommendations")

        index = None

        for i, p in enumerate(self.products):
            if p["id"] == product_id:
                index = i
                break

        if index is None:
            return []

        similarities = cosine_similarity(
            self.tfidf_matrix[index],
            self.tfidf_matrix
        )[0]

        ranked = sorted(
            list(enumerate(similarities)),
            key=lambda x: x[1],
            reverse=True
        )

        recommendations = []

        for i, score in ranked[1:top_k+1]:
            recommendations.append({
                "id": self.products[i]["id"],
                "name": self.products[i]["name"],
                "score": float(score)
            })

        return recommendations