import type { Metadata } from "next"
import { ProjectCard } from "@/components/site/project-card"
import { Separator } from "@/components/ui/separator"
import { projects } from "@/data/projects"

export const metadata: Metadata = {
  title: "Projetos",
}

export default function WorkPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <header>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Projetos
        </h1>
        <p className="mt-3 max-w-prose text-muted-foreground">
          Todos os trabalhos: identidade visual, editorial, social media e
          ilustração.
        </p>
      </header>
      <Separator className="my-10" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
