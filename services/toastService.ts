import { toast } from "@/hooks/use-toast"
import type { ToastVariant, ToastType, ToastOptions } from '@/types'

class ToastService {
  showToast({ title, description, variant = "default", duration = 2000 }: ToastOptions) {
    return toast({
      title,
      description,
      variant,
      duration,
    })
  }

  success(message: string, title = "Başarılı") {
    return this.showToast({
      title,
      description: message,
      variant: "success",
    })
  }

  error(message: string, title = "Hata") {
    return this.showToast({
      title,
      description: message,
      variant: "destructive",
    })
  }

  warning(message: string, title = "Uyarı") {
    return this.showToast({
      title,
      description: message,
      variant: "warning",
    })
  }

  info(message: string, title = "Bilgi") {
    return this.showToast({
      title,
      description: message,
      variant: "default",
    })
  }
}

// Singleton instance
export const toastService = new ToastService() 