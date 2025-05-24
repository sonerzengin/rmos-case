"use client"

import React, { useState, useMemo } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts'
import type { InvoiceData } from "@/types"
import { LoadingSpinner } from "@/components/ui/table-skeleton"

interface FaturaIstatistikleriProps {
  invoices: InvoiceData[]
  loading: boolean
}

export function FaturaIstatistikleri({ invoices, loading }: FaturaIstatistikleriProps) {
  const [selectedDate, setSelectedDate] = useState<string>("")

  // Oda doluluk oranı için veriler
  const odaDolulukData = useMemo(() => {
    if (!invoices.length) return []
    
    const selectedItem = selectedDate 
      ? invoices.find(item => item.Tarih === selectedDate)
      : invoices[0]
    
    if (!selectedItem) return []
    
    const totalOda = selectedItem.Mevcut
    const doluOda = selectedItem.Oda
    const bosOda = totalOda - doluOda
    
    return [
      { name: 'Dolu Oda', value: doluOda, color: '#8B5CF6' },
      { name: 'Boş Oda', value: bosOda, color: '#E5E7EB' }
    ]
  }, [invoices, selectedDate])

  // Günlük Pax verileri
  const gunlukPaxData = useMemo(() => {
    return invoices.map(item => ({
      tarih: item["Gun Tarih"],
      pax: item["Pax(Y/C2)"],
      tarihFull: item.Tarih
    }))
  }, [invoices])

  // Seçili tarih için misafir dağılımı
  const misafirDagilimData = useMemo(() => {
    const selectedItem = selectedDate 
      ? invoices.find(item => item.Tarih === selectedDate)
      : invoices[0]
    
    if (!selectedItem) return []
    
    return [
      { name: 'Yetişkin', value: selectedItem.Yetişkin, color: '#3B82F6' },
      { name: 'Çocuk', value: selectedItem.Çocuk, color: '#10B981' },
      { name: 'Free', value: selectedItem.Free, color: '#F59E0B' }
    ]
  }, [invoices, selectedDate])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>İstatistikler</CardTitle>
          <CardDescription>Veriler yükleniyor...</CardDescription>
        </CardHeader>
        <CardContent>
          <LoadingSpinner />
        </CardContent>
      </Card>
    )
  }

  if (!invoices.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>İstatistikler</CardTitle>
          <CardDescription>Gösterilecek veri bulunmuyor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <div className="text-lg font-medium">Veri Bulunamadı</div>
            <div className="text-sm mt-2">Lütfen tarih aralığı seçin ve arama yapın.</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Günlük Pax Oranları - Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Günlük Pax Oranları</CardTitle>
          <CardDescription>
            Tarihlere göre Pax(Y/C2) değerleri
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={gunlukPaxData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="tarih" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [value.toFixed(2), 'Pax']}
                  labelFormatter={(label) => `Tarih: ${label}`}
                />
                <Bar dataKey="pax" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Oda Doluluk ve Misafir Dağılımı */}
      <Card>
        <CardHeader>
          <CardTitle>Oda Doluluk Oranı ve Misafir Dağılımı</CardTitle>
          <CardDescription>
            Seçili tarih için oda kapasitesi ve misafir türlerinin dağılımı
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tarih Seçimi */}
          <div className="w-full max-w-md">
            <label className="block text-sm font-medium mb-2">Tarih Seçin:</label>
            <select 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {invoices.map((item) => (
                <option key={item.Tarih} value={item.Tarih}>
                  {item["Gun Tarih"]} ({new Date(item.Tarih).toLocaleDateString('tr-TR')})
                </option>
              ))}
            </select>
          </div>

          {/* Grafikler - Yan Yana */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Oda Doluluk Oranı - Pie Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Oda Doluluk Oranı</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={odaDolulukData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {odaDolulukData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [value.toFixed(0), 'Oda']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Misafir Türleri Dağılımı - Donut Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Misafir Türleri Dağılımı</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={misafirDagilimData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(1)}%)`}
                    >
                      {misafirDagilimData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [value, 'Kişi']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      
    </div>
  )
} 