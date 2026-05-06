"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { SidebarContent } from "./sidebar-content";

export function MobileHeader() {
  return (
    <header className="flex h-14 items-center gap-3 border-b border-neutral-800 bg-neutral-950 px-4 md:hidden">
      <Sheet>
        <SheetTrigger className="rounded-md p-1.5 text-neutral-400 outline-none transition-colors hover:bg-neutral-800 hover:text-neutral-200">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </SheetTrigger>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="flex w-60 flex-col border-r border-neutral-800 bg-neutral-950 p-0"
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <Logo variant="full" />
    </header>
  );
}
