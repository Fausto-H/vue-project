<template>
  <div class="form-container">
    <h2>{{ isEditing ? 'Editar Despesa' : 'Nova Despesa' }}</h2>
    
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
        <label for="category">Categoria</label>
        <Dropdown
          id="category"
          v-model="formData.category"
          :options="categoryOptions"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecione a categoria"
          required
        />
      </div>

      <div class="form-field">
        <label for="payment_method">Forma de Pagamento</label>
        <Dropdown
          id="payment_method"
          v-model="formData.payment_method"
          :options="paymentMethods"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecione a forma de pagamento"
          required
        />
      </div>

      <div class="form-field checkbox-field">
        <Checkbox 
          id="is_fixed" 
          v-model="formData.is_fixed" 
          :binary="true"
        />
        <label for="is_fixed" class="checkbox-label">Despesa Fixa</label>
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
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const isEditing = ref(false);
const loading = ref(false);

const categoryOptions = [
  { name: 'Alimentação', value: 'FOOD' },
  { name: 'Moradia', value: 'HOUSING' },
  { name: 'Transporte', value: 'TRANSPORT' },
  { name: 'Saúde', value: 'HEALTH' },
  { name: 'Educação', value: 'EDUCATION' },
  { name: 'Lazer', value: 'LEISURE' },
  { name: 'Outros', value: 'OTHERS' }
];

const paymentMethods = [
  { name: 'Dinheiro', value: 'CASH' },
  { name: 'Cartão de Débito', value: 'DEBIT' },
  { name: 'Cartão de Crédito', value: 'CREDIT' },
  { name: 'PIX', value: 'PIX' },
  { name: 'Transferência', value: 'TRANSFER' }
];

const formData = ref({
  description: '',
  amount: null,
  date: new Date(),
  category: null,
  payment_method: null,
  is_fixed: false
});

onMounted(async () => {
  const id = route.params.id;
  if (id) {
    isEditing.value = true;
    loading.value = true;
    try {
      // const response = await fetch(`sua-api/expenses/${id}`);
      // const data = await response.json();
      // formData.value = {
      //   ...data,
      //   date: new Date(data.date),
      //   is_fixed: Boolean(data.is_fixed)
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
      date: formData.value.date.toISOString().split('T')[0],
      is_fixed: formData.value.is_fixed ? 1 : 0
    };

    // const url = isEditing.value 
    //   ? `sua-api/expenses/${route.params.id}`
    //   : 'sua-api/expenses';
    
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
      detail: isEditing.value ? 'Despesa atualizada com sucesso!' : 'Despesa registrada com sucesso!',
      life: 3000
    });

    router.push('/financeiro/despesas');
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

.checkbox-field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-label {
  margin: 0;
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