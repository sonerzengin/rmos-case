import { api } from '@/lib/api'
import { toastService } from './toastService'

export interface BlackListItem {
  Id: number
  Adi: string
  Soy: string
  Aciklama: string
  Tcno: string | null
  Kimlik_no: string | null
  Dogum_tarihi: string | null
  Sistem_tarihi: string | null
  Sistem_grubu: string | null
  Otel_kodu: string | null
  Ulke_xml: string | null
  Kulanici: string | null
  Acenta: string | null
  "Xml Kodu": string | null
  "ULke Adı": string | null
}

export interface BlackListResponse {
  isSucceded: boolean
  message: string | null
  messageList: string[]
  value: BlackListItem[]
}

export const blackListService = {
  async getBlackList(): Promise<BlackListItem[]> {
    try {
      const response = await api.post<BlackListResponse>('/Kara/Getir_Kod', {
        db_Id: 9,
        Adi: "ALL?",
        Tip: 9
      })
      
      if (response.data.isSucceded) {
        return response.data.value
      } else {
        toastService.error(response.data.message || 'Kara liste verileri alınamadı.')
        return []
      }
    } catch (error) {
      console.error('Kara liste verileri çekilirken hata:', error)
      toastService.error('Kara liste verileri alınamadı. Lütfen daha sonra tekrar deneyin.')
      return []
    }
  }
} 