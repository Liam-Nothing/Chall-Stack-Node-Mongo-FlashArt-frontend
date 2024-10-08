<template>
  <v-app>
    <Navbar />
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
                  item-title="text"
                  item-value="value"
                  label="Style"
                ></v-select>
                <v-select
                  v-model="selectedTatoueur"
                  :items="tatoueurs"
                  item-title="text"
                  item-value="value"
                  label="Tatoueur"
                ></v-select>
                <v-btn @click="applyFilters" class="mt-3" color="primary">Apply Filters</v-btn>
                <v-btn @click="clearFilters" class="mt-3" color="secondary">Clear Filters</v-btn>
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
                <FlashCard :flash="flash" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import FlashCard from '../components/FlashCard.vue'
import Footer from '../components/Footer.vue'
import { ref, onMounted } from 'vue'
import apiClient from '../plugins/axios'
import { useToast } from 'vue-toastification'
const toast = useToast()

const flashes = ref([])
const styles = ref([])
const tatoueurs = ref([])
const selectedStyle = ref(null)
const selectedTatoueur = ref(null)
const filteredFlashes = ref([])

const applyFilters = async () => {
  try {
    const response = await apiClient.get('/flashes/search', {
      params: {
        styleIds: selectedStyle.value,
        tatoueurId: selectedTatoueur.value
      }
    })
    filteredFlashes.value = response.data
  } catch (error) {
    console.error('Error fetching filtered flashes:', error)
    toast.error(error.response.data.error || 'An error occurred')
  }
}

const clearFilters = async () => {
  selectedStyle.value = null
  selectedTatoueur.value = null
  try {
    const response = await apiClient.get('/flashes')
    filteredFlashes.value = response.data
  } catch (error) {
    console.error('Error clearing filters:', error)
    toast.error(error.response.data.error || 'An error occurred')
  }
}

onMounted(async () => {
  try {
    const flashResponse = await apiClient.get('/flashes')
    flashes.value = flashResponse.data
    filteredFlashes.value = flashResponse.data

    const styleResponse = await apiClient.get('/styles')
    styles.value = styleResponse.data.map(style => ({
      text: style.label,
      value: style._id
    }))

    const tatoueurResponse = await apiClient.get('/users', { params: { role: 'tatoueur' } })
    tatoueurs.value = tatoueurResponse.data.map(tatoueur => ({
      text: tatoueur.pseudo,
      value: tatoueur._id
    }))
  } catch (error) {
    console.error(error)
    toast.error(error.response.data.error || 'An error occurred')
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
