<template>
  <div class="dashboard-home">
    <div class="welcome-section">
      <div class="welcome-text">
        <h1>Bem-vindo ao Sistema de Gestão de Materiais</h1>
        <p class="subtitle">{{ getGreeting() }} - {{ currentDate }}</p>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
          <i class="pi pi-box"></i>
        </div>
        <div class="stat-content">
          <p class="stat-label">Total de Materiais</p>
          <h3 class="stat-value">{{ materialsStore.totalMaterials }}</h3>
          <span class="stat-change positive">{{ materialsStore.totalMaterials }} cadastrados</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
          <i class="pi pi-chart-line"></i>
        </div>
        <div class="stat-content">
          <p class="stat-label">Categorias</p>
          <h3 class="stat-value">{{ Object.keys(materialsStore.materialsByCategory).length }}</h3>
          <span class="stat-change positive">Diferentes categorias</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
          <i class="pi pi-shopping-cart"></i>
        </div>
        <div class="stat-content">
          <p class="stat-label">Estoque Baixo</p>
          <h3 class="stat-value">{{ materialsStore.lowStockMaterials }}</h3>
          <span :class="['stat-change', materialsStore.lowStockMaterials > 0 ? 'warning' : 'positive']">
            {{ materialsStore.lowStockMaterials > 0 ? 'Requer atenção' : 'Tudo OK' }}
          </span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">
          <i class="pi pi-check-circle"></i>
        </div>
        <div class="stat-content">
          <p class="stat-label">Estoque OK</p>
          <h3 class="stat-value">{{ materialsStore.okStockMaterials }}</h3>
          <span class="stat-change positive">Situação normal</span>
        </div>
      </div>
    </div>

    <div class="quick-actions-section">
      <h2>Ações Rápidas</h2>
      <div class="actions-grid">
        <div class="action-card" @click="router.push('/cadastro')">
          <div class="action-icon">
            <i class="pi pi-plus-circle"></i>
          </div>
          <h3>Novo Cadastro</h3>
          <p>Cadastre um novo material no sistema</p>
        </div>
        
        <div class="action-card" @click="router.push('/inventario')">
          <div class="action-icon">
            <i class="pi pi-list"></i>
          </div>
          <h3>Ver Inventário</h3>
          <p>Visualize e gerencie os materiais cadastrados</p>
        </div>

        <div class="action-card" @click="generatePDF">
          <div class="action-icon">
            <i class="pi pi-file-pdf"></i>
          </div>
          <h3>Relatórios</h3>
          <p>Gere relatórios e análises</p>
        </div>

        <div class="action-card" @click="showNotification('Configurações em desenvolvimento')">
          <div class="action-icon">
            <i class="pi pi-cog"></i>
          </div>
          <h3>Configurações</h3>
          <p>Configure o sistema</p>
        </div>
      </div>
    </div>

    <div class="system-info">
      <div class="info-card">
        <h3><i class="pi pi-info-circle"></i> Sobre o Sistema</h3>
        <p>Sistema de Gestão de Materiais - Solução completa para controle de inventário</p>
        <ul>
          <li><i class="pi pi-check"></i> Cadastro detalhado de materiais</li>
          <li><i class="pi pi-check"></i> Controle de inventário em tempo real</li>
          <li><i class="pi pi-check"></i> Visualização e gerenciamento eficiente</li>
          <li><i class="pi pi-check"></i> Dados salvos localmente no navegador</li>
        </ul>
      </div>

      <div class="info-card">
        <h3><i class="pi pi-chart-bar"></i> Materiais por Categoria</h3>
        <div class="category-list">
          <div v-if="Object.keys(materialsStore.materialsByCategory).length === 0" class="empty-state">
            <p>Nenhum material cadastrado ainda</p>
          </div>
          <div v-else class="category-item" v-for="(items, category) in materialsStore.materialsByCategory" :key="category">
            <div class="category-info">
              <p class="category-name">{{ category }}</p>
              <p class="category-count">{{ items.length }} {{ items.length === 1 ? 'item' : 'itens' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMaterialsStore } from '../stores/materialsStore';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const router = useRouter();
const materialsStore = useMaterialsStore();

const currentDate = ref('');

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
};

const formatDate = () => {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date().toLocaleDateString('pt-BR', options);
};

const showNotification = (message) => {
  alert(message);
};

const generatePDF = () => {
  console.log('Gerando PDF...', materialsStore.materials);
  
  try {
    const doc = new jsPDF();
    
    // Configurações
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Título
    doc.setFontSize(18);
    doc.text('Relatorio de Materiais', pageWidth / 2, 20, { align: 'center' });
    
    // Data de geração
    doc.setFontSize(10);
    const hoje = new Date().toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    doc.text(`Gerado em: ${hoje}`, pageWidth / 2, 28, { align: 'center' });
  
    // Resumo
    doc.setFontSize(11);
    doc.text('Resumo:', 14, 38);
    
    doc.setFontSize(10);
    doc.text(`Total de Materiais: ${materialsStore.totalMaterials}`, 14, 44);
    doc.text(`Estoque Baixo: ${materialsStore.lowStockMaterials}`, 14, 50);
    doc.text(`Estoque OK: ${materialsStore.okStockMaterials}`, 14, 56);
    
    // Tabela de materiais
    const tableData = materialsStore.materials.map(material => [
      material.codigo,
      material.nome,
      material.categoria,
      `${material.quantidade} ${material.unidade}`,
      material.descricao
    ]);
    
    autoTable(doc, {
      startY: 65,
      head: [['Codigo', 'Nome', 'Categoria', 'Quantidade', 'Descricao']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [35, 87, 126],
        textColor: 255,
        fontSize: 10
      },
      bodyStyles: {
        fontSize: 9
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 40 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
        4: { cellWidth: 'auto' }
      },
      margin: { top: 65 },
      didDrawPage: (data) => {
        // Rodapé
        doc.setFontSize(8);
        doc.setTextColor(128);
        doc.text(
          `Pagina ${doc.internal.getNumberOfPages()}`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
      }
    });
    
    // Salva o PDF
    doc.save(`relatorio-materiais-${new Date().getTime()}.pdf`);
    console.log('PDF gerado com sucesso!');
    
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    alert('Erro ao gerar PDF: ' + error.message);
  }
};

onMounted(() => {
  currentDate.value = formatDate();
});
</script>

<style scoped>
.dashboard-home {
  padding: 0;
  max-width: 100%;
}

.welcome-section {
  background: linear-gradient(135deg, #23577e 0%, #1a1f2d 100%);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.welcome-text h1 {
  margin: 0 0 0.5rem 0;
  color: white;
  font-size: 2rem;
  font-weight: 600;
}

.subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin: 0;
  text-transform: capitalize;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.08);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon i {
  font-size: 1.8rem;
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
}

.stat-value {
  color: white;
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.stat-change {
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  display: inline-block;
}

.stat-change.positive {
  color: #43e97b;
  background: rgba(67, 233, 123, 0.1);
}

.stat-change.warning {
  color: #f5576c;
  background: rgba(245, 87, 108, 0.1);
}

.quick-actions-section {
  margin-bottom: 2rem;
}

.quick-actions-section h2 {
  color: white;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: rgba(35, 87, 126, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-card:hover {
  transform: translateY(-5px);
  background: rgba(35, 87, 126, 0.5);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.action-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-icon i {
  font-size: 2rem;
  color: white;
}

.action-card h3 {
  color: white;
  margin: 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.action-card p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.5;
}

.system-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.info-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
}

.info-card h3 {
  color: white;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-card h3 i {
  color: #667eea;
}

.info-card p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.info-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-card li {
  color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-card li i {
  color: #43e97b;
  font-size: 0.9rem;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.category-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
}

.category-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.category-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-name {
  color: white;
  margin: 0;
  font-weight: 500;
}

.category-count {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-size: 0.9rem;
}

.empty-state {
  text-align: center;
  padding: 2rem 1rem;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  font-style: italic;
}

@media (max-width: 768px) {
  .welcome-section {
    padding: 1.5rem;
  }

  .welcome-text h1 {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-value {
    font-size: 1.5rem;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }

  .system-info {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .stat-card {
    flex-direction: column;
    text-align: center;
  }

  .stat-icon {
    margin: 0 auto;
  }
}
</style>