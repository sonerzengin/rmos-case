"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  const router = useRouter()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  // Authentication kontrolü
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  // Eğer authenticated değilse loading göster
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Yönlendiriliyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hoş Geldiniz</CardTitle>
                <CardDescription>
                  Dashboard&apos;a başarıyla giriş yaptınız
                </CardDescription>
              </CardHeader>
              
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>İstatistikler (Mock Data)</CardTitle>
                <CardDescription>
                  Önemli sayısal veriler
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Toplam Kullanıcı:</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aktif Oturum:</span>
                    <span className="font-semibold">856</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Günlük Ziyaret:</span>
                    <span className="font-semibold">2,567</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hızlı İşlemler</CardTitle>
                <CardDescription>
                  Sık kullanılan aksiyonlar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  Yeni Fatura Oluştur
                </Button>
                <Button className="w-full" variant="outline">
                  Kara Listeye Ekle
                </Button>
                <Button className="w-full" variant="outline">
                  Ayarları Düzenle
                </Button>
              </CardContent>
            </Card>
          </div>
      </div>
    </div>
  )
}
