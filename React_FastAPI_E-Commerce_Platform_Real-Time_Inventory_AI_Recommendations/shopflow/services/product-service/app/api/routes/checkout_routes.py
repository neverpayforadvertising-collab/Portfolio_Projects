# app/api/routes/checkout_routes.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db.deps import get_db
from schemas.checkout import CheckoutRequest
from services.checkout_service import CheckoutService

router = APIRouter(prefix="/checkout", tags=["Checkout"])

service = CheckoutService()


@router.post("/")
def checkout(payload: CheckoutRequest, db: Session = Depends(get_db)):

    # TEMP: replace with JWT user later
    user_id = 1

    order = service.create_order(db, user_id, payload.items)

    return {
        "order_id": order.id,
        "status": order.status,
        "total": order.total_amount
    }