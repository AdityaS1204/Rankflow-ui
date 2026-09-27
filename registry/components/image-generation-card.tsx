"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface ImageGenerationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source URL to reveal after generation */
  src?: string;
  /** Accessible alt text for the generated image */
  alt?: string;
  /** Whether the image is currently being generated */
  isLoading?: boolean;
  /** Width of the card (CSS value or number of pixels) */
  width?: number | string;
  /** Height of the card (CSS value or number of pixels) */
  height?: number | string;
  /** Additional CSS classes */
  className?: string;
}

// Vivid teal / electric cyan / bright lavender — tuned for neutral-200 bg
const BLOBS = [
  {
    gradient:
      "radial-gradient(circle, rgba(0,210,240,0.82) 0%, rgba(0,185,220,0.5) 42%, transparent 72%)",
    initial: { left: "22%", top: "16%" },
    animate: {
      left: ["22%", "62%", "32%", "22%"],
      top: ["16%", "54%", "76%", "16%"],
      scale: [1, 1.3, 0.88, 1],
    },
    idleDuration: 8.5,
    activeDuration: 2.4,
    size: "72%",
  },
  {
    gradient:
      "radial-gradient(circle, rgba(175,90,255,0.78) 0%, rgba(148,72,235,0.48) 42%, transparent 72%)",
    initial: { left: "75%", top: "60%" },
    animate: {
      left: ["75%", "22%", "68%", "75%"],
      top: ["60%", "16%", "72%", "60%"],
      scale: [1, 0.8, 1.25, 1],
    },
    idleDuration: 10,
    activeDuration: 2.8,
    size: "62%",
  },
  {
    gradient:
      "radial-gradient(circle, rgba(50,230,248,0.85) 0%, rgba(20,210,235,0.52) 42%, transparent 72%)",
    initial: { left: "46%", top: "84%" },
    animate: {
      left: ["46%", "80%", "6%", "46%"],
      top: ["84%", "26%", "44%", "84%"],
      scale: [1, 1.2, 0.84, 1],
    },
    idleDuration: 11.5,
    activeDuration: 3.2,
    size: "66%",
  },
  {
    gradient:
      "radial-gradient(circle, rgba(0,195,215,0.75) 0%, rgba(0,170,200,0.44) 42%, transparent 72%)",
    initial: { left: "6%", top: "50%" },
    animate: {
      left: ["6%", "58%", "38%", "6%"],
      top: ["50%", "80%", "10%", "50%"],
      scale: [1, 1.32, 1.06, 1],
    },
    idleDuration: 9.5,
    activeDuration: 2.6,
    size: "60%",
  },
];

// Animated film-grain canvas — runs only while isLoading
function NoiseLayer({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!active) {
      cancelAnimationFrame(rafRef.current);
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const buf = ctx.createImageData(W, H);
    const data = buf.data;

    const tick = () => {
      for (let i = 0; i < data.length; i += 4) {
        const g = (Math.random() * 255) | 0;
        data[i] = g;
        data[i + 1] = g;
        data[i + 2] = g;
        data[i + 3] = 32; // ~12.5% — subtle grain
      }
      ctx.putImageData(buf, 0, 0);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      // Low-res canvas stretched via CSS — gives a slightly coarser grain
      width={160}
      height={280}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        imageRendering: "pixelated",
        mixBlendMode: "overlay",
        zIndex: 6,
        opacity: active ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    />
  );
}

// Image layer — radial mask expanding from top-center
function RevealImageLayer({
  src,
  alt,
  progress,
}: {
  src: string;
  alt: string;
  progress: ReturnType<typeof useMotionValue<number>>;
}) {
  const maskImage = useTransform(progress, (p: number) => {
    const r = (p / 100) * 185;
    const feather = 24;
    if (r <= 0.1) return "radial-gradient(circle at 50% 0%, transparent 0%)";
    return `radial-gradient(circle at 50% 0%, black 0%, black ${r}%, transparent ${r + feather}%, transparent 100%)`;
  });

  return (
    <motion.div
      className="absolute inset-0 z-10"
      style={{ maskImage, WebkitMaskImage: maskImage }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        draggable={false}
      />
    </motion.div>
  );
}

export function ImageGenerationCard({
  src,
  alt = "Generated image",
  isLoading = false,
  width = "100%",
  height = 400,
  className,
  ...props
}: ImageGenerationCardProps) {
  const maskProgress = useMotionValue(0);
  const prevLoading = useRef(isLoading);

  useEffect(() => {
    const wasLoading = prevLoading.current;
    prevLoading.current = isLoading;

    if (!isLoading && src) {
      if (wasLoading) {
        maskProgress.set(0);
        animate(maskProgress, 100, {
          duration: 8.0,
          ease: [0.1, 0.5, 0.4, 1],
        });
      } else {
        maskProgress.set(100);
      }
    }

    if (isLoading) {
      maskProgress.set(0);
    }
  }, [isLoading, src, maskProgress]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl select-none",
        "shadow-sm",
        className
      )}
      style={{ width, height, background: "#e5e5e5" }}
      {...props}
    >
      {/* Blobs — re-keyed on isLoading to restart at new speed */}
      <div key={isLoading ? "fast" : "idle"} className="absolute inset-0 pointer-events-none">
        {BLOBS.map((blob, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: blob.size,
              height: blob.size,
              background: blob.gradient,
              borderRadius: "50%",
              filter: "blur(48px)",
              left: blob.initial.left,
              top: blob.initial.top,
              transform: "translate(-50%, -50%)",
            }}
            animate={blob.animate}
            transition={{
              duration: isLoading ? blob.activeDuration : blob.idleDuration,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.33, 0.66, 1],
            }}
          />
        ))}
      </div>

      {/* Film-grain noise — active only during loading */}
      <NoiseLayer active={isLoading} />

      {/* Radial gradient mask reveal */}
      {src && <RevealImageLayer src={src} alt={alt} progress={maskProgress} />}
    </div>
  );
}

export default ImageGenerationCard;
