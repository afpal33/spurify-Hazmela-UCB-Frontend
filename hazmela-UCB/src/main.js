/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
import { useAuthStore } from './stores/auth'
import { registerPlugins } from '@/plugins'

const app = createApp(App)

app.use(pinia) // ✅ habilitar Pinia
registerPlugins(app)

// Inicializar el store de autenticación
const authStore = useAuthStore()
authStore.initialize()

app.mount('#app')
