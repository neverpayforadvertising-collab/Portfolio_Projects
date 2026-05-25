<template>
  <div class="min-h-screen">
    <nav class="bg-white border-b">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="text-lg font-semibold">ExperimentFlow</div>
          <router-link to="/" class="text-sm text-gray-600 hover:text-gray-900">Experiments</router-link>
          <router-link to="/experiments/new" class="text-sm text-blue-600 hover:underline">New Experiment</router-link>
        </div>
        <div class="flex items-center gap-3">
          <template v-if="auth.user">
            <span class="text-sm text-gray-700">Signed in as <strong>{{ auth.user.name || auth.user.email }}</strong></span>
            <button @click="auth.logout()" class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Logout</button>
          </template>
          <template v-else>
            <router-link to="/login" class="text-sm text-gray-600 hover:text-gray-900">Sign in</router-link>
            <router-link to="/register" class="text-sm text-blue-600 hover:underline">Register</router-link>
          </template>
        </div>
      </div>
    </nav>
    <main class="max-w-6xl mx-auto p-6">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';

const auth = useAuthStore();

onMounted(async () => {
  await auth.fetchMe();
});
</script>
