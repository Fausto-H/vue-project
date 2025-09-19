<template>
  <div class="container">
    <h1>Bem-vindo!</h1>
    <p>Login realizado com sucesso</p>
    <p><strong>Usuário:</strong> root</p>
    <button @click="logout">Sair</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  router.push('/');
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 10px;
}

p {
  color: #666;
  margin: 10px 0;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background: #0056b3;
}
</style>
