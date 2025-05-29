<template>
  <section class="anuncios-wrapper">
    <!-- Título y botón crear -->
    <div class="d-flex align-center justify-space-between mb-6">
      <div class="d-flex align-center">
        <v-icon
          color="primary"
          class="me-2"
          size="24"
        >
          mdi-bullhorn-outline
        </v-icon>
        <h2 class="text-h6 font-weight-bold text-primary">
          Anuncios
        </h2>
      </div>
      <v-btn
        color="primary"
        variant="flat"
        prepend-icon="mdi-plus"
        class="rounded-lg"
        @click="showCreateDialog = true"
      >
        Crear Anuncio
      </v-btn>
    </div>

    <!-- Filtros -->
    <v-card
      class="mb-6 pa-4 rounded-xl"
      color="surface"
      elevation="1"
    >
      <div class="d-flex flex-wrap gap-3 align-center">
        <v-select
          v-model="selectedArea"
          :items="areaOptions"
          label="Filtrar por área"
          variant="outlined"
          density="compact"
          clearable
          class="flex-grow-0"
          style="min-width: 200px;"
        />
        <v-btn
          :loading="isLoading"
          color="primary"
          variant="outlined"
          prepend-icon="mdi-refresh"
          size="small"
          @click="loadAnuncios"
        >
          Actualizar
        </v-btn>
      </div>
    </v-card>

    <!-- Mensajes de estado -->
    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      closable
      class="mb-4"
      @click:close="clearError"
    >
      {{ error }}
    </v-alert>

    <!-- Loading state -->
    <div
      v-if="isLoading && anuncios.length === 0"
      class="text-center py-8"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        size="40"
      />
      <p class="text-body-2 text-textSecondary mt-2">
        Cargando anuncios...
      </p>
    </div>

    <!-- No hay anuncios -->
    <v-card
      v-else-if="!isLoading && filteredAnuncios.length === 0"
      class="pa-8 text-center rounded-xl"
      color="surface"
      elevation="1"
    >
      <v-icon
        size="48"
        color="textSecondary"
        class="mb-3"
      >
        mdi-bullhorn-outline
      </v-icon>
      <h3 class="text-h6 text-textPrimary mb-2">
        No hay anuncios disponibles
      </h3>
      <p class="text-body-2 text-textSecondary mb-4">
        {{ selectedArea ? 'No se encontraron anuncios para el área seleccionada.' : 'Sé el primero en crear un anuncio.' }}
      </p>
      <v-btn
        v-if="!selectedArea"
        color="primary"
        variant="flat"
        @click="showCreateDialog = true"
      >
        Crear el primer anuncio
      </v-btn>
    </v-card>

    <!-- Lista de anuncios -->
    <div
      v-else
      class="anuncios-grid"
    >
      <v-card
        v-for="anuncio in filteredAnuncios"
        :key="anuncio.id"
        class="anuncio-card pa-5 rounded-xl"
        color="surface"
        elevation="1"
      >
        <!-- Header del anuncio -->
        <div class="d-flex justify-space-between align-start mb-3">
          <v-chip
            size="small"
            variant="tonal"
            color="primary"
            class="text-caption font-weight-medium"
          >
            {{ formatAreaName(anuncio.areaEspecializacion) }}
          </v-chip>
          <div class="text-end">
            <p class="text-h6 font-weight-bold text-success">
              {{ formatPrice(anuncio.precio) }}
            </p>
            <p class="text-caption text-textSecondary">
              Precio
            </p>
          </div>
        </div>

        <!-- Título y descripción -->
        <h3 class="text-h6 font-weight-bold text-textPrimary mb-2">
          {{ anuncio.titulo }}
        </h3>
        <p class="text-body-2 text-textSecondary mb-4">
          {{ anuncio.descripcion }}
        </p>

        <!-- Footer del anuncio -->
        <div class="d-flex justify-space-between align-center">
          <div class="d-flex align-center">
            <v-icon
              size="16"
              color="textSecondary"
              class="me-1"
            >
              mdi-calendar-outline
            </v-icon>
            <span class="text-caption text-textSecondary">{{ formatDate(anuncio.fechaLimite) }}</span>
          </div>
          <v-btn
            color="primary"
            variant="outlined"
            size="small"
            append-icon="mdi-arrow-right"
          >
            Ver detalles
          </v-btn>
        </div>
      </v-card>
    </div>

    <!-- Dialog para crear anuncio -->
    <v-dialog
      v-model="showCreateDialog"
      max-width="600"
      persistent
    >
      <v-card class="rounded-xl">
        <v-card-title class="d-flex align-center pa-6 bg-primary">
          <v-icon
            color="white"
            class="me-2"
          >
            mdi-plus-circle-outline
          </v-icon>
          <span class="text-h6 text-white">Crear Nuevo Anuncio</span>
        </v-card-title>

        <v-card-text class="pa-6">
          <v-form
            ref="createForm"
            @submit.prevent="handleCreateAnuncio"
          >            <v-text-field
              v-model="anuncioForm.titulo"
              label="Título del anuncio"
              variant="outlined"
              :error-messages="formErrors.titulo"
              class="mb-3"
              required
              @input="validateField('titulo', anuncioForm.titulo)"
            />            <v-textarea
              v-model="anuncioForm.descripcion"
              label="Descripción"
              variant="outlined"
              :error-messages="formErrors.descripcion"
              rows="4"
              class="mb-3"
              required
              @input="validateField('descripcion', anuncioForm.descripcion)"
              @blur="validateField('descripcion', anuncioForm.descripcion)"
            />

            <div class="d-flex gap-3 mb-3">              <v-text-field
                v-model="anuncioForm.precio"
                label="Precio (Bs.)"
                variant="outlined"
                type="number"
                :error-messages="formErrors.precio"
                class="flex-grow-1"
                required
                @input="validateField('precio', anuncioForm.precio)"
                @blur="validateField('precio', anuncioForm.precio)"
              />              <v-text-field
                v-model="anuncioForm.fechaLimite"
                label="Fecha límite"
                variant="outlined"
                type="date"
                :error-messages="formErrors.fechaLimite"
                class="flex-grow-1"
                required
                @input="validateField('fechaLimite', anuncioForm.fechaLimite)"
                @blur="validateField('fechaLimite', anuncioForm.fechaLimite)"
              />
            </div>            <v-select
              v-model="anuncioForm.areaEspecializacion"
              :items="areasEspecializacion"
              :item-title="(item) => formatAreaName(item)"
              :item-value="(item) => item"
              label="Área de especialización"
              variant="outlined"
              :error-messages="formErrors.areaEspecializacion"
              required
              @update:model-value="validateField('areaEspecializacion', anuncioForm.areaEspecializacion)"
            />
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer />
          <v-btn
            variant="outlined"
            :disabled="isCreating"
            @click="handleCancelCreate"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            variant="flat"
            :loading="isCreating"
            :disabled="!isFormValid"
            @click="handleCreateAnuncio"
          >
            Crear Anuncio
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar para notificaciones -->
    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      :timeout="4000"
      location="top"
    >
      {{ snackbarMessage }}
      <template #actions>
        <v-btn
          variant="text"
          @click="showSnackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAnuncios } from '@/composables/useAnuncios'

// Composable
const {
  anuncioForm,
  formErrors,
  isFormValid,
  areasEspecializacion,
  anuncios,
  anunciosPublicados,
  isLoading,
  isCreating,
  error,
  validateField,
  validateForm,
  resetForm,
  loadAnuncios,
  createAnuncio,
  formatAreaName,
  formatDate,
  formatPrice
} = useAnuncios()

// Estado local
const showCreateDialog = ref(false)
const selectedArea = ref(null)
const showSnackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

// Computeds
const areaOptions = computed(() => [
  { title: 'Todas las áreas', value: null },
  ...areasEspecializacion.map(area => ({ 
    title: formatAreaName(area), 
    value: area 
  }))
])

const filteredAnuncios = computed(() => {
  if (!selectedArea.value) {
    return anunciosPublicados.value
  }
  return anunciosPublicados.value.filter(anuncio => 
    anuncio.areaEspecializacion === selectedArea.value
  )
})

// Métodos
const clearError = () => {
  // Limpiar error del store
  // anunciosStore.clearError()
}

const handleCreateAnuncio = async () => {
  if (!validateForm()) {
    return
  }

  const result = await createAnuncio()
  
  if (result.success) {
    showCreateDialog.value = false
    showNotification('Anuncio creado exitosamente', 'success')
    // Recargar anuncios para mostrar el nuevo
    await loadAnuncios()
  } else {
    showNotification(result.error || 'Error al crear el anuncio', 'error')
  }
}

const handleCancelCreate = () => {
  resetForm()
  showCreateDialog.value = false
}

const showNotification = (message, color = 'info') => {
  snackbarMessage.value = message
  snackbarColor.value = color
  showSnackbar.value = true
}

// Lifecycle
onMounted(async () => {
  const result = await loadAnuncios()
  if (!result.success && result.error) {
    showNotification(result.error, 'error')
  }
})

// Watchers
watch(showCreateDialog, (newValue) => {
  if (!newValue) {
    resetForm()
  }
})
</script>

<style scoped>
.anuncios-wrapper {
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  margin: 0 auto;
}

.anuncios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.anuncio-card {
  border: 1px solid var(--v-theme-border);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  height: fit-content;
}

.anuncio-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

/* Responsive */
@media (max-width: 768px) {
  .anuncios-wrapper {
    padding: 1rem;
  }
  
  .anuncios-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
