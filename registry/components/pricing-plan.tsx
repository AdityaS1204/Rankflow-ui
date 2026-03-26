"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface Feature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  name: string;
  badge?: string;
  monthlyPrice: number | null; 
  yearlyPrice: number | null;
  description: string;
  cta: string;
  ctaVariant: "primary" | "outline";
  features: Feature[];
  accentA: string; 
  accentB: string; 
  accentC: string; 
  popular?: boolean;
}

function NoiseCanvas({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);
  const flag = useRef(active);

  useEffect(() => { 
    flag.current = active; 
  }, [active]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const tick = () => {
      if (flag.current) {
        const { width: w, height: h } = canvas;
        const img = ctx.createImageData(w, h);
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          d[i] = d[i + 1] = d[i + 2] = v;
          d[i + 3] = (Math.random() * 55 + 15) | 0;
        }
        ctx.putImageData(img, 0, 0);
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <canvas
      ref={ref}
      width={400}
      height={220}
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 0.4s ease",
        mixBlendMode: "overlay",
        borderRadius: "inherit",
      }}
    />
  );
}

function SlotPrice({
  value,
  period,
}: {
  value: number | null;
  period: string;
}) {
  const [shown, setShown] = useState(value);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setTick((t) => t + 1);
    const id = setTimeout(() => setShown(value), 260);
    return () => clearTimeout(id);
  }, [value]);

  if (shown === null) {
    return (
      <div className="flex items-baseline gap-1">
        <span className="text-[2.75rem] font-black tracking-tight leading-none text-neutral-900">
          Custom
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-baseline gap-0.5 overflow-hidden h-[52px]">
      <span className="text-[2rem] font-bold text-neutral-900 mb-0.5">$</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={tick}
          initial={{ y: 36, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -36, opacity: 0 }}
          transition={{ duration: 0.26, ease: [0.33, 1, 0.68, 1] }}
          className="text-[2.75rem] font-black tracking-tight leading-none text-neutral-900"
          style={{ display: "inline-block" }}
        >
          {shown}
        </motion.span>
      </AnimatePresence>
      <span className="text-sm font-medium text-neutral-500 ml-0.5 mb-1">{period}</span>
    </div>
  );
}

function PricingCard({
  tier,
  cycle,
}: {
  tier: PricingTier;
  cycle: "monthly" | "yearly";
}) {
  const [hovered, setHovered] = useState(false);

  const price = cycle === "monthly" ? tier.monthlyPrice : tier.yearlyPrice;
  const period = cycle === "monthly" ? "/mo" : "/yr";
  const gradient = `linear-gradient(135deg, ${tier.accentA} 0%, ${tier.accentB} 50%, ${tier.accentC} 100%)`;

  return (
    <div
      className="relative flex flex-col w-full rounded-[24px] bg-white border border-neutral-100 overflow-hidden"
      style={{
        boxShadow: hovered
          ? "0 20px 60px -12px rgba(0,0,0,0.14), 0 8px 24px -6px rgba(0,0,0,0.08)"
          : "0 4px 24px -4px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.35s ease, transform 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {tier.popular && (
        <div className="absolute top-4 right-4 z-20">
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white"
            style={{ background: "linear-gradient(90deg,#7c3aed,#a855f7)" }}
          >
            Popular
          </span>
        </div>
      )}

      <div
        className="relative overflow-hidden"
        style={{
          background: hovered ? gradient : "#f8f8f8",
          backgroundSize: "200% 200%",
          animation: hovered ? "gradShift 5s ease infinite" : "none",
          transition: "background 0.45s ease",
          padding: "1.5rem 1.6rem 1.4rem",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            background:
              "linear-gradient(105deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.38) 50%, rgba(255,255,255,0) 65%)",
            backgroundSize: "250% 100%",
            animation: hovered ? "sweep 2.8s linear infinite" : "none",
          }}
        />
        <NoiseCanvas active={hovered} />

        <div className="relative z-10 mb-3">
          <span
            className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-[0.12em] uppercase"
            style={{
              background: hovered ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.06)",
              border: hovered ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(0,0,0,0.08)",
              color: "#111",
              backdropFilter: "blur(8px)",
              transition: "background 0.4s, border-color 0.4s",
            }}
          >
            {tier.badge ?? tier.name}
          </span>
        </div>

        <div className="relative z-10">
          <SlotPrice value={price} period={period} />
        </div>
      </div>

      <div className="px-6 pt-5 pb-5 border-b border-neutral-100">
        <p className="text-sm text-neutral-500 leading-relaxed mb-4">
          {tier.description}
        </p>
        <button
          className="w-full py-3 rounded-full text-sm font-semibold transition-all duration-150 active:scale-[0.97]"
          style={
            tier.ctaVariant === "primary"
              ? {
                  background: "#0f0f0f",
                  color: "#fff",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -2px 5px rgba(0,0,0,0.35), 0 4px 14px rgba(0,0,0,0.18)",
                }
              : {
                  background: "transparent",
                  color: "#0f0f0f",
                  boxShadow: "inset 0 0 0 1.5px #d4d4d4",
                }
          }
        >
          {tier.cta}
        </button>
      </div>

      <ul className="flex flex-col gap-2.5 px-6 py-5">
        {tier.features.map((f) => (
          <li key={f.text} className="flex items-start gap-2.5 text-sm">
            <span
              className="mt-px shrink-0 flex items-center justify-center w-4 h-4 rounded-full"
              style={{
                background: f.included ? "#0f0f0f" : "transparent",
                border: f.included ? "none" : "1.5px solid #d4d4d4",
              }}
            >
              {f.included ? (
                <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                  <path d="M1 2.5L2.8 4.2L6 1" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                  <path d="M1 1L5 5M5 1L1 5" stroke="#bbb" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              )}
            </span>
            <span style={{ color: f.included ? "#1a1a1a" : "#aaa" }}>
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      <style>{`
        @keyframes gradShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes sweep {
          0%   { background-position: -150% 0; }
          100% { background-position: 250% 0; }
        }
      `}</style>
    </div>
  );
}

const TIERS: PricingTier[] = [
  {
    name: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Everything you need to get started with hiring for small teams.",
    cta: "Get started free",
    ctaVariant: "outline",
    accentA: "#bfdbfe",
    accentB: "#a5f3fc",
    accentC: "#bbf7d0",
    features: [
      { text: "Up to 3 active job posts", included: true },
      { text: "Basic applicant tracking", included: true },
      { text: "AI applicant screening", included: true },
      { text: "Email notifications", included: true },
      { text: "CSV export", included: true },
      { text: "AI Recruiter agent", included: false },
      { text: "Custom skill assessments", included: false },
      { text: "Team collaboration (up to 5)", included: false },
      { text: "Priority support", included: false },
      { text: "Advanced analytics", included: false },
    ],
  },
  {
    name: "Professional",
    badge: "Professional",
    monthlyPrice: 99,
    yearlyPrice: 948,
    description: "Scale your hiring with AI-powered tools built for growing teams.",
    cta: "Start hiring",
    ctaVariant: "primary",
    popular: true,
    accentA: "#e9d5ff",
    accentB: "#f9a8d4",
    accentC: "#c4b5fd",
    features: [
      { text: "Unlimited active job posts", included: true },
      { text: "Advanced applicant tracking", included: true },
      { text: "AI applicant screening", included: true },
      { text: "Email & Slack notifications", included: true },
      { text: "CSV & PDF export", included: true },
      { text: "AI Recruiter agent", included: true },
      { text: "Custom skill assessments", included: true },
      { text: "Team collaboration (up to 20)", included: true },
      { text: "Priority support", included: false },
      { text: "Advanced analytics", included: false },
    ],
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    yearlyPrice: null,
    description: "Custom solutions for large-scale hiring across your organisation.",
    cta: "Contact us",
    ctaVariant: "primary",
    accentA: "#fed7aa",
    accentB: "#fde68a",
    accentC: "#fca5a5",
    features: [
      { text: "Unlimited active job posts", included: true },
      { text: "Advanced applicant tracking", included: true },
      { text: "AI applicant screening", included: true },
      { text: "Email, Slack & webhook alerts", included: true },
      { text: "All export formats", included: true },
      { text: "AI Recruiter agent", included: true },
      { text: "Custom skill assessments", included: true },
      { text: "Unlimited team members", included: true },
      { text: "Dedicated support & SLA", included: true },
      { text: "Advanced analytics & reports", included: true },
    ],
  },
];

export function PricingPlan({
  tiers = TIERS,
  className = "",
}: {
  tiers?: PricingTier[];
  className?: string;
}) {
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className={`flex flex-col items-center gap-8 w-full ${className}`}>
      <div
        className="flex items-center rounded-full p-1"
        style={{ background: "#f0f0f0", border: "1px solid #e4e4e4" }}
      >
        {(["monthly", "yearly"] as const).map((c) => {
          const active = cycle === c;
          return (
            <button
              key={c}
              onClick={() => setCycle(c)}
              className="relative px-5 py-1.5 rounded-full text-sm font-semibold focus:outline-none transition-colors duration-200"
              style={{ color: active ? "#fff" : "#666" }}
            >
              {active && (
                <motion.span
                  layoutId="cycle-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "#111" }}
                  transition={{ type: "spring", bounce: 0.18, duration: 0.38 }}
                />
              )}
              <span className="relative z-10 capitalize">{c}</span>
              {c === "yearly" && (
                <span className="relative z-10 ml-1.5 text-[10px] font-bold text-emerald-400">
                  −20%
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-5xl">
        {tiers.map((t) => (
          <PricingCard key={t.name} tier={t} cycle={cycle} />
        ))}
      </div>
    </div>
  );
}
