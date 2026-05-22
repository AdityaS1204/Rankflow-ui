"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface AccordionPillItem {
  id: string | number;
  question: string;
  answer: string;
}

interface AccordionPillLuxeProps {
  items?: AccordionPillItem[];
  className?: string;
}

const DEFAULT_ITEMS: AccordionPillItem[] = [
  {
    id: 1,
    question: "What makes this accordion different?",
    answer:
      "Pill Luxe uses a single frosted shell with full-radius triggers. The plus icon morphs into a close state while content expands with a spring layout — one panel at a time for a calm, editorial feel.",
  },
  {
    id: 2,
    question: "Can I use it on light and dark themes?",
    answer:
      "Yes. Surfaces use translucent whites and zinc tones that adapt automatically. Accent gradients stay subtle so the component reads premium in either mode.",
  },
  {
    id: 3,
    question: "Which dependencies are required?",
    answer:
      "Only motion/react for animations. Style with Tailwind v4 utility classes — no Radix or extra UI primitives needed.",
  },
];

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground/5 ring-1 ring-border/60 sm:h-8 sm:w-8 dark:bg-white/5 dark:ring-white/10">
      <motion.span
        className="absolute h-0.5 w-3.5 rounded-full bg-foreground/80 dark:bg-white/90"
        initial={false}
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.span
        className="absolute h-3.5 w-0.5 rounded-full bg-foreground/80 dark:bg-white/90"
        initial={false}
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  );
}

function PillRow({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionPillItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div layout className="w-full">
      <motion.button
        layout
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        whileTap={{ scale: 0.99 }}
        className={`flex w-full min-w-0 items-start justify-between gap-3 rounded-2xl px-3.5 py-3 text-left transition-colors duration-300 sm:items-center sm:gap-4 sm:rounded-full sm:px-5 sm:py-3.5 ${
          isOpen
            ? "bg-foreground/6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] dark:bg-white/8"
            : "hover:bg-foreground/4 dark:hover:bg-white/5"
        }`}
      >
        <span
          className={`min-w-0 flex-1 pr-2 text-[13px] font-medium leading-snug tracking-tight transition-colors sm:pr-0 sm:text-sm md:text-[15px] ${
            isOpen
              ? "text-foreground dark:text-white"
              : "text-foreground/75 dark:text-zinc-300"
          }`}
        >
          {item.question}
        </span>
        <PlusMinusIcon open={isOpen} />
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: "spring", stiffness: 380, damping: 32 },
              opacity: { duration: 0.22 },
            }}
            className="overflow-hidden"
          >
            <motion.p
              initial={{ y: 8 }}
              animate={{ y: 0 }}
              exit={{ y: 6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="px-3.5 pb-3.5 pt-1 text-xs leading-relaxed text-muted-foreground sm:px-5 sm:pb-4 sm:text-sm dark:text-zinc-400"
            >
              {item.answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function AccordionPillLuxe({
  items = DEFAULT_ITEMS,
  className = "",
}: AccordionPillLuxeProps) {
  const [openId, setOpenId] = useState<string | number | null>(
    items[0]?.id ?? null
  );

  const toggle = (id: string | number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className={`relative mx-auto w-full min-w-0 max-w-2xl overflow-hidden rounded-2xl border border-border/70 px-1 sm:px-0 bg-linear-to-br from-violet-500/6 via-background to-amber-500/5 p-1.5 shadow-[0_16px_48px_-24px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:rounded-[2rem] sm:p-2 sm:shadow-[0_24px_80px_-32px_rgba(0,0,0,0.35)] lg:rounded-[2.5rem] dark:border-white/10 dark:from-violet-500/10 dark:via-zinc-950/80 dark:to-amber-500/5 dark:shadow-[0_24px_80px_-24px_rgba(0,0,0,0.85)] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-500/25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-amber-400/15 blur-3xl dark:bg-amber-500/10"
      />

      <div className="relative flex flex-col gap-0.5 rounded-xl bg-background/60 p-1.5 sm:gap-1 sm:rounded-[2rem] sm:p-2 lg:rounded-[2.25rem] dark:bg-zinc-950/50">
        {items.map((item) => (
          <PillRow
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => toggle(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
