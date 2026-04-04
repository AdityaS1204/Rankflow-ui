"use client";

import React, { useEffect, useRef, useState } from "react";

const LogoFrame = ({ children }: { children: React.ReactNode }) => (
  <span className="flex items-center gap-1.5 text-[15px] font-semibold tracking-tight text-neutral-600">
    {children}
  </span>
);

const FramerLogo = () => (
  <LogoFrame>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 0h16v8H12l8 8H12v8L4 16V8l8-8H4z" /></svg>
    Framer
  </LogoFrame>
);
const MiroLogo = () => (
  <LogoFrame>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2" /><path d="M6 17L9 7l4 6 3-4 2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    Miro
  </LogoFrame>
);
const NotionLogo = () => (
  <LogoFrame>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 3h12l4 4v14H4V3zm2 2v14h12V8h-3V5H6zm4 6h4v2h-4v-2zm0 4h4v2h-4v-2z" /></svg>
    Notion
  </LogoFrame>
);
const CanvaLogo = () => (
  <LogoFrame>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" opacity=".12" /><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" /></svg>
    Canva
  </LogoFrame>
);
const FigmaLogo = () => (
  <LogoFrame>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 24a4 4 0 0 0 4-4v-4H8a4 4 0 0 0 0 8zM4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4zM4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4zM12 0h4a4 4 0 0 1 0 8h-4zM20 12a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4z" /></svg>
    Figma
  </LogoFrame>
);

function MeshBlob({
  className,
  color,
  style,
}: {
  className?: string;
  color: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-[120px] ${className ?? ""}`}
      style={{ background: color, ...style }}
    />
  );
}

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string;
  accentText?: string;
  trailing?: string;
  subheading?: string;
  primaryCta?: string;
  secondaryCta?: string;
  onPrimaryCta?: () => void;
  onSecondaryCta?: () => void;
}

const Navbar = () => (
  <nav className="absolute left-0 top-0 z-20 flex w-full items-center justify-between px-6 py-6 sm:px-12">
    {/* Logo */}
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e53e2e]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="8" x2="20" y2="8" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="16" x2="20" y2="16" />
        </svg>
      </div>
      <span className="text-lg font-bold tracking-tight text-neutral-900">Aura</span>
    </div>

    <div className="hidden items-center gap-8 md:flex">
      {["Features", "Use cases", "Pricing", "Blog"].map((link) => (
        <a key={link} href="#" className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900">
          {link}
        </a>
      ))}
    </div>

    <div className="flex items-center gap-3">
      <button className="rounded-lg px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100">
        Log in
      </button>
      <button className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90">
        Sign up free
      </button>
    </div>
  </nav>
);

export function HeroSection({
  heading = "AI Workspace",
  accentText = "Creative Thinking",
  trailing = ".",
  subheading = "Brainstorm, connect, and visualize ideas effortlessly, all in one intelligent workspace designed to help you create your next big idea.",
  primaryCta = "Try Aura Free",
  secondaryCta = "Watch Demo",
  onPrimaryCta,
  onSecondaryCta,
  className,
  ...props
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      });
    };
    const el = containerRef.current;
    el?.addEventListener("mousemove", handler);
    return () => el?.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#faf8f5] px-6 text-center ${className ?? ""}`}
      {...props}
    >
      <Navbar />
      <MeshBlob
        color="rgba(255,180,120,0.35)"
        className="h-[500px] w-[600px]"
        style={{
          top: "-8%",
          right: "-5%",
          transform: `translate(${mouse.x * -12}px, ${mouse.y * -12}px)`,
          transition: "transform 0.8s cubic-bezier(.22,1,.36,1)",
        }}
      />
      <MeshBlob
        color="rgba(255,140,100,0.22)"
        className="h-[400px] w-[500px]"
        style={{
          bottom: "5%",
          left: "-8%",
          transform: `translate(${mouse.x * 10}px, ${mouse.y * 10}px)`,
          transition: "transform 0.8s cubic-bezier(.22,1,.36,1)",
        }}
      />
      <MeshBlob
        color="rgba(255,200,160,0.18)"
        className="h-[300px] w-[440px]"
        style={{
          top: "30%",
          left: "30%",
          transform: `translate(${mouse.x * -6}px, ${mouse.y * 6}px)`,
          transition: "transform 0.8s cubic-bezier(.22,1,.36,1)",
        }}
      />

      <div className="pointer-events-none absolute right-[-10%] top-[20%] opacity-[0.08]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-neutral-500"
            style={{
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              top: `${-100 - i * 40}px`,
              left: `${-100 - i * 40}px`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex max-w-3xl flex-col items-center pt-20 sm:pt-0">
        <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
          {heading}
          <br />
          <span className="inline-block">
            For{" "}
            <span className="text-[#e53e2e]">{accentText}</span>
            {trailing}
          </span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-neutral-500 sm:text-[17px]">
          {subheading}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onPrimaryCta}
            className="group relative inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-900/20 transition-all hover:shadow-xl hover:shadow-neutral-900/30 active:scale-[0.97]"
          >
            {primaryCta}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path
                d="M1 13L13 1M13 1H4.5M13 1v8.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={onSecondaryCta}
            className="group inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 shadow-sm transition-all hover:border-neutral-400 hover:shadow-md active:scale-[0.97]"
          >
            {secondaryCta}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-neutral-400 transition-colors group-hover:text-neutral-600"
            >
              <circle
                cx="8"
                cy="8"
                r="7"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M6.5 5.5l3.5 2.5-3.5 2.5z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-20 flex flex-col items-center gap-6 sm:mt-28">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
          Used by creators and teams at leading design tools
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          <FramerLogo />
          <MiroLogo />
          <NotionLogo />
          <CanvaLogo />
          <FigmaLogo />
        </div>
      </div>
    </div>
  );
}
