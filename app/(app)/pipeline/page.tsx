import { Kanban } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";

export default function PipelinePage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Pipeline"
        description="Kanban processual com drag-and-drop entre fases penais"
      />
      <div className="flex flex-col items-center justify-center gap-3 p-20 text-center">
        <Kanban className="h-10 w-10 text-zinc-800" />
        <p className="text-sm text-zinc-600">
          Pipeline com 9 fases processuais e auditoria de transições — em breve
        </p>
      </div>
    </div>
  );
}
