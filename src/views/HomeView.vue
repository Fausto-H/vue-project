<template>
  <div class="layout-wrapper">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <img src="/logo-app.png" alt="Logo" class="logo" />
        <h2>Dashboard</h2>
      </div>

      <div class="menu">
        <div class="menu-category">MENU</div>
        <ul class="menu-items">
        <div class="action-card" @click="router.push('/home')">
          <li class="menu-item">
            <i class="pi pi-home"></i>
            <span>Home</span>
          </li>
          </div>
          <div class="action-card" @click="router.push('/cadastro')">
          <li class="menu-item">
            <i class="pi pi-users" ></i>
            <span>Cadastro</span>
          </li>
          </div>
          <div class="action-card" @click="router.push('/inventario')">
           <li class="menu-item">
            <i class="pi pi-chart-bar"></i>
            <span>Inventário</span>
          </li>
          </div>
          <li class="menu-item">
            <i class="pi pi-cog"></i>
            <span>Configurações</span>
          </li>
        </ul>
      </div>

      <div class="sidebar-footer">
        <button class="logout-button" @click="logout">
          <i class="pi pi-sign-out"></i>
          <span>Sair</span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="topbar">
        <div class="breadcrumb">
          <i class="pi pi-home"></i>
          <span>/ Home</span>
        </div>
        <div class="user-profile">
          <span class="user-name">Administrador</span>
          <i class="pi pi-user"></i>
        </div>
      </div>

      <div class="content">
        <router-view></router-view>
      </div>
    </div>
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
.layout-wrapper {
  display: flex;
  min-height: 100vh;
  background-color: #1a1f2d;
}

.sidebar {
  width: 280px;
  background: linear-gradient(180deg, #23577e 0%, #1a1f2d 100%);
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  width: 4rem;
  height: 4rem;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
}

.menu {
  flex: 1;
  margin-top: 2rem;
}

.menu-category {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.menu-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.menu-item.active {
  background: rgba(255, 255, 255, 0.15);
}

.menu-item i {
  font-size: 1.25rem;
}

.sidebar-footer {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.logout-button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: #1e2433;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
}

.user-name {
  font-size: 0.875rem;
}

.content {
  flex: 1;
  padding: 2rem;
  color: white;
}

.content h1 {
  margin: 0;
  font-size: 1.875rem;
  font-weight: 500;
  color: white;
}

@media (max-width: 768px) {
  .sidebar {
    width: 80px;
    padding: 1rem;
  }

  .sidebar-header h2,
  .menu-category,
  .menu-item span,
  .logout-button span,
  .user-name {
    display: none;
  }

  .menu-item,
  .logout-button {
    justify-content: center;
    padding: 0.75rem;
  }

  .menu-item i {
    margin: 0;
  }
}
</style>
