import { Wallet } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";

export default function FinanceiroPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Financeiro"
        description="Contratos de honorários, parcelas, êxito e despesas reembolsáveis"
      />
      <div className="flex flex-col items-center justify-center gap-3 p-20 text-center">
        <Wallet className="h-10 w-10 text-zinc-800" />
        <p className="text-sm text-zinc-600">
          Gestão de honorários e inadimplência — em breve
        </p>
      </div>
    </div>
  );
}
