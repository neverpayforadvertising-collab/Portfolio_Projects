

// version 2

import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (token) => {
    setUser({ token });
  };

  const logout = () => {
    setUser(null);
  };

  // 🔥 silent refresh on app load
  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await api.post("/auth/refresh", {
          refresh_token: "cookie"
        });

        setUser({ token: res.data.access_token });
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);


// version 1

// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // restore session on refresh
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       setUser({ token });
//     }

//     setLoading(false);
//   }, []);

//   const login = (token) => {
//     localStorage.setItem("token", token);
//     setUser({ token });
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }