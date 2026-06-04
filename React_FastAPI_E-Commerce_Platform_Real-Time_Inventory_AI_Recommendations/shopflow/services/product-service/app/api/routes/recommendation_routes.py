from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db.deps import get_db
from services.recommendation_service import RecommendationService

router = APIRouter(prefix="/recommendations", tags=["AI"])

service = RecommendationService()


@router.get("/{product_id}")
def recommend(product_id: int, db: Session = Depends(get_db)):
    return service.get_recommendations(db, product_id)