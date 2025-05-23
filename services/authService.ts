import axios from 'axios'
import Cookies from 'js-cookie'
import { toastService } from './toastService'

const TOKEN_COOKIE_NAME = 'auth_token'
const COOKIE_EXPIRES_DAYS = 7

export interface LoginCredentials {
  username: string
  password: string
}

export interface User {
  id: string
  username: string
}

class AuthService {
  // Token'ı cookie'den al
  getToken(): string | undefined {
    return Cookies.get(TOKEN_COOKIE_NAME)
  }

  // Token'ı cookie'ye kaydet
  setToken(token: string): void {
    Cookies.set(TOKEN_COOKIE_NAME, token, {
      expires: COOKIE_EXPIRES_DAYS,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
  }

  // Token'ı cookie'den sil
  removeToken(): void {
    Cookies.remove(TOKEN_COOKIE_NAME)
  }

  // Login API çağrısı
  async login(credentials: LoginCredentials) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_FOR_TOKEN}/security/createToken`,
        {
          userName: credentials.username,
          password: credentials.password
        }
      )
      
      const token = response.data
      
      if (token) {
        this.setToken(token)
        toastService.success('Giriş başarılı!')
      }
      
      return {
        token,
        user: {
          id: '1',
          username: credentials.username
        }
      }
    } catch (error) {
      // console.error('Login hatası:', error)
      
      if (axios.isAxiosError(error)) {
        // API'den dönen spesifik hata mesajı varsa
        if (error.response?.status === 401) {
          toastService.error('Yeniden giriş yapınız.')
        } else if (error.response?.data?.message) {
          toastService.error(error.response.data.message)
        } else if (error.response) {
          toastService.error(`Sunucu hatası: ${error.response.status}`)
        } else if (error.request) {
          toastService.error('Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.')
        } else {
          toastService.error('Giriş yapılırken bir hata oluştu')
        }
      } else {
        toastService.error('Giriş yapılırken beklenmeyen bir hata oluştu')
      }
      
      throw new Error('Giriş yapılırken bir hata oluştu')
    }
  }

  // Logout işlemi - sadece token'ı temizle
  logout(): void {
    this.removeToken()
    toastService.info('Çıkış yapıldı')
  }

  // Kullanıcının authenticated olup olmadığını kontrol et
  isAuthenticated(): boolean {
    const token = this.getToken()
    return !!token
  }

  // Token'ı header'a eklemek için kullanılacak
  getAuthHeader(): { Authorization: string } | {} {
    const token = this.getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }
}

// Singleton instance
export const authService = new AuthService() 