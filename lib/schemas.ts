import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, "Kullanıcı adı zorunludur"),
  password: z.string().min(1, "Şifre zorunludur"),
})

export const addBlackListSchema = z.object({
  Adi: z.string().min(1, "Ad zorunludur").max(50, "Ad en fazla 50 karakter olabilir"),
  Soy: z.string().min(1, "Soyad zorunludur").max(50, "Soyad en fazla 50 karakter olabilir"),
  Aciklama: z.string().min(1, "Açıklama zorunludur").max(500, "Açıklama en fazla 500 karakter olabilir"),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type AddBlackListFormValues = z.infer<typeof addBlackListSchema> 