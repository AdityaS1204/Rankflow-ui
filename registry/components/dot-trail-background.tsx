"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface DotTrailBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Background color of the container */
  bgColor?: string;
  /** Color of the revealed dots */
  dotColor?: string;
  /** Gap between grid dots in pixels */
  gap?: number;
  /** Radius of dots when idle / hidden (0 = invisible) */
  baseDotSize?: number;
  /** Maximum radius of dots when revealed by cursor */
  maxDotSize?: number;
  /** Radius of the cursor brush stroke */
  strokeWidth?: number;
  /** Duration in ms before revealed dots fade out */
  fadeDuration?: number;
  /** Whether to show a glowing aura around revealed dots */
  glow?: boolean;
  /** Color of the dot glow effect */
  glowColor?: string;
  /** Additional CSS classes */
  className?: string;
  /** Children elements overlaid on top of the background */
  children?: React.ReactNode;
}

interface StrokePoint {
  x: number;
  y: number;
  timestamp: number;
}

export const DotTrailBackground: React.FC<DotTrailBackgroundProps> = ({
  bgColor = "#000000",
  dotColor = "#ffffff",
  gap = 22,
  baseDotSize = 0,
  maxDotSize = 6,
  strokeWidth = 55,
  fadeDuration = 400,
  glow = true,
  glowColor = "rgba(255, 255, 255, 0.45)",
  className,
  children,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokePointsRef = useRef<StrokePoint[]>([]);
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);
  const requestRef = useRef<number | null>(null);

  const addInterpolatedPoints = useCallback(
    (x: number, y: number) => {
      const now = Date.now();
      const last = lastMousePosRef.current;

      if (!last) {
        strokePointsRef.current.push({ x, y, timestamp: now });
        lastMousePosRef.current = { x, y };
        return;
      }

      const dist = Math.hypot(x - last.x, y - last.y);
      const step = Math.max(4, strokeWidth / 6);

      if (dist > step) {
        const count = Math.ceil(dist / step);
        for (let i = 1; i <= count; i++) {
          const t = i / count;
          strokePointsRef.current.push({
            x: last.x + (x - last.x) * t,
            y: last.y + (y - last.y) * t,
            timestamp: now,
          });
        }
      } else {
        strokePointsRef.current.push({ x, y, timestamp: now });
      }

      lastMousePosRef.current = { x, y };
    },
    [strokeWidth]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0;
    let rows = 0;
    let intensities: Float32Array = new Float32Array(0);

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);

      cols = Math.ceil(rect.width / gap) + 1;
      rows = Math.ceil(rect.height / gap) + 1;
      intensities = new Float32Array(cols * rows);
    };

    updateCanvasSize();

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    resizeObserver.observe(container);

    const animate = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      const now = Date.now();

      strokePointsRef.current = strokePointsRef.current.filter(
        (p) => now - p.timestamp < fadeDuration
      );

      const points = strokePointsRef.current;

      if (cols > 0 && rows > 0) {
        intensities.fill(0);

        for (let pIdx = 0; pIdx < points.length; pIdx++) {
          const p = points[pIdx];
          const age = now - p.timestamp;
          const decay = Math.max(0, 1 - age / fadeDuration);

          if (decay <= 0) continue;

          const minCol = Math.max(0, Math.floor((p.x - strokeWidth) / gap));
          const maxCol = Math.min(cols - 1, Math.ceil((p.x + strokeWidth) / gap));
          const minRow = Math.max(0, Math.floor((p.y - strokeWidth) / gap));
          const maxRow = Math.min(rows - 1, Math.ceil((p.y + strokeWidth) / gap));

          for (let r = minRow; r <= maxRow; r++) {
            const dotY = r * gap;
            const dy = dotY - p.y;

            for (let c = minCol; c <= maxCol; c++) {
              const dotX = c * gap;
              const dx = dotX - p.x;
              const dist = Math.hypot(dx, dy);

              if (dist < strokeWidth) {
                const normDist = 1 - dist / strokeWidth;
                const smoothWeight = normDist * normDist * (3 - 2 * normDist);
                const intensity = smoothWeight * decay;

                const index = r * cols + c;
                if (intensity > intensities[index]) {
                  intensities[index] = intensity;
                }
              }
            }
          }
        }

        ctx.fillStyle = dotColor;

        if (glow) {
          ctx.shadowColor = glowColor;
        }

        for (let r = 0; r < rows; r++) {
          const dotY = r * gap;
          for (let c = 0; c < cols; c++) {
            const dotX = c * gap;
            const idx = r * cols + c;
            const intensity = intensities[idx];

            const currentSize = baseDotSize + (maxDotSize - baseDotSize) * intensity;
            if (currentSize <= 0.2) continue;

            const alpha = Math.min(1, Math.max(0, intensity > 0 ? intensity : baseDotSize > 0 ? 0.2 : 0));
            if (alpha <= 0.01) continue;

            ctx.globalAlpha = alpha;

            if (glow && intensity > 0.3) {
              ctx.shadowBlur = intensity * 12;
            } else {
              ctx.shadowBlur = 0;
            }

            ctx.beginPath();
            ctx.arc(dotX, dotY, currentSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        addInterpolatedPoints(x, y);
      }
    };

    const handlePointerLeave = () => {
      lastMousePosRef.current = null;
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [
    bgColor,
    dotColor,
    gap,
    baseDotSize,
    maxDotSize,
    strokeWidth,
    fadeDuration,
    glow,
    glowColor,
    addInterpolatedPoints,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 z-0 overflow-hidden bg-black select-none touch-none",
        className
      )}
      style={{ backgroundColor: bgColor }}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="block absolute inset-0 w-full h-full pointer-events-none"
      />
      {children && <div className="relative z-10 w-full h-full">{children}</div>}
    </div>
  );
};

export default DotTrailBackground;
