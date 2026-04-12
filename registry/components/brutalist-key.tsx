"use client";

import React, { useState, useCallback } from "react";

interface BrutalistKeyProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  size?: "sm" | "md" | "lg";
  color?: "zinc" | "amber" | "red" | "blue";
}

const SIZE_MAP = {
  sm: { key: "w-14 h-14", font: "text-xs", shadow: "4px", active: "2px" },
  md: { key: "w-20 h-20", font: "text-sm", shadow: "6px", active: "3px" },
  lg: { key: "w-28 h-28", font: "text-base", shadow: "8px", active: "4px" },
};

const COLOR_MAP = {
  zinc: {
    face: "bg-[#1a1a1a]",
    border: "border-[#2e2e2e]",
    shadow: "#000000",
    gloss: "from-white/10 to-transparent",
    text: "text-zinc-300",
    accent: "#eb5e28",
    accentGlow: "rgba(235,94,40,0.25)",
    rim: "bg-[#0d0d0d]",
  },
  amber: {
    face: "bg-[#1c1500]",
    border: "border-[#4a3800]",
    shadow: "#0a0800",
    gloss: "from-amber-300/10 to-transparent",
    text: "text-amber-300",
    accent: "#f59e0b",
    accentGlow: "rgba(245,158,11,0.25)",
    rim: "bg-[#100e00]",
  },
  red: {
    face: "bg-[#1a0000]",
    border: "border-[#3d0000]",
    shadow: "#0a0000",
    gloss: "from-red-400/10 to-transparent",
    text: "text-red-400",
    accent: "#ef4444",
    accentGlow: "rgba(239,68,68,0.25)",
    rim: "bg-[#0e0000]",
  },
  blue: {
    face: "bg-[#00001a]",
    border: "border-[#00003d]",
    shadow: "#00000a",
    gloss: "from-blue-400/10 to-transparent",
    text: "text-blue-400",
    accent: "#3b82f6",
    accentGlow: "rgba(59,130,246,0.25)",
    rim: "bg-[#00000e]",
  },
};

export const BrutalistKey = ({
  label = "Ctrl",
  size = "md",
  color = "zinc",
  className = "",
  onClick,
  ...props
}: BrutalistKeyProps) => {
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const s = SIZE_MAP[size];
  const c = COLOR_MAP[color];

  const triggerPress = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setPressed(true);

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 500);

      setTimeout(() => setPressed(false), 120);
      onClick?.(e);
    },
    [onClick]
  );

  const shadowDepth = pressed ? s.active : s.shadow;
  const translateY = pressed ? `calc(${s.shadow} - ${s.active})` : "0px";

  return (
    <button
      aria-label={`${label} key`}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={triggerPress}
      className={`relative inline-flex select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
      style={{ WebkitTapHighlightColor: "transparent" }}
      {...props}
    >

      <span
        className={`relative flex items-center justify-center rounded-[10px] ${s.key} ${c.rim} border ${c.border}`}
        style={{
          boxShadow: `
            0 ${shadowDepth} 0 ${c.shadow},
            0 ${shadowDepth} 0 1px ${c.accent}22,
            inset 0 1px 0 rgba(255,255,255,0.06)
          `,
          transition: "box-shadow 80ms ease, transform 80ms ease",
          transform: `translateY(${translateY})`,
        }}
      >
        <span
          className={`absolute inset-0.75 rounded-[7px] ${c.face} border ${c.border} flex items-center justify-center overflow-hidden`}
          style={{
            boxShadow: `inset 0 2px 3px rgba(0,0,0,0.6), inset 0 -1px 2px rgba(255,255,255,0.04)`,
          }}
        >
          <span
            className={`pointer-events-none absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b ${c.gloss} rounded-t-[6px]`}
          />

          <span className="absolute inset-0 overflow-hidden rounded-[7px]">
            {ripples.map((r) => (
              <span
                key={r.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: r.x,
                  top: r.y,
                  width: 0,
                  height: 0,
                  transform: "translate(-50%, -50%)",
                  background: `radial-gradient(circle, ${c.accentGlow} 0%, transparent 70%)`,
                  animation: "brutalist-ripple 0.5s ease-out forwards",
                }}
              />
            ))}
          </span>

          <span
            className={`relative z-10 font-black uppercase tracking-widest ${s.font} ${c.text}`}
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              letterSpacing: "0.15em",
              textShadow: `0 0 8px ${c.accent}88`,
              transform: pressed ? "translateY(1px)" : "translateY(0)",
              transition: "transform 80ms ease",
            }}
          >
            {label}
          </span>
        </span>
      </span>

      <style>{`
        @keyframes brutalist-ripple {
          0%   { width: 0; height: 0; opacity: 1; }
          100% { width: 120px; height: 120px; opacity: 0; }
        }
      `}</style>
    </button>
  );
};
