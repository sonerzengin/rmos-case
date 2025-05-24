import { api } from '@/lib/api'
import { toastService } from './toastService'
import type {
  BlackListItem,
  BlackListResponse,
  AddBlackListRequest,
  AddBlackListResponse
} from '@/types'

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
  },

  async addBlackListItem(data: Omit<AddBlackListRequest, 'db_Id'>): Promise<boolean> {
    try {
      const response = await api.post<AddBlackListResponse>('/Kara/Ekle', {
        db_Id: 9,
        ...data
      })
      
      if (response.data.isSucceded) {
        toastService.success('Kara liste kaydı başarıyla eklendi.')
        return true
      } else {
        toastService.error(response.data.message || 'Kara liste kaydı eklenirken bir hata oluştu.')
        return false
      }
    } catch (error) {
      console.error('Kara liste kaydı eklenirken hata:', error)
      toastService.error('Kara liste kaydı eklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.')
      return false
    }
  }
} 