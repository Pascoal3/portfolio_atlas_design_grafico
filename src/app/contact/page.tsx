"use client"

import * as React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Errors = Partial<Record<"name" | "email" | "message", string>>

export default function ContactPage() {
  const [values, setValues] = React.useState({ name: "", email: "", message: "" })
  const [errors, setErrors] = React.useState<Errors>({})
  const [sent, setSent] = React.useState(false)

  function validate(data: typeof values): Errors {
    const next: Errors = {}
    if (!data.name.trim()) next.name = "Informe o seu nome."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      next.email = "Informe um e-mail válido."
    if (data.message.trim().length < 10)
      next.message = "A mensagem deve ter pelo menos 10 caracteres."
    return next
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setSent(true)
    toast.success("Mensagem enviada!", {
      description: "Obrigado pelo contato. Respondo em até 2 dias úteis.",
    })
    setValues({ name: "", email: "", message: "" })
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <header>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Contato
        </h1>
        <p className="mt-3 max-w-prose text-muted-foreground">
          Me conte sobre o seu projeto: escopo, prazo e o que você imagina.
        </p>
      </header>

      <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="text-sm text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-sm text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Mensagem</Label>
          <Textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            onChange={(e) =>
              setValues((v) => ({ ...v, message: e.target.value }))
            }
          />
          {errors.message && (
            <p id="message-error" role="alert" className="text-sm text-destructive">
              {errors.message}
            </p>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Enviar mensagem
        </Button>

        <p aria-live="polite" className="text-sm text-muted-foreground">
          {sent
            ? "Mensagem registrada! Este formulário é uma demonstração — nenhum dado foi enviado."
            : ""}
        </p>
      </form>
    </div>
  )
}
