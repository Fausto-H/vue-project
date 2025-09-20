<template>
  <div class="debt-payment-form">
    <h2>{{ isEditing ? 'Editar Pagamento' : 'Registrar Pagamento' }}</h2>
    
    <form @submit.prevent="handleSubmit" class="p-fluid">
      <div class="form-field">
        <label for="debt_id">Dívida</label>
        <Dropdown
          id="debt_id"
          v-model="formData.debt_id"
          :options="debts"
          optionLabel="description"
          optionValue="id"
          placeholder="Selecione a dívida"
          :disabled="isEditing"
          required
        />
      </div>

      <div class="form-field">
        <label for="amount_paid">Valor Pago</label>
        <InputNumber 
          id="amount_paid" 
          v-model="formData.amount_paid" 
          mode="currency" 
          currency="BRL" 
          locale="pt-BR"
          required
        />
      </div>

      <div class="form-field">
        <label for="payment_date">Data do Pagamento</label>
        <Calendar 
          id="payment_date" 
          v-model="formData.payment_date" 
          dateFormat="dd/mm/yy"
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

      <div class="form-field">
        <label for="note">Observação</label>
        <Textarea 
          id="note" 
          v-model="formData.note" 
          rows="3"
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
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const isEditing = ref(false);
const loading = ref(false);

// Dados mockados - substituir pela API
const debts = ref([
  { id: 1, description: 'Empréstimo Banco X - R$ 10.000,00' },
  { id: 2, description: 'Financiamento Carro - R$ 30.000,00' }
]);

const paymentMethods = [
  { name: 'Dinheiro', value: 'CASH' },
  { name: 'Cartão de Débito', value: 'DEBIT' },
  { name: 'Cartão de Crédito', value: 'CREDIT' },
  { name: 'PIX', value: 'PIX' },
  { name: 'Transferência', value: 'TRANSFER' }
];

const formData = ref({
  debt_id: null,
  amount_paid: null,
  payment_date: new Date(),
  payment_method: null,
  note: ''
});

onMounted(async () => {
  // Carregar lista de dívidas ativas
  try {
    // const response = await fetch('sua-api/debts?status=active');
    // const data = await response.json();
    // debts.value = data.map(debt => ({
    //   id: debt.id,
    //   description: `${debt.creditor} - R$ ${debt.amount}`
    // }));

    const id = route.params.id;
    if (id) {
      isEditing.value = true;
      loading.value = true;
      // const response = await fetch(`sua-api/debt-payments/${id}`);
      // const data = await response.json();
      // formData.value = {
      //   ...data,
      //   payment_date: new Date(data.payment_date)
      // };
    }
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
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    const payload = {
      ...formData.value,
      payment_date: formData.value.payment_date.toISOString().split('T')[0]
    };

    // const url = isEditing.value 
    //   ? `sua-api/debt-payments/${route.params.id}`
    //   : 'sua-api/debt-payments';
    
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
      detail: isEditing.value ? 'Pagamento atualizado com sucesso!' : 'Pagamento registrado com sucesso!',
      life: 3000
    });

    router.push('/financeiro/dividas');
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
.debt-payment-form {
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
  .debt-payment-form {
    padding: 1rem;
  }
}
</style>