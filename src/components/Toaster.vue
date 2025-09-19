<template>
    <div class="card flex justify-center" style="margin: 2rem; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <Toast />
        <div class="flex flex-wrap gap-2">
            <Button label="Success" severity="success" @click="showSuccess" />
            <Button label="Info" severity="info" @click="showInfo" />
            <Button label="Warn" severity="warn" @click="showWarn" />
            <Button label="Error" severity="danger" @click="showError" />
        </div>
    </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import Button from 'primevue/button';
import Toast from 'primevue/toast';

const toast = useToast();

const showSuccess = () => {
    toast.add({ 
        severity: 'success', 
        summary: 'Sucesso!', 
        detail: 'Operação realizada com sucesso', 
        life: 3000 
    });
};

const showInfo = () => {
    toast.add({ 
        severity: 'info', 
        summary: 'Informação', 
        detail: 'Esta é uma mensagem informativa', 
        life: 3000 
    });
};

const showWarn = () => {
    toast.add({ 
        severity: 'warn', 
        summary: 'Atenção!', 
        detail: 'Esta é uma mensagem de aviso', 
        life: 3000 
    });
};

const showError = () => {
    toast.add({ 
        severity: 'error', 
        summary: 'Erro!', 
        detail: 'Ocorreu um erro na operação', 
        life: 3000 
    });
};
</script>

<style scoped>
/* Garantir que o Toast apareça com fundo sólido */
:deep(.p-toast) {
  position: fixed !important;
  top: 20px !important;
  right: 20px !important;
  z-index: 9999 !important;
}

:deep(.p-toast .p-toast-message) {
  background: white !important;
  border: 2px solid !important;
  border-radius: 12px !important;
  padding: 16px !important;
  margin-bottom: 8px !important;
  min-width: 300px !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
}

:deep(.p-toast .p-toast-message.p-toast-message-success) {
  background: #f0fdf4 !important;
  border-color: #22c55e !important;
  color: #15803d !important;
}

:deep(.p-toast .p-toast-message.p-toast-message-success .p-toast-message-icon) {
  color: #22c55e !important;
}

:deep(.p-toast .p-toast-message.p-toast-message-error) {
  background: #fef2f2 !important;
  border-color: #ef4444 !important;
  color: #dc2626 !important;
}

:deep(.p-toast .p-toast-message.p-toast-message-error .p-toast-message-icon) {
  color: #ef4444 !important;
}

:deep(.p-toast .p-toast-message.p-toast-message-warn) {
  background: #fffbeb !important;
  border-color: #f59e0b !important;
  color: #d97706 !important;
}

:deep(.p-toast .p-toast-message.p-toast-message-warn .p-toast-message-icon) {
  color: #f59e0b !important;
}

:deep(.p-toast .p-toast-message.p-toast-message-info) {
  background: #eff6ff !important;
  border-color: #3b82f6 !important;
  color: #2563eb !important;
}

:deep(.p-toast .p-toast-message.p-toast-message-info .p-toast-message-icon) {
  color: #3b82f6 !important;
}

:deep(.p-toast .p-toast-summary) {
  font-weight: 600 !important;
  font-size: 16px !important;
  margin-bottom: 4px !important;
}

:deep(.p-toast .p-toast-detail) {
  font-size: 14px !important;
  opacity: 0.9 !important;
}
</style>