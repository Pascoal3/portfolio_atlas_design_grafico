"use client";

/**
 * InversionCircleScrollAnimation
 *
 * Scroll-driven animation using the main page scroll (no internal scroll container).
 * The track creates scroll distance (300vh), the hero stays sticky at top: 0,
 * and progress is calculated from the track's position relative to the viewport.
 */

import type * as React from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── constants ────────────────────────────────────────────────────────────────
const BALL_SIZE = 380; // px — fixed diameter during Phase 1 travel

// ─── root export ──────────────────────────────────────────────────────────────
export default function InversionCircleScrollAnimation() {
  return (
    <>
      <Styles />
      <div className="icsa-wrap">
        <HeroSection />
        <ContentSection />
      </div>
    </>
  );
}

// ─── HeroSection ──────────────────────────────────────────────────────────────
function HeroSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLElement>(null);
  const [viewH, setViewH] = useState(600);
  const [viewW, setViewW] = useState(800);
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const rafRef = useRef<number>(0);

  // measure sticky section dimensions
  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;

    const measure = () => {
      setViewH(el.clientHeight);
      setViewW(el.clientWidth);
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // scroll handler using requestAnimationFrame
  useEffect(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!track || !sticky) return;

    let ticking = false;

    const update = () => {
      if (!track || !sticky) return;
      ticking = false;

      const rect = track.getBoundingClientRect();
      const H = Math.max(1, sticky.clientHeight);

      const maxTravel = Math.max(0, track.offsetHeight - H);
      const localScroll = Math.min(maxTravel, Math.max(0, -rect.top));

      const newP1 = clamp(localScroll / H);
      const newP2 = clamp((localScroll - H) / H);

      setP1(newP1);
      setP2(newP2);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(update);
      }
    };

    // initial calculation (handles page reload scrolled)
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Power4 InOut
  const p1e = p1 < 0.5 ? 8 * p1 ** 4 : 1 - (-2 * p1 + 2) ** 4 / 2;
  // ease-in²
  const p2e = p2 * p2;

  // geometry
  const yOff = (1 - p1e) * (viewH / 2 + BALL_SIZE / 2);
  const coverSize = Math.max(viewW, viewH) * 2.8;
  const ballSize = BALL_SIZE + p2e * (coverSize - BALL_SIZE);
  const clipX = viewW / 2;
  const clipY = viewH / 2 + yOff;
  const clipR = ballSize / 2;

  return (
    <div ref={trackRef} className="icsa-track">
      <section ref={stickyRef} className="icsa-hero">
        {/* expanding black circle */}
        <div
          className="icsa-ball"
          style={{
            width: ballSize,
            height: ballSize,
            transform: `translate(-50%, calc(-50% + ${yOff}px))`,
          }}
        />

        {/* black text — always visible */}
        <div className="icsa-layer icsa-dark">
          <h1>Design em movimento.</h1>
          <p>Role para revelar o futuro.</p>
        </div>

        {/* white text — clipped to the circle (inversion) */}
        <div
          className="icsa-layer icsa-light"
          style={{ clipPath: `circle(${clipR}px at ${clipX}px ${clipY}px)` }}
        >
          <h1>Design em movimento.</h1>
          <p>Role para revelar o futuro.</p>
        </div>
      </section>
    </div>
  );
}

// ─── ContentSection ───────────────────────────────────────────────────────────
function ContentSection() {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setOn(true);
      },
      { root: null, threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`icsa-cs${on ? " on" : ""}`}>
      <div className="icsa-inner">
        {/* Background decorative elements */}
        <svg className="pointer-events-none absolute -right-16 -top-10 -z-10 w-[520px] max-w-[90vw] sm:w-[640px]" viewBox="0 0 640 280" fill="none" aria-hidden="true">
          <path d="M250 0 C360 14 470 -6 640 26 L640 210 C560 150 470 128 392 96 C316 66 262 74 214 44 C196 32 214 8 250 0Z" fill="#bde91a"/>
          <path d="M420 0 C500 6 580 0 640 10 L640 70 C590 52 520 50 470 34 C440 24 420 14 420 0Z" fill="#090909" opacity=".35"/>
        </svg>
        <svg className="pointer-events-none absolute -left-10 top-[44%] -z-10 hidden w-[130px] sm:block" viewBox="0 0 130 210" fill="none" aria-hidden="true">
          <path d="M0 10 C40 20 90 60 110 120 C118 150 80 190 0 206Z" fill="#bde91a"/>
        </svg>
        <svg className="pointer-events-none absolute -bottom-6 right-0 -z-10 w-[300px] sm:w-[420px]" viewBox="0 0 420 150" fill="none" aria-hidden="true">
          <path d="M70 150 C130 110 210 120 270 80 C330 40 380 30 420 10 L420 150Z" fill="#bde91a"/>
        </svg>
        <svg className="pointer-events-none absolute left-0 top-0 -z-10 hidden h-[260px] w-[360px] lg:block" viewBox="0 0 360 260" fill="none" stroke="#bde91a" strokeWidth="1.5" aria-hidden="true" opacity=".7">
          <path d="M-10 70 C70 50 150 80 210 140"/>
          <path d="M-10 100 C60 84 130 108 184 160"/>
          <path d="M-10 128 C50 116 112 136 160 180"/>
        </svg>

        {/* Detalhes: coroa e brilho */}
        <svg className="absolute left-[7%] top-8 hidden w-[84px] -rotate-6 lg:block" viewBox="0 0 80 64" fill="none" stroke="#bde91a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M8 54 L12 16 L28 34 L40 8 L52 34 L68 16 L72 54"/>
          <path d="M10 56 C30 60 52 60 70 56"/>
        </svg>
        <svg className="absolute right-[3%] top-16 hidden w-10 lg:block" viewBox="0 0 40 40" aria-hidden="true">
          <path d="M20 0 C21 12 28 19 40 20 C28 21 21 28 20 40 C19 28 12 21 0 20 C12 19 19 12 20 0Z" fill="#f7f4ec"/>
        </svg>

        {/* Cartão principal */}
        <div className="relative mx-auto max-w-[1180px] rounded-[2.5rem] bg-[#efebe0] px-6 pb-10 pt-10 shadow-[0_30px_80px_-30px_rgba(0,0,0,.8)] sm:px-10 lg:rounded-[3.25rem] lg:rounded-tr-[7rem] lg:px-14 lg:pb-20">

          {/* Apresentação */}
          <div className="grid items-center gap-10 lg:grid-cols-[clamp(300px,36vw,440px)_1fr] lg:gap-14">

            {/* Retrato */}
            <div className="relative mx-auto w-full max-w-[340px] lg:-ml-6 lg:-mt-24 lg:max-w-none">
              <div className="aspect-square w-full rounded-full bg-[#f7f4ec] p-3 shadow-[0_18px_50px_-16px_rgba(0,0,0,.55)] sm:p-4">
                <Image
                  src="/imagens/foto_perfil_profissional.jpg"
                  alt="Retrato do Atlas, designer gráfico e Brand Designer angolano"
                  fill
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 400px, 444px"
                  className="h-full w-full rounded-full bg-[#090909] object-cover"
                />
              </div>

              {/* Texto inclinado */}
              <div className="pointer-events-none absolute left-[-2%] top-[77%] z-10 hidden origin-top-left rotate-[45deg] whitespace-nowrap lg:block">
                <span className="font-hand text-[1.45rem] uppercase leading-none tracking-wide text-[#141412]">Prazer, sou o Atlas!</span>
              </div>
              <svg className="absolute left-[-7.5%] top-[47%] z-10 hidden w-8 lg:block" viewBox="0 0 32 56" fill="none" stroke="#141412" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                <path d="M22 3 L30 14"/>
                <path d="M4 22 L20 27"/>
                <path d="M3 41 L17 43"/>
              </svg>
            </div>

            {/* Título e apresentação */}
            <div className="relative min-w-0">
              <div className="relative lg:pl-[clamp(60px,11vw,150px)]">
                <h1 className="leading-none">
                  <span className="block font-hand text-[clamp(2.4rem,9vw,3.75rem)] tracking-tight lg:text-[clamp(2.75rem,5.2vw,4rem)]">Olá, eu sou o</span>
                  <span className="relative mt-1 inline-block whitespace-nowrap font-marker text-[clamp(4.25rem,22vw,7.5rem)] leading-[1.05] tracking-tight lg:text-[clamp(4rem,9.4vw,9.25rem)]">
                    Atlas<span className="ml-1 inline-block rotate-[4deg] text-[#bde91a]">!</span>
                    <svg className="absolute -bottom-1 left-2 w-[88%]" viewBox="0 0 400 24" fill="none" aria-hidden="true">
                      <path d="M6 15 C80 6 160 16 240 10 C310 5 360 12 394 8" stroke="#bde91a" strokeWidth="9" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h1>

                {/* Seta */}
                <svg className="absolute left-0 top-[clamp(70px,8vw,100px)] hidden w-[clamp(100px,12vw,165px)] lg:block" viewBox="0 0 240 90" fill="none" stroke="#bde91a" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M232 34 C216 12 188 12 186 32 C184 52 212 52 208 34 C204 14 120 6 28 52"/>
                  <path d="M28 52 L52 36 M28 52 L54 70"/>
                </svg>
              </div>

              <p className="mt-8 max-w-[34rem] text-[1.05rem] leading-relaxed text-[#141412] lg:text-[1.1rem]">
                <strong className="font-extrabold">Sou designer gráfico e Brand Designer angolano.</strong>
                Transformo ideias em identidades visuais com personalidade, intenção e estratégia,
                ajudando marcas a comunicar melhor e a destacar-se visualmente.
              </p>
            </div>
          </div>

          {/* Colunas */}
          <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-[1.55fr_1fr_1.1fr] lg:gap-0">

            {/* Ferramentas & Skills */}
            <div className="lg:pr-6">
              <h2 className="relative inline-block px-5 py-2 font-hand text-[1.6rem] leading-none sm:text-[1.9rem]">
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 280 60" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  <path className="scribble" d="M262 20 C248 4 150 -2 70 6 C20 12 4 34 24 48 C50 62 170 60 240 52" stroke="#bde91a" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                <span className="relative">Ferramentas & Skills</span>
              </h2>

              <ul className="mt-8 grid max-w-[360px] grid-cols-3 gap-4" role="list">
                <li className="flex aspect-square items-center justify-center rounded-[1.1rem] border border-[#31a8ff]/60 bg-[#001e36] shadow-[0_8px_16px_-8px_rgba(0,0,0,.5)]" aria-label="Photoshop">
                  <span className="text-[2.6rem] font-extrabold leading-none tracking-tight text-[#31a8ff]">Ps</span>
                </li>
                <li className="flex aspect-square items-center justify-center rounded-[1.1rem] border border-[#ff9a00]/60 bg-[#2b0000] shadow-[0_8px_16px_-8px_rgba(0,0,0,.5)]" aria-label="Illustrator">
                  <span className="text-[2.6rem] font-extrabold leading-none tracking-tight text-[#ff9a00]">Ai</span>
                </li>
                <li className="flex aspect-square items-center justify-center rounded-[1.1rem] border border-[#ff3d7a]/60 bg-[#3a0219] shadow-[0_8px_16px_-8px_rgba(0,0,0,.5)]" aria-label="InDesign">
                  <span className="text-[2.6rem] font-extrabold leading-none tracking-tight text-[#ff3d7a]">Id</span>
                </li>
                <li className="flex aspect-square items-center justify-center rounded-[1.1rem] border border-[#9999ff]/60 bg-[#0a0a5c] shadow-[0_8px_16px_-8px_rgba(0,0,0,.5)]" aria-label="After Effects">
                  <span className="text-[2.6rem] font-extrabold leading-none tracking-tight text-[#9999ff]">Ae</span>
                </li>
                <li className="flex aspect-square items-center justify-center rounded-[1.1rem] border border-white/10 bg-[#1e1e1e] shadow-[0_8px_16px_-8px_rgba(0,0,0,.5)]" aria-label="Figma">
                  <svg className="w-[38%]" viewBox="0 0 38 57" aria-hidden="true">
                    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z" fill="#1abcfe"/>
                    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0Z" fill="#0acf83"/>
                    <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19Z" fill="#ff7262"/>
                    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z" fill="#f24e1e"/>
                    <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z" fill="#a259ff"/>
                  </svg>
                </li>
                <li className="flex aspect-square items-center justify-center rounded-[1.1rem] bg-gradient-to-br from-[#00c4cc] via-[#4f6cf0] to-[#7d2ae8] shadow-[0_8px_16px_-8px_rgba(0,0,0,.5)]" aria-label="Canva">
                  <span className="font-hand text-[1.7rem] italic leading-none text-white">Canva</span>
                </li>
              </ul>

              <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#bde91a] px-5 py-3 text-[0.9rem] font-bold text-[#141412] transition hover:bg-[#141412] hover:text-[#bde91a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#141412] focus-visible:ring-offset-2 focus-visible:ring-offset-[#efebe0]"
                >
                  Vamos criar algo incrível?
                  <svg className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 12.5 12.5 3.5M5 3.5h7.5V11"/></svg>
                </Link>
                <Link
                  href="/work"
                  className="group inline-flex items-center gap-1.5 border-b-2 border-[#141412] pb-0.5 text-sm font-semibold transition hover:border-[#bde91a] hover:text-[#4a4a44] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#141412] focus-visible:ring-offset-2 focus-visible:ring-offset-[#efebe0]"
                >
                  Ver meus projectos
                  <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 2.5v11M3.5 9 8 13.5 12.5 9"/></svg>
                </Link>
              </div>
            </div>

            {/* O que faço */}
            <div className="border-t border-[#141412]/15 pt-10 lg:border-l lg:border-t-0 lg:px-8 lg:pt-0">
              <h2 className="relative inline-block px-5 py-2 font-hand text-[1.6rem] leading-none sm:text-[1.9rem]">
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 60" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  <path className="scribble" d="M186 18 C170 2 100 -2 50 8 C10 16 2 38 24 50 C50 62 130 60 188 50" stroke="#bde91a" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                <span className="relative">O que faço</span>
              </h2>

              <ul className="mt-8 space-y-[0.95rem] text-[1.02rem] font-medium leading-snug">
                <li className="flex items-start gap-3.5"><svg className="mt-[0.2rem] h-4 w-4 shrink-0 text-[#bde91a]" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12C7 11 11 7 12 0Z"/></svg>Branding e Identidade Visual</li>
                <li className="flex items-start gap-3.5"><svg className="mt-[0.2rem] h-4 w-4 shrink-0 text-[#bde91a]" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12C7 11 11 7 12 0Z"/></svg>Design de Logótipos</li>
                <li className="flex items-start gap-3.5"><svg className="mt-[0.2rem] h-4 w-4 shrink-0 text-[#bde91a]" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12C7 11 11 7 12 0Z"/></svg>Direcção de Arte</li>
                <li className="flex items-start gap-3.5"><svg className="mt-[0.2rem] h-4 w-4 shrink-0 text-[#bde91a]" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12C7 11 11 7 12 0Z"/></svg>Design Editorial</li>
                <li className="flex items-start gap-3.5"><svg className="mt-[0.2rem] h-4 w-4 shrink-0 text-[#bde91a]" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12C7 11 11 7 12 0Z"/></svg>Design para Marcas e Negócios</li>
                <li className="flex items-start gap-3.5"><svg className="mt-[0.2rem] h-4 w-4 shrink-0 text-[#bde91a]" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12C7 11 11 7 12 0Z"/></svg>Sistemas Visuais e Aplicações de Marca</li>
              </ul>
            </div>

            {/* Experiência & Percurso */}
            <div className="border-t border-[#141412]/15 pt-10 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <h2 className="relative inline-block px-5 py-2 font-hand text-[1.6rem] leading-none sm:text-[1.9rem]">
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 60" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  <path className="scribble" d="M284 18 C266 2 160 -2 80 6 C24 12 4 34 24 48 C54 62 190 60 270 50" stroke="#bde91a" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                <span className="relative">Experiência & Percurso</span>
              </h2>

              <ul className="mt-8 space-y-5 text-[0.98rem] leading-snug">
                <li className="flex items-start gap-4">
                  <svg className="mt-0.5 h-7 w-7 shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="9" width="26" height="18" rx="3.5" fill="currentColor"/><path d="M11 9V6.5A2.5 2.5 0 0 1 13.5 4h5A2.5 2.5 0 0 1 21 6.5V9"/><path d="M3 17h26" stroke="#efebe0"/><rect x="14" y="15" width="4" height="4" rx="1" fill="#efebe0" stroke="none"/></svg>
                  <p>Mais de <strong className="font-extrabold">2 anos</strong> de experiência em design gráfico.</p>
                </li>
                <li className="flex items-start gap-4">
                  <svg className="mt-0.5 h-7 w-7 shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" aria-hidden="true"><path d="M9 5h14l6 8-13 15L3 13l6-8Z" fill="currentColor"/><path d="M3 13h26M12 5l4 8 4-8M16 28l-4-15M16 28l4-15" stroke="#efebe0" strokeWidth="1.8"/></svg>
                  <p>Mais de <strong className="font-extrabold">43 projectos</strong> realizados.</p>
                </li>
                <li className="flex items-start gap-4">
                  <svg className="mt-0.5 h-7 w-7 shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M27 4c-8 0-14 4-17 11l7 7c7-3 11-9 10-18Z" fill="currentColor"/><circle cx="20" cy="12" r="2.4" fill="#efebe0" stroke="none"/><path d="M10 15 5 16l-2 4 6-1M17 22l-1 5-4 2 1-6M8 24c-2 0-4 1-4 4 3 0 4-2 4-4Z"/></svg>
                  <p>Experiência na criação de identidades visuais para marcas pessoais e pequenos e médios negócios.</p>
                </li>
                <li className="flex items-start gap-4">
                  <svg className="mt-0.5 h-7 w-7 shrink-0" viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" d="m16 3 3.9 8.1 8.8 1.1-6.5 6.1 1.7 8.8L16 22.8 8.1 27.1l1.7-8.8-6.5-6.1 8.8-1.1L16 3Z"/></svg>
                  <p>Fundador / criativo da AtlasCorp.</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Marca */}
          <svg className="absolute bottom-6 right-7 hidden h-14 w-14 text-[#141412] lg:block" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" aria-label="AtlasCorp" role="img">
            <path d="M28 5 51 51H39L28 28 17 51H5L28 5Z"/>
            <path d="M17 51 36 51" strokeWidth="5"/>
          </svg>
        </div>
      </div>
    </section>
  );
}

// ─── helpers ──────────────────────────────────────────────────────────────────
const clamp = (v: number) => Math.min(1, Math.max(0, v));

// ─── styles ───────────────────────────────────────────────────────────────────
function Styles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&display=swap');

      .icsa-wrap *, .icsa-wrap *::before, .icsa-wrap *::after {
        box-sizing: border-box; margin: 0; padding: 0;
      }

      /* ── wrapper: no internal scroll, part of normal page flow ──────────── */
      .icsa-wrap {
        width: 100%;
        height: auto;
        overflow: visible;
        font-family: Inter, sans-serif;
        background: #fff;
      }

      /* 300 vh scroll room; hero sticks inside */
      .icsa-track {
        position: relative;
        height: 300vh;
        height: 300svh;
      }

      /* pinned hero */
      .icsa-hero {
        position: sticky;
        top: 0;
        height: 100vh;
        height: 100svh;
        overflow: hidden;
        isolation: isolate;
      }

      /* ball */
      .icsa-ball {
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        background: #000;
        will-change: transform, width, height;
      }

      /* text layers (hero) */
      .icsa-layer {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 0 2rem;
        pointer-events: none;
      }
      .icsa-dark  { color: #000; z-index: 2; }
      .icsa-light { color: #fff; z-index: 3; will-change: clip-path; }

      .icsa-layer h1 {
        font-size: clamp(2.5rem, 7vw, 6rem);
        font-weight: 900;
        letter-spacing: -0.03em;
        line-height: 1.05;
      }
      .icsa-layer p {
        font-size: clamp(1rem, 2.5vw, 1.5rem);
        font-weight: 400;
        margin-top: 1.25rem;
        opacity: .7;
      }

      /* ── content section ── */
      .icsa-cs {
        min-height: 100vh;
        display: block;
        background: #000;
        color: #fff;
        transition: background 2.4s cubic-bezier(.25,0,.1,1),
                    color      2.4s cubic-bezier(.25,0,.1,1);
      }
      .icsa-cs.on { background: #fff; color: #000; }

      .icsa-inner {
        position: relative;
        max-width: 1180px;
        width: 100%;
        margin: 0 auto;
        overflow-x: clip;
        opacity: 0;
        transform: translateY(24px);
        transition: opacity .7s ease, transform .7s ease;
      }
      .icsa-cs.on .icsa-inner {
        opacity: 1;
        transform: translateY(0);
      }

      /* scribble helper for animated underline */
      .scribble { vector-effect: non-scaling-stroke; }

      @media (prefers-reduced-motion: reduce) {
        * { transition: none !important; }
      }
    `}</style>
  );
}