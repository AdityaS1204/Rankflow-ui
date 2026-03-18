"use client";

import React, { useState, useRef, useEffect } from "react";
import { MagicWandIcon } from "@radix-ui/react-icons";

interface NoiseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

// Inline SVG noise filter — avoids any external asset dependency.
const NoiseSVG = () => (
  <svg
    style={{ position: "absolute", width: 0, height: 0 }}
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <filter id="ai-glow-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
        <feBlend in="SourceGraphic" mode="overlay" result="blend" />
        <feComposite in="blend" in2="SourceGraphic" operator="in" />
      </filter>
    </defs>
  </svg>
);

export const NoiseButton = ({
  children = "Generate",
  className = "",
  ...props
}: NoiseButtonProps) => {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw grain noise onto a canvas and use it as the button background.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 400;
    const H = 120;
    canvas.width = W;
    canvas.height = H;

    const imageData = ctx.createImageData(W, H);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 42; // stronger noise grain
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);

  return (
    <>
      <NoiseSVG />

      {/* ── Outer glow ring wrapper ─────────────────────────────────── */}
      <div
        style={{
          display: "inline-flex",
          borderRadius: "9999px",
          padding: "6px",
          /* Thick frosted ring that fades toward edges */
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(160,120,255,0.55) 0%, rgba(180,150,255,0.25) 40%, rgba(200,190,255,0.08) 75%, transparent 100%)",

          transition: "box-shadow 0.35s ease, transform 0.15s ease",
          transform: pressed ? "scale(0.96)" : "scale(1)",
        }}
      >
        {/* ── Inner button ──────────────────────────────────────────── */}
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setPressed(false); }}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onTouchStart={() => setPressed(true)}
          onTouchEnd={() => setPressed(false)}
          className={className}
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "14px 40px",
            borderRadius: "9999px",
            border: "none",
            outline: "none",
            cursor: "pointer",
            overflow: "hidden",
            color: "#ffffff",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "17px",
            fontWeight: 600,
            letterSpacing: "0.01em",
            userSelect: "none",
            WebkitTapHighlightColor: "transparent",
            /* Base purple gradient */
            background:
              "linear-gradient(160deg, #7c3aed 0%, #6d28d9 40%, #5b21b6 100%)",
            /* Bottom glow baked into the button itself */
            boxShadow: hovered
              ? `
                  0 0 0 1px rgba(167,139,250,0.3),
                  inset 0 1px 0 rgba(255,255,255,0.25),
                  inset 0 -1px 0 rgba(0,0,0,0.2),
                  0 8px 40px -4px rgba(109,40,217,0.7),
                  inset 0 -28px 70px -6px rgba(255,255,255,0.75)
                `
              : `
                  0 0 0 1px rgba(167,139,250,0.2),
                  inset 0 1px 0 rgba(255,255,255,0.18),
                  inset 0 -1px 0 rgba(0,0,0,0.15),
                  0 6px 30px -4px rgba(109,40,217,0.55),
                  inset 0 -22px 55px -6px rgba(255,255,255,0.55)
                `,
            transition:
              "box-shadow 0.3s ease, filter 0.3s ease",
            filter: hovered ? "brightness(1.02)" : "brightness(1)",
          }}
          {...props}
        >
          {/* ── Canvas noise layer ───────────────────────────────────  */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              borderRadius: "9999px",
              mixBlendMode: "overlay",
              pointerEvents: "none",
            }}
          />

          {/* ── Bottom light blob ──────────────────────────────────── */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-26px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "65%",
              height: "45px",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(255,255,255,0.95) 0%, rgba(230,215,255,0.6) 40%, transparent 75%)",
              filter: "blur(2px)",
              opacity: hovered ? 1 : 0.85,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
            }}
          />

          {/* ── Shimmer highlight strip ────────────────────────────── */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: "40%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.22) 0%, transparent 80%)",
              pointerEvents: "none",
            }}
          />

          {/* ── Text + icon ────────────────────────────────────────── */}
          <span
            style={{
              position: "relative",
              zIndex: 1,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textShadow: "0 1px 6px rgba(0,0,0,0.3)",
            }}
          >
            {children}
            <MagicWandIcon width={18} height={18} aria-hidden="true" style={{ flexShrink: 0 }} />
          </span>
        </button>
      </div>
    </>
  );
};
