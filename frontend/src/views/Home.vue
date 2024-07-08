<template>
  <div>
    <h1>Welcome to Flash-Art-Chall</h1>
    <div v-if="status">
      Database connection status: {{ status }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const status = ref('');

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/status');
    status.value = response.data.status;
  } catch (error) {
    status.value = 'disconnected';
  }
});
</script>

<style scoped>
</style>
