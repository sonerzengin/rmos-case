"use client"

import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { InvoiceData } from "@/services/invoices"

interface FaturaIstatistikleriProps {
  invoices: InvoiceData[]
  loading: boolean
}

export function FaturaIstatistikleri({ invoices, loading }: FaturaIstatistikleriProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>İstatistikler</CardTitle>
        <CardDescription>
          Fatura istatistikleri yakında eklenecektir.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-gray-500">
          <div className="text-lg font-medium">İstatistik modülü geliştiriliyor</div>
          <div className="text-sm mt-2">Bu alan yakında aktif olacaktır.</div>
          <div className="text-xs mt-4 text-muted-foreground">
            Toplam {invoices.length} kayıt mevcut
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 