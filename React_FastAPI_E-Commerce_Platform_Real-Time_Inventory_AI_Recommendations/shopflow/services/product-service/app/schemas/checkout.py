# app/schemas/checkout.py
from pydantic import BaseModel
from typing import List


class CartItem(BaseModel):
    product_id: int
    quantity: int


class CheckoutRequest(BaseModel):
    items: List[CartItem]