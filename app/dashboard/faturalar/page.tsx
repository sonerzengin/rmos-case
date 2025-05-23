"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileText, Download, Eye, Trash } from "lucide-react"

export default function FaturalarPage() {
  // Örnek fatura verileri
  const faturalar = [
    { id: 1, no: "F-2023-001", tarih: "01.01.2023", musteri: "ABC Ltd.", tutar: "1.250,00 ₺", durum: "Ödendi" },
    { id: 2, no: "F-2023-002", tarih: "15.01.2023", musteri: "XYZ A.Ş.", tutar: "3.750,50 ₺", durum: "Bekliyor" },
    { id: 3, no: "F-2023-003", tarih: "22.01.2023", musteri: "123 Holding", tutar: "5.430,75 ₺", durum: "Ödendi" },
    { id: 4, no: "F-2023-004", tarih: "05.02.2023", musteri: "Örnek Ltd.", tutar: "980,25 ₺", durum: "İptal Edildi" },
    { id: 5, no: "F-2023-005", tarih: "18.02.2023", musteri: "Test A.Ş.", tutar: "2.340,00 ₺", durum: "Bekliyor" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6" />
          <h1 className="text-3xl font-bold text-gray-900">Faturalar</h1>
        </div>
        <Button>
          Yeni Fatura Oluştur
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fatura Listesi</CardTitle>
          <CardDescription>
            Tüm faturalarınızı bu sayfadan yönetebilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fatura No</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Müşteri</TableHead>
                <TableHead>Tutar</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faturalar.map((fatura) => (
                <TableRow key={fatura.id}>
                  <TableCell className="font-medium">{fatura.no}</TableCell>
                  <TableCell>{fatura.tarih}</TableCell>
                  <TableCell>{fatura.musteri}</TableCell>
                  <TableCell>{fatura.tutar}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      fatura.durum === "Ödendi" 
                        ? "bg-green-100 text-green-800" 
                        : fatura.durum === "Bekliyor" 
                        ? "bg-yellow-100 text-yellow-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {fatura.durum}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 