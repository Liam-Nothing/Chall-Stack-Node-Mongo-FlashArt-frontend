<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon class="d-md-none"></v-app-bar-nav-icon>
    <v-toolbar-title>Flash-Art-Chall</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text class="d-none d-md-inline-flex" to="/">Home</v-btn>
    <v-btn text class="d-none d-md-inline-flex" to="/flashes">Flashes</v-btn>
    <v-btn v-if="isAuthenticated && isTatoueurOrAdmin" text class="d-none d-md-inline-flex" to="/manage-slots">Manage Slots</v-btn>
    <v-btn v-if="isAuthenticated && isTatoueurOrAdmin" text class="d-none d-md-inline-flex" to="/manage-flashes">Manage Flashes</v-btn>
    <v-btn v-if="isAuthenticated && userRole === 'admin'" text class="d-none d-md-inline-flex" to="/manage-users">Manage Users</v-btn>
    <v-btn v-if="!isAuthenticated" text class="d-none d-md-inline-flex" to="/login">Login</v-btn>
    <v-btn v-if="isAuthenticated" text @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
const toast = useToast()

const isAuthenticated = ref(false)
const isTatoueurOrAdmin = ref(false)
const userRole = ref('')
const router = useRouter()

onMounted(() => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  if (token) {
    isAuthenticated.value = true
    userRole.value = role
    isTatoueurOrAdmin.value = role === 'tatoueur' || role === 'admin'
  }
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  isAuthenticated.value = false
  isTatoueurOrAdmin.value = false
  userRole.value = ''
  router.push('/login')
  toast.success('You have been logged out')
}
</script>

<style scoped>
</style>
