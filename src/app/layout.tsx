import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Caveat_Brush, Knewave } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveatBrush = Caveat_Brush({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: "400",
});

const knewave = Knewave({
  variable: "--font-marker",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Pascoal Jorge • Designer Gráfico",
    template: "%s • Pascoal Jorge",
  },
  description:
    "Portfólio de design gráfico: identidade visual, editorial, social media e ilustração. Projetos autorais e comerciais com tipografia, cor e conceito.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${caveatBrush.variable} ${knewave.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
