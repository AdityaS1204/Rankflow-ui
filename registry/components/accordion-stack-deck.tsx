"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

export interface AccordionStackItem {
  id: string | number;
  question: string;
  answer: string;
}

interface AccordionStackDeckProps {
  items?: AccordionStackItem[];
  className?: string;
}

const DEFAULT_ITEMS: AccordionStackItem[] = [
  {
    id: 1,
    question: "How does the stack deck work?",
    answer:
      "Closed rows compress into slim strips that overlap like a card deck. The active panel lifts forward with depth, shadow, and scale while siblings dim — a spatial accordion unlike traditional expand-in-place lists.",
  },
  {
    id: 2,
    question: "What interaction model is used?",
    answer:
      "Click any strip to promote it to the front. Only one card stays expanded; others animate height and opacity with spring physics so the stack always feels tactile and physical.",
  },
  {
    id: 3,
    question: "Where does this pattern shine?",
    answer:
      "Ideal for feature comparisons, pricing tiers, or portfolio highlights where you want users to scan titles quickly then dive into one rich answer without losing context of the full set.",
  },
];

const COLLAPSED_HEIGHT = 48;
const EXPANDED_MIN = 140;

function StackCard({
  item,
  isOpen,
  index,
  total,
  onSelect,
}: {
  item: AccordionStackItem;
  isOpen: boolean;
  index: number;
  total: number;
  onSelect: () => void;
}) {
  const offset = isOpen ? 0 : index * 4;

  return (
    <motion.button
      type="button"
      layout
      onClick={onSelect}
      aria-expanded={isOpen}
      initial={false}
      animate={{
        height: isOpen ? "auto" : COLLAPSED_HEIGHT,
        zIndex: isOpen ? total + 2 : total - index,
        y: isOpen ? 0 : offset,
        scale: isOpen ? 1 : 0.98 - index * 0.008,
        opacity: isOpen ? 1 : 0.92 - index * 0.06,
      }}
      transition={{
        type: "spring",
        stiffness: 340,
        damping: 30,
      }}
      className={`relative w-full min-w-0 overflow-hidden rounded-xl border text-left outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 sm:rounded-2xl ${
        isOpen
          ? "border-border/80 bg-background shadow-[0_20px_48px_-24px_rgba(0,0,0,0.55)] sm:shadow-[0_28px_60px_-28px_rgba(0,0,0,0.55)] dark:border-zinc-600/50 dark:bg-zinc-900 dark:shadow-[0_32px_64px_-24px_rgba(0,0,0,0.85)]"
          : "border-border/60 bg-muted/40 hover:border-border dark:border-zinc-800/80 dark:bg-zinc-900/70 dark:hover:border-zinc-700"
      } ${isOpen ? "min-h-[140px] sm:min-h-[168px]" : "min-h-[48px] sm:min-h-[56px]"}`}
    >
      <div
        className={`flex h-full flex-col px-4 sm:px-5 ${isOpen ? "py-4 sm:py-5" : "justify-center py-0"}`}
      >
        <div className="flex items-start justify-between gap-2 sm:items-center sm:gap-3">
          <span
            className={`min-w-0 flex-1 font-semibold tracking-tight transition-all ${
              isOpen
                ? "text-sm leading-snug text-foreground sm:text-base dark:text-white"
                : "line-clamp-1 text-[13px] text-foreground/85 sm:text-sm dark:text-zinc-300"
            }`}
          >
            {item.question}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold sm:h-7 sm:w-7 sm:rounded-xl sm:text-xs ${
              isOpen
                ? "bg-violet-500/15 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300"
                : "bg-foreground/5 text-muted-foreground dark:bg-white/5 dark:text-zinc-500"
            }`}
          >
            {isOpen ? "−" : "+"}
          </motion.span>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
            marginTop: isOpen ? 12 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm dark:text-zinc-400">
            {item.answer}
          </p>
        </motion.div>
      </div>

      {!isOpen && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-muted/80 to-transparent dark:from-zinc-900/90"
        />
      )}
    </motion.button>
  );
}

export function AccordionStackDeck({
  items = DEFAULT_ITEMS,
  className = "",
}: AccordionStackDeckProps) {
  const [openId, setOpenId] = useState<string | number>(items[0]?.id ?? 1);

  return (
    <div
      className={`relative mx-auto w-full min-w-0 max-w-2xl rounded-lg bg-muted/30 p-2.5 sm:rounded-xl sm:p-4 dark:bg-zinc-950/60 ${className}`}
    >
      <div className="relative -space-y-2 sm:-space-y-3">
        {items.map((item, index) => (
          <StackCard
            key={item.id}
            item={item}
            index={index}
            total={items.length}
            isOpen={openId === item.id}
            onSelect={() => setOpenId(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
