import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// CHANGED: proxy extracted so it is shared by BOTH the dev server and
// `vite preview` (used in Docker). Target env var renamed to VITE_PROXY_TARGET
// to avoid clashing with the client-side VITE_API_BASE_URL.
const proxy = {
  '/api': {
    target: process.env.VITE_PROXY_TARGET || 'http://localhost:4000',
    changeOrigin: true,
    secure: false
  }
};

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4173,
    proxy
  },
  // CHANGED: preview block added — host: true binds 0.0.0.0 so the container
  // is reachable from outside; previously `vite preview` only bound localhost.
  preview: {
    host: true,
    port: 4173,
    proxy
  }
});
