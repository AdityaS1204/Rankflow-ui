"use client";

import { motion, useAnimationFrame, useMotionValue, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  speed?: number;
}

export function Marquee({
  className,
  reverse = false,
  children,
  vertical = false,
  repeat = 4,
  speed = 40, // Pixels per second
}: MarqueeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentSize, setContentSize] = useState(0);

  const baseTranslation = useMotionValue(0);
  
  // Dynamic speed: 1x normally, 0.2x on hover
  const currentSpeed = isHovered ? speed * 0.2 : speed;

  useEffect(() => {
    if (contentRef.current) {
      setContentSize(vertical ? contentRef.current.offsetHeight : contentRef.current.offsetWidth);
    }
  }, [children, vertical]);

  useAnimationFrame((t, delta) => {
    if (!contentSize) return;

    // Fixed delta move logic
    let moveBy = (currentSpeed * delta) / 1000;
    if (reverse) moveBy *= -1;

    let newTranslation = baseTranslation.get() - moveBy;

    // Seamless loop logic
    if (reverse) {
      if (newTranslation > 0) {
        newTranslation = -contentSize;
      }
    } else {
      if (newTranslation < -contentSize) {
        newTranslation = 0;
      }
    }

    baseTranslation.set(newTranslation);
  });

  const x = useTransform(baseTranslation, (v) => (vertical ? 0 : v));
  const y = useTransform(baseTranslation, (v) => (vertical ? v : 0));

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group flex overflow-hidden p-2 [--gap:1rem]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      <motion.div 
        style={{ x, y }} 
        className={cn("flex shrink-0 gap-4", vertical ? "flex-col" : "flex-row")}
      >
        {/* Main content block used for measurement */}
        <div ref={contentRef} className={cn("flex shrink-0 gap-4", vertical ? "flex-col" : "flex-row")}>
          {children}
        </div>
        {/* Repeated blocks for seamless loop */}
        {Array(repeat - 1)
          .fill(0)
          .map((_, i) => (
            <div key={i} className={cn("flex shrink-0 gap-4", vertical ? "flex-col" : "flex-row")}>
              {children}
            </div>
          ))}
      </motion.div>
    </div>
  );
}
