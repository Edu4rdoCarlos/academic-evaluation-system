"use client";

import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/students": "Alunos",
  "/classes": "Turmas",
  "/evaluations": "Avaliações",
};

export function AppHeader() {
  const pathname = usePathname();
  const title = Object.entries(titles).find(([key]) => pathname.startsWith(key))?.[1] ?? "";

  return (
    <header className="sticky top-0 z-40 h-16 flex items-center border-b bg-background/80 backdrop-blur px-6">
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
}
