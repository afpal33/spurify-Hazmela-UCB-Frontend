<template>
  <header class="header">
    <nav class="navbar">
      <div class="logo">
        <h1>Hazmela</h1>
      </div>
      <div class="nav-links">
        <router-link to="/anuncios" class="nav-button">
          Anuncios
        </router-link>
        <router-link to="/login" class="nav-button">
          Iniciar Sesión
        </router-link>
        <router-link to="/register" class="nav-button highlight">
          Registrarse
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.navbar {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0 0 16px 16px;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow:
    0 4px 30px rgba(0, 0, 0, 0.1),
    inset 0 0 20px rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.navbar::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  animation: crystal-shine 8s linear infinite;
}

@keyframes crystal-shine {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.logo h1 {
  color: rgba(51, 51, 51, 0.9);
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.3);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-button {
  text-decoration: none;
  color: rgba(51, 51, 51, 0.9);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow:
    0 5px 15px rgba(0, 0, 0, 0.1),
    inset 0 0 10px rgba(255, 255, 255, 0.2);
}

.highlight {
  background: linear-gradient(135deg, #007bff 0%, #00bfff 100%);
  color: white;
  border: none;
}

.highlight:hover {
  background: linear-gradient(135deg, #0056b3 0%, #0099cc 100%);
  color: white;
  box-shadow:
    0 5px 15px rgba(0, 123, 255, 0.3),
    inset 0 0 10px rgba(255, 255, 255, 0.2);
}
</style>
