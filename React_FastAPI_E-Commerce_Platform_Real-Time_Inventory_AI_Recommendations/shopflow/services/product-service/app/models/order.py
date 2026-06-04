# app/models/order.py
from sqlalchemy import Column, Integer, String, Numeric, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from db.session import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)

    status = Column(String, default="pending")  # pending, paid, failed, shipped

    total_amount = Column(Numeric(10, 2))
    currency = Column(String(10), default="USD")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    items = relationship("OrderItem", back_populates="order")