"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const WORKSPACES = [
  { id: "1", name: "Leandro Pedrosa Adv.", initials: "LP" },
  { id: "2", name: "LP & Associados", initials: "LA" },
  { id: "3", name: "Filial - Campina Grande", initials: "CG" },
] as const;

type WorkspaceId = (typeof WORKSPACES)[number]["id"];

export function WorkspaceSelector() {
  const [activeId, setActiveId] = useState<WorkspaceId>("1");
  const active = WORKSPACES.find((w) => w.id === activeId) ?? WORKSPACES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-neutral-200 outline-none transition-colors hover:bg-neutral-800/60">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-gold-500/25 bg-gold-500/10">
          <span className="font-serif text-xs font-semibold leading-none text-gold-500">
            {active.initials}
          </span>
        </div>
        <span className="flex-1 truncate text-left font-medium">{active.name}</span>
        <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-neutral-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="start"
        className="border-neutral-800 bg-neutral-900"
      >
        {WORKSPACES.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onClick={() => setActiveId(workspace.id)}
            className="gap-2.5"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-gold-500/20 bg-gold-500/10">
              <span className="font-serif text-[11px] font-semibold leading-none text-gold-500">
                {workspace.initials}
              </span>
            </div>
            <span className="flex-1 truncate">{workspace.name}</span>
            {workspace.id === activeId && (
              <Check className="h-3.5 w-3.5 text-gold-500" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2.5 text-neutral-400">
          <Plus className="h-4 w-4" />
          Criar escritório
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
