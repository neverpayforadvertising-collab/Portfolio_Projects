<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Create Experiment</h2>
    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Key</label>
        <input v-model="form.key" required class="mt-1 block w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input v-model="form.name" required class="mt-1 block w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <textarea v-model="form.description" class="mt-1 block w-full border rounded px-3 py-2"></textarea>
      </div>
      <div>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({ key: '', name: '', description: '' });

async function submit() {
  await api.post('/experiments', form);
  router.push('/');
}
</script>
