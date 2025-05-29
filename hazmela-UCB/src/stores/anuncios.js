import { defineStore } from 'pinia'
import axios from 'axios'

// Configuración de axios para anuncios
const anunciosApi = axios.create({
  baseURL: import.meta.env.DEV 
    ? '/api/ms-anuncios/api/anuncios' 
    : `${import.meta.env.VITE_API_BASE_URL}/ms-anuncios/api/anuncios`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const useAnunciosStore = defineStore('anuncios', {
  state: () => ({
    anuncios: [],
    isLoading: false,
    error: null,
    isCreating: false
  }),

  getters: {
    anunciosPublicados: (state) => 
      state.anuncios.filter(anuncio => anuncio.estado === 'PUBLISHED'),
    
    anunciosPorArea: (state) => (area) => 
      state.anuncios.filter(anuncio => 
        anuncio.areaEspecializacion === area && anuncio.estado === 'PUBLISHED'
      ),

    totalAnuncios: (state) => state.anuncios.length
  },

  actions: {    async fetchAnuncios() {
      console.log('📡 Cargando anuncios desde la API...')
      this.isLoading = true
      this.error = null

      try {
        const response = await anunciosApi.get('')
        console.log('✅ Anuncios cargados:', response.data)
        this.anuncios = response.data
        return { success: true, data: response.data }

      } catch (error) {
        console.error('❌ Error fetching anuncios:', error)
        
        let errorMessage = 'Error al cargar los anuncios'
        
        if (error.response) {
          console.log('Error response:', error.response.status, error.response.data)
          switch (error.response.status) {
            case 404:
              errorMessage = 'No se encontraron anuncios'
              break
            case 500:
              errorMessage = 'Error interno del servidor'
              break
            default:
              errorMessage = error.response.data?.message || 'Error del servidor'
          }
        } else if (error.request) {
          console.log('Error request:', error.request)
          errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.'
        }

        this.error = errorMessage
        return { success: false, error: errorMessage }

      } finally {
        this.isLoading = false
      }
    },    async createAnuncio(anuncioData) {
      console.log('📝 Creando anuncio:', anuncioData)
      this.isCreating = true
      this.error = null

      try {
        const response = await anunciosApi.post('', anuncioData)
        console.log('✅ Anuncio creado exitosamente:', response.data)
        
        // Agregar el nuevo anuncio al estado
        this.anuncios.unshift(response.data)
        
        return { success: true, data: response.data }

      } catch (error) {
        console.error('❌ Error creating anuncio:', error)
        
        let errorMessage = 'Error al crear el anuncio'
        
        if (error.response) {
          console.log('Error response:', error.response.status, error.response.data)
          switch (error.response.status) {
            case 400:
              errorMessage = 'Datos del anuncio inválidos'
              break
            case 401:
              errorMessage = 'No autorizado para crear anuncios'
              break
            case 500:
              errorMessage = 'Error interno del servidor'
              break
            default:
              errorMessage = error.response.data?.message || 'Error del servidor'
          }
        } else if (error.request) {
          console.log('Error request:', error.request)
          errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.'
        }

        this.error = errorMessage
        return { success: false, error: errorMessage }

      } finally {
        this.isCreating = false
      }
    },

    clearError() {
      this.error = null
    },

    clearAnuncios() {
      this.anuncios = []
    }
  }
})

// Interceptor para agregar token de autorización automáticamente
anunciosApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    console.log('🔑 Token agregado a la petición de anuncios')
  } else {
    console.log('⚠️ No hay token disponible para anuncios')
  }
  console.log('📤 Petición anuncios:', config.method?.toUpperCase(), config.url, config.headers)
  return config
})

// Interceptor para manejar errores de autorización
anunciosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      console.error('Token expirado en anuncios API')
      
      // Limpiar tokens inválidos
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      
      // Redirigir al login
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    
    return Promise.reject(error)
  }
)

export { anunciosApi }
