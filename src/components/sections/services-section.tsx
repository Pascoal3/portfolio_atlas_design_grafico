"use client";

import { InteractiveHoverLinks } from "@/components/ui/interactive-hover-links";
import { SERVICES_DATA } from "@/data/services";

export function ServicesSection() {
  return (
    <section id="servicos" className="relative w-full overflow-x-clip bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Serviços</h2>
          <p className="mt-2 max-w-prose text-muted-foreground mx-auto">
            Soluções completas para elevar a sua presença digital e identidade visual.
          </p>
        </header>
        <InteractiveHoverLinks links={SERVICES_DATA} />
      </div>
    </section>
  );
}