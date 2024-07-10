import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Flashes from '../views/Flashes.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/flashes',
    name: 'Flashes',
    component: Flashes
  }
]

const router = createRouter({
  history: createWebHistory(""),
  routes
})

export default router
