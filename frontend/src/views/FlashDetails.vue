<template>
    <v-app>
      <Navbar />
      <v-main>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="8">
              <v-card v-if="flash">
                <v-img :src="flash.image" height="400px"></v-img>
                <v-card-title>{{ flash.name }}</v-card-title>
                <v-card-subtitle>{{ flash.description }}</v-card-subtitle>
                <v-card-text>
                  <p><strong>Duration:</strong> {{ flash.duration }}</p>
                  <p><strong>Styles:</strong></p>
                  <v-chip-group>
                    <v-chip v-for="style in flash.id_style" :key="style._id">{{ style.label }}</v-chip>
                  </v-chip-group>
                  <p><strong>Tatoueur:</strong> {{ flash.id_tatoueur.pseudo }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn text @click="handleReservation">Réserver</v-btn>
                </v-card-actions>
              </v-card>
              <!-- <v-alert v-else type="error">Error loading flash details.</v-alert> -->
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <Footer />
    </v-app>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import axios from 'axios'
  import Navbar from '../components/Navbar.vue'
  import Footer from '../components/Footer.vue'
  
  const route = useRoute()
  const router = useRouter()
  const flash = ref(null)
  
  const fetchFlash = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/flashes/${route.params.id}`)
      flash.value = response.data
    } catch (error) {
      console.error('Error fetching flash details:', error)
    }
  }
  
  const handleReservation = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      localStorage.setItem('redirectAfterLogin', `/flash/${route.params.id}`)
      router.push('/login')
    } else {
      // Add reservation logic here if needed
    }
  }
  
  onMounted(fetchFlash)
  </script>
  
  <style scoped>
  .v-img {
    object-fit: cover;
  }
  </style>
  