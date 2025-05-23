"use client"

import { useEffect, useRef } from "react"
import { useAuthStore } from "@/lib/store"
import { LoginForm } from "@/components/login-form"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  // Sadece isAuthenticated durumunu alıyoruz
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  return (
    <main>
      {isAuthenticated ? <Dashboard /> : <LoginForm />}
    </main>
  )
}
