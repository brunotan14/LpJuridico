import { Calendar } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";

export default function AgendaPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Agenda"
        description="Prazos processuais, audiências e diligências com alertas redundantes"
      />
      <div className="flex flex-col items-center justify-center gap-3 p-20 text-center">
        <Calendar className="h-10 w-10 text-neutral-800" />
        <p className="text-sm text-neutral-600">
          Módulo crítico — alertas D-7, D-3, D-1 e dupla confirmação — em breve
        </p>
      </div>
    </div>
  );
}
