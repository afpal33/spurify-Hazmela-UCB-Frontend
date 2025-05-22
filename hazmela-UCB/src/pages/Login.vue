<template>
  <v-app>
    <v-main class="d-flex align-center justify-center" style="min-height: 100vh;">
      <v-container class="text-center" max-width="500">
        <v-card class="pa-6" elevation="2" rounded="lg">
          <v-img src="@/assets/logo.png" max-width="80" class="mx-auto mb-4" />
          <h2 class="text-h5 font-weight-bold mb-1">Iniciar Sesión en Hazmela</h2>
          <p class="text-body-2 mb-6">Resuelve tus tareas con ayuda de expertos</p>

          <v-form @submit.prevent="handleLogin">
            <v-text-field
              v-model="email"
              label="Correo electrónico"
              type="email"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              density="comfortable"
              class="mb-4"
              required
            />
            <v-text-field
              v-model="password"
              label="Contraseña"
              type="password"
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              density="comfortable"
              class="mb-6"
              required
            />
            <v-btn type="submit" color="primary" size="large" rounded="lg" block>
              Iniciar Sesión
            </v-btn>
          </v-form>

          <v-divider class="my-6" />

          <p class="text-caption">
            ¿No tienes una cuenta?
            <router-link to="/register" class="nav-button highlight">
              Registrarse
            </router-link>
          </p>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const email = ref('')
const password = ref('')
const router = useRouter()
const store = useStore()

const handleLogin = () => {
  if (email.value && password.value) {
    const user = {
      name: email.value.split('@')[0],
      email: email.value
    }

    store.dispatch('auth/login', {
      user,
      token: 'fake-jwt-token'
    })

    router.push('/')
  } else {
    alert('Por favor, completa todos los campos')
  }
}
</script>
