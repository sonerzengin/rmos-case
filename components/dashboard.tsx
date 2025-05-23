"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuthStore } from "@/lib/store"

export function Dashboard() {
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Hoş geldin, {user?.username}!
            </span>
            <Button onClick={handleLogout} variant="outline">
              Çıkış Yap
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Hoş Geldiniz</CardTitle>
              <CardDescription>
                Dashboard'a başarıyla giriş yaptınız
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Bu alan dashboard içeriği için ayrılmıştır. Burada projenizdeki 
                önemli metrikleri, grafikler ve diğer dashboard öğelerini gösterebilirsiniz.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>İstatistikler</CardTitle>
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
                Yeni Kayıt Oluştur
              </Button>
              <Button className="w-full" variant="outline">
                Rapor Görüntüle
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