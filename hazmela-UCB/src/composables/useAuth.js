import { useAuthStore } from '@/stores/auth'
import { computed, onMounted } from 'vue'

/**
 * Composable para manejar autenticación en cualquier componente
 */
export function useAuth() {
  const authStore = useAuthStore()

  // Estados reactivos
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const user = computed(() => authStore.user)
  const isLoading = computed(() => authStore.isLoading)
  const error = computed(() => authStore.error)

  // Métodos
  const login = async (credentials) => {
    return await authStore.login(credentials)
  }

  const logout = () => {
    authStore.logout()
  }

  const clearError = () => {
    authStore.clearError()
  }

  // Verificar autenticación al montar
  onMounted(() => {
    if (authStore.accessToken && !authStore.hasValidToken) {
      authStore.refreshAuthToken()
    }
  })

  return {
    // Estados
    isAuthenticated,
    user,
    isLoading,
    error,
    
    // Métodos
    login,
    logout,
    clearError,
    
    // Getters útiles
    userName: computed(() => authStore.getUserName),
    hasValidToken: computed(() => authStore.hasValidToken)
  }
}
