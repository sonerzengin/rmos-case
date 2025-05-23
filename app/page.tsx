"use client"

import { useEffect } from "react"
import dynamic from 'next/dynamic'
import { useAuthStore } from "@/lib/store"
import { useRouter } from "next/navigation"

// Hydration hatası verdiği için dynamic import kullanıyoruz
const LoginForm = dynamic(() => import("@/components/login-form").then(mod => ({ default: mod.LoginForm })), { ssr: false })

export default function Home() {
  const router = useRouter()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  return (
    <main>
      <LoginForm />
    </main>
  )
}
