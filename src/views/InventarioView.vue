<template>
  <div class="inventario-container">
    <div class="inventario-header">
      <h1>Inventário de Materiais</h1>
      <Button icon="pi pi-plus" label="Novo Material" @click="router.push('/cadastro')" />
    </div>

    <DataTable
      :value="materiais"
      :paginator="true"
      :rows="10"
      :loading="loading"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rows-per-page-options="[10,20,50]"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
      responsiveLayout="scroll"
      class="inventario-table"
    >
      <Column field="codigo" header="Código" sortable></Column>
      <Column field="nome" header="Nome" sortable></Column>
      <Column field="categoria" header="Categoria" sortable></Column>
      <Column field="quantidade" header="Quantidade" sortable>
        <template #body="slotProps">
          {{ slotProps.data.quantidade }} {{ slotProps.data.unidade }}
        </template>
      </Column>
      <Column header="Ações" :exportable="false" style="min-width:8rem">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editarMaterial(slotProps.data)" />
          <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmarExclusao(slotProps.data)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="deleteDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>Tem certeza que deseja excluir este material?</span>
      </div>
      <template #footer>
        <Button label="Não" icon="pi pi-times" class="p-button-text" @click="deleteDialog = false"/>
        <Button label="Sim" icon="pi pi-check" class="p-button-text" @click="excluirMaterial" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const router = useRouter();
const toast = useToast();
const loading = ref(true);
const deleteDialog = ref(false);
const materialParaExcluir = ref(null);

// Dados mockados para exemplo
const materiais = ref([
  {
    id: 1,
    codigo: 'MAT001',
    nome: 'Chave de Fenda',
    categoria: 'Ferramentas',
    quantidade: 50,
    unidade: 'UN',
    descricao: 'Chave de fenda Phillips 3/16 x 4'
  },
  {
    id: 2,
    codigo: 'MAT002',
    nome: 'Cabo Elétrico',
    categoria: 'Elétricos',
    quantidade: 100,
    unidade: 'M',
    descricao: 'Cabo flexível 2.5mm'
  },
  // Adicione mais itens conforme necessário
]);

onMounted(async () => {
  // Aqui você implementará a lógica de carregar dados do backend
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulando uma requisição
  loading.value = false;
});

const editarMaterial = (material) => {
  // Implementar lógica de edição
  console.log('Editar material:', material);
};

const confirmarExclusao = (material) => {
  materialParaExcluir.value = material;
  deleteDialog.value = true;
};

const excluirMaterial = async () => {
  try {
    // Aqui você implementará a lógica de exclusão no backend
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulando uma requisição
    
    materiais.value = materiais.value.filter(m => m.id !== materialParaExcluir.value.id);
    
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Material excluído com sucesso',
      life: 3000
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao excluir material',
      life: 3000
    });
  } finally {
    deleteDialog.value = false;
  }
};
</script>

<style scoped>
.inventario-container {
  padding: 2rem;
}

.inventario-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.inventario-table {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  overflow: hidden;
}

:deep(.p-datatable) {
  background: transparent !important;
}

:deep(.p-datatable .p-datatable-header) {
  background: rgba(255, 255, 255, 0.1);
  border: none;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background: rgba(35, 87, 126, 0.3);
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

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background: rgba(255, 255, 255, 0.1);
}

:deep(.p-paginator) {
  background: transparent;
  border: none;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page) {
  color: white;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
  background: rgba(35, 87, 126, 0.3);
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}

@media (max-width: 768px) {
  .inventario-container {
    padding: 1rem;
  }

  .inventario-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
}
</style>