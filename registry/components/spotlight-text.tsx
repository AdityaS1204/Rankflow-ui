"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SpotlightTextProps {
  /**
   * Text content to display. Can also pass React elements or string via children.
   */
  children?: ReactNode;
  /**
   * Optional text string if children is not provided.
   */
  text?: string;
  /**
   * Spotlight radius in pixels (20 to 700 px).
   * @default 120
   */
  spotlightRadius?: number;
  /**
   * Color of the bright revealed text layer.
   * @default "rgb(255, 255, 255)"
   */
  brightColor?: string;
  /**
   * Color of the base dimmed text layer.
   * @default "rgba(255, 255, 255, 0.2)"
   */
  dimColor?: string;
  /**
   * Solid core percentage before the soft edge fade starts (0 to 100).
   * @default 20
   */
  intensity?: number;
  /**
   * Transition duration for opening/closing reveal effect in seconds.
   * @default 0.3
   */
  transitionDuration?: number;
  /**
   * Smoothness factor for cursor following lerp (0.01 = very slow/smooth, 1 = instant).
   * @default 0.08
   */
  followSpeed?: number;
  /**
   * Easing function for spotlight opening/closing transitions.
   * @default "cubic-bezier(0.16, 1, 0.3, 1)"
   */
  transitionTiming?: string;
  /**
   * Whether to hide native cursor on hover for a torch-in-the-dark feel.
   * @default true
   */
  hideCursor?: boolean;
  /**
   * Custom CSS class name for the wrapper element.
   */
  className?: string;
  /**
   * Custom styles for font family, size, weight, letter-spacing, line-height, text-align, etc.
   */
  style?: React.CSSProperties;
}

export function SpotlightText({
  children,
  text = "Sweep a soft cursor-following spotlight across this text block to reveal the hidden brilliance underneath. Designed for modern web applications with smooth lerp tracking, fully customizable spotlight radius, intensity controls, and rich typography support.",
  spotlightRadius = 120,
  brightColor = "rgb(255, 255, 255)",
  dimColor = "rgba(255, 255, 255, 0.2)",
  intensity = 20,
  transitionDuration = 0.3,
  followSpeed = 0.08,
  transitionTiming = "cubic-bezier(0.16, 1, 0.3, 1)",
  hideCursor = true,
  className,
  style,
}: SpotlightTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const targetPosRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const [renderPos, setRenderPos] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  const clampedRadius = Math.min(Math.max(spotlightRadius, 20), 700);
  const clampedIntensity = Math.min(Math.max(intensity, 0), 100);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Smooth lerp loop for slow/silky cursor tracking
  useEffect(() => {
    if (prefersReducedMotion) return;

    let isRunning = true;
    const loop = () => {
      if (!isRunning) return;

      const targetX = targetPosRef.current.x;
      const targetY = targetPosRef.current.y;
      const currentX = currentPosRef.current.x;
      const currentY = currentPosRef.current.y;

      const dx = targetX - currentX;
      const dy = targetY - currentY;

      // Linear interpolation based on followSpeed
      const newX = currentX + dx * followSpeed;
      const newY = currentY + dy * followSpeed;

      currentPosRef.current = { x: newX, y: newY };
      setRenderPos({ x: newX, y: newY });

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [followSpeed, prefersReducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    targetPosRef.current = { x, y };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetPosRef.current = { x, y };
      if (!isHovered) {
        currentPosRef.current = { x, y };
        setRenderPos({ x, y });
      }
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const content = children || text;

  const activeSpotlightX = prefersReducedMotion ? "50%" : `${renderPos.x}px`;
  const activeSpotlightY = prefersReducedMotion ? "50%" : `${renderPos.y}px`;
  const activeOpacity = prefersReducedMotion ? 1 : isHovered ? 1 : 0;

  const maskImage = `radial-gradient(circle ${clampedRadius}px at ${activeSpotlightX} ${activeSpotlightY}, rgba(0,0,0,1) ${clampedIntensity}%, rgba(0,0,0,0) 100%)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative select-none overflow-hidden inline-block w-full text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed tracking-tight",
        hideCursor && isHovered && !prefersReducedMotion ? "cursor-none" : "cursor-default",
        className
      )}
      style={style}
    >
      {/* Base Dim Layer */}
      <div
        className="w-full h-full transition-colors duration-300"
        style={{ color: dimColor }}
      >
        {content}
      </div>

      {/* Bright Revealed Overlay Layer */}
      <div
        className="absolute inset-0 pointer-events-none w-full h-full"
        style={{
          color: brightColor,
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          opacity: activeOpacity,
          transition: `opacity ${transitionDuration}s ${transitionTiming}`,
          willChange: "mask-image, -webkit-mask-image, opacity",
        }}
        aria-hidden="true"
      >
        {content}
      </div>
    </div>
  );
}
