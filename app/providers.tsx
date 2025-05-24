"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { Toaster } from '@/components/ui/toaster'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 dakika (60 saniyeden arttırıldı)
            gcTime: 10 * 60 * 1000, // 10 dakika garbage collection süresi
            retry: (failureCount, error) => {
              // Ağ hatalarında 3 kez dene, diğer hatalar için 1 kez
              if ((error)?.message?.includes('Network Error')) {
                return failureCount < 3
              }
              return failureCount < 1
            },
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            refetchOnWindowFocus: false, // Pencere odağında otomatik yenilemeyi kapat
            refetchOnMount: false, // Mount sırasında cache varsa yenilememe
          },
          mutations: {
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  )
} 