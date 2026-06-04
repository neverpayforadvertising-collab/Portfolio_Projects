from sqlalchemy.orm import Session
from repository.product_repository import ProductRepository
from ai.recommender import ProductRecommender


class RecommendationService:

    def __init__(self):
        self.repo = ProductRepository()
        self.model = ProductRecommender()

    def train(self, db: Session):
        products = self.repo.get_all(db, skip=0, limit=1000)

        formatted = [
            {
                "id": p.id,
                "name": p.name,
                "description": p.description
            }
            for p in products
        ]

        self.model.fit(formatted)

    def get_recommendations(self, db: Session, product_id: int):
        self.train(db)
        return self.model.recommend(product_id)