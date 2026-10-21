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
        <span className="icsa-label">O que vem a seguir</span>
        <h2>Crie com intenção.<br />Entregue com confiança.</h2>
        <p>
          Todo grande projeto começa com uma visão clara e uma ideia simples.
          De uma tela em branco a algo memorável — o que separa você disso é o trabalho.
        </p>
        <CTAButton />
      </div>
    </section>
  );
}

// ─── Button (from Button.svelte) ──────────────────────────────────────────────
function CTAButton() {
  return <button className="icsa-btn">Começar</button>;
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

      /* text layers */
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
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6rem 2rem;
        background: #000;
        color: #fff;
        transition: background 2.4s cubic-bezier(.25,0,.1,1),
                    color      2.4s cubic-bezier(.25,0,.1,1);
      }
      .icsa-cs.on { background: #fff; color: #000; }

      .icsa-inner {
        max-width: 720px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.75rem;
      }

      .icsa-inner > * {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity .7s ease, transform .7s ease;
      }
      .icsa-cs.on .icsa-inner > * {
        opacity: 1;
        transform: translateY(0);
      }

      .icsa-cs.on .icsa-label { transition-delay: .10s; }
      .icsa-cs.on h2          { transition-delay: .24s; }
      .icsa-cs.on p           { transition-delay: .38s; }
      .icsa-cs.on .icsa-btn   { transition-delay: .52s; }

      .icsa-label {
        font-size: .75rem;
        font-weight: 600;
        letter-spacing: .18em;
        text-transform: uppercase;
        opacity: .45;
      }
      .icsa-inner h2 {
        font-size: clamp(2rem, 6vw, 4rem);
        font-weight: 900;
        letter-spacing: -.03em;
        line-height: 1.08;
      }
      .icsa-inner p {
        font-size: clamp(1rem, 2vw, 1.2rem);
        line-height: 1.75;
        opacity: .6;
        max-width: 560px;
      }

      /* button */
      .icsa-btn {
        background: #ff3e00;
        color: #fff;
        padding: 10px 28px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-family: Inter, sans-serif;
        font-size: 1rem;
        font-weight: 600;
        letter-spacing: .01em;
        transition: opacity .2s ease, transform .2s ease;
      }
      .icsa-btn:hover  { opacity: .85; transform: translateY(-1px); }
      .icsa-btn:active { opacity: 1;   transform: translateY(0);    }
    `}</style>
  );
}