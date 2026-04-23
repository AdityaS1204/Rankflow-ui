"use client";

import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface BrutalistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  color?: "zinc" | "amber" | "red" | "blue" | "emerald" | "light";
}

const SIZE_MAP = {
  sm: { height: "h-10", px: "px-6", font: "text-base", shadow: "4px", active: "1px" },
  md: { height: "h-14", px: "px-10", font: "text-xl", shadow: "6px", active: "2px" },
  lg: { height: "h-16", px: "px-12", font: "text-2xl", shadow: "8px", active: "3px" },
};

const COLOR_MAP = {
  light: {
    face: "bg-[#f5f5f0]",
    border: "border-black",
    shadow: "#000000",
    text: "text-black",
    accentGlow: "rgba(0,0,0,0.1)",
  },
  zinc: {
    face: "bg-[#1a1a1a]",
    border: "border-black",
    shadow: "#000000",
    text: "text-zinc-300",
    accentGlow: "rgba(235,94,40,0.25)",
  },
  amber: {
    face: "bg-[#1c1500]",
    border: "border-[#4a3800]",
    shadow: "#0a0800",
    text: "text-amber-300",
    accentGlow: "rgba(245,158,11,0.25)",
  },
  red: {
    face: "bg-[#1a0000]",
    border: "border-[#3d0000]",
    shadow: "#0a0000",
    text: "text-red-400",
    accentGlow: "rgba(239,68,68,0.25)",
  },
  blue: {
    face: "bg-[#00001a]",
    border: "border-[#00003d]",
    shadow: "#00000a",
    text: "text-blue-400",
    accentGlow: "rgba(59,130,246,0.25)",
  },
  emerald: {
    face: "bg-[#001a0a]",
    border: "border-[#003d15]",
    shadow: "#000a02",
    text: "text-emerald-400",
    accentGlow: "rgba(16,185,129,0.25)",
  },
};

export const BrutalistButton = ({
  children = "button",
  size = "lg",
  color = "light",
  className = "",
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  ...props
}: BrutalistButtonProps) => {
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const s = SIZE_MAP[size];
  const c = COLOR_MAP[color];

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPressed(true);
    onMouseDown?.(e);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPressed(false);
    onMouseUp?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPressed(false);
    onMouseLeave?.(e);
  };

  const triggerPress = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 500);

      onClick?.(e);
    },
    [onClick]
  );

  const shadowDepth = pressed ? s.active : s.shadow;
  const translateY = pressed ? `calc(${s.shadow} - ${s.active})` : "0px";

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onClick={triggerPress}
      className={cn(
        "relative inline-flex select-none cursor-pointer outline-none transition-transform duration-75",
        className
      )}
      style={{ WebkitTapHighlightColor: "transparent" }}
      {...props}
    >
      <span
        className={cn(
          "relative flex items-center justify-center rounded-full transition-all duration-75 overflow-hidden",
          s.height,
          s.px,
          c.face,
          "border-2",
          c.border
        )}
        style={{
          boxShadow: `0 ${shadowDepth} 0 ${c.shadow}`,
          transform: `translateY(${translateY})`,
        }}
      >
        {/* Ripples */}
        <span className="absolute inset-0 overflow-hidden pointer-events-none">
          {ripples.map((r) => (
            <span
              key={r.id}
              className="absolute rounded-full"
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

        {/* Content */}
        <span
          className={cn(
            "relative z-10 font-medium tracking-tight",
            s.font,
            c.text
          )}
          style={{
            transform: pressed ? "translateY(1px)" : "translateY(0)",
            transition: "transform 80ms ease",
          }}
        >
          {children}
        </span>
      </span>

      <style>{`
        @keyframes brutalist-ripple {
          0%   { width: 0; height: 0; opacity: 1; }
          100% { width: 400px; height: 400px; opacity: 0; }
        }
      `}</style>
    </button>
  );
};
