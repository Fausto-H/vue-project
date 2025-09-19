<template>
  <div class="dashboard-home">
    <h1>Sistema de Gestão de Materiais</h1>
    <div class="description-card">
      <h2>Sobre o Sistema</h2>
      <p>Bem-vindo ao Sistema de Gestão de Materiais, uma solução completa para gerenciamento de inventário e cadastro de materiais. Este sistema permite:</p>
      <ul>
        <li>Cadastro detalhado de materiais</li>
        <li>Controle de inventário em tempo real</li>
        <li>Visualização e gerenciamento eficiente do estoque</li>
        <li>Relatórios e análises de dados</li>
      </ul>
    </div>
    
    <div class="quick-actions">
      <h2>Ações Rápidas</h2>
      <div class="actions-grid">
        <div class="action-card" @click="router.push('/cadastro')">
          <i class="pi pi-plus-circle"></i>
          <h3>Novo Cadastro</h3>
          <p>Cadastre um novo material no sistema</p>
        </div>
        <div class="action-card" @click="router.push('/inventario')">
          <i class="pi pi-list"></i>
          <h3>Ver Inventário</h3>
          <p>Visualize e gerencie os materiais cadastrados</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style scoped>
.dashboard-home {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.description-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 2rem;
  margin: 2rem 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

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
  background: rgba(35, 87, 126, 0.3);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.action-card:hover {
  transform: translateY(-5px);
  background: rgba(35, 87, 126, 0.5);
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