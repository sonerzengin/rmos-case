"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { FileText, UserX, LayoutDashboard } from "lucide-react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  
  const menuItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Faturalar",
      href: "/dashboard/faturalar",
      icon: FileText
    },
    {
      title: "Kara Liste",
      href: "/dashboard/kara-liste",
      icon: UserX
    }
  ]
  
  return (
    <div className={cn("flex flex-col h-full border-r bg-white w-64 py-4 fixed left-0 top-0 bg-slate-50", className)}>
      <div className="px-4 mb-6">
        <h2 className="text-2xl font-bold">RMOS</h2>
      </div>
      
      <div className="space-y-1 px-2">
        {menuItems.map((item) => {
          // Ana dashboard sayfası için özel kontrol
          const isActive = item.href === "/dashboard" 
            ? pathname === "/dashboard" 
            : pathname.startsWith(item.href)
          
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
    </div>
  )
} 