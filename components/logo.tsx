import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "mark" | "full";
  className?: string;
}

export function Logo({ variant = "mark", className }: LogoProps) {
  const mark = (
    <div className="flex items-center justify-center w-8 h-8 rounded border border-gold-500/30 bg-gold-500/5 shrink-0">
      <span className="font-serif text-gold-500 text-[15px] font-semibold leading-none select-none">
        LP
      </span>
    </div>
  );

  if (variant === "mark") {
    return <div className={cn(className)}>{mark}</div>;
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {mark}
      <div className="flex flex-col min-w-0">
        <span className="font-serif text-zinc-50 text-[13px] font-medium leading-tight truncate">
          Leandro Pedrosa
        </span>
        <span className="text-zinc-500 text-[11px] leading-tight truncate">
          Advocacia Criminal
        </span>
      </div>
    </div>
  );
}
