from sqlalchemy import (
    Column, Integer, String, Text, Numeric, Boolean,
    DateTime, func, Index
)
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)

    price = Column(Numeric(10, 2), nullable=False)
    currency = Column(String(10), default="USD", nullable=False)

    sku = Column(String(100), unique=True, nullable=False)

    category = Column(String(100), index=True)

    is_active = Column(Boolean, default=True, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    __table_args__ = (
        Index("idx_products_name_category", "name", "category"),
    )