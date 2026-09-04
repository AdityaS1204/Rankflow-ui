"use client";

import React, { useState, useRef, ReactNode } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CursorTooltipPortalProps {
  text?: string;
  children?: ReactNode;
  defaultText?: string;
  className?: string;
  cardClassName?: string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  maxLines?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  offsetX?: number;
  offsetY?: number;
  contained?: boolean;
}

export function CursorTooltipPortal({
  text,
  children,
  defaultText = "Explore",
  className,
  cardClassName,
  maxWidth = 240,
  maxHeight = 120,
  maxLines = 3,
  stiffness = 220,
  damping = 24,
  mass = 0.6,
  offsetX = 16,
  offsetY = 16,
  contained = true,
}: CursorTooltipPortalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for target cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for delayed follow effect
  const springConfig = { stiffness, damping, mass };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Determine current active text
  const displayText = text && text.trim().length > 0 ? text : defaultText;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (contained && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left + offsetX);
      mouseY.set(e.clientY - rect.top + offsetY);
    } else {
      mouseX.set(e.clientX + offsetX);
      mouseY.set(e.clientY + offsetY);
    }
    if (!isVisible) setIsVisible(true);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (contained && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left + offsetX);
      mouseY.set(e.clientY - rect.top + offsetY);
    } else {
      mouseX.set(e.clientX + offsetX);
      mouseY.set(e.clientY + offsetY);
    }
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative w-full overflow-hidden select-none", className)}
    >
      {/* Underlying interactive content */}
      {children}

      {/* Floating Tooltip Portal */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
          maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          pointerEvents: "none",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-50 flex items-center justify-center text-center",
          "rounded-xl bg-neutral-900/90 p-3 text-xs font-medium text-white shadow-2xl backdrop-blur-md",
          "dark:border-white/15 dark:bg-black/90 dark:text-neutral-100",
          cardClassName
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={displayText}
            initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: maxLines,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            className="tracking-wide leading-relaxed wrap-break-words"
            title={displayText}
          >
            {displayText}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
