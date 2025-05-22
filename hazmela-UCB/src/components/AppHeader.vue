<template>
  <header class="header">
    <nav class="navbar">
      <div class="logo">
        <h1>Hazmela</h1>
      </div>
      <div class="nav-links">
        <router-link
          to="/"
          class="nav-button highlight"
        >
          Inicio
        </router-link>
        <router-link
          to="/Anuncios"
          class="nav-button highlight"
        >
          Anuncios
        </router-link>
        <router-link
          to="/rating"
          class="nav-button highlight"
        >
          Calificaciones
        </router-link>
        <router-link
          to="/login"
          class="nav-button highlight"
        >
          Iniciar Sesión
        </router-link>
        <router-link
          to="/register"
          class="nav-button highlight"
        >
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
  background: rgba(255, 255, 255, 0.10); /* More transparent */
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 0 0 16px 16px;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow:
    0 8px 32px 0 rgba(31, 38, 135, 0.15),
    0 1.5px 4px rgba(0,0,0,0.07);
  position: relative;
  overflow: hidden;
}

/* Removed .navbar::before and animation */


.logo h1 {
  color: #222;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  text-shadow: 1px 1px 6px rgba(255, 255, 255, 0.2);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-button {
  text-decoration: none;
  color: #222;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.28);
  transform: translateY(-2px);
  box-shadow:
    0 5px 15px rgba(0, 0, 0, 0.08),
    inset 0 0 10px rgba(255, 255, 255, 0.18);
}

.highlight {
  background: linear-gradient(135deg, #007bff 0%, #00bfff 100%);
  color: #fff;
  border: none;
}

.highlight:hover {
  background: linear-gradient(135deg, #0056b3 0%, #0099cc 100%);
  color: white;
  box-shadow:
    0 5px 15px rgba(0, 123, 255, 0.2),
    inset 0 0 10px rgba(255, 255, 255, 0.18);
}
</style>
