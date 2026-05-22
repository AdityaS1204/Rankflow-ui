"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";

interface ScrollProgressProps {
  barCount?: number;
  barColor?: string;
  progressColor?: string;
  className?: string;
}

export const ScrollProgress = ({
  barCount = 56,
  barColor = "#ef4444",
  progressColor = "#ffffff",
  className = "",
}: ScrollProgressProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const smoothProgress = useSpring(0, { stiffness: 80, damping: 20, mass: 0.5 });
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Try to find a scrollable parent, otherwise fall back to window
      const scrollContainer = containerRef.current?.closest(
        "[data-scroll-container]"
      ) as HTMLElement | null;

      let p = 0;
      if (scrollContainer) {
        const scrollTop = scrollContainer.scrollTop;
        const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        p = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      } else {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        p = docHeight > 0 ? scrollTop / docHeight : 0;
      }

      smoothProgress.set(p);
      setPercent(Math.round(p * 100));
    };

    // Attach to scrollable parent if found, else window
    const scrollContainer = containerRef.current?.closest(
      "[data-scroll-container]"
    ) as HTMLElement | null;
    const target = scrollContainer || window;
    target.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => target.removeEventListener("scroll", handleScroll);
  }, [smoothProgress]);

  return (
    <div ref={containerRef} className={`flex items-stretch gap-3 ${className}`}>
      {/* Percentage label — rotated vertically */}
      <div className="flex items-center justify-center">
        <span
          className="text-[11px] font-mono font-bold tracking-widest select-none"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            letterSpacing: "0.15em",
            color: progressColor,
            textShadow: `0 0 8px ${barColor}66`,
          }}
        >
          {String(percent).padStart(3, "0")}%
        </span>
      </div>

      {/* The bar container */}
      <div
        className="relative flex flex-col items-center border p-3"
        style={{
          borderRadius: 0,
          borderColor: `${barColor}55`,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(12px)",
          boxShadow: `inset 0 0 30px ${barColor}08, 0 0 40px rgba(0,0,0,0.6)`,
        }}
      >
        {/* Bars */}
        <div className="flex flex-col gap-[13px]">
          {Array.from({ length: barCount }).map((_, i) => {
            const barThreshold = i / barCount;
            return (
              <ProgressBar
                key={i}
                threshold={barThreshold}
                progress={smoothProgress}
                barColor={barColor}
                progressColor={progressColor}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

function ProgressBar({
  threshold,
  progress,
  barColor,
  progressColor,
}: {
  threshold: number;
  progress: ReturnType<typeof useSpring>;
  barColor: string;
  progressColor: string;
}) {
  const color = useTransform(progress, (v: number) =>
    v >= threshold ? progressColor : barColor
  );

  const glow = useTransform(progress, (v: number) =>
    v >= threshold
      ? `0 0 6px ${progressColor}44, 0 0 2px ${progressColor}88`
      : "none"
  );

  const scaleX = useTransform(progress, (v: number) =>
    v >= threshold ? 0.85 : 0.85
  );

  return (
    <motion.div
      style={{
        width: 42,
        height: 1,
        borderRadius: 0,
        backgroundColor: color,
        boxShadow: glow,
        scaleX,
        originX: 0.5,
      }}
      transition={{ duration: 0.15 }}
    />
  );
}
