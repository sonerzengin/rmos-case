import { api } from '@/lib/api'
import { toastService } from './toastService'
import type { InvoiceData, InvoicesResponse, InvoicesRequest } from '@/types'

export const invoicesService = {
  async getInvoices(dateRange: InvoicesRequest): Promise<InvoiceData[]> {
    try {
      const response = await api.post<InvoicesResponse>('/Procedure/StpRmforKlasik_2', {
        db_Id: 9,
        xRez_Sirket: 9,
        xBas_Tar: dateRange.xBas_Tar,
        xBit_Tar: dateRange.xBit_Tar,
        xtip: 1,
        kon1: "ALL",
        kon2: "BB",
        xchkFis_Fazla_otel_10: 0,
        bas_Yil: 2022,
        bit_Yil: 2022,
        fisrci_Kapalioda_10: 0,
        xRez_C_W: "C",
        xSistem_Tarihi: "2024-01-01",
        xAlis_Tarihi: "2024-01-01",
        sistem_Bas1: "2020-01-01",
        sistem_Bit1: "2029-01-01",
        pmdahil_10: 0,
        tip_1: "001",
        xFis_Bela_tutar_10: 0,
        trace_Dus_10: 0,
        cev_01: null
      })
      
      if (response.data.isSucceded) {
        return response.data.value
      } else {
        toastService.error(response.data.message || 'Fatura verileri alınamadı.')
        return []
      }
    } catch (error) {
      console.error('Fatura verileri çekilirken hata:', error)
      toastService.error('Fatura verileri alınamadı. Lütfen daha sonra tekrar deneyin.')
      return []
    }
  }
} 