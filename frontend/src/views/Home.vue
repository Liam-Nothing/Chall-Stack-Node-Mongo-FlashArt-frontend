<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon class="d-md-none"></v-app-bar-nav-icon>
      <v-toolbar-title>Flash-Art-Chall</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text class="d-none d-md-inline-flex">Home</v-btn>
      <v-btn text class="d-none d-md-inline-flex">About</v-btn>
      <v-btn text class="d-none d-md-inline-flex">Contact</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <!-- Hero Section -->
        <v-row class="hero-section">
          <v-col cols="12" md="6" class="d-flex align-center justify-center">
            <v-img src="img/flash-simple-tatoo-pen.png" alt="Hero Image" max-width="500"></v-img>
          </v-col>
          <v-col cols="12" md="6" class="d-flex flex-column align-left justify-center text-left">
            <h1 class="display-1">FlashArt</h1>
            <p class="headline">Your go-to platform to quickly book a tattoo artist for a flash tattoo.</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div v-if="status">
              Database connection status: {{ status }}
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app color="primary" dark>
      <v-spacer></v-spacer>
      <span>&copy; 2024 Flash-Art-Chall</span>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const status = ref('')

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/status')
    status.value = response.data.status
  } catch (error) {
    status.value = 'disconnected'
  }
})
</script>

<style scoped>
.hero-section {
  padding: 50px 0;
}
</style>
