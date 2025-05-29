import { ref, computed } from 'vue'

export function useLoginForm() {
  const email = ref('')
  const password = ref('')

  // Validaciones
  const emailErrors = computed(() => {
    const errors = []
    if (email.value && !isValidEmail(email.value)) {
      errors.push('Ingresa un correo electrónico válido')
    }
    return errors
  })

  const passwordErrors = computed(() => {
    const errors = []
    if (password.value && password.value.length < 6) {
      errors.push('La contraseña debe tener al menos 6 caracteres')
    }
    return errors
  })

  const isFormValid = computed(() => {
    return email.value && 
           password.value && 
           isValidEmail(email.value) && 
           password.value.length >= 6
  })

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const clearForm = () => {
    email.value = ''
    password.value = ''
  }

  const getCredentials = () => ({
    email: email.value,
    password: password.value
  })

  return {
    email,
    password,
    emailErrors,
    passwordErrors,
    isFormValid,
    clearForm,
    getCredentials
  }
}
