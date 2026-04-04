"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "motion/react";

interface TextGenerateEffectProps {
  text?: string;
  children?: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
  once?: boolean;
}

export function TextGenerateEffect({
  text,
  children,
  className = "",
  delay = 0,
  wordDelay = 0.08,
  once = true,
}: TextGenerateEffectProps) {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, { once, margin: "-10% 0px" });

  const content = text || children || "If you clean a vacuum cleaner, you become a vacuum cleaner";
  const words = content.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: wordDelay,
        delayChildren: delay,
      },
    },
  };

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 15,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex flex-wrap gap-x-[0.25em] ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
