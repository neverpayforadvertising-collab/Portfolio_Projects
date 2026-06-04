# app/services/checkout_service.py

from sqlalchemy.orm import Session
from models.product import Product
from models.order import Order
from models.order_item import OrderItem


class CheckoutService:

    def create_order(self, db: Session, user_id: int, items):

        order = Order(
            user_id=user_id,
            status="pending",
            total_amount=0,
            currency="USD"
        )

        db.add(order)
        db.flush()  # get order.id before commit

        total = 0

        for item in items:
            product = db.query(Product).filter(Product.id == item.product_id).first()

            if not product:
                raise Exception(f"Product {item.product_id} not found")

            if product.stock < item.quantity:
                raise Exception(f"Insufficient stock for {product.name}")

            line_total = float(product.price) * item.quantity
            total += line_total

            order_item = OrderItem(
                order_id=order.id,
                product_id=product.id,
                quantity=item.quantity,
                price=product.price
            )

            db.add(order_item)

            # reduce stock (simple version)
            product.stock -= item.quantity

        order.total_amount = total

        db.commit()
        db.refresh(order)

        return order