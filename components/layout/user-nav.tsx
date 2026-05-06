"use client";

import { ChevronsUpDown, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MOCK_USER = {
  name: "Dr. Leandro Pedrosa",
  email: "leandro@leandropedrosa.adv.br",
  initials: "LP",
};

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-neutral-200 outline-none transition-colors hover:bg-neutral-800/60">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold-500/25 bg-gold-500/15">
          <span className="font-serif text-xs font-semibold leading-none text-gold-500">
            {MOCK_USER.initials}
          </span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <span className="w-full truncate text-xs font-medium text-neutral-200">
            {MOCK_USER.name}
          </span>
          <span className="w-full truncate text-[10px] text-neutral-500">
            {MOCK_USER.email}
          </span>
        </div>
        <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-neutral-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        align="start"
        className="border-neutral-800 bg-neutral-900"
      >
        <DropdownMenuLabel className="px-2.5 py-2">
          <div className="text-xs font-medium text-neutral-200">{MOCK_USER.name}</div>
          <div className="text-[10px] text-neutral-500">{MOCK_USER.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <User className="h-4 w-4 text-neutral-400" />
          Meu perfil
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Settings className="h-4 w-4 text-neutral-400" />
          Configurações
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" className="gap-2">
          <LogOut className="h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
