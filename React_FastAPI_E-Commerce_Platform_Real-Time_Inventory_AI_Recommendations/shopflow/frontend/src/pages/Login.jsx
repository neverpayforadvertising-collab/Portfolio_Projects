import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();


    // updated handleLogin
    const handleLogin = async () => {
        const res = await api.post("/auth/login", {
            email,
            password
        });

        localStorage.setItem("access_token", res.data.access_token);
    };

    //   const handleLogin = async () => {
    //     try {
    //       const res = await api.post("/auth/login", {
    //         email,
    //         password,
    //       });

    //       login(res.data.access_token);

    //       navigate("/products");
    //     } catch (err) {
    //       alert("Invalid credentials");
    //     }
    //   };

    return (
        <div style={{ padding: 20 }}>
            <h2>Login</h2>

            <input
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <br />

            <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <br />

            <button onClick={handleLogin}>Login</button>
        </div>
    );
}