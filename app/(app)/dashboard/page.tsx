import { LayoutDashboard } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Dashboard"
        description="Visão geral da carteira"
      />
      <div className="flex flex-col items-center justify-center gap-3 p-20 text-center">
        <LayoutDashboard className="h-10 w-10 text-neutral-800" />
        <p className="text-sm text-neutral-600">
          KPIs, prazos críticos e audiências da semana — em breve
        </p>
      </div>
    </div>
  );
}
