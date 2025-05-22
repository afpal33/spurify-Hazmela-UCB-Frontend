<template>
  <v-container fluid class="rating-container" style="margin-top: 8vh;">
    <v-row>
      <v-col cols="12">
        <div class="d-flex align-center mb-6">
          <h1 class="text-h4 font-weight-bold gradient-text">Calificaciones</h1>
          <v-spacer></v-spacer>
          <v-btn
            color="deep-purple-accent-4"
            prepend-icon="mdi-plus"
            class="rounded-pill"
            @click="openCreateDialog"
          >
            Nueva Calificación
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Filters -->
    <v-row class="mb-4">
      <v-col cols="12" md="4">
        <v-text-field
          v-model="filters.userId"
          label="Filtrar por ID de Usuario"
          variant="outlined"
          density="comfortable"
          hide-details
          class="rounded-lg"
          prepend-inner-icon="mdi-account"
          clearable
          @keyup.enter="filterByUser"
          @click:clear="clearUserFilter"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="filters.adId"
          label="Filtrar por ID de Anuncio"
          variant="outlined"
          density="comfortable"
          hide-details
          class="rounded-lg"
          prepend-inner-icon="mdi-bulletin-board"
          clearable
          @keyup.enter="filterByAd"
          @click:clear="clearAdFilter"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4" class="d-flex align-center">
        <v-btn
          color="primary"
          variant="tonal"
          class="mr-2"
          prepend-icon="mdi-refresh"
          @click="loadAllRatings"
        >
          Refrescar
        </v-btn>
      </v-col>
    </v-row>

    <!-- Loading state -->
    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          color="deep-purple-accent-4"
          size="64"
        ></v-progress-circular>
      </v-col>
    </v-row>

    <!-- Error state -->
    <v-row v-else-if="error">
      <v-col cols="12">
        <v-alert
          type="error"
          title="Error al cargar calificaciones"
          text="No se pudieron cargar las calificaciones. Por favor, intente nuevamente."
          class="mb-4"
        ></v-alert>
        <div class="text-center">
          <v-btn color="primary" @click="loadAllRatings">Reintentar</v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Empty state -->
    <v-row v-else-if="ratings.length === 0">
      <v-col cols="12">
        <v-sheet
          class="pa-6 rounded-lg text-center"
          color="grey-lighten-4"
          elevation="1"
        >
          <v-icon
            icon="mdi-star-off-outline"
            size="64"
            color="grey-darken-1"
            class="mb-4"
          ></v-icon>
          <h3 class="text-h5 mb-2">No hay calificaciones disponibles</h3>
          <p class="text-body-1 mb-4">
            No se encontraron calificaciones con los filtros actuales.
          </p>
          <v-btn
            color="primary"
            variant="tonal"
            @click="loadAllRatings"
          >
            Ver todas las calificaciones
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Ratings list -->
    <v-row v-else>
      <v-col
        v-for="rating in ratings"
        :key="rating.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="rating-card h-100"
          elevation="3"
          :class="{ 'border-primary': selectedRating && selectedRating.id === rating.id }"
        >
          <v-card-title class="d-flex justify-space-between align-center">
            <div>
              <span class="text-subtitle-1">Calificación #{{ rating.id }}</span>
            </div>
            <v-rating
              v-model="rating.score"
              color="amber"
              density="compact"
              half-increments
              readonly
              size="small"
            ></v-rating>
          </v-card-title>

          <v-card-text>
            <v-list-item density="compact" class="px-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-account" color="primary" class="mr-2"></v-icon>
              </template>
              <v-list-item-title>Usuario ID: {{ rating.userId }}</v-list-item-title>
            </v-list-item>

            <v-list-item density="compact" class="px-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-bulletin-board" color="primary" class="mr-2"></v-icon>
              </template>
              <v-list-item-title>Anuncio ID: {{ rating.adId }}</v-list-item-title>
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <p class="text-body-2 mt-2">{{ rating.comment }}</p>
            <p class="text-caption text-grey">Fecha: {{ formatDate(rating.createdAt) }}</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              variant="text"
              color="primary"
              size="small"
              @click="openEditDialog(rating)"
            >
              Editar
            </v-btn>
            <v-btn
              variant="text"
              color="error"
              size="small"
              @click="confirmDelete(rating)"
            >
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Create/Edit Dialog -->
    <v-dialog v-model="dialog.show" max-width="500px">
      <v-card class="pa-4">
        <v-card-title class="text-h5 mb-3">
          {{ dialog.isEdit ? 'Editar Calificación' : 'Nueva Calificación' }}
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="dialog.valid">
            <v-text-field
              v-model="dialog.rating.userId"
              label="ID de Usuario"
              variant="outlined"
              density="comfortable"
              class="mb-3"
              :rules="[v => !!v || 'ID de Usuario es requerido', v => !isNaN(v) || 'Debe ser un número']"
              type="number"
            ></v-text-field>

            <v-text-field
              v-model="dialog.rating.adId"
              label="ID de Anuncio"
              variant="outlined"
              density="comfortable"
              class="mb-3"
              :rules="[v => !!v || 'ID de Anuncio es requerido', v => !isNaN(v) || 'Debe ser un número']"
              type="number"
            ></v-text-field>

            <v-textarea
              v-model="dialog.rating.comment"
              label="Comentario"
              variant="outlined"
              density="comfortable"
              class="mb-3"
              :rules="[v => !!v || 'El comentario es requerido']"
              rows="3"
            ></v-textarea>

            <div class="d-flex flex-column align-center mb-3">
              <label class="text-body-1 mb-2">Puntuación</label>
              <v-rating
                v-model="dialog.rating.score"
                color="amber"
                half-increments
                hover
                size="large"
              ></v-rating>
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="closeDialog"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            :disabled="!dialog.valid"
            @click="saveRating"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog.show" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Confirmar Eliminación</v-card-title>
        <v-card-text>
          ¿Está seguro que desea eliminar esta calificación? Esta acción no se puede deshacer.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="deleteDialog.show = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="error"
            variant="elevated"
            @click="deleteRating"
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar for notifications -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbar.show = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// API base URL
const API_URL = 'http://localhost:8080/v1/rating'

// State
const ratings = ref([])
const loading = ref(false)
const error = ref(false)
const selectedRating = ref(null)

// Filters
const filters = ref({
  userId: '',
  adId: ''
})

// Dialog state for create/edit
const dialog = ref({
  show: false,
  isEdit: false,
  valid: false,
  rating: {
    id: null,
    userId: '',
    adId: '',
    score: 0,
    comment: '',
    createdAt: null
  }
})

// Delete dialog state
const deleteDialog = ref({
  show: false,
  rating: null
})

// Snackbar for notifications
const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
})

// Form reference
const form = ref(null)

// Load all ratings on component mount
onMounted(() => {
  loadAllRatings()
})

// Methods
const loadAllRatings = async () => {
  loading.value = true
  error.value = false

  try {
    const response = await axios.get(API_URL)
    ratings.value = response.data
  } catch (err) {
    console.error('Error loading ratings:', err)
    error.value = true
    showSnackbar('Error al cargar las calificaciones', 'error')
  } finally {
    loading.value = false
  }
}

const filterByUser = async () => {
  if (!filters.value.userId) return

  loading.value = true
  error.value = false

  try {
    const response = await axios.get(`${API_URL}/user/${filters.value.userId}`)
    ratings.value = response.data
    showSnackbar(`Mostrando calificaciones del usuario ${filters.value.userId}`, 'info')
  } catch (err) {
    console.error('Error filtering by user:', err)
    error.value = true
    showSnackbar('Error al filtrar por usuario', 'error')
  } finally {
    loading.value = false
  }
}

const filterByAd = async () => {
  if (!filters.value.adId) return

  loading.value = true
  error.value = false

  try {
    const response = await axios.get(`${API_URL}/ad/${filters.value.adId}`)
    ratings.value = response.data
    showSnackbar(`Mostrando calificaciones del anuncio ${filters.value.adId}`, 'info')
  } catch (err) {
    console.error('Error filtering by ad:', err)
    error.value = true
    showSnackbar('Error al filtrar por anuncio', 'error')
  } finally {
    loading.value = false
  }
}

const clearUserFilter = () => {
  filters.value.userId = ''
  if (!filters.value.adId) {
    loadAllRatings()
  }
}

const clearAdFilter = () => {
  filters.value.adId = ''
  if (!filters.value.userId) {
    loadAllRatings()
  }
}

const openCreateDialog = () => {
  dialog.value.isEdit = false
  dialog.value.rating = {
    id: null,
    userId: '',
    adId: '',
    score: 3,
    comment: '',
    createdAt: new Date().toISOString()
  }
  dialog.value.show = true
}

const openEditDialog = (rating) => {
  dialog.value.isEdit = true
  dialog.value.rating = { ...rating }
  dialog.value.show = true
  selectedRating.value = rating
}

const closeDialog = () => {
  dialog.value.show = false
  selectedRating.value = null
  if (form.value) {
    form.value.reset()
  }
}

const saveRating = async () => {
  if (!dialog.value.valid) return

  loading.value = true

  try {
    const ratingData = {
      userId: parseInt(dialog.value.rating.userId),
      adId: parseInt(dialog.value.rating.adId),
      score: dialog.value.rating.score,
      comment: dialog.value.rating.comment
    }

    let response

    if (dialog.value.isEdit) {
      // Update existing rating
      response = await axios.put(`${API_URL}/${dialog.value.rating.id}`, ratingData)

      // Update the rating in the list
      const index = ratings.value.findIndex(r => r.id === dialog.value.rating.id)
      if (index !== -1) {
        ratings.value[index] = response.data
      }

      showSnackbar('Calificación actualizada con éxito', 'success')
    } else {
      // Create new rating
      response = await axios.post(API_URL, ratingData)

      // Add the new rating to the list
      ratings.value.unshift(response.data)

      showSnackbar('Calificación creada con éxito', 'success')
    }

    closeDialog()
  } catch (err) {
    console.error('Error saving rating:', err)
    showSnackbar('Error al guardar la calificación', 'error')
  } finally {
    loading.value = false
  }
}

const confirmDelete = (rating) => {
  deleteDialog.value.rating = rating
  deleteDialog.value.show = true
}

const deleteRating = async () => {
  if (!deleteDialog.value.rating) return

  loading.value = true

  try {
    await axios.delete(`${API_URL}/${deleteDialog.value.rating.id}`)

    // Remove the rating from the list
    ratings.value = ratings.value.filter(r => r.id !== deleteDialog.value.rating.id)

    showSnackbar('Calificación eliminada con éxito', 'success')
    deleteDialog.value.show = false
  } catch (err) {
    console.error('Error deleting rating:', err)
    showSnackbar('Error al eliminar la calificación', 'error')
  } finally {
    loading.value = false
  }
}

const showSnackbar = (text, color = 'success') => {
  snackbar.value.text = text
  snackbar.value.color = color
  snackbar.value.show = true
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'

  const date = new Date(dateString)
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script>

<style scoped>
.rating-container {
  padding-top: 24px;
  padding-bottom: 24px;
}

.rating-card {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.rating-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.border-primary {
  border-color: var(--v-primary-base);
}

.gradient-text {
  background: linear-gradient(135deg, #673ab7 0%, #9c27b0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
</style>
