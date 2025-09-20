<template>
  <div class="dashboard-home">
    <div class="summary-section">
      <div class="summary-cards">
        <!-- Card de Receitas -->
        <div class="summary-card income" :class="{ loading: loading }">
          <div class="card-icon">
            <i class="pi pi-arrow-up"></i>
          </div>
          <div class="card-content">
            <h3>Receitas</h3>
            <span class="amount">R$ {{ formatCurrency(dashboardData.totalIncome) }}</span>
            <span class="period">Este mês</span>
          </div>
        </div>

        <!-- Card de Despesas -->
        <div class="summary-card expense" :class="{ loading: loading }">
          <div class="card-icon">
            <i class="pi pi-arrow-down"></i>
          </div>
          <div class="card-content">
            <h3>Despesas</h3>
            <span class="amount">R$ {{ formatCurrency(dashboardData.totalExpenses) }}</span>
            <span class="period">Este mês</span>
          </div>
        </div>

        <!-- Card de Saldo -->
        <div class="summary-card balance" :class="{ loading: loading }">
          <div class="card-icon">
            <i class="pi pi-wallet"></i>
          </div>
          <div class="card-content">
            <h3>Saldo</h3>
            <span class="amount" :class="{ negative: balance < 0 }">
              R$ {{ formatCurrency(balance) }}
            </span>
            <span class="period">Atual</span>
          </div>
        </div>

        <!-- Card de Dívidas -->
        <div class="summary-card debt" :class="{ loading: loading }">
          <div class="card-icon">
            <i class="pi pi-clock"></i>
          </div>
          <div class="card-content">
            <h3>Dívidas Pendentes</h3>
            <span class="amount negative">R$ {{ formatCurrency(dashboardData.totalDebts) }}</span>
            <span class="period">Total</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de Ações Rápidas -->
    <div class="quick-actions">
      <h2>Ações Rápidas</h2>
      <div class="actions-grid">
        <div class="action-card income" @click="router.push('/receitas/novo')">
          <i class="pi pi-plus-circle"></i>
          <h3>Nova Receita</h3>
          <p>Registrar nova entrada de dinheiro</p>
        </div>
        <div class="action-card expense" @click="router.push('/despesas/novo')">
          <i class="pi pi-minus-circle"></i>
          <h3>Nova Despesa</h3>
          <p>Registrar nova saída de dinheiro</p>
        </div>
      </div>
    </div>

    <!-- Seção de Últimas Transações -->
    <div class="recent-transactions" v-if="!loading">
      <h2>Últimas Transações</h2>
      <DataTable 
        :value="dashboardData.recentTransactions" 
        :rows="5"
        stripedRows
        class="transaction-table"
      >
        <Column field="date" header="Data">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.date) }}
          </template>
        </Column>
        <Column field="description" header="Descrição" />
        <Column field="amount" header="Valor">
          <template #body="slotProps">
            <span :class="{ 'text-success': slotProps.data.type === 'income', 'text-danger': slotProps.data.type === 'expense' }">
              R$ {{ formatCurrency(slotProps.data.amount) }}
            </span>
          </template>
        </Column>
        <Column field="type" header="Tipo">
          <template #body="slotProps">
            <Tag :severity="slotProps.data.type === 'income' ? 'success' : 'danger'">
              {{ slotProps.data.type === 'income' ? 'Receita' : 'Despesa' }}
            </Tag>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Loading Placeholder -->
    <div v-if="loading" class="loading-overlay">
      <ProgressSpinner />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import ProgressSpinner from 'primevue/progressspinner';

const router = useRouter();
const toast = useToast();
const loading = ref(true);

// Estado do dashboard
const dashboardData = ref({
  totalIncome: 0,
  totalExpenses: 0,
  totalDebts: 0,
  recentTransactions: []
});

// Computed properties
const balance = computed(() => {
  return dashboardData.value.totalIncome - dashboardData.value.totalExpenses;
});

// Funções utilitárias
const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

// Função para buscar dados do dashboard
const fetchDashboardData = async () => {
  loading.value = true;
  try {
    // Buscar total de receitas
    const incomeResponse = await fetch('sua-api/incomes/total');
    const incomeData = await incomeResponse.json();
    
    // Buscar total de despesas
    const expensesResponse = await fetch('sua-api/expenses/total');
    const expensesData = await expensesResponse.json();
    
    // Buscar total de dívidas
    const debtsResponse = await fetch('sua-api/debts/total');
    const debtsData = await debtsResponse.json();
    
    // Buscar transações recentes
    const transactionsResponse = await fetch('sua-api/transactions/recent');
    const transactionsData = await transactionsResponse.json();

    // Atualizar o estado
    dashboardData.value = {
      totalIncome: incomeData.total,
      totalExpenses: expensesData.total,
      totalDebts: debtsData.total,
      recentTransactions: transactionsData
    };
  } catch (error) {
    console.error('Erro ao carregar dados do dashboard:', error);
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível carregar os dados do dashboard',
      life: 3000
    });
  } finally {
    loading.value = false;
  }
};

// Carregar dados ao montar o componente
onMounted(() => {
  fetchDashboardData();
});
</script>

<style scoped>
.dashboard-home {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Cards de Resumo */
.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.summary-card.income {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.2);
}

.summary-card.expense {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.2);
}

.summary-card.balance {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.2);
}

.summary-card.debt {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.2);
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
}

.card-icon i {
  font-size: 1.5rem;
  color: white;
}

.card-content {
  flex: 1;
}

.card-content h3 {
  margin: 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
}

.amount {
  display: block;
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0.5rem 0;
}

.period {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.negative {
  color: #ef4444;
}

/* Ações Rápidas */

.description-card h2 {
  margin-top: 0;
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.description-card p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.description-card ul {
  color: rgba(255, 255, 255, 0.8);
  padding-left: 1.5rem;
}

.description-card li {
  margin: 0.5rem 0;
}

.quick-actions {
  margin-top: 3rem;
}

.quick-actions h2 {
  color: #fff;
  margin-bottom: 1.5rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.action-card {
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.action-card.income {
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.action-card.expense {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.action-card:hover {
  transform: translateY(-5px);
}

.action-card.income:hover {
  background: rgba(34, 197, 94, 0.3);
}

.action-card.expense:hover {
  background: rgba(239, 68, 68, 0.3);
}

/* Tabela de Transações Recentes */
.recent-transactions {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-top: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.recent-transactions h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: white;
}

:deep(.p-datatable) {
  background: transparent;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-color: rgba(255, 255, 255, 0.1);
}

:deep(.p-datatable .p-datatable-tbody > tr) {
  background: transparent;
  color: white;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  border-color: rgba(255, 255, 255, 0.1);
}

:deep(.p-datatable .p-datatable-tbody > tr:nth-child(even)) {
  background: rgba(255, 255, 255, 0.03);
}

.text-success {
  color: #22c55e;
}

.text-danger {
  color: #ef4444;
}

/* Loading State */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.summary-card.loading {
  position: relative;
  overflow: hidden;
}

.summary-card.loading::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@media (max-width: 768px) {
  .dashboard-home {
    padding: 1rem;
  }
  
  .summary-cards {
    grid-template-columns: 1fr;
  }
}

.action-card i {
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 1rem;
}

.action-card h3 {
  color: #fff;
  margin: 0.5rem 0;
}

.action-card p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .dashboard-home {
    padding: 1rem;
  }
}
</style>