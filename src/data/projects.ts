export type Project = {
  slug: string
  title: string
  category: string
  description: string
  tags: string[]
  year: number
  image: string
  href: string
}

export const projects: Project[] = [
  {
    slug: "cafe-aurora",
    title: "Café Aurora",
    category: "Identidade Visual",
    description:
      "Marca completa para uma cafeteria de bairro: logotipo, paleta, embalagens e sinalização. Um visual quente e acolhedor inspirado no nascer do sol.",
    tags: ["branding", "embalagem"],
    year: 2025,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    href: "#",
  },
  {
    slug: "revista-traco",
    title: "Revista Traço",
    category: "Editorial",
    description:
      "Projeto gráfico de uma revista independente de ilustração: grade editorial, tipografia de capa e diagramação de 96 páginas.",
    tags: ["editorial", "tipografia"],
    year: 2024,
    image:
      "https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=1200&auto=format&fit=crop",
    href: "#",
  },
  {
    slug: "verde-viva",
    title: "Verde Viva",
    category: "Social Media",
    description:
      "Campanha de conteúdo para uma marca de cosméticos naturais: kit de posts, stories animados e guia de tom de voz.",
    tags: ["social", "campanha"],
    year: 2025,
    image:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=1200&auto=format&fit=crop",
    href: "#",
  },
  {
    slug: "estudio-marco-zero",
    title: "Estúdio Marco Zero",
    category: "Identidade Visual",
    description:
      "Sistema de identidade para um estúdio de fotografia: marca modular, papelaria e templates de apresentação.",
    tags: ["branding", "papelaria"],
    year: 2024,
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1200&auto=format&fit=crop",
    href: "#",
  },
  {
    slug: "festa-junina-urbana",
    title: "Festa Junina Urbana",
    category: "Ilustração",
    description:
      "Série de ilustrações digitais para festival cultural: cartazes, ingressos e peças para redes sociais com traço manual.",
    tags: ["ilustração", "cartaz"],
    year: 2023,
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1200&auto=format&fit=crop",
    href: "#",
  },
  {
    slug: "almanaque-type",
    title: "Almanaque Type",
    category: "Editorial",
    description:
      "E-book gratuito sobre tipografia para iniciantes: capa, ilustrações internas e layout responsivo para leitura digital.",
    tags: ["editorial", "tipo"],
    year: 2023,
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop",
    href: "#",
  },
]
