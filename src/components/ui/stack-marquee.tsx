"use client";

import React from "react";

// Pré-cálculo do polígono floral/carimbo recortado (scalloped rosette stamp)
const STAMP_POINTS = Array.from({ length: 120 }, (_, i) => {
  const a = (i / 120) * 2 * Math.PI;
  const r = 22 + 1.9 * Math.cos(10 * a);
  return `${(24 + r * Math.cos(a)).toFixed(1)},${(24 + r * Math.sin(a)).toFixed(1)}`;
}).join(" ");

// Paleta fixa do projeto (ciclo de 6 cores)
const PALETTE = ["#cf6a64", "#388a76", "#d26ba8", "#d17f2f", "#5878d6", "#8b63c9"];

interface TechCardItem {
  name: string;
  category: string;
  icon: React.ReactNode;
  useBootstrapIcon?: boolean;
}

const ROW_1: TechCardItem[] = [
  {
    name: "Adobe Photoshop",
    category: "Edição de Imagem",
    icon: <i className="bi bi-file-image" aria-hidden="true"></i>,
    useBootstrapIcon: true,
  },
  {
    name: "Adobe Illustrator",
    category: "Vetor & Ilustração",
    icon: <i className="bi bi-vector-pen" aria-hidden="true"></i>,
    useBootstrapIcon: true,
  },
  {
    name: "Adobe InDesign",
    category: "Editoração",
    icon: <i className="bi bi-file-earmark-text" aria-hidden="true"></i>,
    useBootstrapIcon: true,
  },
  {
    name: "Figma",
    category: "UI & Protótipo",
    icon: (
      <svg className="size-[46%] fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
      </svg>
    ),
  },
  {
    name: "Canva",
    category: "Design Rápido",
    icon: <i className="bi bi-palette" aria-hidden="true"></i>,
    useBootstrapIcon: true,
  },
  {
    name: "Adobe Lightroom",
    category: "Fotografia",
    icon: <i className="bi bi-camera" aria-hidden="true"></i>,
    useBootstrapIcon: true,
  },
  {
    name: "Adobe After Effects",
    category: "Motion Design",
    icon: <i className="bi bi-film" aria-hidden="true"></i>,
    useBootstrapIcon: true,
  },
  {
    name: "Affinity Designer",
    category: "Vetor Alternativo",
    icon: <i className="bi bi-vector-pen" aria-hidden="true"></i>,
    useBootstrapIcon: true,
  },
  {
    name: "Pinterest",
    category: "Referências",
    icon: (
      <svg className="size-[46%] fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
      </svg>
    ),
  },
  {
    name: "Behance",
    category: "Portfólio",
    icon: (
      <svg className="size-[46%] fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z" />
      </svg>
    ),
  },
];

const ROW_2: TechCardItem[] = [
  {
    name: "Dribbble",
    category: "Inspiração",
    icon: (
      <svg className="size-[46%] fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
      </svg>
    ),
  },
  {
    name: "Awwwards",
    category: "Inspiração Web",
    icon: (
      <svg className="size-[46%] fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="m14.72 5.6-2.24 8.68-2.12-8.68H7.47l-2.12 8.68L3.11 5.6H0l4.01 12.65h2.74l2.17-8.18 2.16 8.18h2.74L17.83 5.6zm5.1 10.7c0 1.2.9 2.1 2.09 2.1 1.2 0 2.09-.9 2.09-2.1s-.9-2.12-2.1-2.12c-1.19 0-2.08.9-2.08 2.11" />
      </svg>
    ),
  },
  {
    name: "Google Fonts",
    category: "Tipografia",
    icon: (
      <svg className="size-[46%] fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 2.8A3.6 3.6 0 1 0 4 10a3.6 3.6 0 0 0 0-7.2zm7.6 0v18.4h7.2a5.2 5.2 0 1 1 0-10.4 4 4 0 1 1 0-8zm7.2 0v8a4 4 0 1 0 0-8zm0 8v10.4A5.2 5.2 0 0 0 24 16a5.2 5.2 0 0 0-5.2-5.2zm-7.7-7.206L0 21.199h8.8l2.3-3.64Z" />
      </svg>
    ),
  },
  {
    name: "Obsidian",
    category: "Notas & Conhecimento",
    icon: (
      <svg className="size-[46%] fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.355 18.538a68.967 68.959 0 0 0 1.858-2.954.81.81 0 0 0-.062-.9c-.516-.685-1.504-2.075-2.042-3.362-.553-1.321-.636-3.375-.64-4.377a1.707 1.707 0 0 0-.358-1.05l-3.198-4.064a3.744 3.744 0 0 1-.076.543c-.106.503-.307 1.004-.536 1.5-.134.29-.29.6-.446.914l-.31.626c-.516 1.068-.997 2.227-1.132 3.59-.124 1.26.046 2.73.815 4.481.128.011.257.025.386.044a6.363 6.363 0 0 1 3.326 1.505c.916.79 1.744 1.922 2.415 3.5zM8.199 22.569c.073.012.146.02.22.02.78.024 2.095.092 3.16.29.87.16 2.593.64 4.01 1.055 1.083.316 2.198-.548 2.355-1.664.114-.814.33-1.735.725-2.58l-.01.005c-.67-1.87-1.522-3.078-2.416-3.849a5.295 5.295 0 0 0-2.778-1.257c-1.54-.216-2.952.19-3.84.45.532 2.218.368 4.829-1.425 7.531zM5.533 9.938c-.023.1-.056.197-.098.29L2.82 16.059a1.602 1.602 0 0 0 .313 1.772l4.116 4.24c2.103-3.101 1.796-6.02.836-8.3-.728-1.73-1.832-3.081-2.55-3.831zM9.32 14.01c.615-.183 1.606-.465 2.745-.534-.683-1.725-.848-3.233-.716-4.577.154-1.552.7-2.847 1.235-3.95.113-.235.223-.454.328-.664.149-.297.288-.577.419-.86.217-.47.379-.885.46-1.27.08-.38.08-.72-.014-1.043-.095-.325-.297-.675-.68-1.06a1.6 1.6 0 0 0-1.475.36l-4.95 4.452a1.602 1.602 0 0 0-.513.952l-.427 2.83c.672.59 2.328 2.316 3.335 4.711.09.21.175.43.253.653z" />
      </svg>
    ),
  },
  {
    name: "Notion",
    category: "Organização",
    icon: (
      <svg className="size-[46%] fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
      </svg>
    ),
  },
  {
    name: "ChatGPT",
    category: "IA Generativa",
    icon: <i className="bi bi-robot" aria-hidden="true"></i>,
    useBootstrapIcon: true,
  },
  {
    name: "Adobe Firefly",
    category: "IA Generativa",
    icon: <i className="bi bi-stars" aria-hidden="true"></i>,
    useBootstrapIcon: true,
  },
  {
    name: "Midjourney",
    category: "IA Generativa",
    icon: <i className="bi bi-stars" aria-hidden="true"></i>,
    useBootstrapIcon: true,
  },
  {
    name: "Mockup World",
    category: "Mockups",
    icon: <i className="bi bi-display" aria-hidden="true"></i>,
    useBootstrapIcon: true,
  },
  {
    name: "Placeit",
    category: "Mockups",
    icon: <i className="bi bi-tshirt" aria-hidden="true"></i>,
    useBootstrapIcon: true,
  },
  {
    name: "Freepik",
    category: "Recursos",
    icon: (
      <svg className="size-[46%] fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-1-10h2v2h-2zm0-3h2v2h-2zm0 6h2v2h-2z" />
      </svg>
    ),
  },
];

function CardStamp({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div
      className="absolute right-3 top-3 md:right-4 md:top-4 size-12 md:size-14 grid place-items-center"
      style={{ color }}
    >
      <svg className="absolute inset-0 size-full fill-white" viewBox="0 0 48 48" aria-hidden="true">
        <polygon points={STAMP_POINTS} />
      </svg>
      <div className="relative z-10 size-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false, duration = 45, startIndex = 0 }: { items: TechCardItem[]; reverse?: boolean; duration?: number; startIndex?: number }) {
  const doubleList = [...items, ...items];

  return (
    <div className="stack-row overflow-hidden">
      <div
        className="stack-track flex w-max will-change-transform"
        style={{
          animation: `stackMarqueeSlide ${duration}s linear infinite ${reverse ? "reverse" : "normal"}`,
          animationPlayState: 'var(--play-state, running)',
        }}
      >
        {doubleList.map((item, index) => {
          const globalIndex = startIndex + index;
          const color = PALETTE[globalIndex % PALETTE.length];
          return (
            <div
              key={`${item.name}-${index}`}
              className="shrink-0 relative flex flex-col justify-between w-[190px] h-[112px] md:w-[230px] md:h-[130px] mr-3.5 p-4 md:p-5 rounded-3xl text-white overflow-hidden"
              style={{ backgroundColor: color }}
            >
              <CardStamp color={color}>
                {item.useBootstrapIcon ? (
                  <span className="size-[46%] text-white" style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                ) : (
                  item.icon
                )}
              </CardStamp>
              <span className="relative self-start text-[11px] md:text-xs font-medium opacity-90 font-sans">
                {item.category}
              </span>
              <span
                className="relative text-2xl md:text-[34px] leading-none tracking-tight font-normal"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StackMarquee() {
  return (
    <div className="w-full flex flex-col justify-between py-2 md:py-4 text-white">
      <style>{`
        @keyframes stackMarqueeSlide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .stack-row:hover .stack-track {
          --play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .stack-track { animation: none !important; }
          .stack-row { overflow-x: auto; }
        }
      `}</style>

      <div className="mb-6 md:mb-8 border-b border-white/10 pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white">
          07 • Skills & Stack
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <h2
            className="text-[clamp(2.8rem,6vw,5.5rem)] font-normal leading-[0.95] tracking-tight text-white"
            style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
          >
            Ferramentas do ofício.
          </h2>
          <p className="max-w-[55ch] text-sm md:text-base text-white/70 font-light leading-relaxed">
            Do primeiro esboço no papel à entrega final, a stack que uso para desenhar, criar e gerir projetos de design gráfico com precisão e eficiência.
          </p>
        </div>
      </div>

      <div
        className="flex flex-col gap-3.5 overflow-hidden py-2"
        style={{
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
        aria-label="Tecnologias e ferramentas utilizadas"
      >
        <MarqueeRow items={ROW_1} reverse={false} duration={45} startIndex={0} />
        <MarqueeRow items={ROW_2} reverse={true} duration={55} startIndex={ROW_1.length} />
      </div>

      <div className="mt-6 flex flex-wrap gap-4 items-center justify-between border-t border-white/10 pt-3 text-xs text-white/40 font-mono">
        <span>Sempre em evolução: novas ferramentas entram à medida que o projeto pede.</span>
        <span className="text-white/60">Passe o cursor por cima para pausar</span>
      </div>
    </div>
  );
}

export default StackMarquee;