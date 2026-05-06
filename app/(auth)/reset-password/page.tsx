"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Loader2, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { resetPasswordSchema, type ResetPasswordFormData } from "@/lib/validations/auth"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [done, setDone] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const isExpiredLink = searchParams.get("error") === "auth_callback_error"

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  async function onSubmit() {
    setServerError(null)
    // Fake reset — será substituído pela Server Action no backend
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setDone(true)
    setTimeout(() => router.push("/login"), 2000)
  }

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl shadow-black/50">
        {isExpiredLink ? (
          <div className="flex flex-col items-center gap-4 py-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
              <AlertCircle className="size-6 text-red-400" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-medium text-zinc-50">
                Link expirado
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                Este link de redefinição já foi usado ou expirou. Solicite um
                novo link para continuar.
              </p>
            </div>
            <Link
              href="/forgot-password"
              className="mt-2 inline-flex h-9 items-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-zinc-50 transition-colors hover:bg-indigo-500"
            >
              Solicitar novo link
            </Link>
          </div>
        ) : done ? (
          <div className="flex flex-col items-center gap-4 py-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 className="size-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-medium text-zinc-50">
                Senha redefinida
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                Sua senha foi atualizada. Redirecionando para o login…
              </p>
            </div>
            <div className="mt-1 h-1 w-24 overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-full animate-[shrink_2s_linear_forwards] rounded-full bg-indigo-500" />
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="font-serif text-2xl font-medium text-zinc-50">
                Nova senha
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Escolha uma senha segura para sua conta
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5"
            >
              {serverError && (
                <div className="flex items-center gap-2.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3.5 py-3 text-sm text-red-400">
                  <AlertCircle className="size-4 shrink-0" />
                  {serverError}
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="password">Nova senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 8 caracteres"
                    autoComplete="new-password"
                    aria-invalid={!!errors.password}
                    disabled={isSubmitting}
                    className="pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-300"
                    tabIndex={-1}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repita a nova senha"
                    autoComplete="new-password"
                    aria-invalid={!!errors.confirmPassword}
                    disabled={isSubmitting}
                    className="pr-10"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-300"
                    tabIndex={-1}
                    aria-label={showConfirm ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showConfirm ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Redefinir senha"
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
