<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>Login</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="handleLogin">
                  <v-text-field
                    v-model="email"
                    label="Email"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                  <v-btn type="submit" color="primary">Login</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '../plugins/axios'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await apiClient.post('/auth/login', { email: email.value, password: password.value })
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('role', response.data.role)
    
    const redirectUrl = localStorage.getItem('redirectAfterLogin')
    if (redirectUrl) {
      localStorage.removeItem('redirectAfterLogin')
      router.push(redirectUrl)
    } else {
      router.push('/')
    }
  } catch (error) {
    console.error('Error logging in:', error)
  }
}
</script>

<style scoped>
</style>
