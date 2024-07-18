import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import LandingPage from '../views/LandingPage.vue'
import ShortCut from '@/views/ShortCut.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/shortCut',
      name: 'shortCut',
      component: ShortCut
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
