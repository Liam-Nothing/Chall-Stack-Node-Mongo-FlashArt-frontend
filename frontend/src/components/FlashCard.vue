<template>
    <v-card>
      <v-img :src="flash.image" height="200px"></v-img>
      <v-card-title>{{ flash.name }}</v-card-title>
      <v-card-subtitle>{{ flash.description }}</v-card-subtitle>
      <v-card-actions>
        <v-btn text>Réserver</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    flash: {
      type: Object,
      required: true
    }
  })
  </script>
  
  <style scoped>
  </style>
  