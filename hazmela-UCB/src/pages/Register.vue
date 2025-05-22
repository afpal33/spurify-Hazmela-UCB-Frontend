<template>
  <v-container class="d-flex align-center justify-center fill-height" fluid>
    <v-card elevation="3" max-width="650" width="100%" class="pa-8 rounded-xl">
      <div class="text-center mb-6">
        <v-img src="@/assets/logo.png" max-width="60" class="mx-auto mb-2" />
        <h2 class="text-h6 font-weight-bold">Crea tu Cuenta</h2>
        <p class="text-body-2 text-medium-emphasis">{{ stepDescriptions[step] }}</p>
      </div>

      <v-overlay :model-value="loading" class="d-flex flex-column justify-center align-center" persistent>
        <v-progress-circular indeterminate color="primary" size="40" class="mb-4" />
        <span class="text-subtitle-2 font-weight-medium">Creando tu cuenta...</span>
      </v-overlay>

      <v-form @submit.prevent="handleNext">
        <transition name="fade-slide" mode="out-in">
          <div :key="step">
            <v-row v-if="step === 1" dense>
              <v-col cols="12" sm="6">
                <v-text-field v-model="form.firstName" label="Nombre" prepend-inner-icon="mdi-account" required />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="form.lastName" label="Apellido" prepend-inner-icon="mdi-account" required />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="form.email" label="Correo electrónico" type="email" prepend-inner-icon="mdi-email" required />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="form.password" label="Contraseña" type="password" prepend-inner-icon="mdi-lock" required />
              </v-col>
            </v-row>

            <v-row v-else-if="step === 2" dense>
              <v-col cols="12" sm="6">
                <v-text-field v-model="form.country" label="País" prepend-inner-icon="mdi-earth" required />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="form.city" label="Ciudad" prepend-inner-icon="mdi-city" required />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="form.address" label="Dirección" prepend-inner-icon="mdi-map-marker" required />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="form.birthDate" label="Fecha de nacimiento" type="date" prepend-inner-icon="mdi-calendar" required />
              </v-col>
            </v-row>

            <v-row v-else-if="step === 3" dense>
              <v-col cols="12">
                <v-text-field v-model="form.university" label="Universidad" prepend-inner-icon="mdi-school-outline" required />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="form.career" label="Carrera" prepend-inner-icon="mdi-book-education-outline" required />
              </v-col>
            </v-row>
          </div>
        </transition>

        <v-row class="mt-6" align="center" justify="space-between">
          <v-btn v-if="step > 1" variant="text" @click="step--">Atrás</v-btn>
          <v-spacer />
          <v-btn type="submit" color="primary" class="px-6">
            {{ step === 3 ? 'Registrarme' : 'Siguiente' }}
          </v-btn>
        </v-row>

        <p class="text-caption text-center mt-4">
          ¿Ya tienes una cuenta?
          <RouterLink to="/login" class="text-primary font-weight-medium">Inicia sesión</RouterLink>
        </p>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const step = ref(1)
const loading = ref(false)

const stepDescriptions = {
  1: 'Ingresa tu información básica para comenzar.',
  2: 'Cuéntanos dónde vives y tu fecha de nacimiento.',
  3: 'Agrega tus datos académicos para personalizar tu perfil.',
}

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  country: '',
  city: '',
  address: '',
  birthDate: '',
  university: '',
  career: '',
})

const handleNext = () => {
  if (step.value === 3) {
    loading.value = true

    setTimeout(() => {
      loading.value = false

      store.dispatch('auth/login', {
        email: form.email,
        name: `${form.firstName} ${form.lastName}`,
        token: 'fake-jwt-token',
      })

      router.push('/')
    }, 2000)
  } else {
    step.value++
  }
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
