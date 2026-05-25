<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Experiments</h2>
    <div v-if="loading">Loading…</div>
    <div v-else>
      <ul class="space-y-3">
        <li v-for="exp in experiments" :key="exp.id" class="p-4 bg-white rounded shadow">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium">{{ exp.name }}</div>
              <div class="text-sm text-gray-500">{{ exp.key }}</div>
            </div>
            <div>
              <router-link :to="`/experiments/${exp.id}`" class="text-blue-600">View</router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../services/api';

const experiments = ref([] as any[]);
const loading = ref(true);

async function load() {
  loading.value = true;
  const res = await api.get('/experiments');
  experiments.value = res.data;
  loading.value = false;
}

onMounted(load);
</script>
