"use client";

import type { BlackListItem } from "@/types";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface KaraListeDetayModalProps {
  isOpen: boolean;
  onClose: () => void;
  kisiDetay: BlackListItem | null;
}

export function KaraListeDetayModal({
  isOpen,
  onClose,
  kisiDetay,
}: KaraListeDetayModalProps) {
  if (!kisiDetay) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Kara Liste Kayıt Detayı</DialogTitle>
          <DialogDescription>
            {kisiDetay.Adi} {kisiDetay.Soy} kişisine ait detaylı bilgiler
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Kişisel Bilgiler
              </h4>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Ad</span>
                  <span className="font-medium">{kisiDetay.Adi || "-"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Soyad</span>
                  <span className="font-medium">{kisiDetay.Soy || "-"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    TC Kimlik No
                  </span>
                  <span className="font-medium">{kisiDetay.Tcno || "-"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    Kimlik No
                  </span>
                  <span className="font-medium">
                    {kisiDetay.Kimlik_no || "-"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    Doğum Tarihi
                  </span>
                  <span className="font-medium rounded">
                    {kisiDetay.Dogum_tarihi 
                      ? format(new Date(kisiDetay.Dogum_tarihi), 'dd.MM.yyyy', { locale: tr })
                      : "Belirtilmemiş"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Sistem Bilgileri
              </h4>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    Kullanıcı
                  </span>
                  <span className="font-medium">
                    {kisiDetay.Kulanici || "-"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    Sistem Tarihi
                  </span>
                  <span className="font-medium">
                    {kisiDetay.Sistem_tarihi 
                      ? format(new Date(kisiDetay.Sistem_tarihi), 'dd.MM.yyyy HH:mm', { locale: tr })
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    Sistem Grubu
                  </span>
                  <span className="font-medium ">
                    {kisiDetay.Sistem_grubu || "Belirtilmemiş"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    Otel Kodu
                  </span>
                  <span className="font-medium">
                    {kisiDetay.Otel_kodu || "-"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Acenta</span>
                  <span className="font-medium">{kisiDetay.Acenta || "-"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            Ülke Bilgileri
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Ülke XML</span>
              <span className="font-medium">{kisiDetay.Ulke_xml || "-"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">XML Kodu</span>
              <span className="font-medium">
                {kisiDetay["Xml Kodu"] || "-"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Ülke Adı</span>
              <span className="font-medium">
                {kisiDetay["ULke Adı"] || "-"}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <h4 className="text-sm font-medium text-muted-foreground">
            Açıklama
          </h4>
          <div className="rounded-md bg-muted p-4">
            <p className="text-sm">
              {kisiDetay.Aciklama || "Açıklama bulunmuyor."}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
