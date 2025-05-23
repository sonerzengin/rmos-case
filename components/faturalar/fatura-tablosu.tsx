"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Eye 
} from "lucide-react"
import { InvoiceData } from "@/services/invoices"
import { format } from "date-fns"

interface FaturaTablonuProps {
  invoices: InvoiceData[]
  loading: boolean
}

export function FaturaTablosu({ invoices, loading }: FaturaTablonuProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Arama filtreleme
  const filteredInvoices = invoices.filter(invoice => {
    if (!searchTerm) return true
    
    const searchLower = searchTerm.toLowerCase()
    return (
      invoice.Tarih.toLowerCase().includes(searchLower) ||
      invoice["Gun Tarih"].toLowerCase().includes(searchLower) ||
      invoice.Oda.toString().includes(searchLower) ||
      invoice.Yetişkin.toString().includes(searchLower)
    )
  })

  // Sayfalama için veri dilimleme
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredInvoices.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage)

  // Sayfa değiştiğinde ilk sayfaya dön
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, itemsPerPage])

  // Sayfa değiştirme fonksiyonları
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `%${(value * 100).toFixed(2)}`
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="p-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Tarih, gün veya oda numarası ile arayın..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={() => setSearchTerm("")}>
            Temizle
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            <span className="ml-2">Veriler yükleniyor...</span>
          </div>
        ) : (
          <>
            <div className="border-t overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Mevcut</TableHead>
                    <TableHead>Oda</TableHead>
                    <TableHead>Yetişkin</TableHead>
                    <TableHead>Çocuk</TableHead>
                    <TableHead>Toplam Kişi</TableHead>
                    <TableHead>Pax</TableHead>
                    <TableHead>Yüzde%</TableHead>
                    <TableHead>Package Tutar</TableHead>
                    <TableHead>Gün Tarih</TableHead>
                    <TableHead>Pax(Y/C2)</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.length > 0 ? (
                    currentItems.map((invoice, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {format(new Date(invoice.Tarih), 'dd.MM.yyyy')}
                        </TableCell>
                        <TableCell>{invoice.Mevcut}</TableCell>
                        <TableCell>{invoice.Oda}</TableCell>
                        <TableCell>{invoice.Yetişkin}</TableCell>
                        <TableCell>{invoice.Çocuk}</TableCell>
                        <TableCell>{invoice["Toplam Kişi"]}</TableCell>
                        <TableCell>{invoice.Pax}</TableCell>
                        <TableCell>{formatPercentage(invoice["Yüzde%"])}</TableCell>
                        <TableCell>{formatCurrency(invoice["Package Tutar"])}</TableCell>
                        <TableCell>{invoice["Gun Tarih"]}</TableCell>
                        <TableCell>{invoice["Pax(Y/C2)"]}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={12} className="text-center py-6">
                        {searchTerm
                          ? "Arama kriterlerine uygun kayıt bulunamadı."
                          : "Seçilen tarih aralığında fatura bulunamadı."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between space-x-2 p-4 border-t">
              <div className="flex items-center space-x-2">
                <p className="text-sm text-muted-foreground">
                  Sayfa başına gösterilecek öğe sayısı
                </p>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value: string) =>
                    setItemsPerPage(Number(value))
                  }
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue placeholder={itemsPerPage.toString()} />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[5, 10, 20, 50, 100].map((pageSize) => (
                      <SelectItem key={pageSize} value={pageSize.toString()}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                  Sayfa {currentPage} / {totalPages || 1}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    <span className="sr-only">Önceki sayfa</span>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    <span className="sr-only">Sonraki sayfa</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
} 