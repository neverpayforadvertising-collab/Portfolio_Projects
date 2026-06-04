//  version 2

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8001",
  withCredentials: true
});

// attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// auto refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      try {
        const refresh = await api.post("/auth/refresh", {
          refresh_token: "cookie"
        });

        localStorage.setItem("access_token", refresh.data.access_token);

        err.config.headers.Authorization = `Bearer ${refresh.data.access_token}`;

        return api(err.config);
      } catch {
        localStorage.removeItem("access_token");
      }
    }

    return Promise.reject(err);
  }
);

export default api;


// version 1

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8001",
// });

// // Attach token automatically
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;