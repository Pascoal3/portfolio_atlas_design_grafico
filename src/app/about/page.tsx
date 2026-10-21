import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Sobre",
}

const timeline = [
  {
    year: "2026",
    title: "Estúdio próprio",
    description:
      "Atendimento direto a marcas de cultura, gastronomia e tecnologia.",
  },
  {
    year: "2023",
    title: "Designer sênior em agência",
    description:
      "Liderança de projetos de branding e campanhas para clientes nacionais.",
  },
  {
    year: "2021",
    title: "Primeiros projetos editoriais",
    description:
      "Diagramação de revistas independentes e capas de livros.",
  },
  {
    year: "2019",
    title: "Formação em Design Gráfico",
    description:
      "Início da jornada profissional com foco em tipografia e identidade visual.",
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <header>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Sobre mim
        </h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground">
          Sou designer gráfico apaixonado por transformar ideias em formas que
          comunicam. Trabalho com branding, editorial, social media e
          ilustração, sempre começando pelo conceito e terminando em detalhes
          de tipografia e cor. Acredito que um bom design é aquele que conta a
          história de uma marca com clareza — e com personalidade.
        </p>
      </header>

      <Separator className="my-10" />

      <section aria-labelledby="ferramentas">
        <h2
          id="ferramentas"
          className="text-sm font-semibold tracking-wide text-muted-foreground uppercase"
        >
          Ferramentas
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {[
            "Adobe Illustrator",
            "Adobe Photoshop",
            "Adobe InDesign",
            "Figma",
            "Procreate",
            "After Effects",
          ].map((tool) => (
            <li key={tool}>
              <Badge variant="outline">{tool}</Badge>
            </li>
          ))}
        </ul>
      </section>

      <Separator className="my-10" />

      <section aria-labelledby="trajetoria">
        <h2
          id="trajetoria"
          className="text-3xl font-bold tracking-tight"
        >
          Trajetória
        </h2>
        <ol className="mt-8 space-y-8 border-l-2 border-border pl-6">
          {timeline.map((item) => (
            <li key={item.year} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[31px] size-3 rounded-full bg-primary ring-4 ring-background"
              />
              <p className="text-sm font-semibold text-primary">{item.year}</p>
              <h3 className="mt-1 text-base font-semibold">{item.title}</h3>
              <p className="mt-1 max-w-prose text-sm text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-12">
        <Button render={<Link href="/contact" />}>Vamos conversar</Button>
      </div>
    </div>
  )
}
