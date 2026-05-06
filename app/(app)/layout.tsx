import { SidebarContent } from "@/components/layout/sidebar-content";
import { MobileHeader } from "@/components/layout/mobile-header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950">
      {/* Sidebar — visível apenas no desktop */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 md:flex">
        <SidebarContent />
      </aside>

      {/* Área principal */}
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileHeader />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
