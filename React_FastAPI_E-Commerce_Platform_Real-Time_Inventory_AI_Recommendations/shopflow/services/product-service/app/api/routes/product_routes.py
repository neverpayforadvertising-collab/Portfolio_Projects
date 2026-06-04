from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db.deps import get_db
from schemas.product import ProductCreate, ProductResponse
from services.product_service import ProductService

from core.deps import get_current_user

router = APIRouter(prefix="/products", tags=["Products"])

@router.post("/")
def create_product(
    payload: ProductCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    if not user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Admin only")

    return service.create_product(db, payload)

router = APIRouter(prefix="/products", tags=["Products"])
service = ProductService()


@router.post("/", response_model=ProductResponse)
def create_product(payload: ProductCreate, db: Session = Depends(get_db)):
    return service.create_product(db, payload)


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    return service.get_product(db, product_id)


@router.get("/")
def list_products(
    skip: int = 0,
    limit: int = 10,
    search: str | None = None,
    category: str | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    db: Session = Depends(get_db)
):
    result = service.list_products(
        db,
        skip,
        limit,
        search,
        category,
        min_price,
        max_price
    )

    return {
        "items": result["items"],
        "total": result["total"],
        "page": (skip // limit) + 1,
        "page_size": limit
    }