import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

interface JWTPayload {
  rol: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '' as string,
    rol: '' as string,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.rol === 'admin',
  },

  actions: {
    setToken(newToken: string) {
      this.token = newToken
      localStorage.setItem('token', newToken)
      // Aprovechamos que colocamos el rol en el JWT
      try {
        const decoded = jwtDecode<JWTPayload>(newToken)
        this.rol = decoded.rol
        localStorage.setItem('rol', this.rol)
      } catch (error) {
        console.error('Error decodificando el token:', error)
        this.rol = ''
        localStorage.removeItem('rol')
      }
    },

    loadFromStorage() {
      const savedToken = localStorage.getItem('token')
      if (savedToken) {
        this.token = savedToken

        try {
          const decoded = jwtDecode<JWTPayload>(savedToken)
          this.rol = decoded.rol
        } catch {
          this.rol = ''
        }
      }
    },

    clearAuth() {
      this.token = ''
      this.rol = ''
      localStorage.removeItem('token')
      localStorage.removeItem('rol')
    },
  },
})
