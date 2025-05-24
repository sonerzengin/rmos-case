"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FileText,
  UserX,
  LayoutDashboard,
  LogOut,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { useAuthStore } from "@/lib/store";

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
}

export function Sidebar({
  className,
  isCollapsed: externalIsCollapsed,
  onToggle,
}: SidebarProps) {
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false);
  const isCollapsed = externalIsCollapsed ?? internalIsCollapsed;

  const handleToggle = () => {
    const newState = !isCollapsed;
    if (onToggle) {
      onToggle(newState);
    } else {
      setInternalIsCollapsed(newState);
    }
  };
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Faturalar",
      href: "/faturalar",
      icon: FileText,
    },
    {
      title: "Kara Liste",
      href: "/kara-liste",
      icon: UserX,
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full border-r bg-white py-4 fixed left-0 top-0 bg-slate-50 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header with toggle button */}
      <div className="px-4 mb-6 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="text-2xl font-bold text-gray-400">RMOS Case</h2>
        )}
        <button
          onClick={handleToggle}
          className="p-2 rounded-md hover:bg-gray-200 transition-colors"
          title={isCollapsed ? "Sidebar'ı Aç" : "Sidebar'ı Kapat"}
        >
          {isCollapsed ? (
            <Menu className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
      <div className="flex-1 space-y-1 px-2">
        {menuItems.map((item) => {
          // Ana dashboard sayfası için özel kontrol
          const isActive =
            item.href === "/" ? pathname === "/" : pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm transition-colors relative group",
                isCollapsed ? "justify-center" : "gap-3",
                isActive
                  ? "bg-gray-200 text-gray-900 font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
              title={isCollapsed ? item.title : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.title}</span>}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap">
                  {item.title}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Çıkış butonu - En alta yerleştirildi */}
      <div className="px-2 mt-auto">
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm transition-colors w-full text-red-600 hover:bg-red-50 hover:text-red-700 relative group",
            isCollapsed ? "justify-center" : "gap-3"
          )}
          title={isCollapsed ? "Çıkış" : undefined}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span>Çıkış</span>}

          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap">
              Çıkış
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
