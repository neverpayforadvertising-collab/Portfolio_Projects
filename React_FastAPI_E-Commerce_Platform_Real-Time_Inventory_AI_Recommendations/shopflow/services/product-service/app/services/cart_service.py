import json
from db.redis import redis_client


class CartService:

    def get_cart(self, user_id: int):
        data = redis_client.get(f"cart:{user_id}")

        if not data:
            return []

        return json.loads(data).values()

    def add_to_cart(self, user_id: int, product_id: int, quantity: int = 1):
        key = f"cart:{user_id}"

        cart = redis_client.get(key)

        if cart:
            cart = json.loads(cart)
        else:
            cart = {}

        if str(product_id) in cart:
            cart[str(product_id)]["quantity"] += quantity
        else:
            cart[str(product_id)] = {
                "product_id": product_id,
                "quantity": quantity
            }

        redis_client.set(key, json.dumps(cart))

        return list(cart.values())

    def remove_item(self, user_id: int, product_id: int):
        key = f"cart:{user_id}"

        cart = redis_client.get(key)

        if not cart:
            return []

        cart = json.loads(cart)

        cart.pop(str(product_id), None)

        redis_client.set(key, json.dumps(cart))

        return list(cart.values())

    def clear_cart(self, user_id: int):
        redis_client.delete(f"cart:{user_id}")