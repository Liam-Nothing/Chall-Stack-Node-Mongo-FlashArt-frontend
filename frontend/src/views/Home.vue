<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container>
        <!-- Hero Section -->
        <v-row class="hero-section">
          <v-col cols="12" md="6" class="d-flex align-center justify-center">
            <v-img src="img/flash-simple-tatoo-pen.png" alt="Hero Image" class="hero-image"></v-img>
          </v-col>
          <v-col cols="12" md="6" class="d-flex flex-column align-center justify-center text-center">
            <h1 class="display-1 hero-title">FlashArt</h1>
            <p class="headline hero-slogan">Your go-to platform to quickly book a tattoo artist for a flash tattoo.</p>
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
    <Footer />
  </v-app>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
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

.hero-image {
  max-width: 100%;
}

@media (max-width: 960px) {
  .hero-image {
    max-width: 300px;
  }

  .hero-title,
  .hero-slogan {
    text-align: center;
  }
}
</style>
