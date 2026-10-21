import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/data/projects"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="pt-0 transition-shadow hover:shadow-md">
      <Link
        href={project.href}
        aria-label={`Ver projeto ${project.title}`}
        className="focus-visible:outline-2 focus-visible:outline-ring"
      >
        <div className="relative aspect-[16/10] w-full bg-muted">
          <Image
            src={project.image}
            alt={`Imagem do projeto ${project.title}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Link>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
        <CardAction>
          <span className="text-xs text-muted-foreground">{project.year}</span>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {project.category}
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="secondary">{tag}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="justify-between">
        <Link
          href={project.href}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring"
        >
          Ver projeto
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </CardFooter>
    </Card>
  )
}
