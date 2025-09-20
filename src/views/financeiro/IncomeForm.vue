<template>
  <div class="form-container">
    <h2>{{ isEditing ? 'Editar Entrada' : 'Nova Entrada' }}</h2>
    
    <form @submit.prevent="handleSubmit" class="p-fluid">
      <div class="form-field">
        <label for="description">Descrição</label>
        <InputText 
          id="description" 
          v-model="formData.description" 
          required 
          autofocus
        />
      </div>

      <div class="form-field">
        <label for="amount">Valor</label>
        <InputNumber 
          id="amount" 
          v-model="formData.amount" 
          mode="currency" 
          currency="BRL" 
          locale="pt-BR"
          required
        />
      </div>

      <div class="form-field">
        <label for="date">Data</label>
        <Calendar 
          id="date" 
          v-model="formData.date" 
          dateFormat="dd/mm/yy"
          required
        />
      </div>

      <div class="form-field">
        <label for="source">Fonte</label>
        <Dropdown
          id="source"
          v-model="formData.source"
          :options="sourceOptions"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecione a fonte"
        />
      </div>

      <div class="form-actions">
        <Button 
          type="button" 
          label="Cancelar" 
          class="p-button-secondary" 
          @click="$router.back()"
        />
        <Button 
          type="submit" 
          :label="isEditing ? 'Atualizar' : 'Salvar'"
          :loading="loading"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const isEditing = ref(false);
const loading = ref(false);

const sourceOptions = [
  { name: 'Salário', value: 'SALARY' },
  { name: 'Freelance', value: 'FREELANCE' },
  { name: 'Investimentos', value: 'INVESTMENTS' },
  { name: 'Outros', value: 'OTHERS' }
];

const formData = ref({
  description: '',
  amount: null,
  date: new Date(),
  source: null
});

onMounted(async () => {
  const id = route.params.id;
  if (id) {
    isEditing.value = true;
    loading.value = true;
    try {
      // const response = await fetch(`sua-api/incomes/${id}`);
      // const data = await response.json();
      // formData.value = {
      //   ...data,
      //   date: new Date(data.date)
      // };
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao carregar os dados',
        life: 3000
      });
    } finally {
      loading.value = false;
    }
  }
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    const payload = {
      ...formData.value,
      date: formData.value.date.toISOString().split('T')[0]
    };

    // const url = isEditing.value 
    //   ? `sua-api/incomes/${route.params.id}`
    //   : 'sua-api/incomes';
    
    // const method = isEditing.value ? 'PUT' : 'POST';
    
    // const response = await fetch(url, {
    //   method,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(payload)
    // });

    // if (!response.ok) throw new Error('Erro ao salvar');

    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: isEditing.value ? 'Entrada atualizada com sucesso!' : 'Entrada registrada com sucesso!',
      life: 3000
    });

    router.push('/financeiro/entradas');
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao salvar os dados',
      life: 3000
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

h2 {
  color: white;
  margin-bottom: 2rem;
}

.form-field {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
}

:deep(.p-inputtext),
:deep(.p-dropdown),
:deep(.p-calendar),
:deep(.p-inputnumber-input) {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
}

:deep(.p-dropdown-panel) {
  background: #1a1f2d !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

:deep(.p-dropdown-item) {
  color: white !important;
}

:deep(.p-dropdown-item:hover) {
  background: rgba(255, 255, 255, 0.1) !important;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .form-container {
    padding: 1rem;
  }
}
</style>