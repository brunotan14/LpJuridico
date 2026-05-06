import { Users } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";

export default function PartesPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Partes"
        description="Clientes, réus, vítimas, testemunhas e autoridades"
      />
      <div className="flex flex-col items-center justify-center gap-3 p-20 text-center">
        <Users className="h-10 w-10 text-neutral-800" />
        <p className="text-sm text-neutral-600">
          Cadastro e gestão de partes processuais — em breve
        </p>
      </div>
    </div>
  );
}
