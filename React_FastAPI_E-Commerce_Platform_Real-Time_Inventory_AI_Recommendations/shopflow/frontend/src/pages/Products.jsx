
// version 2

import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../cart/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get("/products");
      setProducts(res.data);
    };

    fetch();
  }, []);

  return (
    <div>
      <h2>Products</h2>

      {products.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <h3>{p.name}</h3>
          <p>{p.price}</p>

          <button onClick={() => addToCart(p)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

// version 1

// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useAuth } from "../auth/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Products() {
//   const [products, setProducts] = useState([]);

//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const fetchProducts = async () => {
//     const res = await api.get("/products");
//     setProducts(res.data.items || res.data);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Products</h2>

//       <button onClick={handleLogout}>Logout</button>

//       {products.map((p) => (
//         <div key={p.id} style={{ border: "1px solid #ccc", margin: 10 }}>
//           <h3>{p.name}</h3>
//           <p>{p.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// }