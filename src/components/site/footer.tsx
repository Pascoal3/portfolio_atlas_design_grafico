import Link from "next/link"
import { Camera, Globe, Mail } from "lucide-react"

const socials = [
  { href: "https://instagram.com", label: "Instagram", icon: Camera },
  { href: "https://behance.net", label: "Behance", icon: Globe },
  { href: "mailto:ola@pascoaljorge.com.br", label: "E-mail", icon: Mail },
]

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-lg font-bold tracking-tight">
            Pascoal Jorge<span className="text-primary">.</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Designer gráfico — identidade visual, editorial, social media e ilustração.
          </p>
        </div>

        <ul className="flex items-center gap-2">
          {socials.map(({ href, label, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <p className="text-sm text-muted-foreground">
          © 2026 Pascoal Jorge.{" "}
          <Link href="/" className="underline-offset-4 hover:underline">
            Voltar ao topo
          </Link>
        </p>
      </div>
    </footer>
  )
}