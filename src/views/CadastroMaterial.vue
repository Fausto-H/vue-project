<template>
  <div class="cadastro-container">
    <h1>Cadastro de Material</h1>
    <form @submit.prevent="handleSubmit" class="cadastro-form">
      <div class="form-group">
        <label for="nome">Nome do Material</label>
        <InputText id="nome" class="inputtext" v-model="formData.nome" required />
      </div>

      <div class="form-row-three">
        <div class="form-group">
          <label for="quantidade">Quantidade</label>
          <InputNumber id="quantidade" class="inputnumber" v-model="formData.quantidade" :min="0" required />
        </div>

        <div class="form-group">
          <label for="unidade">Unidade</label>
          <Dropdown id="unidade" class="w-full" v-model="formData.unidade" :options="unidades" optionLabel="name" optionValue="value" placeholder="Selecione" required />
        </div>

        <div class="form-group">
          <label for="categoria">Categoria</label>
          <Dropdown id="categoria" class="w-full" v-model="formData.categoria" :options="categorias" optionLabel="name" optionValue="value" placeholder="Selecione" required />
        </div>
      </div>

      <div class="form-group">
        <label for="descricao">Descrição</label>
        <Textarea id="descricao" class="w-full" v-model="formData.descricao" rows="3" required />
      </div>

      <div class="form-actions">
        <Button type="button" label="Cancelar" class="p-button-secondary button-rounded" @click="router.push('/home')" />
        <Button type="submit" label="Cadastrar" class="button-rounded" :loading="loading" />
      </div>
    </form>
    <Toast />
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
import Toast from 'primevue/toast';
import { useMaterialsStore } from '../stores/materialsStore';

const router = useRouter();
const toast = useToast();
const materialsStore = useMaterialsStore();
const loading = ref(false);

const unidades = [
  { name: 'Unidade', value: 'UN' },
  { name: 'Quilograma', value: 'KG' },
  { name: 'Metro', value: 'M' },
  { name: 'Litro', value: 'L' },
];

const categorias = [
  { name: 'Ferramentas', value: 'Ferramentas' },
  { name: 'Elétricos', value: 'Elétricos' },
  { name: 'Hidráulicos', value: 'Hidráulicos' },
  { name: 'Escritório', value: 'Escritório' },
];

const formData = ref({
  nome: '',
  quantidade: null,
  unidade: null,
  categoria: null,
  descricao: '',
});

const generateCode = () => {
  const materials = materialsStore.materials;
  if (materials.length === 0) {
    return 'MAT001';
  }
  
  const lastCode = materials
    .map(m => {
      const num = parseInt(m.codigo.replace(''));
      return isNaN(num) ? 0 : num;
    })
    .sort((a, b) => b - a)[0];
  
  const nextNum = lastCode + 1;
  return `${String(nextNum).padStart(3, '0')}`;
};

const handleSubmit = async () => {
  loading.value = true;
  try {
    const codigo = generateCode();

    // Valida os campos obrigatórios
    if (!formData.value.nome || !formData.value.quantidade || 
        !formData.value.unidade || !formData.value.categoria || !formData.value.descricao) {
      toast.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Por favor, preencha todos os campos!',
        life: 3000
      });
      loading.value = false;
      return;
    }

    // Simula um pequeno delay para melhor UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Adiciona o material usando o store
    materialsStore.addMaterial({
      nome: formData.value.nome,
      codigo: codigo,
      quantidade: formData.value.quantidade,
      unidade: formData.value.unidade,
      categoria: formData.value.categoria,
      descricao: formData.value.descricao,
    });
    
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: `Material cadastrado com código ${codigo}!`,
      life: 3000
    });

    // Limpa o formulário
    formData.value = {
      nome: '',
      quantidade: null,
      unidade: null,
      categoria: null,
      descricao: '',
    };

    // Redireciona para o inventário após um pequeno delay
    setTimeout(() => {
      router.push('/inventario');
    }, 1000);
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

.inputtext {
  border-radius: 0.5rem;
}

.inputnumber :deep(.p-inputnumber-input) {
  border-radius: 0.5rem !important;
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

.form-row-three {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
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

.button-rounded {
  border-radius: 0.5rem !important;
}

@media (max-width: 768px) {
  .cadastro-container {
    padding: 1rem;
  }

  .form-row,
  .form-row-three {
    grid-template-columns: 1fr;
  }
}
</style>