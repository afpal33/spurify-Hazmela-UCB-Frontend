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
import { useAuth } from './stores/auth'

const route = useRoute()
const { isAuthenticated } = useAuth()

const showHeader = computed(() => {
  return isAuthenticated.value && !['/login', '/register'].includes(route.path)
})
</script>
