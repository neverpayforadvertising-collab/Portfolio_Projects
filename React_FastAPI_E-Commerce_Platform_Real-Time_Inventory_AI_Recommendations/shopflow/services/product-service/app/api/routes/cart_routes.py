from fastapi import APIRouter

from services.cart_service import CartService

router = APIRouter(prefix="/cart", tags=["Cart"])

service = CartService()


@router.get("/{user_id}")
def get_cart(user_id: int):
    return service.get_cart(user_id)


@router.post("/add")
def add_to_cart(payload: dict):
    return service.add_to_cart(
        payload["user_id"],
        payload["product_id"],
        payload.get("quantity", 1)
    )


@router.post("/remove")
def remove_item(payload: dict):
    return service.remove_item(
        payload["user_id"],
        payload["product_id"]
    )


@router.post("/clear/{user_id}")
def clear_cart(user_id: int):
    return service.clear_cart(user_id)