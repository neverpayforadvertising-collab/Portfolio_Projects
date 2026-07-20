import axios from 'axios';

// CHANGED: base URL and API key now come from Vite env vars instead of being
// hardcoded. Base URL defaults to the relative "/api/v1" so the dev/preview
// proxy in vite.config.ts forwards requests to the backend.
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api/v1';
const apiKey = import.meta.env.VITE_API_KEY || 'supersecret-api-key';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': apiKey
  }
});
