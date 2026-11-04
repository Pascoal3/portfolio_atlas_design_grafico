import WavingPortfolioLanding from "@/components/ui/waving-portfolio-landing"
import InversionCircleScrollAnimation from "@/components/ui/inversion-circle-scroll-animation"
import { ProjectsCoverflowSection } from "@/components/sections/projects-coverflow"
import { ServicesSection } from "@/components/sections/services-section"
import { ProcessBento } from "@/components/ui/process-bento"
import { StackMarquee } from "@/components/ui/stack-marquee"

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

      <InversionCircleScrollAnimation />

      <ProjectsCoverflowSection />

      <ServicesSection />

      <section
        id="processo-detalhado"
        aria-label="Processo de Desenvolvimento"
        className="relative w-full min-h-screen overflow-hidden bg-black text-white"
      >
        <div className="relative flex min-h-screen w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw]">
          <ProcessBento />
        </div>
      </section>

      <section
        id="stack"
        aria-label="Habilidades e Tecnologias"
        className="relative w-full min-h-screen overflow-hidden bg-black text-white"
      >
        <div className="relative flex min-h-screen w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw]">
          <StackMarquee />
        </div>
      </section>
    </>
  )
}