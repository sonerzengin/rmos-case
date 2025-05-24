export type ToastVariant = "default" | "destructive" | "success" | "warning"
export type ToastType = "success" | "error" | "warning" | "info"

export interface ToastOptions {
  title?: string
  description: string
  variant?: ToastVariant
  duration?: number
} 