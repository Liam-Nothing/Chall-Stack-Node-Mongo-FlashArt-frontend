<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon class="d-md-none"></v-app-bar-nav-icon>
    <v-toolbar-title>Flash-Art-Chall</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text class="d-none d-md-inline-flex" to="/">Home</v-btn>
    <v-btn text class="d-none d-md-inline-flex" to="/flashes">Flashes</v-btn>
    <v-btn v-if="!isAuthenticated" text class="d-none d-md-inline-flex" to="/login">Login</v-btn>
    <v-btn v-if="isAuthenticated" text @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const isAuthenticated = ref(false)
const router = useRouter()

onMounted(() => {
  if (localStorage.getItem('token')) {
    isAuthenticated.value = true
  }
})

const logout = () => {
  localStorage.removeItem('token')
  isAuthenticated.value = false
  router.push('/login')
}
</script>

<style scoped>
</style>
