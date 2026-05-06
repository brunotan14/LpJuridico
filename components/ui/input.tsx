import * as React from "react"
import { cn } from "@/lib/utils"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2",
          "text-sm text-zinc-50 placeholder:text-zinc-500",
          "transition-colors outline-none",
          "focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-[invalid=true]:border-red-500/50 aria-[invalid=true]:focus:ring-red-500/20",
          className,
        )}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }
