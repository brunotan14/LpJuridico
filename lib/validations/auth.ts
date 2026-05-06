import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail obrigatório")
    .email("E-mail inválido"),
  password: z
    .string()
    .min(1, "Senha obrigatória")
    .min(6, "Mínimo de 6 caracteres"),
})

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail obrigatório")
    .email("E-mail inválido"),
})

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Senha obrigatória")
      .min(8, "Mínimo de 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

export type LoginFormData = z.infer<typeof loginSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
