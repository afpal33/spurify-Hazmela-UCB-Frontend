import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia

// Pinia Stores
export { useAuthStore } from './auth.js'
export { useAnunciosStore } from './anuncios.js'
