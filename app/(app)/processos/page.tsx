import { Briefcase } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";

export default function ProcessosPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Processos"
        description="Processos criminais com validação CNJ e controle de sigilo"
      />
      <div className="flex flex-col items-center justify-center gap-3 p-20 text-center">
        <Briefcase className="h-10 w-10 text-neutral-800" />
        <p className="text-sm text-neutral-600">
          CRUD de processos com vínculo de partes — em breve
        </p>
      </div>
    </div>
  );
}
