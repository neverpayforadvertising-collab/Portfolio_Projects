import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../services/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null as any | null);
  const loading = ref(false);

  async function fetchMe() {
    try {
      loading.value = true;
      const res = await api.get('/auth/me');
      user.value = res.data;
    } catch (err) {
      user.value = null;
    } finally {
      loading.value = false;
    }
  }

  async function login(payload: { email: string; password: string }) {
    await api.post('/auth/login', payload);
    await fetchMe();
  }

  async function register(payload: { email: string; password: string; name?: string }) {
    await api.post('/auth/register', payload);
    await fetchMe();
  }

  async function logout() {
    await api.post('/auth/logout');
    user.value = null;
  }

  return { user, loading, fetchMe, login, register, logout };
});
