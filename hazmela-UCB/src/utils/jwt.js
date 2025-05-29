/**
 * Utilidades para manejar tokens JWT
 */

export function decodeJWT(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}

export function isTokenExpired(token) {
  const payload = decodeJWT(token)
  if (!payload || !payload.exp) return true
  
  const currentTime = Date.now() / 1000
  return payload.exp < currentTime
}

export function getTokenExpirationTime(token) {
  const payload = decodeJWT(token)
  return payload?.exp ? new Date(payload.exp * 1000) : null
}

export function getUserFromToken(token) {
  const payload = decodeJWT(token)
  if (!payload) return null
  
  return {
    id: payload.userId || payload.id || payload.sub, // Extractamos el ID del usuario
    email: payload.sub,
    role: payload.role,
    name: payload.name || payload.sub?.split('@')[0] || 'Usuario',
    exp: payload.exp,
    iat: payload.iat
  }
}
