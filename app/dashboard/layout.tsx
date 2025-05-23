"use client"

import { Sidebar } from "@/components/ui/sidebar"
import { useAuthStore } from "@/lib/store"
import { redirect } from "next/navigation"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  
  if (!isAuthenticated) {
    redirect("/")
  }
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 overflow-auto p-6">
        {children}
      </div>
    </div>
  )
} 