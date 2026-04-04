"use client";

import { motion, useAnimationFrame, useMotionValue, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  speed?: number;
  fadeColor?: string;
}

export function Marquee({
  className,
  reverse = false,
  children,
  vertical = false,
  repeat = 4,
  speed = 40, // Pixels per second
  fadeColor = "var(--background)",
}: MarqueeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentSize, setContentSize] = useState(0);

  const baseTranslation = useMotionValue(0);
  
  // Dynamic speed: 1x normally, 0.2x on hover
  const currentSpeed = isHovered ? speed * 0.2 : speed;

  const defaultTestimonials = [
    { name: "Sarah Chen", role: "Product Designer", text: "RankFlow UI has completely transformed my workflow. The components are stunning and so easy to customize.", color: "from-blue-500 to-purple-500" },
    { name: "Marcus Wright", role: "Frontend Lead", text: "The attention to detail in these animations is next level. It's the premium feel we've been looking for.", color: "from-emerald-500 to-teal-500" },
    { name: "Elena Rossi", role: "Fullstack Dev", text: "Finally, a UI library that doesn't just look good but feels incredibly smooth. Highly recommended!", color: "from-orange-500 to-red-500" },
    { name: "David Kim", role: "Startup Founder", text: "Building our landing page was a breeze. Our conversion rates improved immediately after switching.", color: "from-pink-500 to-rose-500" },
  ];

  const renderContent = () => (
    children || defaultTestimonials.map((t, i) => (
      <div key={i} className="flex w-[350px] flex-col gap-2 rounded-2xl border border-neutral-200 dark:border-white/5 bg-white dark:bg-[#111111] p-6 transition-colors hover:border-neutral-300 dark:hover:border-white/10">
        <div className="flex items-center gap-3">
          <div className={cn("h-10 w-10 shrink-0 rounded-full bg-linear-to-br opacity-80", t.color)} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-neutral-900 dark:text-white leading-none">{t.name}</span>
            <span className="text-[11px] text-neutral-500 mt-1">{t.role}</span>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {t.text}
        </p>
      </div>
    ))
  );

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
        "group relative flex overflow-hidden p-2 [--gap:1rem]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
      style={{
        maskImage: vertical
          ? "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)"
          : "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage: vertical
          ? "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)"
          : "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      }}
    >

      <motion.div 
        style={{ x, y }} 
        className={cn("flex shrink-0 gap-4", vertical ? "flex-col" : "flex-row")}
      >
        {/* Main content block used for measurement */}
        <div ref={contentRef} className={cn("flex shrink-0 gap-4", vertical ? "flex-col" : "flex-row")}>
          {renderContent()}
        </div>
        {/* Repeated blocks for seamless loop */}
        {Array(repeat - 1)
          .fill(0)
          .map((_, i) => (
            <div key={i} className={cn("flex shrink-0 gap-4", vertical ? "flex-col" : "flex-row")}>
              {renderContent()}
            </div>
          ))}
      </motion.div>
    </div>
  );
}

