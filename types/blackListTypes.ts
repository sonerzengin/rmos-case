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

export interface AddBlackListRequest {
  db_Id: number
  Adi: string
  Soy: string
  Aciklama: string
}

export interface AddBlackListResponse {
  isSucceded: boolean
  message: string | null
  messageList: string[]
  value: string
} 