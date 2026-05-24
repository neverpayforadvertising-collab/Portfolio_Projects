<template>
  <div class="max-w-md">
    <h2 class="text-2xl font-semibold mb-4">Create account</h2>
    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input v-model="form.name" class="mt-1 block w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input v-model="form.email" type="email" required class="mt-1 block w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input v-model="form.password" type="password" required class="mt-1 block w-full border rounded px-3 py-2" />
      </div>
      <div>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const auth = useAuthStore();

const form = reactive({ name: '', email: '', password: '' });

async function submit() {
  await auth.register(form);
  router.push('/');
}
</script>
