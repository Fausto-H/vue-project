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
                <div class="captcha-container">
                    <div 
                        @click="!isHcaptchaVerified ? handleCaptchaCheckbox() : null" 
                        :class="[
                            'captcha-checkbox', 
                            isHcaptchaVerified ? 'captcha-verified' : ''
                        ]"
                    >
                        <div class="checkbox-square">
                            <i 
                                v-if="isHcaptchaVerified" 
                                class="pi pi-check checkbox-check"
                            ></i>
                        </div>
                        <span class="checkbox-text">
                            Não sou um robô
                        </span>
                    </div>

                    <!-- hCaptcha invisível -->
                    <div v-if="showCaptchaCheckbox" class="hidden">
                        <HCaptcha 
                            ref="hcaptchaRef" 
                            :sitekey="hcaptchaSiteKey" 
                            @verify="onHcaptchaVerify"
                            @expired="onHcaptchaExpired"
                            @error="onHcaptchaError"
                            size="invisible"
                            theme="dark"
                        />
                    </div>
                </div>
                <Button 
                    label="Sign In" 
                    class="signin-button" 
                    :disabled="isLoading || !isHcaptchaVerified"
                    @click="signin"
                >
                    <i v-if="isLoading" class="pi pi-spin pi-spinner mr-2"></i>
                    {{ isLoading ? 'Entrando...' : 'Sign In' }}
                </Button>
            </div>
            <a href="#" class="forgot-password">Forgot Password?</a>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import HCaptcha from '@hcaptcha/vue3-hcaptcha';

const username = ref('');
const password = ref('');

const hcaptchaSiteKey = '10000000-ffff-ffff-ffff-000000000001'; // chave pública de teste
const hcaptchaToken = ref('');
const isHcaptchaVerified = ref(false);
const showCaptchaCheckbox = ref(false);
const hcaptchaRef = ref(null);
const isLoading = ref(false);

const handleCaptchaCheckbox = async () => {
  if (!isHcaptchaVerified.value) {
    showCaptchaCheckbox.value = false;
    hcaptchaToken.value = '';
    
    await nextTick();
    
    showCaptchaCheckbox.value = true;
    await nextTick();
    
    if (hcaptchaRef.value) {
      try {
        hcaptchaRef.value.execute();
        console.log('hCaptcha executado - nova tentativa');
      } catch (error) {
        console.error('Erro ao executar hCaptcha:', error);
        showCaptchaCheckbox.value = false;
      }
    }
  }
};

const onHcaptchaVerify = (token) => {
  hcaptchaToken.value = token;
  isHcaptchaVerified.value = true;
  showCaptchaCheckbox.value = false;
  console.log('hCaptcha verificado:', token);
};

const onHcaptchaExpired = () => {
  hcaptchaToken.value = '';
  isHcaptchaVerified.value = false;
  showCaptchaCheckbox.value = false;
  console.log('hCaptcha expirou');
};

const onHcaptchaError = (error) => {
  hcaptchaToken.value = '';
  isHcaptchaVerified.value = false;
  showCaptchaCheckbox.value = false;
  console.error('Erro hCaptcha:', error);
};

const signin = () => {
  if (!isHcaptchaVerified.value) {
    alert('Por favor, complete a verificação hCaptcha');
    return;
  }
  
  isLoading.value = true;
  
  // Simulação de login
  setTimeout(() => {
    console.log('Login realizado com sucesso!', {
      username: username.value,
      password: password.value,
      hcaptchaToken: hcaptchaToken.value
    });
    isLoading.value = false;
  }, 2000);
};
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

.captcha-container {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.captcha-checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.captcha-checkbox:hover:not(.captcha-verified) {
  transform: translateY(-1px);
}

.captcha-checkbox:active:not(.captcha-verified) {
  transform: translateY(0);
}

.checkbox-square {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background: transparent;
}

.captcha-verified .checkbox-square {
  border-color: #24587E;
}

.checkbox-check {
  color: #24587E;
  font-size: 14px;
  font-weight: bold;
}

.checkbox-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.captcha-verified .checkbox-text {
  color: #24587E;
}

.captcha-verified {
  border-color: #24587E !important;
  cursor: default;
}

.signin-button {
  width: 100% !important;
  border-radius: 1.5rem !important;
  background: #23577E !important;
  border: 1px solid #23577E !important;
  color: white !important;
  padding: 0.75rem 1rem !important;
  font-weight: 500 !important;
}

.signin-button:hover:not(:disabled) {
  background: #193e5a !important;
}

.signin-button:disabled {
  background: rgba(35, 87, 126, 0.5) !important;
  border-color: rgba(35, 87, 126, 0.5) !important;
  cursor: not-allowed !important;
  opacity: 0.6 !important;
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