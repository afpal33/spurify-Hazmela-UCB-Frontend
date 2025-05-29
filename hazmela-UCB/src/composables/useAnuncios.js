import { reactive, computed } from 'vue'
import { useAnunciosStore } from '@/stores/anuncios'
import { useAuthStore } from '@/stores/auth'

export function useAnuncios() {
  const anunciosStore = useAnunciosStore()
  const authStore = useAuthStore()

  // Estado del formulario de creación
  const anuncioForm = reactive({
    titulo: '',
    descripcion: '',
    precio: '',
    areaEspecializacion: '',
    fechaLimite: ''
  })

  // Validaciones del formulario
  const formErrors = reactive({
    titulo: '',
    descripcion: '',
    precio: '',
    areaEspecializacion: '',
    fechaLimite: ''
  })
  // Estado del formulario - computed para que se actualice automáticamente
  const isFormValid = computed(() => {
    // Validar que todos los campos tengan valores
    if (!anuncioForm.titulo.trim() || 
        !anuncioForm.descripcion.trim() || 
        !anuncioForm.precio || 
        !anuncioForm.areaEspecializacion || 
        !anuncioForm.fechaLimite) {
      return false
    }

    // Validar que no haya errores
    if (formErrors.titulo || 
        formErrors.descripcion || 
        formErrors.precio || 
        formErrors.areaEspecializacion || 
        formErrors.fechaLimite) {
      return false
    }

    // Validar reglas específicas
    if (anuncioForm.titulo.length < 5) return false
    if (anuncioForm.descripcion.length < 20) return false
    if (isNaN(anuncioForm.precio) || Number(anuncioForm.precio) <= 0) return false
    
    // Validar fecha límite
    const today = new Date()
    const selectedDate = new Date(anuncioForm.fechaLimite)
    if (selectedDate <= today) return false

    return true
  })

  // Opciones para áreas de especialización
  const areasEspecializacion = [
    'MATEMATICAS',
    'FISICA',
    'QUIMICA',
    'PROGRAMACION',
    'INGLES',
    'LITERATURA',
    'HISTORIA',
    'ECONOMIA',
    'ADMINISTRACION',
    'DERECHO',
    'MEDICINA',
    'OTRO'
  ]

  // Formatear nombre de área para mostrar
  const formatAreaName = (area) => {
    const formatMap = {
      'MATEMATICAS': 'Matemáticas',
      'FISICA': 'Física',
      'QUIMICA': 'Química',
      'PROGRAMACION': 'Programación',
      'INGLES': 'Inglés',
      'LITERATURA': 'Literatura',
      'HISTORIA': 'Historia',
      'ECONOMIA': 'Economía',
      'ADMINISTRACION': 'Administración',
      'DERECHO': 'Derecho',
      'MEDICINA': 'Medicina',
      'OTRO': 'Otro'
    }
    return formatMap[area] || area
  }

  // Computeds
  const anuncios = computed(() => anunciosStore.anuncios)
  const isLoading = computed(() => anunciosStore.isLoading)
  const isCreating = computed(() => anunciosStore.isCreating)
  const error = computed(() => anunciosStore.error)
  const anunciosPublicados = computed(() => anunciosStore.anunciosPublicados)
  // Validar campos del formulario
  const validateField = (field, value) => {
    switch (field) {
      case 'titulo':
        if (!value.trim()) {
          formErrors.titulo = 'El título es obligatorio'
          return false
        }
        if (value.length < 5) {
          formErrors.titulo = 'El título debe tener al menos 5 caracteres'
          return false
        }
        formErrors.titulo = ''
        return true

      case 'descripcion':
        if (!value.trim()) {
          formErrors.descripcion = 'La descripción es obligatoria'
          return false
        }
        if (value.length < 20) {
          formErrors.descripcion = 'La descripción debe tener al menos 20 caracteres'
          return false
        }
        formErrors.descripcion = ''
        return true

      case 'precio':
        if (!value) {
          formErrors.precio = 'El precio es obligatorio'
          return false
        }
        if (isNaN(value) || Number(value) <= 0) {
          formErrors.precio = 'El precio debe ser un número mayor a 0'
          return false
        }
        formErrors.precio = ''
        return true

      case 'areaEspecializacion':
        if (!value) {
          formErrors.areaEspecializacion = 'El área de especialización es obligatoria'
          return false
        }
        formErrors.areaEspecializacion = ''
        return true

      case 'fechaLimite': {
        if (!value) {
          formErrors.fechaLimite = 'La fecha límite es obligatoria'
          return false
        }
        const today = new Date()
        const selectedDate = new Date(value)
        if (selectedDate <= today) {
          formErrors.fechaLimite = 'La fecha límite debe ser posterior a hoy'
          return false
        }
        formErrors.fechaLimite = ''
        return true
      }

      default:
        return true
    }
  }
  // Validar todo el formulario
  const validateForm = () => {
    const tituloValid = validateField('titulo', anuncioForm.titulo)
    const descripcionValid = validateField('descripcion', anuncioForm.descripcion)
    const precioValid = validateField('precio', anuncioForm.precio)
    const areaValid = validateField('areaEspecializacion', anuncioForm.areaEspecializacion)
    const fechaValid = validateField('fechaLimite', anuncioForm.fechaLimite)

    return tituloValid && descripcionValid && precioValid && areaValid && fechaValid
  }
  // Limpiar formulario
  const resetForm = () => {
    anuncioForm.titulo = ''
    anuncioForm.descripcion = ''
    anuncioForm.precio = ''
    anuncioForm.areaEspecializacion = ''
    anuncioForm.fechaLimite = ''
    
    // Limpiar errores
    Object.keys(formErrors).forEach(key => {
      formErrors[key] = ''
    })
  }

  // Cargar anuncios
  const loadAnuncios = async () => {
    const result = await anunciosStore.fetchAnuncios()
    return result
  }
  // Crear nuevo anuncio
  const createAnuncio = async () => {
    if (!validateForm()) {
      return { success: false, error: 'Por favor completa todos los campos correctamente' }
    }

    if (!authStore.isAuthenticated) {
      return { success: false, error: 'Debes estar autenticado para crear un anuncio' }
    }

    const anuncioData = {
      titulo: anuncioForm.titulo.trim(),
      descripcion: anuncioForm.descripcion.trim(),
      precio: Number(anuncioForm.precio),
      // Usar el ID del usuario si está disponible, sino usar el email
      userId: authStore.user?.id || authStore.user?.email,
      creadorEmail: authStore.user?.email, // Añadimos el email por si el backend lo necesita
      areaEspecializacion: anuncioForm.areaEspecializacion,
      estado: 'PUBLISHED',
      fechaLimite: anuncioForm.fechaLimite
    }

    const result = await anunciosStore.createAnuncio(anuncioData)

    if (result.success) {
      resetForm()
    }

    return result
  }

  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Formatear precio
  const formatPrice = (price) => {
    if (typeof price !== 'number') return 'N/A'
    return new Intl.NumberFormat('es-BO', {
      style: 'currency',
      currency: 'BOB'
    }).format(price)
  }

  return {
    // Estado
    anuncioForm,
    formErrors,
    isFormValid,
    
    // Opciones
    areasEspecializacion,
    
    // Computeds
    anuncios,
    anunciosPublicados,
    isLoading,
    isCreating,
    error,
    
    // Métodos
    validateField,
    validateForm,
    resetForm,
    loadAnuncios,
    createAnuncio,
    formatAreaName,
    formatDate,
    formatPrice
  }
}
