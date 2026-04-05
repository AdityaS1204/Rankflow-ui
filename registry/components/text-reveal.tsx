"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
}

export function TextReveal({ text = "If you clean a vacuum cleaner, you become a vacuum cleaner", className }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-wrap text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 pb-12",
        className
      )}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

        return (
          <motion.span
            key={`${word}-${i}`}
            className="mr-3 lg:mr-4 xl:mr-5 mb-2 sm:mb-4 text-foreground"
            style={{ opacity }}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}
