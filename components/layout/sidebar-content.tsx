"use client";

import {
  LayoutDashboard,
  Users,
  Briefcase,
  Kanban,
  Calendar,
  Wallet,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { NavLink } from "./nav-link";
import { WorkspaceSelector } from "./workspace-selector";
import { UserNav } from "./user-nav";

const NAV_ITEMS: Array<{ href: string; label: string; icon: LucideIcon }> = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/partes", label: "Partes", icon: Users },
  { href: "/processos", label: "Processos", icon: Briefcase },
  { href: "/pipeline", label: "Pipeline", icon: Kanban },
  { href: "/agenda", label: "Agenda", icon: Calendar },
  { href: "/financeiro", label: "Financeiro", icon: Wallet },
  { href: "/configuracoes", label: "Configurações", icon: Settings },
];

export function SidebarContent() {
  return (
    <div className="flex h-full flex-col">
      <div className="px-2 py-3">
        <WorkspaceSelector />
      </div>

      <Separator className="bg-neutral-800" />

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </nav>

      <Separator className="bg-neutral-800" />

      <div className="px-2 py-3">
        <UserNav />
      </div>
    </div>
  );
}
