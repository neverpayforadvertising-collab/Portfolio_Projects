# app/models/order_item.py
from sqlalchemy import Column, Integer, Numeric, ForeignKey, String
from sqlalchemy.orm import relationship
from db.session import Base


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True)

    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, index=True)

    quantity = Column(Integer)
    price = Column(Numeric(10, 2))  # snapshot price at purchase time

    order = relationship("Order", back_populates="items")