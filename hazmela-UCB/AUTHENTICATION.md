# 🎓 Hazmela UCB - Sistema de Autenticación con Pinia

## 📋 Resumen de la Implementación

Se ha migrado exitosamente de **Vuex** a **Pinia** e implementado un sistema de autenticación real que conecta con tu API backend.

## 🔧 Tecnologías Implementadas

- ✅ **Pinia** - Manejo de estado moderno
- ✅ **Axios** - Cliente HTTP para API calls  
- ✅ **JWT Utilities** - Manejo seguro de tokens
- ✅ **Proxy Configuration** - Para desarrollo local
- ✅ **Error Handling** - Manejo robusto de errores
- ✅ **Auto Token Refresh** - Renovación automática de tokens

## 🚀 Funcionalidades Implementadas

### Sistema de Autenticación
- **Login real** contra tu API `https://localhost:8081/ms-auth/auth/login`
- **Validación de formularios** con feedback visual
- **Manejo de errores** contextuales (red, servidor, credenciales)
- **Tokens JWT** con validación de expiración
- **Refresh automático** de tokens
- **Persistencia** en localStorage

### Seguridad
- **Validación de tokens** antes de cada petición
- **Headers de autorización** automáticos
- **Logout seguro** que limpia toda la sesión
- **Interceptors HTTP** para manejo de errores 401

## 📁 Estructura de Archivos Nuevos

```
src/
├── stores/
│   ├── auth.js          # 🔐 Store principal de autenticación
│   └── index.js         # 📝 Configuración de Pinia
├── utils/
│   └── jwt.js           # 🔧 Utilidades para manejo de JWT
├── composables/
│   └── useLoginForm.js  # 📝 Lógica reutilizable del formulario
└── .env.development     # ⚙️ Variables de entorno
```

## 🔑 Variables de Entorno

### `.env.development`
```env
VITE_API_BASE_URL=https://localhost:8081
VITE_AUTH_ENDPOINT=/ms-auth/auth
```

### `.env.production`
```env
VITE_API_BASE_URL=https://tu-servidor-produccion.com
VITE_AUTH_ENDPOINT=/ms-auth/auth
```

## 🛠️ Configuración del Proxy

Para desarrollo, se configuró un proxy en `vite.config.js` que redirige `/api/*` a tu servidor HTTPS local:

```javascript
proxy: {
  '/api': {
    target: 'https://localhost:8081',
    changeOrigin: true,
    secure: false, // Permite certificados autofirmados
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

## 📝 Uso del Store de Autenticación

### En un componente Vue:
```javascript
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Login
const result = await authStore.login({
  email: 'usuario@ejemplo.com',
  password: 'password123'
})

// Verificar autenticación
const isLoggedIn = authStore.isAuthenticated

// Obtener datos del usuario
const userName = authStore.getUserName

// Logout
authStore.logout()
```

## 🔄 Flujo de Autenticación

1. **Usuario ingresa credenciales** → Validación frontend
2. **POST a /login** → Envío seguro a la API
3. **Recepción de tokens** → `accessToken` y `refreshToken`
4. **Decodificación JWT** → Extracción de datos del usuario
5. **Almacenamiento** → localStorage + Pinia state
6. **Headers automáticos** → `Authorization: Bearer <token>`
7. **Renovación automática** → Refresh token cuando expira

## 🛡️ Manejo de Errores

### Tipos de error manejados:
- **401** → "Credenciales incorrectas"
- **404** → "Usuario no encontrado"  
- **500** → "Error interno del servidor"
- **Red** → "No se pudo conectar con el servidor"
- **Token expirado** → Renovación automática

## 🧪 Testing de la API

### Credenciales de prueba (según tu ejemplo):
```json
{
  "email": "crekoldalt@gmail.com",
  "password": "Legoshi2612"
}
```

### Respuesta esperada:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9..."
}
```

## 🔧 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## 📱 Rutas Protegidas

Todas las rutas excepto `/login` y `/register` requieren autenticación:

- ✅ `/` → Home (protegida)
- ✅ `/anuncios` → Feed de publicaciones (protegida)
- 🔓 `/login` → Página de login (pública)
- 🔓 `/register` → Página de registro (pública)

## 🎯 Próximos Pasos

1. **Implementar endpoint de registro** en el backend
2. **Agregar validaciones avanzadas** (fuerza de contraseña, etc.)
3. **Implementar roles de usuario** (estudiante, tutor, admin)
4. **Añadir funcionalidad "Recordarme"**
5. **Implementar recuperación de contraseña**

---

## 💡 Notas Técnicas

- **JWT Decoding**: Se decodifica en el frontend solo para extraer datos básicos del usuario
- **Security**: Los tokens nunca se exponen en URLs, solo en headers HTTP
- **Performance**: El store se inicializa una sola vez en `main.js`
- **Error Recovery**: Los errores de red se manejan graciosamente con reintentos automáticos

¡Tu sistema de autenticación está listo para usar! 🚀
