from sqlalchemy.orm import Session
from sqlalchemy import and_
from models.product import Product
from schemas.product import ProductCreate


class ProductRepository:

    def create(self, db: Session, data: ProductCreate):
        product = Product(**data.model_dump())
        db.add(product)
        db.commit()
        db.refresh(product)
        return product

    def get_by_id(self, db: Session, product_id: int):
        return db.query(Product).filter(Product.id == product_id).first()

    def get_filtered(
        self,
        db: Session,
        skip: int,
        limit: int,
        search: str | None = None,
        category: str | None = None,
        min_price: float | None = None,
        max_price: float | None = None
    ):
        query = db.query(Product)

        # search by name
        if search:
            query = query.filter(Product.name.ilike(f"%{search}%"))

        # category filter
        if category:
            query = query.filter(Product.category == category)

        # price range filter
        if min_price is not None:
            query = query.filter(Product.price >= min_price)

        if max_price is not None:
            query = query.filter(Product.price <= max_price)

        total = query.count()

        items = query.offset(skip).limit(limit).all()

        return {
            "items": items,
            "total": total
        }