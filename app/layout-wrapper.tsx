"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/ui/sidebar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  // Sidebar'ın gösterilmeyeceği sayfalar
  const noSidebarPages = ["/login"];
  const shouldShowSidebar = !noSidebarPages.includes(pathname);

  if (!shouldShowSidebar) {
    // Login sayfası gibi sidebar'sız sayfalar için sadece children'ı render et
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />
      <div
        className="flex-1 transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarCollapsed ? "64px" : "256px" }}
      >
        {children}
      </div>
    </div>
  );
}
