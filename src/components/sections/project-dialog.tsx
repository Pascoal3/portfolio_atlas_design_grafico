"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText, Sparkles, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
  onPrev: () => void;
  onNext: () => void;
}

export function ProjectDialog({ open, onOpenChange, project, onPrev, onNext }: ProjectDialogProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [project?.id]);

  if (!project) return null;

  const pdfFileName = project.pdf ? project.pdf.split("/").pop() : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-3xl max-h-[92svh] overflow-hidden",
          "sm:max-w-3xl"
        )}
      >
        <div className="flex flex-col h-full">
          <DialogHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b">
            <div className="flex items-center gap-4">
              <img
                src={project.cover}
                alt=""
                className="h-18 w-18 rounded-xl object-cover border"
                aria-hidden="true"
              />
              <div>
                <DialogTitle className="text-xl font-heading font-semibold">{project.title}</DialogTitle>
                <DialogDescription className="text-sm">
                  {project.subtitle} · {project.year}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto py-4 pr-2"
            style={{ scrollbarWidth: "thin" }}
          >
            <div className="space-y-8">
              <section>
                <p className="leading-relaxed text-muted-foreground">{project.description}</p>
              </section>

              {project.gallery.length > 0 && (
                <section>
                  <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-3">
                    Galeria
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.gallery.map((img, i) => (
                      <figure key={i} className="relative">
                        <img
                          src={img}
                          alt={`Imagem ${i + 1} do projeto ${project.title}`}
                          className="w-full rounded-xl border object-contain bg-neutral-50 aspect-video"
                          loading="lazy"
                        />
                      </figure>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="size-4" aria-hidden="true" />
                  O que fiz
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.role.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-3">
                  Entregáveis
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.deliverables.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>

              {project.results && (
                <section>
                  <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="size-4" aria-hidden="true" />
                    Resultados
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">{project.results}</p>
                </section>
              )}

              <section>
                <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-3">
                  Metadados
                </h3>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  {project.client && (
                    <>
                      <dt className="text-muted-foreground">Cliente</dt>
                      <dd className="font-medium">{project.client}</dd>
                    </>
                  )}
                  <dt className="text-muted-foreground">Ano</dt>
                  <dd className="font-medium">{project.year}</dd>
                  <dt className="text-muted-foreground">Ferramentas</dt>
                  <dd className="font-medium">{project.tools}</dd>
                  <dt className="text-muted-foreground">Categoria</dt>
                  <dd className="font-medium">{project.subtitle}</dd>
                </dl>
              </section>

              {project.pdf && (
                <section className="rounded-xl border bg-muted/30 p-4">
                  <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
                    <FileText className="size-4" aria-hidden="true" />
                    PDF do Projeto
                  </h3>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <FileText className="size-8 text-muted-foreground" aria-hidden="true" />
                      <div>
                        <p className="font-medium">{pdfFileName}</p>
                        <p className="text-xs text-muted-foreground">Clique para visualizar ou baixar</p>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <a
                        href={project.pdf}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button variant="default" className="gap-2">
                          <ExternalLink className="size-4" aria-hidden="true" />
                          Abrir PDF
                        </Button>
                      </a>
                      <a href={project.pdf} download>
                        <Button variant="outline" className="gap-2">
                          <FileText className="size-4" aria-hidden="true" />
                          Baixar
                        </Button>
                      </a>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>

          <footer className="border-t pt-4 mt-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <Button variant="ghost" onClick={onPrev} className="w-full sm:w-auto">
                <ChevronLeft className="size-4 mr-1" aria-hidden="true" />
                ‹ Projeto anterior
              </Button>
              <Button variant="ghost" onClick={onNext} className="w-full sm:w-auto">
                Próximo projeto ›
                <ChevronRight className="size-4 ml-1" aria-hidden="true" />
              </Button>
            </div>
          </footer>
        </div>
      </DialogContent>
    </Dialog>
  );
}