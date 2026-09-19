"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface DitherLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional status label. When provided, renders inside an AI agent pill badge.
   * When omitted, renders as a standalone compact dither icon.
   */
  label?: React.ReactNode;
  /**
   * Optional additional container CSS classes.
   */
  className?: string;
  /**
   * Optional additional CSS classes for the canvas icon box.
   */
  boxClassName?: string;
  /**
   * Optional internal canvas resolution in pixels (default: 32).
   */
  size?: number;
  /**
   * Optional animation speed multiplier (default: 1).
   */
  speed?: number;
  /**
   * Optional custom children to render inside the pill.
   */
  children?: React.ReactNode;
}

// 4x4 Bayer Dither Matrix normalized (0..15)
const BAYER_MATRIX_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

export function DitherLoader({
  label,
  className,
  boxClassName,
  size = 32,
  speed = 1,
  children,
  ...props
}: DitherLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    canvas.width = size;
    canvas.height = size;

    // Allocate ImageData once to prevent garbage collection spikes on every animation frame
    const imgData = ctx.createImageData(size, size);
    const data = imgData.data;

    const render = () => {
      t += 0.09 * speed;

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const idx = (y * size + x) * 4;

          // Animated organic wave / radial pulse
          const wave1 = Math.sin(x * 0.22 + t) * Math.cos(y * 0.22 + t * 0.8);
          const dist = Math.sqrt((x - size / 2) ** 2 + (y - size / 2) ** 2);
          const wave2 = Math.sin(dist * 0.35 - t * 1.5);
          const rawValue = (wave1 + wave2 + 2) / 4;

          const threshold = (BAYER_MATRIX_4X4[y % 4][x % 4] + 0.5) / 16;
          const isDitherOn = rawValue > threshold;

          if (isDitherOn) {
            data[idx] = 110;
            data[idx + 1] = 110;
            data[idx + 2] = 115;
            data[idx + 3] = Math.floor(rawValue * 240);
          } else {
            data[idx + 3] = 0;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [size, speed]);

  const canvasBox = (
    <div
      className={cn(
        "relative w-6 h-6 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center shrink-0 border border-neutral-200/60 dark:border-neutral-800/60",
        boxClassName
      )}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover opacity-85"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );

  // Standalone compact icon mode when no label and no children are provided
  if (!label && !children) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn("inline-flex items-center justify-center select-none", className)}
        {...props}
      >
        {canvasBox}
      </div>
    );
  }

  // Agent pill badge mode when label or children are provided
  return (
    <motion.div
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -3 }}
      transition={{ duration: 0.2 }}
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl select-none",
        "bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800",
        "shadow-xs backdrop-blur-xs",
        className
      )}
    >
      {canvasBox}

      {label && (
        <span className="text-[11.5px] font-medium text-neutral-800 dark:text-neutral-200 tracking-tight">
          {label}
        </span>
      )}

      {children}
    </motion.div>
  );
}

export default DitherLoader;
