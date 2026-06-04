from pydantic import BaseModel
from typing import Optional

class ProductCreate(BaseModel):
    name: str
    price: float
    sku: str
    category: Optional[str] = None
    description: Optional[str] = None


class ProductResponse(BaseModel):
    id: int
    name: str
    price: float
    sku: str
    category: Optional[str]
    description: Optional[str]

    class Config:
        from_attributes = True