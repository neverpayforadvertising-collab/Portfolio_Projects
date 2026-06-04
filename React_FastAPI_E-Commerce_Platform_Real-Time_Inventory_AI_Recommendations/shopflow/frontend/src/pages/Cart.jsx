
// version 2

import api from "../api/axios";
import { useCart } from "../cart/CartContext";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const checkout = async () => {
    const payload = {
      items: cart.map((c) => ({
        product_id: c.id,
        quantity: c.quantity,
      })),
    };

    const res = await api.post("/checkout", payload);

    alert(`Order created: ${res.data.order_id}`);
    clearCart();
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item) => (
        <div key={item.id} style={{ margin: 10 }}>
          <h4>{item.name}</h4>

          <p>${item.price}</p>

          <button
            onClick={() =>
              updateQuantity(item.id, item.quantity - 1)
            }
          >
            -
          </button>

          <span> {item.quantity} </span>

          <button
            onClick={() =>
              updateQuantity(item.id, item.quantity + 1)
            }
          >
            +
          </button>

          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ${total.toFixed(2)}</h3>

      <button onClick={checkout} disabled={!cart.length}>
        Checkout
      </button>
    </div>
  );
}


// version 1

// import { useState } from "react";
// import api from "../api/axios";

// export default function Cart() {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     setCart([...cart, { ...product, quantity: 1 }]);
//   };

//   const checkout = async () => {
//     const payload = {
//       items: cart.map((c) => ({
//         product_id: c.id,
//         quantity: c.quantity,
//       })),
//     };

//     const res = await api.post("/checkout", payload);

//     alert(`Order created: ${res.data.order_id}`);
//   };

//   return (
//     <div>
//       <button onClick={checkout}>Checkout</button>
//     </div>
//   );
// }