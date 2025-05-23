import { create } from 'zustand'
import { authService } from '@/services/authService'
import type { User, LoginCredentials } from '@/services/authService'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isInitialized: boolean
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
  initialize: () => void
}

export const useAuthStore = create<AuthState>((set, get) => {
  // Otomatik başlatma - store oluşturulduğunda bir kez çalışır
  const isAuth = authService.isAuthenticated()

  return {
    user: null,
    isAuthenticated: isAuth, // Direkt başlangıçta değeri atıyoruz
    isLoading: false,
    isInitialized: true, // Başlangıçta true olarak ayarlıyoruz
    
    login: async (credentials: LoginCredentials) => {
      set({ isLoading: true })
      try {
        const response = await authService.login(credentials)
        
        // API'den kullanıcı bilgisi geliyorsa kullan, yoksa username'den oluştur
        const user: User = response.user || {
          id: '1',
          username: credentials.username
        }
        
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
        
        return true
      } catch (error) {
        console.error('Login error:', error)
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
        return false
      }
    },
    
    logout: () => {
      authService.logout()
      set({
        user: null,
        isAuthenticated: false,
      })
    },
    
    // Sadece ek kontrol için, artık genellikle çağrılmasına gerek yok
    initialize: () => {
      // İşlem zaten tamamlandı, başka bir şey yapılmasına gerek yok
      return
    },
  }
}) 