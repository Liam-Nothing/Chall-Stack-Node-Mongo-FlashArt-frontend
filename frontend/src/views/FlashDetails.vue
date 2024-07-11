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
                  <v-btn text @click="handleReservation">Réserver</v-btn>
                  <v-row v-if="showSlots">
                    <v-col cols="12">
                      <v-list>
                        <v-list-item v-for="slot in slots" :key="slot._id">
                          <v-list-item-content>
                            <v-list-item-title>{{ formatSlot(slot) }}</v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-btn color="primary" @click="bookSlot(slot)">Book</v-btn>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-card-text>
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
  const slots = ref([])
  const showSlots = ref(false)
  
  const fetchFlash = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/flashes/${route.params.id}`)
      flash.value = response.data
    } catch (error) {
      console.error('Error fetching flash details:', error)
    }
  }
  
  const handleReservation = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      localStorage.setItem('redirectAfterLogin', `/flash/${route.params.id}`)
      router.push('/login')
    } else {
      // Fetch slots if user is authenticated
      await fetchSlots()
      showSlots.value = true
    }
  }
  
  const fetchSlots = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:5000/api/slots?tatoueurId=${flash.value.id_tatoueur._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      slots.value = response.data
    } catch (error) {
      console.error('Error fetching slots:', error)
    }
  }
  
  const bookSlot = async (slot) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(`http://localhost:5000/api/slots/${slot._id}/book`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('Slot booked:', response.data)
      // Optionally, you can update the slots list here to reflect the booking
    } catch (error) {
      console.error('Error booking slot:', error)
    }
  }
  
  const formatSlot = (slot) => {
    const startDate = new Date(slot.start_date_time)
    const endDate = new Date(slot.end_date_time)
    return `${startDate.toLocaleString()} - ${endDate.toLocaleString()}`
  }
  
  onMounted(fetchFlash)
  </script>
  
  <style scoped>
  .v-img {
    object-fit: cover;
  }
  </style>
  