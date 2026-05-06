"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validations/auth"

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  async function onSubmit(data: ForgotPasswordFormData) {
    // Fake envio — simula delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubmittedEmail(data.email)
    setSubmitted(true)
  }

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl shadow-black/50">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 className="size-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-medium text-zinc-50">
                E-mail enviado
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                Enviamos um link de redefinição para{" "}
                <span className="font-medium text-zinc-200">
                  {submittedEmail}
                </span>
                . Verifique sua caixa de entrada.
              </p>
            </div>
            <Link
              href="/login"
              className="mt-2 text-sm text-indigo-400 transition-colors hover:text-indigo-300"
            >
              Voltar ao login
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="font-serif text-2xl font-medium text-zinc-50">
                Recuperar senha
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Informe seu e-mail para receber o link de redefinição
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5"
            >
              <div className="space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="dr@leandropedrosa.adv.br"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  disabled={isSubmitting}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email.message}</p>
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
                    Enviando...
                  </>
                ) : (
                  "Enviar link"
                )}
              </Button>
            </form>
          </>
        )}
      </div>

      {!submitted && (
        <Link
          href="/login"
          className="mt-4 flex items-center justify-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <ArrowLeft className="size-3" />
          Voltar ao login
        </Link>
      )}
    </div>
  )
}
