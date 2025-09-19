import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import HomeView from '../views/HomeView.vue'
import DashboardHome from '../views/DashboardHome.vue'
import CadastroMaterial from '../views/CadastroMaterial.vue'
import InventarioView from '../views/InventarioView.vue'

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
      component: HomeView,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardHome
        },
        {
          path: '/cadastro',
          name: 'cadastro',
          component: CadastroMaterial
        },
        {
          path: '/inventario',
          name: 'inventario',
          component: InventarioView
        }
      ]
    }
  ]
})

export default router
