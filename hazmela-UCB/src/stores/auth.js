import { defineStore } from 'pinia'
import axios from 'axios'
import { decodeJWT, isTokenExpired, getUserFromToken } from '@/utils/jwt'

// Configuración de axios
const api = axios.create({
  baseURL: import.meta.env.DEV 
    ? '/api/ms-auth/auth' 
    : `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_AUTH_ENDPOINT}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    isLoading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    getUserName: (state) => state.user?.name || state.user?.email?.split('@')[0] || 'Usuario',
    hasValidToken: (state) => {
      if (!state.accessToken) return false
      return !isTokenExpired(state.accessToken)
    }
  },

  actions: {
    async login(credentials) {
      this.isLoading = true
      this.error = null

      try {
        const response = await api.post('/login', {
          email: credentials.email,
          password: credentials.password
        })

        const { accessToken, refreshToken } = response.data

        // Obtener información del usuario desde el token
        const user = getUserFromToken(accessToken)
        
        if (!user) {
          throw new Error('Token inválido recibido del servidor')
        }

        // Guardar en el estado
        this.user = user
        this.accessToken = accessToken
        this.refreshToken = refreshToken

        // Guardar en localStorage
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)

        // Configurar header de autorización para futuras peticiones
        this.setAuthHeader(accessToken)

        return { success: true, user }

      } catch (error) {
        console.error('Login error:', error)
        
        let errorMessage = 'Error al iniciar sesión'
        
        if (error.response) {
          // Error del servidor
          switch (error.response.status) {
            case 401:
              errorMessage = 'Credenciales incorrectas'
              break
            case 404:
              errorMessage = 'Usuario no encontrado'
              break
            case 500:
              errorMessage = 'Error interno del servidor'
              break
            default:
              errorMessage = error.response.data?.message || 'Error del servidor'
          }
        } else if (error.request) {
          // Error de red
          errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.'
        }

        this.error = errorMessage
        return { success: false, error: errorMessage }

      } finally {
        this.isLoading = false
      }
    },

    async refreshAuthToken() {
      if (!this.refreshToken) {
        this.logout()
        return false
      }

      try {
        const response = await api.post('/refresh', {
          refreshToken: this.refreshToken
        })

        const { accessToken } = response.data
        this.accessToken = accessToken
        localStorage.setItem('accessToken', accessToken)
        this.setAuthHeader(accessToken)

        return true
      } catch (error) {
        console.error('Token refresh failed:', error)
        this.logout()
        return false
      }
    },

    logout() {
      // Limpiar estado
      this.user = null
      this.accessToken = null
      this.refreshToken = null
      this.error = null

      // Limpiar localStorage
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')

      // Remover header de autorización
      delete api.defaults.headers.common['Authorization']
    },

    setAuthHeader(token) {
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    },

    clearError() {
      this.error = null
    },

    // Inicializar el store (llamar en main.js)
    initialize() {
      if (this.accessToken) {
        this.setAuthHeader(this.accessToken)
        
        // Verificar si el token es válido
        if (!this.hasValidToken) {
          this.refreshAuthToken()
        }
      }
    }
  }
})

// Interceptor para manejar errores de autorización automáticamente
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore()
    
    if (error.response?.status === 401 && authStore.accessToken) {
      // Token expirado, intentar renovar
      const refreshSuccess = await authStore.refreshAuthToken()
      
      if (refreshSuccess) {
        // Reintentar la petición original con el nuevo token
        return api.request(error.config)
      }
    }
    
    return Promise.reject(error)
  }
)

export { api }
