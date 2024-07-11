<template>
  <v-card>
    <v-img :src="flash.image" height="200px"></v-img>
    <v-card-title>{{ flash.name }}</v-card-title>
    <v-card-subtitle>{{ flash.description }}</v-card-subtitle>
    <v-card-actions>
      <v-btn text @click="handleReservation">Réserver</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  flash: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const handleReservation = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    localStorage.setItem('redirectAfterLogin', `/flash/${props.flash._id}`)
    router.push('/login')
  } else {
    router.push(`/flash/${props.flash._id}`)
  }
}
</script>

<style scoped>
</style>
