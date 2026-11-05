"use client";

import {
  PenTool,
  QrCode,
  Fingerprint,
  MonitorSmartphone,
  Newspaper,
  Share2,
  BookOpen,
} from "lucide-react";
import { InteractiveHoverLinks } from "@/components/ui/interactive-hover-links";
import { SERVICES } from "@/data/services";

function getIconComponent(iconName: string) {
  switch (iconName) {
    case "PenTool":
      return <PenTool className="size-6 md:size-8" />;
    case "QrCode":
      return <QrCode className="size-6 md:size-8" />;
    case "Fingerprint":
      return <Fingerprint className="size-6 md:size-8" />;
    case "MonitorSmartphone":
      return <MonitorSmartphone className="size-6 md:size-8" />;
    case "Newspaper":
      return <Newspaper className="size-6 md:size-8" />;
    case "Share2":
      return <Share2 className="size-6 md:size-8" />;
    case "BookOpen":
      return <BookOpen className="size-6 md:size-8" />;
    default:
      return null;
  }
}

const servicesData = SERVICES.map((service) => ({
  heading: service.title,
  subheading: service.description,
  imgSrc: service.image,
  href: "#contact",
  icon: getIconComponent(service.icon),
}));

export function ServicesSection() {
  return (
    <section id="servicos" className="relative w-full overflow-x-clip bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Serviços</h2>
          <p className="mt-2 max-w-prose text-muted-foreground mx-auto">
            Serviços de design gráfico para elevar a sua marca com identidade e consistência.
          </p>
        </header>
        <InteractiveHoverLinks links={servicesData} />
      </div>
    </section>
  );
}