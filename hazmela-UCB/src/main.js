/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// main.js

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import { registerPlugins } from '@/plugins'

const app = createApp(App)

app.use(store) // ✅ habilitar Vuex
registerPlugins(app)

app.mount('#app')
