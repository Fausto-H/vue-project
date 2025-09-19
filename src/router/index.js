import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import HomeView from '../views/HomeView.vue'
import TestToast from '../views/TestToast.vue'
import Toaster from '../components/Toaster.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/test-toast',
      name: 'test-toast',
      component: TestToast
    },
    {
      path: '/toaster',
      name: 'toaster',
      component: Toaster
    }
  ]
})

export default router
