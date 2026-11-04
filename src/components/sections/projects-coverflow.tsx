"use client";

import * as React from "react";
import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { projects } from "@/data/projects";
import { ProjectDialog } from "./project-dialog";

export function ProjectsCoverflowSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const slides: CoverflowSlide[] = projects.map((p) => ({
    src: p.cover,
    alt: `Capa do projeto ${p.title}`,
    title: p.title,
    subtitle: p.subtitle,
    meta: [
      { label: "Ano", value: p.year },
      { label: "Ferramentas", value: p.tools },
    ],
  }));

  const handleOpenProject = (index: number) => {
    setOpenIndex(index);
  };

  const handlePrev = () => {
    setOpenIndex((i) => (i === null ? null : (i - 1 + projects.length) % projects.length));
  };

  const handleNext = () => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % projects.length));
  };

  const handleClose = (open: boolean) => {
    if (!open) setOpenIndex(null);
  };

  return (
    <section id="projetos" className="relative w-full overflow-x-clip bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Projetos</h2>
          <p className="mt-2 max-w-prose text-muted-foreground mx-auto">
            Uma seleção de trabalhos em branding, editorial, social media e ilustração.
          </p>
        </header>
        <CoverflowCarousel
          slides={slides}
          showCaption
          autoPlay={openIndex === null}
          autoPlayInterval={5000}
          label="Carrossel de projetos"
          ctaLabel="Ver projeto"
          onOpenProject={handleOpenProject}
        />
        <ProjectDialog
          open={openIndex !== null}
          onOpenChange={handleClose}
          project={openIndex !== null ? projects[openIndex] : null}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </section>
  );
}