
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
//import { routes } from 'vue-router/auto-routes'

//import { createRouter, createWebHistory } from 'vue-router'

// Example route definitions
const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/pages/index.vue'), // adjust the path as needed
  },
  {
    path: '/Anuncios',
    name: 'Anuncios',
    component: () => import('@/pages/Anuncios.vue'),
  },
  {
    path: '/rating',
    name: 'Calificaciones',
    component: () => import('@/pages/Rating.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
  },
  // Add more routes here
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router


//const router = createRouter({
  //history: createWebHistory(import.meta.env.BASE_URL),
  //routes,
//})

//export default router
