/**
 * plugins/vuetify.js
 *
 * Vuetify configuration for Hazmela UCB
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Define custom theme
const hazmelaTheme = {
  dark: false,
  colors: {
    primary: '#007BFF',         // Azul institucional (botones, acciones)
    secondary: '#004591', // Azul gris neutro, elegante, sobrio y profesional
    background: '#F8F9FA',      // Fondo general claro
    surface: '#FFFFFF',         // Tarjetas
    textPrimary: '#212529',     // Títulos, nombres
    textSecondary: '#495057',   // Descripciones
    border: '#DEE2E6',          // Líneas sutiles
    danger: '#FF6B6B',          // Íconos de alerta / tiempo
  },

}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: hazmelaTheme,
    },
  },
})
