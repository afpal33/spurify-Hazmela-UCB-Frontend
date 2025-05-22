<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <v-img
        class="mb-4"
        height="150"
        src="@/assets/logo.png"
      />

      <div class="text-center">
        <div class="text-body-2 font-weight-light mb-n1">Bienvenido a</div>
        <h1 class="text-h2 font-weight-bold">Hazmela</h1>
        <div class="text-h5 font-weight-regular mt-4">Resuelve tus tareas con apoyo de gente que sabe</div>
      </div>

      <div class="py-4" />

      <v-row>
        <v-col cols="12">
          <v-card
            class="py-4"
            color="surface-variant"
            image=""
            prepend-icon="mdi-school-outline"
            rounded="lg"
            variant="outlined"
          >
            <template #image>
              <v-img position="top right" />
            </template>

            <template #title>
              <h2 class="text-h5 font-weight-bold">¡Comienza Ahora!</h2>
            </template>

            <template #subtitle>
              <div class="text-subtitle-1">
                Conecta con estudiantes y profesionales expertos para resolver tus dudas académicas
              </div>
            </template>

            <v-overlay
              opacity=".12"
              scrim="primary"
              contained
              model-value
              persistent
            />
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card
            class="py-4"
            color="surface-variant"
            prepend-icon="mdi-book-open-variant"
            rounded="lg"
            subtitle="Encuentra ayuda en cualquier materia universitaria"
            title="Todas las Materias"
            variant="text"
          >
            <v-overlay
              opacity=".06"
              scrim="primary"
              contained
              model-value
              persistent
            />
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card
            class="py-4"
            color="surface-variant"
            prepend-icon="mdi-clock-fast"
            rounded="lg"
            subtitle="Respuestas rápidas cuando más las necesitas"
            title="Ayuda 24/7"
            variant="text"
          >
            <v-overlay
              opacity=".06"
              scrim="primary"
              contained
              model-value
              persistent
            />
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card
            class="py-4"
            color="surface-variant"
            prepend-icon="mdi-shield-check-outline"
            rounded="lg"
            subtitle="Expertos verificados para garantizar calidad"
            title="Tutores Calificados"
            variant="text"
          >
            <v-overlay
              opacity=".06"
              scrim="primary"
              contained
              model-value
              persistent
            />
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card
            class="py-4"
            color="surface-variant"
            prepend-icon="mdi-cash-multiple"
            rounded="lg"
            subtitle="Precios accesibles para estudiantes"
            title="Económico"
            variant="text"
          >
            <v-overlay
              opacity=".06"
              scrim="primary"
              contained
              model-value
              persistent
            />
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
  //
</script>
