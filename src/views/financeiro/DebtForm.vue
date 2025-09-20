<template>
  <div class="form-container">
    <h2>{{ isEditing ? 'Editar Dívida' : 'Nova Dívida' }}</h2>
    
    <form @submit.prevent="handleSubmit" class="p-fluid">
      <div class="form-field">
        <label for="creditor">Credor</label>
        <InputText 
          id="creditor" 
          v-model="formData.creditor" 
          required 
          autofocus
        />
      </div>

      <div class="form-field">
        <label for="amount">Valor Principal</label>
        <InputNumber 
          id="amount" 
          v-model="formData.amount" 
          mode="currency" 
          currency="BRL" 
          locale="pt-BR"
          required
        />
      </div>

      <div class="form-row">
        <div class="form-field">
          <label for="interest_rate">Taxa de Juros (%)</label>
          <InputNumber 
            id="interest_rate" 
            v-model="formData.interest_rate" 
            mode="decimal"
            minFractionDigits="2"
            maxFractionDigits="2"
          />
        </div>

        <div class="form-field">
          <label for="interest_type">Tipo de Juros</label>
          <Dropdown
            id="interest_type"
            v-model="formData.interest_type"
            :options="interestTypes"
            optionLabel="name"
            optionValue="value"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-field">
          <label for="start_date">Data de Início</label>
          <Calendar 
            id="start_date" 
            v-model="formData.start_date" 
            dateFormat="dd/mm/yy"
            required
          />
        </div>

        <div class="form-field">
          <label for="due_date">Data de Vencimento</label>
          <Calendar 
            id="due_date" 
            v-model="formData.due_date" 
            dateFormat="dd/mm/yy"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-field">
          <label for="payment_frequency">Frequência de Pagamento</label>
          <Dropdown
            id="payment_frequency"
            v-model="formData.payment_frequency"
            :options="paymentFrequencies"
            optionLabel="name"
            optionValue="value"
          />
        </div>

        <div class="form-field">
          <label for="penalty_rate">Taxa de Multa (%)</label>
          <InputNumber 
            id="penalty_rate" 
            v-model="formData.penalty_rate" 
            mode="decimal"
            minFractionDigits="2"
            maxFractionDigits="2"
          />
        </div>
      </div>

      <div class="form-field">
        <label for="description">Observações</label>
        <Textarea 
          id="description" 
          v-model="formData.description" 
          rows="3"
        />
      </div>

      <div class="form-field checkbox-field">
        <Checkbox 
          id="is_paid" 
          v-model="formData.is_paid" 
          :binary="true"
        />
        <label for="is_paid" class="checkbox-label">Dívida Quitada</label>
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
import Textarea from 'primevue/textarea';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const isEditing = ref(false);
const loading = ref(false);

const interestTypes = [
  { name: 'Simples', value: 'simples' },
  { name: 'Composto', value: 'composto' }
];

const paymentFrequencies = [
  { name: 'Única', value: 'única' },
  { name: 'Mensal', value: 'mensal' },
  { name: 'Semanal', value: 'semanal' }
];

const formData = ref({
  creditor: '',
  amount: null,
  interest_rate: 0,
  interest_type: 'simples',
  start_date: new Date(),
  due_date: null,
  payment_frequency: 'única',
  penalty_rate: 0,
  description: '',
  is_paid: false
});

onMounted(async () => {
  const id = route.params.id;
  if (id) {
    isEditing.value = true;
    loading.value = true;
    try {
      // const response = await fetch(`sua-api/debts/${id}`);
      // const data = await response.json();
      // formData.value = {
      //   ...data,
      //   start_date: new Date(data.start_date),
      //   due_date: data.due_date ? new Date(data.due_date) : null,
      //   is_paid: Boolean(data.is_paid)
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
      start_date: formData.value.start_date.toISOString().split('T')[0],
      due_date: formData.value.due_date 
        ? formData.value.due_date.toISOString().split('T')[0] 
        : null,
      is_paid: formData.value.is_paid ? 1 : 0
    };

    // const url = isEditing.value 
    //   ? `sua-api/debts/${route.params.id}`
    //   : 'sua-api/debts';
    
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
      detail: isEditing.value ? 'Dívida atualizada com sucesso!' : 'Dívida registrada com sucesso!',
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
.form-container {
  max-width: 800px;
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

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>