<template>
    <v-app>
      <Navbar />
      <v-main>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-title>
                  Manage Flashes
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="showForm = !showForm">Add Flash</v-btn>
                </v-card-title>
                <v-card-text>
                  <!-- Liste des flashes -->
                  <v-row>
                    <v-col v-for="flash in flashes" :key="flash._id" cols="12" md="4">
                      <v-card>
                        <v-card-title>{{ flash.name }}</v-card-title>
                        <v-card-subtitle>{{ flash.description }}</v-card-subtitle>
                        <v-img :src="flash.image" height="200px"></v-img>
                        <v-card-actions>
                          <v-btn color="error" @click="deleteFlash(flash._id)">Delete</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                  <!-- Formulaire d'ajout de flash -->
                  <v-row v-if="showForm">
                    <v-col cols="12">
                      <v-form @submit.prevent="addFlash">
                        <v-row>
                          <v-col cols="12" md="4">
                            <v-text-field
                              v-model="flashData.name"
                              label="Name"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-text-field
                              v-model="flashData.description"
                              label="Description"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-text-field
                              v-model="flashData.image"
                              label="Image URL"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-select
                              v-model="flashData.id_style"
                              :items="styles"
                              item-title="label"
                              item-value="_id"
                              label="Style"
                              multiple
                              required
                            ></v-select>
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-btn type="submit" color="primary">Add Flash</v-btn>
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-btn color="secondary" @click="generateRandomTattoo">Generate Random Tattoo</v-btn>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-col>
                  </v-row>
                  <v-row v-if="loading">
                    <v-col cols="12" class="text-center">
                      <v-progress-circular indeterminate color="primary"></v-progress-circular>
                      <p>Generating tattoo...</p>
                    </v-col>
                  </v-row>
                  <v-row v-if="flashData.image">
                    <v-col cols="12" class="text-center">
                      <v-img :src="flashData.image" height="200px"></v-img>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
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
  import Navbar from '../components/Navbar.vue'
  import Footer from '../components/Footer.vue'
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import apiClient from '../plugins/axios'
  import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
const toast = useToast()
  
  const flashes = ref([])
  const styles = ref([])
  const showForm = ref(false)
  const flashData = ref({
    name: '',
    description: '',
    image: '',
    id_style: []
  })
  const loading = ref(false)
  const router = useRouter()
  
  const fetchFlashes = async () => {
    try {
      const response = await apiClient.get('/flashes/my')
      flashes.value = response.data
    } catch (error) {
      console.error('Error fetching flashes:', error)
      toast.error(error.response.data.error || 'An error occurred')
    }
  }
  
  const fetchStyles = async () => {
    try {
      const response = await apiClient.get('/styles')
      styles.value = response.data
    } catch (error) {
      console.error('Error fetching styles:', error)
      toast.error(error.response.data.error || 'An error occurred')
    }
  }
  
  const addFlash = async () => {
    try {
      const response = await apiClient.post('/flashes', flashData.value)
      flashes.value.push(response.data)
      showForm.value = false
      flashData.value = {
        name: '',
        description: '',
        image: '',
        id_style: []
      }
    } catch (error) {
      console.error('Error adding flash:', error)
      toast.error(error.response.data.error || 'An error occurred')
    }
  }
  
  const deleteFlash = async (flashId) => {
    try {
      await apiClient.delete(`/flashes/${flashId}`)
      flashes.value = flashes.value.filter(flash => flash._id !== flashId)
    } catch (error) {
      console.error('Error deleting flash:', error)
      toast.error(error.response.data.error || 'An error occurred')
    }
  }
  
  const generateRandomTattoo = async () => {
    loading.value = true
    try {
      const response = await axios.post('https://api.openai.com/v1/images/generations', {
        model: 'dall-e-3',
        prompt: 'black and white vectorize tattoo',
        n: 1,
        size: '1024x1024'
      }, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      })
      flashData.value.image = response.data.data[0].url
    } catch (error) {
      console.error('Error generating tattoo:', error)
      toast.error(error.response.data.error || 'An error occurred')
    } finally {
      loading.value = false
    }
  }
  
  onMounted(() => {
    fetchFlashes()
    fetchStyles()
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
  