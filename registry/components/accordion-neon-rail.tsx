"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface AccordionRailItem {
  id: string | number;
  question: string;
  answer: string;
}

interface AccordionNeonRailProps {
  items?: AccordionRailItem[];
  accentColor?: string;
  className?: string;
}

const DEFAULT_ITEMS: AccordionRailItem[] = [
  {
    id: 1,
    question: "How does the neon rail behave?",
    answer:
      "A luminous vertical rail tracks the active row with shared layout animation. Content reveals through a horizontal clip-path sweep — sharp corners and monospace indices give a technical, premium control-panel aesthetic.",
  },
  {
    id: 2,
    question: "Is only one section open at a time?",
    answer:
      "Yes. Selecting a new row moves the rail instantly while the previous panel collapses. Re-clicking the active row keeps it open for predictable scanning.",
  },
  {
    id: 3,
    question: "Can I change the accent color?",
    answer:
      "Pass accentColor as any CSS color. The rail gradient and open-state glow derive from that value so you can match brand palettes without editing the component source.",
  },
];

function RailRow({
  item,
  index,
  isOpen,
  onSelect,
  accentColor,
}: {
  item: AccordionRailItem;
  index: number;
  isOpen: boolean;
  onSelect: () => void;
  accentColor: string;
}) {
  return (
    <div className="relative border-b border-border/80 last:border-b-0 dark:border-zinc-800/90">
      {isOpen && (
        <motion.div
          layoutId="neon-rail-indicator"
          className="absolute bottom-0 left-0 top-0 w-1"
          style={{
            background: `linear-gradient(180deg, ${accentColor}, ${accentColor}66)`,
            boxShadow: `0 0 20px ${accentColor}aa, 0 0 40px ${accentColor}44`,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
        />
      )}
      <button
        type="button"
        onClick={onSelect}
        aria-expanded={isOpen}
        className="group flex w-full min-w-0 items-start gap-2 py-3.5 pl-4 pr-3 text-left sm:gap-4 sm:py-5 sm:pl-6 sm:pr-5"
      >
        <span
          className="mt-0.5 w-6 shrink-0 font-mono text-[10px] font-medium tracking-widest text-muted-foreground transition-colors group-hover:text-foreground sm:w-8 sm:text-[11px] dark:text-zinc-500 dark:group-hover:text-zinc-300"
          style={{ color: isOpen ? accentColor : undefined }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <span
            className={`block break-words text-[13px] font-semibold tracking-tight transition-colors sm:text-sm md:text-base ${
              isOpen
                ? "text-foreground dark:text-white"
                : "text-foreground/80 group-hover:text-foreground dark:text-zinc-300 dark:group-hover:text-white"
            }`}
          >
            {item.question}
          </span>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="body"
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                exit={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                transition={{
                  clipPath: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.25 },
                }}
                className="overflow-hidden"
              >
                <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm dark:text-zinc-400">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.span
          animate={{ opacity: isOpen ? 1 : 0.35, x: isOpen ? 0 : -2 }}
          className="mt-1 hidden shrink-0 text-[10px] font-mono uppercase tracking-[0.2em] sm:inline"
          style={{ color: accentColor }}
        >
          {isOpen ? "open" : "—"}
        </motion.span>
      </button>
    </div>
  );
}

export function AccordionNeonRail({
  items = DEFAULT_ITEMS,
  accentColor = "#22d3ee",
  className = "",
}: AccordionNeonRailProps) {
  const [openId, setOpenId] = useState<string | number>(items[0]?.id ?? 1);

  return (
    <div
      className={`relative mx-auto w-full min-w-0 max-w-2xl overflow-hidden rounded-sm border border-border bg-zinc-50/80 shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_12px_40px_-20px_rgba(0,0,0,0.45)] sm:shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_20px_50px_-24px_rgba(0,0,0,0.45)] dark:border-zinc-800 dark:bg-zinc-950/90 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_60px_-28px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-25"
        style={{
          backgroundImage: `linear-gradient(90deg, transparent 0%, ${accentColor}08 50%, transparent 100%)`,
        }}
      />

      <div className="relative min-w-0">
        {items.map((item, index) => (
          <RailRow
            key={item.id}
            item={item}
            index={index}
            isOpen={openId === item.id}
            accentColor={accentColor}
            onSelect={() => setOpenId(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
