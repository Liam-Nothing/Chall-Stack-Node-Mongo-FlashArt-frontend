<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>Register</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="register">
                  <v-text-field
                    v-model="pseudo"
                    label="Pseudo"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    type="email"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                  <v-btn type="submit" color="primary" class="mt-3">Register</v-btn>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn text @click="goToLogin">Already have an account? Login</v-btn>
              </v-card-actions>
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
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
const toast = useToast()

const pseudo = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const register = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      pseudo: pseudo.value,
      email: email.value,
      password: password.value
    })
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('role', response.data.role)  // Store the user's role
    router.push('/')
  } catch (error) {
    console.error('Registration failed:', error)
    toast.error(error.response.data.error || 'An error occurred')
  }
}

const goToLogin = () => {
  router.push('/login')
}
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
