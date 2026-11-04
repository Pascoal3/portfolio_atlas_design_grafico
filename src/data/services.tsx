import { Globe, Monitor, Layout, Palette, Brush, Zap } from "lucide-react";
import type { InteractiveLinkItem } from "@/components/ui/interactive-hover-links";

export const SERVICES_DATA: InteractiveLinkItem[] = [
  {
    heading: "Websites",
    subheading: "Plataformas web completas, escaláveis e com performance extrema.",
    imgSrc: "/services/servico_websites.png",
    href: "#contact",
    icon: <Globe className="size-6 md:size-8" />,
  },
  {
    heading: "Aplicações web",
    subheading: "Apps web progressivas, dashboards e sistemas complexos prontos para escalar.",
    imgSrc: "/services/servico_apps_web.jpg",
    href: "#contact",
    icon: <Monitor className="size-6 md:size-8" />,
  },
  {
    heading: "Landing Pages",
    subheading: "Páginas de alta conversão desenhadas para impressionar e vender.",
    imgSrc: "/services/servico_landing_pages.jpg",
    href: "#contact",
    icon: <Layout className="size-6 md:size-8" />,
  },
  {
    heading: "UI/UX Design",
    subheading: "Interfaces modernas, intuitivas e com obsessão por cada detalhe.",
    imgSrc: "/services/servico_ui_ux.jpg",
    href: "#contact",
    icon: <Palette className="size-6 md:size-8" />,
  },
  {
    heading: "Branding",
    subheading: "Identidades visuais fortes que destacam a tua marca no mercado.",
    imgSrc: "/services/servico_branding.jpg",
    href: "#contact",
    icon: <Brush className="size-6 md:size-8" />,
  },
  {
    heading: "Automação & IA",
    subheading: "Agentes inteligentes e fluxos automatizados que poupam horas de trabalho.",
    imgSrc: "/services/servico_automacao.jpg",
    href: "#contact",
    icon: <Zap className="size-6 md:size-8" />,
  },
];