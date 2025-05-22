<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="12">
        <v-card
          class="mb-4"
          outlined
        >
          <v-card-title>
            <v-icon
              left
              color="primary"
            >
              mdi-bullhorn
            </v-icon>
            Anuncios de Tareas
            <v-spacer />
            <v-btn
              icon
              @click="refresh"
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-alert
              type="info"
              border="left"
              colored-border
            >
              Aquí puedes ver y calificar anuncios sobre tareas.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="anuncio in anuncios"
        :key="anuncio.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card outlined>
          <v-card-title>
            <v-avatar
              left
              class="mr-3"
              color="grey lighten-3"
            >
              <v-icon color="primary">
                mdi-account
              </v-icon>
            </v-avatar>
            <div>
              <div class="font-weight-bold">
                {{ anuncio.titulo }}
              </div>
              <div class="text-caption grey--text">
                {{ anuncio.autor }}
              </div>
            </div>
          </v-card-title>
          <v-card-text>
            {{ anuncio.descripcion }}
          </v-card-text>
          <v-card-actions>
            <v-rating
              v-model="anuncio.calificacion"
              color="amber"
              background-color="grey lighten-2"
              dense
              half-increments
              readonly
            />
            <v-spacer />
            <v-btn
              color="primary"
              text
              @click="verDetalle(anuncio)"
            >
              Ver más
            </v-btn>
            <v-btn
              color="success"
              text
              @click="calificar(anuncio)"
            >
              Calificar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const anuncios = ref([
  {
    id: 1,
    titulo: 'Tarea de Matemáticas',
    descripcion: 'Resuelve los ejercicios de la página 42.',
    autor: 'Juan Pérez',
    calificacion: 4.5,
  },
  {
    id: 2,
    titulo: 'Ensayo de Historia',
    descripcion: 'Escribe un ensayo sobre la independencia.',
    autor: 'María López',
    calificacion: 3,
  },
  {
    id: 3,
    titulo: 'Proyecto de Ciencias',
    descripcion: 'Investiga sobre energías renovables.',
    autor: 'Carlos Ruiz',
    calificacion: 5,
  },
])

function verDetalle(anuncio) {
  // Lógica para ver detalles (placeholder)
  alert(`Ver detalles de: ${anuncio.titulo}`)
}

function calificar(anuncio) {
  // Lógica para calificar (placeholder)
  alert(`Calificar: ${anuncio.titulo}`)
}

function refresh() {
  // Lógica para refrescar anuncios (placeholder)
}
</script>

<style scoped>
.v-card-title {
  align-items: center;
}
</style>
