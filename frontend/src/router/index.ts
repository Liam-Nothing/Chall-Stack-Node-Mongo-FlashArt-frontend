import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Flashes from '../views/Flashes.vue'
import Login from '../views/Login.vue'

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
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(""),
  routes
})

export default router
