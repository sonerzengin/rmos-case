import axios from 'axios'
import { authService } from '@/services/authService'

// Axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_FOR_FRONTSERVICE,
  timeout: 10000,
})

// Request interceptor - token ekleme
api.interceptors.request.use(
  (config) => {
    // Token varsa header'a ekle
    const token = authService.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - hata yönetimi
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token geçersizse cookie'yi temizle
      authService.removeToken()
      // Login sayfasına yönlendir (gerekirse)
      if (typeof window !== 'undefined') {
        window.location.reload()
      }
    }
    return Promise.reject(error)
  }
) 