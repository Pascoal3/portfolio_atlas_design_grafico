// EDITE AQUI: serviços, descrições e imagens.

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
};

export const SERVICES: Service[] = [
  {
    id: "logotipos",
    title: "Logotipos",
    description: "Logótipos originais com personalidade, desenhados para durar e funcionar em qualquer tamanho.",
    icon: "PenTool",
    image: "/images/services/logotipos.jpg",
  },
  {
    id: "menu-digital",
    title: "Menu Digital",
    description: "Menus digitais para restaurantes e cafeterias, prontos para QR Code, celular e tablet.",
    icon: "QrCode",
    image: "/images/services/menu-digital.png",
  },
  {
    id: "identidade-visual",
    title: "Identidade Visual",
    description: "Marcas completas: paleta, tipografia, aplicações e manual para comunicar com consistência.",
    icon: "Fingerprint",
    image: "/images/services/identidade-visual.png",
  },
  {
    id: "design-website",
    title: "Design de Website",
    description: "Websites com design próprio, claros e responsivos, alinhados à identidade da sua marca.",
    icon: "MonitorSmartphone",
    image: "/images/services/website.jpg",
  },
  {
    id: "flyers",
    title: "Flyers",
    description: "Flyers e panfletos que comunicam rápido e bem, prontos para impressão ou partilha.",
    icon: "Newspaper",
    image: "/images/services/flyers.png",
  },
  {
    id: "redes-sociais",
    title: "Arte para Redes Sociais",
    description: "Posts, capas e templates no estilo da sua marca para manter as redes consistentes.",
    icon: "Share2",
    image: "/images/services/redes-sociais.jpg",
  },
  {
    id: "ebooks",
    title: "E-books",
    description: "E-books e materiais ricos diagramados com leitura fácil e visual profissional.",
    icon: "BookOpen",
    image: "/images/services/ebooks.jpg",
  },
];