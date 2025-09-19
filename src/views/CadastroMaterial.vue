<template>
  <div class="cadastro-container">
    <h1>Cadastro de Material</h1>
    <form @submit.prevent="handleSubmit" class="cadastro-form">
      <div class="form-group">
        <label for="nome">Nome do Material</label>
        <InputText id="nome" v-model="formData.nome" required />
      </div>

      <div class="form-group">
        <label for="codigo">Código</label>
        <InputText id="codigo" v-model="formData.codigo" required />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="quantidade">Quantidade</label>
          <InputNumber id="quantidade" v-model="formData.quantidade" :min="0" required />
        </div>

        <div class="form-group">
          <label for="unidade">Unidade</label>
          <Dropdown id="unidade" v-model="formData.unidade" :options="unidades" optionLabel="name" optionValue="value" placeholder="Selecione" required />
        </div>
      </div>

      <div class="form-group">
        <label for="categoria">Categoria</label>
        <Dropdown id="categoria" v-model="formData.categoria" :options="categorias" optionLabel="name" optionValue="value" placeholder="Selecione" required />
      </div>

      <div class="form-group">
        <label for="descricao">Descrição</label>
        <Textarea id="descricao" v-model="formData.descricao" rows="3" required />
      </div>

      <div class="form-actions">
        <Button type="button" label="Cancelar" class="p-button-secondary" @click="router.push('/home')" />
        <Button type="submit" label="Cadastrar" :loading="loading" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';

const router = useRouter();
const toast = useToast();
const loading = ref(false);

const unidades = [
  { name: 'Unidade', value: 'UN' },
  { name: 'Quilograma', value: 'KG' },
  { name: 'Metro', value: 'M' },
  { name: 'Litro', value: 'L' },
];

const categorias = [
  { name: 'Ferramentas', value: 'FERRAMENTAS' },
  { name: 'Elétricos', value: 'ELETRICOS' },
  { name: 'Hidráulicos', value: 'HIDRAULICOS' },
  { name: 'Escritório', value: 'ESCRITORIO' },
];

const formData = ref({
  nome: '',
  codigo: '',
  quantidade: null,
  unidade: null,
  categoria: null,
  descricao: '',
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    // Aqui você implementará a lógica de salvar no backend
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulando uma requisição
    
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Material cadastrado com sucesso!',
      life: 3000
    });

    router.push('/inventario');
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao cadastrar material. Tente novamente.',
      life: 3000
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.cadastro-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.cadastro-form {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 2rem;
  margin-top: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
}

:deep(.p-inputtext),
:deep(.p-dropdown),
:deep(.p-inputnumber-input) {
  width: 100%;
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
}

:deep(.p-dropdown-label) {
  color: white !important;
}

:deep(.p-dropdown-trigger) {
  color: white !important;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .cadastro-container {
    padding: 1rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>