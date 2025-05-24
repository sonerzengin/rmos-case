"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addBlackListSchema, type AddBlackListFormValues } from "@/lib/schemas";
import { blackListService } from "@/services/blackListServices";
import { toastService } from "@/services/toastService";

interface AddNewBlackProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddNewBlack({ isOpen, onClose }: AddNewBlackProps) {
  const queryClient = useQueryClient();

  const form = useForm<AddBlackListFormValues>({
    resolver: zodResolver(addBlackListSchema),
    defaultValues: {
      Adi: "",
      Soy: "",
      Aciklama: "",
    },
  });

  const addMutation = useMutation({
    mutationFn: (values: AddBlackListFormValues) =>
      blackListService.addBlackListItem(values),
    onSuccess: (success) => {
      if (success) {
        // Listeyi yenile
        queryClient.invalidateQueries({ queryKey: ["karaListe"] });
        toastService.success("Kara liste kaydı başarıyla eklendi.");
        // Formu temizle ve modalı kapat
        form.reset();
        onClose();
      }
    },
    onError: () => {
      toastService.error("Kara liste kaydı eklenirken bir hata oluştu.");
    },
  });

  const onSubmit = (values: AddBlackListFormValues) => {
    addMutation.mutate(values);
  };

  // Modal kapatıldığında formu temizle
  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Yeni Kara Liste Kaydı</SheetTitle>
          <SheetDescription>
            Kara listeye eklemek istediğiniz kişinin bilgilerini girin.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="Adi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ad</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Adı girin"
                        {...field}
                        disabled={addMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Soy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soyad</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Soyadı girin"
                        {...field}
                        disabled={addMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Aciklama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Açıklama</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Açıklama girin"
                        {...field}
                        disabled={addMutation.isPending}
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={addMutation.isPending}
                  className="flex-1"
                >
                  İptal
                </Button>
                <Button
                  type="submit"
                  disabled={addMutation.isPending}
                  className="flex-1"
                >
                  {addMutation.isPending ? "Ekleniyor..." : "Kaydet"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
