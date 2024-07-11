import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Flashes from '../views/Flashes.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ManageSlots from '../views/ManageSlots.vue'
import ManageFlashes from '../views/ManageFlashes.vue'
import FlashDetails from '../views/FlashDetails.vue'

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
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/manage-slots',
    name: 'ManageSlots',
    component: ManageSlots,
    meta: { requiresAuth: true, roles: ['tatoueur', 'admin'] }
  },
  {
    path: '/manage-flashes',
    name: 'ManageFlashes',
    component: ManageFlashes,
    meta: { requiresAuth: true, roles: ['tatoueur', 'admin'] }
  },
  {
    path: '/flash/:id',
    name: 'FlashDetails',
    component: FlashDetails
  },
]

const router = createRouter({
  history: createWebHistory(""),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  const userRole = localStorage.getItem('role')
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Login' })
    } else if (to.matched.some(record => record.meta.roles && Array.isArray(record.meta.roles) && !record.meta.roles.includes(userRole))) {
      next({ name: 'Home' }) // Redirect to home if user doesn't have permission
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
