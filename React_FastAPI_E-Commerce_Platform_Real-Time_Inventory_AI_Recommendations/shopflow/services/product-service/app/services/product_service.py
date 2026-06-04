from sqlalchemy.orm import Session
from repository.product_repository import ProductRepository
from schemas.product import ProductCreate


class ProductService:

    def __init__(self):
        self.repo = ProductRepository()

    def create_product(self, db: Session, data: ProductCreate):
        return self.repo.create(db, data)

    def get_product(self, db: Session, product_id: int):
        return self.repo.get_by_id(db, product_id)

    def list_products(
        self,
        db: Session,
        skip: int,
        limit: int,
        search: str | None,
        category: str | None,
        min_price: float | None,
        max_price: float | None
    ):
        return self.repo.get_filtered(
            db,
            skip,
            limit,
            search,
            category,
            min_price,
            max_price
        )