"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedBorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  duration?: number;
  color?: string;
  children?: React.ReactNode;
  className?: string;
  borderWidth?: number;
  borderRadius?: string;
}


export const AnimatedBorderButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedBorderButtonProps
>(({
  children = "Animated Border",
  className,
  duration = 5,
  color = "#3b82f6",
  borderWidth = 2,
  borderRadius = "8px",
  disabled,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      style={{ borderRadius }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap",
        "border border-border bg-background px-4 py-2 text-sm font-medium text-foreground",
        "transition-colors hover:bg-muted dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {/* Animated border layer */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          padding: borderWidth,
          borderRadius: "inherit"
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes offset-route {
            0% { offset-distance: 0%; }
            100% { offset-distance: 100%; }
          }
        `}} />
        <div
          className="absolute inset-0 [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
          style={{
            borderRadius: "inherit",
            border: `${borderWidth}px solid transparent`
          }}
        >
          <div
            className="absolute aspect-square rounded-full"
            style={{
              width: "40px",
              offsetPath: `rect(0 100% 100% 0 round ${borderRadius})`,
              backgroundImage: `linear-gradient(to right, transparent, ${color}, ${color})`,
              animation: `offset-route ${duration}s linear infinite`,
            }}
          />
        </div>
      </div>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2 tracking-tight">
        {children}
      </span>
    </button>
  );
});

AnimatedBorderButton.displayName = "AnimatedBorderButton";
