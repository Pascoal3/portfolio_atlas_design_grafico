import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  BookOpen,
  Palette,
  PenTool,
  Share2,
} from "lucide-react"
import WavingPortfolioLanding from "@/components/ui/waving-portfolio-landing"
import { ProjectCard } from "@/components/site/project-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { projects } from "@/data/projects"

const services = [
  {
    title: "Identidade Visual",
    description:
      "Marcas completas: logotipo, paleta, tipografia e manual de uso.",
    icon: Palette,
  },
  {
    title: "Editorial",
    description:
      "Revistas, livros e catálogos com grade, capa e diagramação cuidadas.",
    icon: BookOpen,
  },
  {
    title: "Social Media",
    description:
      "Kits de posts, stories e templates que mantêm a marca viva no feed.",
    icon: Share2,
  },
  {
    title: "Ilustração",
    description:
      "Ilustrações autorais e comerciais com traço manual e digital.",
    icon: PenTool,
  },
]

const tools = [
  "Adobe Illustrator",
  "Adobe Photoshop",
  "Adobe InDesign",
  "Figma",
  "Procreate",
  "After Effects",
]

const featured = projects.slice(0, 3)

export default function Home() {
  return (
    <>
      <section aria-label="Apresentação" className="h-svh">
        <WavingPortfolioLanding
          name="Pascoal Jorge"
          year="2026"
          roles={["Designer Gráfico", "Ilustrador"]}
          greeting="Olá!"
          title="Portfólio"
        />
      </section>

      <section
        aria-labelledby="projetos-destaque"
        className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="projetos-destaque"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Projetos em destaque
            </h2>
            <p className="mt-2 max-w-prose text-muted-foreground">
              Uma seleção de trabalhos recentes em branding, editorial, social
              media e ilustração.
            </p>
          </div>
          <Button variant="outline" render={<Link href="/work" />}>
            Ver todos os projetos
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
        <Separator className="my-8" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="servicos"
        className="border-y border-border/60 bg-muted/40"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <h2
            id="servicos"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Serviços
          </h2>
          <p className="mt-2 max-w-prose text-muted-foreground">
            Como eu posso ajudar o seu projeto a ganhar forma.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="rounded-xl bg-card p-5 ring-1 ring-foreground/10"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="sobre"
        className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6"
      >
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <h2
              id="sobre"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Sobre
            </h2>
            <p className="mt-4 max-w-prose text-muted-foreground">
              Sou designer gráfico com foco em identidade visual e projetos
              editoriais. Gosto de começar pelo conceito: entender a história
              por trás de cada marca antes de desenhar qualquer forma. O
              resultado é um trabalho com tipografia bem cuidada, cor com
              intenção e ideias que funcionam tanto na tela quanto no papel.
            </p>
            <Button className="mt-6" render={<Link href="/about" />}>
              Conheça minha trajetória
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Ferramentas
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <li key={tool}>
                  <Badge variant="outline">{tool}</Badge>
                </li>
              ))}
            </ul>
            <div className="mt-8 overflow-hidden rounded-xl ring-1 ring-foreground/10">
              <Image
                src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200&auto=format&fit=crop"
                alt="Mesa de trabalho com sketches e materiais de design"
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="cta"
        className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6"
      >
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-foreground p-8 text-background sm:flex-row sm:items-center sm:p-12">
          <div>
            <h2 id="cta" className="text-3xl font-bold tracking-tight">
              Vamos trabalhar juntos?
            </h2>
            <p className="mt-2 max-w-prose text-background/80">
              Conte sobre o seu projeto — eu respondo em até 2 dias úteis.
            </p>
          </div>
          <Button
            size="lg"
            render={<Link href="/contact" />}
            className="bg-background text-foreground hover:bg-background/90"
          >
            Entrar em contato
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </section>
    </>
  )
}
