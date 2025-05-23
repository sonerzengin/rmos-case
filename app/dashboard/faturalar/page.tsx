"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, UserPlus, FilePlus } from "lucide-react";
import { invoicesService, InvoicesRequest } from "@/services/invoices";
import { FaturaTablosu } from "@/components/faturalar/fatura-tablosu";
import { FaturaIstatistikleri } from "@/components/faturalar/fatura-istatistikleri";

export default function FaturalarPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  // Sayfa yüklendiğinde varsayılan tarihleri ayarla
  useEffect(() => {
    // 1 Haziran 2024 - 30 Haziran 2024 arası default olarak ayarlandı
    setStartDate("2024-06-01");
    setEndDate("2024-06-30");
    setShouldFetch(true);
  }, []);

  // Tanstack Query ile veri çekme
  const {
    data: invoices = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["invoices", startDate, endDate],
    queryFn: () =>
      invoicesService.getInvoices({
        xBas_Tar: startDate,
        xBit_Tar: endDate,
      } as InvoicesRequest),
    enabled: shouldFetch && !!startDate && !!endDate,
  });

  const handleSearch = () => {
    if (startDate && endDate) {
      setShouldFetch(true);
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-100 p-4 rounded-md">
        <div className="flex items-center gap-4">
          <FileText className="h-10 w-10" />
          <h1 className="text-3xl font-bold text-gray-900">Faturalar</h1>
        </div>
        <Button onClick={() => {}}>
          <FilePlus className="mr-2 h-4 w-4" />
          Yeni Fatura Ekle
        </Button>
      </div>

      {/* Tarih Kontrolleri */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Filtreleme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="startDate">Başlangıç Tarihi</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="endDate">Bitiş Tarihi</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading || !startDate || !endDate}
            >
              {isLoading ? "Yükleniyor..." : "Ara"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hata Durumu */}
      {isError && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-destructive">
              Veriler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar
              deneyin.
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sekmeler */}
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="table">Fatura Tablosu</TabsTrigger>
          <TabsTrigger value="statistics">İstatistikler</TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-4">
          <FaturaTablosu invoices={invoices} loading={isLoading} />
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <FaturaIstatistikleri invoices={invoices} loading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
