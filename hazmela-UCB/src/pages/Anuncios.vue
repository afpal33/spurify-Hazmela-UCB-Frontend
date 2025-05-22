<template>
  <section class="feed-wrapper">
    <!-- Título -->
    <div class="d-flex align-center mb-6">
      <v-icon color="primary" class="me-2" size="24">mdi-forum-outline</v-icon>
      <h2 class="text-h6 font-weight-bold text-primary">Publicaciones Recientes</h2>
    </div>

    <!-- Publicaciones -->
    <div v-for="post in posts" :key="post.id" class="mb-6 fade-in">
      <v-card class="pa-5 rounded-xl social-card" color="surface" elevation="1">
        <!-- Usuario + Tiempo + Materia -->
        <div class="d-flex justify-space-between align-start mb-3">
          <div class="d-flex align-start">
            <v-avatar size="40" color="primary" class="me-3">
              <v-icon icon="mdi-account" color="white" size="22" />
            </v-avatar>
            <div>
              <p class="text-subtitle-1 font-weight-medium text-primary mb-1">{{ post.user }}</p>
              <span class="text-caption text-textSecondary">{{ post.timestamp }}</span>
            </div>
          </div>
          <v-chip
            size="small"
            variant="outlined"
            color="primary"
            class="text-caption font-weight-medium"
            style="border-radius: 10px;"
          >
            {{ post.subject }}
          </v-chip>
        </div>

        <!-- Contenido -->
        <p class="text-subtitle-1 font-weight-bold text-textPrimary mb-2">{{ post.title }}</p>
        <p class="text-body-2 text-textSecondary">{{ post.description }}</p>
      </v-card>
    </div>
  </section>
</template>

<script setup>
import { posts } from '@/data/posts'
</script>

<style scoped>
.feed-wrapper {
  width: 100%;
  max-width: 1100px;
  padding: 2rem 2rem;
  margin: 0 auto;
}

.social-card {
  border: 1px solid var(--v-theme-border);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.social-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
}

.fade-in {
  animation: fadeIn 0.3s ease forwards;
  opacity: 0;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>
