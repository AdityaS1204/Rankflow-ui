"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedBorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  duration?: number;
  color?: string;
}


export const AnimatedBorderButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedBorderButtonProps
>(({ children, className, duration = 5, color = "#3b82f6", disabled, ...props }, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap",
        "rounded-md border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-medium text-white",
        "transition-colors hover:bg-neutral-800",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
    >
      {/* Animated border layer */}
      <div className="absolute inset-0 rounded-[inherit] border-2 border-transparent pointer-events-none [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
        <motion.div
          className="absolute aspect-square"
          animate={{ offsetDistance: ["0%", "100%"] }}
          style={{
            width: "20px",
            offsetPath: "rect(0 auto auto 0 round 6px)",
            backgroundImage: `linear-gradient(to right, transparent, ${color}, ${color})`,
          }}
          transition={{
            repeat: Infinity,
            duration,
            ease: "linear",
          }}
        />
      </div>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
});

AnimatedBorderButton.displayName = "AnimatedBorderButton";
