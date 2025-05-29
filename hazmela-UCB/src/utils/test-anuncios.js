// Test manual para verificar la integración de anuncios

async function testAnunciosIntegration() {
  console.log('🧪 Iniciando pruebas de integración de anuncios...')
  
  // 1. Verificar si el usuario está autenticado
  const authStore = useAuthStore()
  
  if (!authStore.isAuthenticated) {
    console.log('❌ Usuario no autenticado. Ir a /login primero.')
    return
  }
  
  console.log('✅ Usuario autenticado:', authStore.user?.email)
  
  // 2. Verificar store de anuncios
  const anunciosStore = useAnunciosStore()
  
  try {
    // 3. Probar cargar anuncios
    console.log('📡 Probando cargar anuncios...')
    const result = await anunciosStore.fetchAnuncios()
    
    if (result.success) {
      console.log('✅ Anuncios cargados exitosamente:', result.data?.length || 0, 'anuncios')
    } else {
      console.log('❌ Error cargando anuncios:', result.error)
    }
    
    // 4. Probar crear anuncio
    console.log('📝 Probando crear anuncio...')
    const testAnuncio = {
      titulo: 'Anuncio de prueba',
      descripcion: 'Esta es una descripción de prueba para verificar que la API funciona correctamente.',
      precio: 100,
      userId: authStore.user?.id || authStore.user?.email,
      creadorEmail: authStore.user?.email,
      areaEspecializacion: 'PROGRAMACION',
      estado: 'PUBLISHED',
      fechaLimite: '2025-06-15'
    }
    
    const createResult = await anunciosStore.createAnuncio(testAnuncio)
    
    if (createResult.success) {
      console.log('✅ Anuncio creado exitosamente:', createResult.data)
    } else {
      console.log('❌ Error creando anuncio:', createResult.error)
    }
    
  } catch (error) {
    console.log('❌ Error en la prueba:', error)
  }
}

// Para ejecutar en la consola del navegador:
// testAnunciosIntegration()
