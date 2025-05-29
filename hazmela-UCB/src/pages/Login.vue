<template>
  <v-app>
    <v-main class="d-flex align-center justify-center" style="min-height: 100vh;">
      <v-container class="text-center" max-width="500">
        <v-card class="pa-6" elevation="2" rounded="lg">
          <v-img src="@/assets/logo.png" max-width="80" class="mx-auto mb-4" />
          <h2 class="text-h5 font-weight-bold mb-1">Iniciar Sesión en Hazmela</h2>
          <p class="text-body-2 mb-6">Resuelve tus tareas con ayuda de expertos</p>

          <!-- Mostrar error si existe -->
          <v-alert
            v-if="authStore.error"
            type="error"
            class="mb-4"
            closable
            @click:close="authStore.clearError()"
          >
            {{ authStore.error }}
          </v-alert>

          <v-form @submit.prevent="handleLogin">
            <v-text-field
              v-model="email"
              label="Correo electrónico"
              type="email"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              density="comfortable"
              class="mb-4"
              :disabled="authStore.isLoading"
              :error-messages="emailErrors"
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
              :disabled="authStore.isLoading"
              :error-messages="passwordErrors"
              required
            />
            <v-btn 
              type="submit" 
              color="primary" 
              size="large" 
              rounded="lg" 
              block
              :loading="authStore.isLoading"
              :disabled="!isFormValid"
            >
              {{ authStore.isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
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
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLoginForm } from '@/composables/useLoginForm'

const router = useRouter()
const authStore = useAuthStore()
const { 
  email, 
  password, 
  emailErrors, 
  passwordErrors, 
  isFormValid, 
  clearForm, 
  getCredentials 
} = useLoginForm()

const handleLogin = async () => {
  if (!isFormValid.value) {
    return
  }

  const result = await authStore.login(getCredentials())

  if (result.success) {
    clearForm()
    router.push('/')
  }
  // Los errores se muestran automáticamente desde el store
}
</script>
