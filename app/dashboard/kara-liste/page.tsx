"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  UserX,
  Search,
  UserPlus,
  Trash,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  blackListService,
  type BlackListItem,
} from "@/services/blackListServices";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KaraListeDetayModal } from "@/components/kara-liste/kara-liste-detay-modal";
import { AddNewBlack } from "@/components/kara-liste/AddNewBlack";
import { toastService } from "@/services/toastService";

export default function KaraListePage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedKisi, setSelectedKisi] = useState<BlackListItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const {
    data: karaListe = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["karaListe"],
    queryFn: () => blackListService.getBlackList(),
  });

  // Filtrelenmiş verileri hesapla
  const filteredData = karaListe.filter((item: BlackListItem) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (item.Adi && item.Adi.toLowerCase().includes(searchLower)) ||
      (item.Soy && item.Soy.toLowerCase().includes(searchLower)) ||
      (item.Tcno && item.Tcno.toLowerCase().includes(searchLower)) ||
      (item.Kimlik_no && item.Kimlik_no.toLowerCase().includes(searchLower)) ||
      (item.Aciklama && item.Aciklama.toLowerCase().includes(searchLower))
    );
  });

  // Sayfalama için veri dilimleme
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Sayfa değiştiğinde ilk sayfaya dön
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  // Hata durumunda toast göster
  useEffect(() => {
    if (isError) {
      toastService.error("Kara liste verileri yüklenirken bir hata oluştu."); 
    }
  }, [isError]);

  // Sayfa değiştirme fonksiyonları
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Detay modalını açma fonksiyonu
  const openDetailModal = (kisi: BlackListItem) => {
    setSelectedKisi(kisi);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-100 p-4 rounded-md">
        <div className="flex items-center gap-4">
          <UserX className="h-10 w-10" />
          <h1 className="text-3xl font-bold text-gray-900">Kara Liste</h1>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Yeni Kayıt Ekle
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kara Liste Kayıtları</CardTitle>
          <CardDescription>
            Kara listeye alınan kişilerin kayıtlarını bu sayfadan
            yönetebilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="İsim, TC veya açıklama ile arayın..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={() => setSearchTerm("")}>
              Temizle
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Veriler yükleniyor...</span>
            </div>
          ) : isError ? (
            <div className="flex justify-center items-center py-8 text-destructive">
              Veriler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.
            </div>
          ) : (
            <>
              <div className="border-t">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Ad</TableHead>
                      <TableHead>Soyad</TableHead>
                      <TableHead>TC Kimlik</TableHead>
                      <TableHead>Kimlik No</TableHead>
                      <TableHead>Doğum Tarihi</TableHead>
                      <TableHead>Sistem Grubu</TableHead>
                      <TableHead>Kullanıcı</TableHead>
                      <TableHead>Ülke Kodu</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.length > 0 ? (
                      currentItems.map((kisi: BlackListItem) => (
                        <TableRow key={kisi.Id}>
                          <TableCell className="font-medium">
                            {kisi.Adi}
                          </TableCell>
                          <TableCell>{kisi.Soy}</TableCell>
                          <TableCell>{kisi.Tcno || "-"}</TableCell>
                          <TableCell>{kisi.Kimlik_no || "-"}</TableCell>
                          <TableCell>{kisi.Dogum_tarihi || "-"}</TableCell>
                          <TableCell>{kisi.Sistem_grubu || "-"}</TableCell>
                          <TableCell>{kisi.Kulanici || "-"}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                              {kisi["Xml Kodu"] || "-"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => openDetailModal(kisi)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-6">
                          {searchTerm
                            ? "Arama kriterlerine uygun kayıt bulunamadı."
                            : "Kara listede kayıt bulunamadı."}
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

      {/* Detay Modalı */}
      <KaraListeDetayModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        kisiDetay={selectedKisi}
      />

      {/* Yeni Kayıt Ekleme Modalı */}
      <AddNewBlack
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
