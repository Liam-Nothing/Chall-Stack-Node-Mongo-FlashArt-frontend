<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>
                Manage Availability Slots
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="showForm = !showForm">Add Slot</v-btn>
              </v-card-title>
              <v-card-text>
                <!-- Liste des slots -->
                <v-row>
                  <v-col v-for="slot in slots" :key="slot._id" cols="12" md="4">
                    <v-card>
                      <v-card-title>{{ formatSlot(slot) }}</v-card-title>
                      <v-card-subtitle>
                        {{ slot.is_available ? "Available" : "Not Available" }}
                      </v-card-subtitle>
                      <v-card-text v-if="!slot.is_available && slot.id_visitor">
                        <p><strong>Booked by:</strong> {{ slot.id_visitor.pseudo }}</p>
                        <p><strong>Email:</strong> {{ slot.id_visitor.email }}</p>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn
                          color="success"
                          @click="toggleAvailability(slot)"
                        >
                          {{ slot.is_available ? "Mark Unavailable" : "Mark Available" }}
                        </v-btn>
                        <v-btn color="error" @click="deleteSlot(slot._id)">Delete</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
                <!-- Formulaire d'ajout de slot -->
                <v-row v-if="showForm">
                  <v-col cols="12">
                    <v-form @submit.prevent="addSlot">
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-select
                            v-model="slotTime"
                            :items="['Morning', 'Afternoon']"
                            label="Time"
                            required
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="slotDate"
                            label="Date"
                            type="date"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-btn type="submit" color="primary">Add Slot</v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
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
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const slots = ref([])
const showForm = ref(false)
const slotTime = ref('')
const slotDate = ref('')
const router = useRouter()
const toast = useToast()

const fetchSlots = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/slots/my', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    slots.value = response.data
  } catch (error) {
    toast.error('Error fetching slots')
    console.error('Error fetching slots:', error)
  }
}

const addSlot = async () => {
  try {
    const startDate = new Date(slotDate.value)
    const endDate = new Date(slotDate.value)

    if (slotTime.value === 'Morning') {
      startDate.setHours(8, 0, 0)
      endDate.setHours(12, 0, 0)
    } else if (slotTime.value === 'Afternoon') {
      startDate.setHours(13, 0, 0)
      endDate.setHours(17, 0, 0)
    }

    const response = await axios.post('http://localhost:5000/api/slots', {
      start_date_time: startDate,
      end_date_time: endDate
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    slots.value.push(response.data)
    showForm.value = false
    toast.success('Slot added successfully')
  } catch (error) {
    toast.error('Error adding slot')
    console.error('Error adding slot:', error)
  }
}

const toggleAvailability = async (slot) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/slots/${slot._id}`, {
      is_available: !slot.is_available
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const index = slots.value.findIndex(s => s._id === slot._id)
    if (index !== -1) {
      slots.value[index] = response.data
    }
  } catch (error) {
    toast.error('Error toggling availability')
    console.error('Error toggling availability:', error)
  }
}

const deleteSlot = async (slotId) => {
  try {
    await axios.delete(`http://localhost:5000/api/slots/${slotId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    slots.value = slots.value.filter(slot => slot._id !== slotId)
  } catch (error) {
    toast.error('Error deleting slot')
    console.error('Error deleting slot:', error)
  }
}

const formatSlot = (slot) => {
  const start = new Date(slot.start_date_time)
  const end = new Date(slot.end_date_time)
  return `${start.toLocaleString()} - ${end.toLocaleString()}`
}

onMounted(fetchSlots)
</script>

<style scoped>
.hero-section {
  padding: 50px 0;
}

.hero-image {
  max-width: 100%
}

@media (max-width: 960px) {
  .hero-image {
    max-width: 300px
  }

  .hero-title,
  .hero-slogan {
    text-align: center
  }
}
</style>
