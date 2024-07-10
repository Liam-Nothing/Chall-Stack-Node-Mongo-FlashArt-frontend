<template>
    <v-app>
      <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon class="d-md-none"></v-app-bar-nav-icon>
        <v-toolbar-title>Flash-Art-Chall</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text class="d-none d-md-inline-flex" to="/">Home</v-btn>
        <v-btn text class="d-none d-md-inline-flex" to="/flashes">Flashes</v-btn>
        <v-btn text class="d-none d-md-inline-flex">About</v-btn>
        <v-btn text class="d-none d-md-inline-flex">Contact</v-btn>
      </v-app-bar>
  
      <v-main>
        <v-container>
          <v-row>
            <!-- Filter Section -->
            <v-col cols="12" md="3">
              <v-card>
                <v-card-title>Filters</v-card-title>
                <v-card-text>
                  <!-- Add filter components here -->
                  <v-select
                    v-model="selectedStyle"
                    :items="styles"
                    label="Style"
                  ></v-select>
                  <v-select
                    v-model="selectedTatoueur"
                    :items="tatoueurs"
                    label="Tatoueur"
                  ></v-select>
                  <v-btn @click="applyFilters" class="mt-3" color="primary">Apply Filters</v-btn>
                </v-card-text>
              </v-card>
            </v-col>
  
            <!-- Flashes Section -->
            <v-col cols="12" md="9">
              <v-row>
                <v-col
                  v-for="flash in filteredFlashes"
                  :key="flash._id"
                  cols="12"
                  md="4"
                >
                  <v-card>
                    <v-img :src="flash.image" height="200px"></v-img>
                    <v-card-title>{{ flash.name }}</v-card-title>
                    <v-card-subtitle>{{ flash.description }}</v-card-subtitle>
                    <v-card-actions>
                      <v-btn text>Book Now</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
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
  
  const flashes = ref([])
  const styles = ref([])
  const tatoueurs = ref([])
  const selectedStyle = ref(null)
  const selectedTatoueur = ref(null)
  const filteredFlashes = ref([])
  
  const applyFilters = () => {
    filteredFlashes.value = flashes.value.filter(flash => {
      const matchesStyle = selectedStyle.value ? flash.id_style.includes(selectedStyle.value) : true
      const matchesTatoueur = selectedTatoueur.value ? flash.id_tatoueur === selectedTatoueur.value : true
      return matchesStyle && matchesTatoueur
    })
  }
  
  onMounted(async () => {
    try {
      const flashResponse = await axios.get('http://localhost:5000/api/flashes')
      flashes.value = flashResponse.data
      filteredFlashes.value = flashResponse.data
  
      const styleResponse = await axios.get('http://localhost:5000/api/styles')
      styles.value = styleResponse.data.map(style => ({ text: style.label, value: style._id }))
  
      const tatoueurResponse = await axios.get('http://localhost:5000/api/users?role=tatoueur')
      tatoueurs.value = tatoueurResponse.data.map(tatoueur => ({ text: tatoueur.pseudo, value: tatoueur._id }))
    } catch (error) {
      console.error(error)
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
  