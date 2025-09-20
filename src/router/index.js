import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import HomeView from '../views/HomeView.vue'
import DashboardHome from '../views/DashboardHome.vue'
import IncomeForm from '../views/financeiro/IncomeForm.vue'
import ExpenseForm from '../views/financeiro/ExpenseForm.vue'
import DebtForm from '../views/financeiro/DebtForm.vue'
import DebtPaymentForm from '../views/financeiro/DebtPaymentForm.vue'

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
          path: '/receitas/novo',
          name: 'nova-receita',
          component: IncomeForm
        },
        {
          path: '/receitas/editar/:id',
          name: 'editar-receita',
          component: IncomeForm
        },
        {
          path: '/despesas/novo',
          name: 'nova-despesa',
          component: ExpenseForm
        },
        {
          path: '/despesas/editar/:id',
          name: 'editar-despesa',
          component: ExpenseForm
        },
        {
          path: '/dividas/novo',
          name: 'nova-divida',
          component: DebtForm
        },
        {
          path: '/dividas/editar/:id',
          name: 'editar-divida',
          component: DebtForm
        },
        {
          path: '/dividas/pagamento/novo',
          name: 'novo-pagamento',
          component: DebtPaymentForm
        },
        {
          path: '/dividas/pagamento/editar/:id',
          name: 'editar-pagamento',
          component: DebtPaymentForm
        }
      ]
    }
  ]
})

export default router
