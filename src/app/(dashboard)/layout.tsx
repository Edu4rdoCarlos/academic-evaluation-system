"use client";

import { AppSidebar } from "@/components/layout/app/AppSidebar";
import { AppHeader } from "@/components/layout/app/AppHeader";
import { SidebarProvider, useSidebar } from "@/lib/contexts/sidebar-context";
import { cn } from "@/lib/utils/cn";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/50">
      <AppSidebar />
      <div className={cn("relative transition-all duration-300", isCollapsed ? "pl-16" : "pl-64")}>
        <AppHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
}
