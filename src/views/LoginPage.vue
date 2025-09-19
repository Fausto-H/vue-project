<template>
    <div class="login-container">
        <div class="login-card">
            <div class="login-header">
                <img src="/logo-app.png" alt="Logo" class="logo" />
                <div class="login-title">
                    <h1 class="title">Welcome</h1>
                    <div class="subtitle">
                        <span>Don't have an account? </span>
                        <a href="#" class="link">Sign up</a>
                    </div>
                </div>
            </div>
            <div class="login-form">
                <div class="form-fields">
                    <IconField class="input-field">
                        <InputIcon class="pi pi-user input-icon" />
                        <InputText id="username" v-model="username" type="text" class="input-style" placeholder="Username" />
                    </IconField>
                    <IconField class="input-field">
                        <InputIcon class="pi pi-lock input-icon" />
                        <InputText id="password" v-model="password" type="password" class="input-style" placeholder="Password" />
                    </IconField>
                </div>
                <Button label="Sign In" class="signin-button" />
            </div>
            <a href="#" class="forgot-password">Forgot Password?</a>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';

const username = ref('');
const password = ref('');
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 5rem;
  background-image: url('/background-image.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  backdrop-filter: blur(50px);
}

@media (max-width: 1024px) {
  .login-container {
    padding: 1.5rem 5rem;
  }
}

@media (max-width: 768px) {
  .login-container {
    padding: 1.5rem;
  }
}

.login-card {
  width: 100%;
  max-width: 384px;
  padding: 3rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  backdrop-filter: blur(16px);
  border-radius: 1rem;
  background: #23577e5b; 
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .login-card {
    padding: 3rem 2rem;
  }
}

@media (max-width: 640px) {
  .login-card {
    padding: 3rem 2rem;
  }
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.logo {
  height: 6.5rem;
  width: 6.5rem;
}

.login-title {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.title {
  text-align: center;
  font-size: 1.875rem;
  font-weight: 500;
  color: white;
  line-height: 1.2;
  margin: 0;
}

.subtitle {
  text-align: center;
}

.subtitle span {
  color: rgba(255, 255, 255, 0.8);
}

.link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: underline;
  cursor: pointer;
}

.link:hover {
  color: rgba(255, 255, 255, 0.9);
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.input-field {
  width: 100%;
}

.input-icon {
  color: rgba(255, 255, 255, 0.7) !important;
  position: absolute !important;
  left: 1rem !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  z-index: 10 !important;
}

.input-style {
  appearance: none !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  width: 100% !important;
  outline: none !important;
  background: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
  border-radius: 1.5rem !important;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
  padding: 0.75rem 1rem 0.75rem 2.5rem !important;
}

.input-style::placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}

.input-style:focus {
  border-color: rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1) !important;
}

/* Estilos para placeholders normais */

.signin-button {
  width: 100% !important;
  border-radius: 1.5rem !important;
  background: #23577E !important;
  border: 1px solid #23577E !important;
  color: white !important;
  padding: 0.75rem 1rem !important;
  font-weight: 500 !important;
}

.signin-button:hover {
  background: #193e5a !important;
}

.forgot-password {
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  text-decoration: none;
}

.forgot-password:hover {
  color: rgba(255, 255, 255, 0.9);
}
</style>