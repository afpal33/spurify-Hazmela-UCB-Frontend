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
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()

const showHeader = computed(() => {
  return store.getters['auth/isAuthenticated'] && !['/login', '/register'].includes(route.path)
})
</script>
