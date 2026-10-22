export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  tools: string;
  cover: string;
}

export const projects: Project[] = [
  {
    id: "cafe-aurora",
    title: "Café Aurora",
    subtitle: "Identidade Visual",
    year: "2025",
    tools: "Ps / Ai / Id",
    cover: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&h=900&fit=crop&auto=format&q=70",
  },
  {
    id: "revista-traco",
    title: "Revista Traço",
    subtitle: "Editorial",
    year: "2024",
    tools: "Id / Ps",
    cover: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=900&h=900&fit=crop&auto=format&q=70",
  },
  {
    id: "verde-viva",
    title: "Verde Viva",
    subtitle: "Social Media",
    year: "2025",
    tools: "Ps / Ae",
    cover: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=900&h=900&fit=crop&auto=format&q=70",
  },
  {
    id: "estudio-marco-zero",
    title: "Estúdio Marco Zero",
    subtitle: "Identidade Visual",
    year: "2024",
    tools: "Ai / Ps / Figma",
    cover: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&h=900&fit=crop&auto=format&q=70",
  },
  {
    id: "festa-junina-urbana",
    title: "Festa Junina Urbana",
    subtitle: "Ilustração",
    year: "2023",
    tools: "Ps / Procreate",
    cover: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&h=900&fit=crop&auto=format&q=70",
  },
  {
    id: "almanaque-type",
    title: "Almanaque Type",
    subtitle: "Editorial",
    year: "2023",
    tools: "Id / Ai",
    cover: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&h=900&fit=crop&auto=format&q=70",
  },
  {
    id: "branding-tech",
    title: "Nexus Tech",
    subtitle: "Identidade Visual",
    year: "2025",
    tools: "Ai / Figma",
    cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=900&fit=crop&auto=format&q=70",
  },
  {
    id: "packaging-organicos",
    title: "Raízes Orgânicos",
    subtitle: "Embalagem",
    year: "2024",
    tools: "Ai / Ps / Id",
    cover: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&h=900&fit=crop&auto=format&q=70",
  },
];