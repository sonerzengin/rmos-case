import { toast } from "@/hooks/use-toast"

type ToastVariant = "default" | "destructive" | "success" | "warning"
type ToastType = "success" | "error" | "warning" | "info"

interface ToastOptions {
  title?: string
  description: string
  variant?: ToastVariant
  duration?: number
}

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