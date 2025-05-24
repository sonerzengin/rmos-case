"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { FileText, UserX, LayoutDashboard, LogOut } from "lucide-react"
import { useAuthStore } from "@/lib/store"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const logout = useAuthStore(state => state.logout)
  
  const menuItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard
    },
    {
      title: "Faturalar",
      href: "/faturalar",
      icon: FileText
    },
    {
      title: "Kara Liste",
      href: "/kara-liste",
      icon: UserX
    }
  ]

  const handleLogout = () => {
    logout()
    router.push("/login")
  }
  
  return (
    <div className={cn("flex flex-col h-full border-r bg-white w-64 py-4 fixed left-0 top-0 bg-slate-50", className)}>
      <div className="px-4 mb-6">
        <h2 className="text-2xl font-bold">RMOS</h2>
      </div>
      
      <div className="flex-1 space-y-1 px-2">
        {menuItems.map((item) => {
          // Ana dashboard sayfası için özel kontrol
          const isActive = item.href === "/" 
            ? pathname === "/" 
            : pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive 
                  ? "bg-gray-200 text-gray-900 font-medium" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </div>

      {/* Çıkış butonu - En alta yerleştirildi */}
      <div className="px-2 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors w-full text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="h-5 w-5" />
          <span>Çıkış</span>
        </button>
      </div>
    </div>
  )
} 