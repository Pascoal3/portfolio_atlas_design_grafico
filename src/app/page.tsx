import WavingPortfolioLanding from "@/components/ui/waving-portfolio-landing"
import InversionCircleScrollAnimation from "@/components/ui/inversion-circle-scroll-animation"

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
    </>
  )
}