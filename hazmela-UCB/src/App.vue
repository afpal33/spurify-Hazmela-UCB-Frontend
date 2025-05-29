<template>
  <v-app>
    <AppHeader v-if="showHeader" />
    <v-main :style="{ paddingTop: showHeader ? '80px' : '0px' }">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const route = useRoute()

const showHeader = computed(() => {
  return authStore.isAuthenticated && !['/login', '/register'].includes(route.path)
})
</script>
