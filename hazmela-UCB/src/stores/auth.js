// src/stores/auth.js
import { ref } from 'vue'

const isAuthenticated = ref(localStorage.getItem('auth') === 'true')

export function useAuth() {
  function login() {
    localStorage.setItem('auth', 'true')
    isAuthenticated.value = true
  }

  function logout() {
    localStorage.removeItem('auth')
    isAuthenticated.value = false
  }

  return {
    isAuthenticated,
    login,
    logout,
  }
}
