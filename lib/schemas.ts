import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(3, {
    message: "Kullanıcı adı en az 3 karakter olmalıdır.",
  }),
  password: z.string().min(4, {
    message: "Şifre en az 4 karakter olmalıdır.",
  }),
})

export type LoginFormValues = z.infer<typeof loginSchema> 