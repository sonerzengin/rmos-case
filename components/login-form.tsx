"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { loginSchema, type LoginFormValues } from "@/lib/schemas"
import { useAuthStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
  const { toast } = useToast()
  const router = useRouter()
  const login = useAuthStore(state => state.login)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const loginMutation = useMutation({
    mutationFn: (values: LoginFormValues) => login(values),
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Giriş yapılırken bir hata oluştu."
      })
    },
    onSuccess: (success) => {
      if (success) {
        // Login başarılı - ana sayfaya yönlendir
        router.push("/")
      } else {
        toast({
          variant: "destructive", 
          title: "Giriş başarısız",
          description: "Kullanıcı adı veya şifre hatalı!"
        })
      }
    }
  })

  const onSubmit = async (values: LoginFormValues) => {
    loginMutation.mutate(values)
  }

  return (
    <div className="flex min-h-screen items-center justify-center w-[90%]">
      <Card className="w-full shadow-none border-none bg-transparent">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Giriş Yap
          </CardTitle>
          <CardDescription className="text-center">
            Hesabınıza giriş yapmak için bilgilerinizi girin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kullanıcı Adı</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Kullanıcı adınızı girin" 
                        {...field} 
                        disabled={loginMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şifre</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Şifrenizi girin" 
                        {...field} 
                        disabled={loginMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
} 