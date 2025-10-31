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

    <Dialog v-model:visible="editDialog" :style="{width: '600px'}" header="Editar Material" :modal="true">
      <div class="edit-form">
        <div class="form-group">
          <label>Código</label>
          <input type="text" v-model="materialEditando.codigo" disabled class="form-input disabled" />
        </div>
        
        <div class="form-group">
          <label>Nome *</label>
          <input type="text" v-model="materialEditando.nome" class="form-input" placeholder="Nome do material" />
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>Categoria *</label>
            <select v-model="materialEditando.categoria" class="form-input">
              <option value="">Selecione...</option>
              <option value="Eletrônicos">Eletrônicos</option>
              <option value="Ferramentas">Ferramentas</option>
              <option value="Material de Escritório">Material de Escritório</option>
              <option value="Limpeza">Limpeza</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Quantidade *</label>
            <input type="number" v-model="materialEditando.quantidade" class="form-input" min="0" />
          </div>
          
          <div class="form-group">
            <label>Unidade *</label>
            <select v-model="materialEditando.unidade" class="form-input">
              <option value="">Selecione...</option>
              <option value="un">Unidade</option>
              <option value="kg">Quilograma</option>
              <option value="m">Metro</option>
              <option value="l">Litro</option>
              <option value="cx">Caixa</option>
            </select>
          </div>
        </div>
        
        <div class="form-group">
          <label>Descrição</label>
          <textarea v-model="materialEditando.descricao" class="form-input" rows="3" placeholder="Descrição do material"></textarea>
        </div>
      </div>
      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="editDialog = false"/>
        <Button label="Salvar" icon="pi pi-check" @click="salvarEdicao" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deleteDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>Tem certeza que deseja excluir este material?</span>
      </div>
      <template #footer>
        <Button label="Não" icon="pi pi-times" class="p-button-danger" @click="deleteDialog = false"/>
        <Button label="Sim" icon="pi pi-check" class="p-button-success" @click="excluirMaterial" />
      </template>
    </Dialog>

    <Toast />
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
import Toast from 'primevue/toast';
import { useMaterialsStore } from '../stores/materialsStore';

const router = useRouter();
const toast = useToast();
const materialsStore = useMaterialsStore();
const loading = ref(true);
const editDialog = ref(false);
const deleteDialog = ref(false);
const materialParaExcluir = ref(null);
const materialEditando = ref({
  id: null,
  codigo: '',
  nome: '',
  categoria: '',
  quantidade: 0,
  unidade: '',
  descricao: ''
});

// Usa os materiais do store
const materiais = materialsStore.materials;

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  loading.value = false;
});

const editarMaterial = (material) => {
  materialEditando.value = { ...material };
  editDialog.value = true;
};

const salvarEdicao = async () => {
  // Validação
  if (!materialEditando.value.nome || !materialEditando.value.categoria || 
      !materialEditando.value.quantidade || !materialEditando.value.unidade) {
    toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Preencha todos os campos obrigatórios',
      life: 3000
    });
    return;
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const success = materialsStore.updateMaterial(materialEditando.value.id, materialEditando.value);
    
    if (success) {
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Material atualizado com sucesso',
        life: 3000
      });
      editDialog.value = false;
    } else {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Material não encontrado',
        life: 3000
      });
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao atualizar material',
      life: 3000
    });
  }
};

const confirmarExclusao = (material) => {
  materialParaExcluir.value = material;
  deleteDialog.value = true;
};

const excluirMaterial = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const success = materialsStore.deleteMaterial(materialParaExcluir.value.id);
    
    if (success) {
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Material excluído com sucesso',
        life: 3000
      });
    } else {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Material não encontrado',
        life: 3000
      });
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao excluir material',
      life: 3000
    });
  } finally {
    deleteDialog.value = false;
    materialParaExcluir.value = null;
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

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #1a1f2d;
  font-weight: 500;
  font-size: 0.95rem;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  background: #ffffff;
  color: #1a1f2d;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  background: #ffffff;
}

.form-input.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #f5f5f5;
  color: #666666;
}

.form-input::placeholder {
  color: rgba(0, 0, 0, 0.4);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

textarea.form-input {
  resize: vertical;
  font-family: inherit;
}

select.form-input {
  cursor: pointer;
}

select.form-input option {
  background: #1a1f2d;
  color: white;
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

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>