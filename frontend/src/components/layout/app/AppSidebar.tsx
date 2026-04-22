"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, BookOpen, ClipboardList, ChevronLeft, ChevronRight } from "lucide-react";
import { useSidebar } from "@/lib/contexts/sidebar-context";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/students", label: "Alunos", icon: Users },
  { href: "/classes", label: "Turmas", icon: BookOpen },
  { href: "/evaluations", label: "Avaliações", icon: ClipboardList },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggle } = useSidebar();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-sidebar transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!isCollapsed && (
          <span className="font-semibold text-sm text-sidebar-foreground">Sistema de Provas</span>
        )}
        <button onClick={toggle} className="ml-auto p-1 rounded hover:bg-accent">
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              pathname.startsWith(href)
                ? "bg-primary text-primary-foreground"
                : "text-sidebar-foreground hover:bg-accent"
            )}
          >
            <Icon size={16} className="shrink-0" />
            {!isCollapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
