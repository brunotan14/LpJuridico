import { Settings } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";

export default function ConfiguracoesPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Configurações"
        description="Escritório, equipe, notificações e preferências do sistema"
      />
      <div className="flex flex-col items-center justify-center gap-3 p-20 text-center">
        <Settings className="h-10 w-10 text-neutral-800" />
        <p className="text-sm text-neutral-600">
          Roles, convites e preferências de notificação — em breve
        </p>
      </div>
    </div>
  );
}
