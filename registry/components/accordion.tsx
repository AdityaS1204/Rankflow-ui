"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface AccordionItem {
  id: string | number;
  question: string;
  answer: string;
}

interface AccordionProps {
  items?: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

const DEFAULT_ITEMS: AccordionItem[] = [
  {
    id: 1,
    question: "What is Rankflow UI?",
    answer:
      "Rankflow UI is a premium React component library built for modern web apps. Every component is crafted with smooth animations, beautiful aesthetics, and full copy-paste support — so you ship faster without sacrificing quality.",
  },
  {
    id: 2,
    question: "Do I need to install any dependencies?",
    answer:
      "Most components rely on motion/react for animations and tailwind-merge / clsx for class management. Each component page lists its exact dependencies so you can install only what you need.",
  },
  {
    id: 3,
    question: "Can I copy components without the CLI?",
    answer:
      "Absolutely. Every component page has a source-code tab. Copy the file, drop it into your project, install the listed dependencies, and you're done. No configuration required.",
  },
  {
    id: 4,
    question: "Is Rankflow UI free to use?",
    answer:
      "Yes — Rankflow UI is completely free for personal and commercial projects. We believe great tooling should be accessible to every developer.",
  },
];

const ChevronIcon = ({ open }: { open: boolean }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    animate={{ rotate: open ? 180 : 0 }}
    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    className="shrink-0"
  >
    <polyline points="6 9 12 15 18 9" />
  </motion.svg>
);

function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
        isOpen
          ? "border-border bg-muted/50 shadow-sm dark:border-zinc-600/60 dark:bg-zinc-900/70 dark:shadow-[0_0_0_1px_rgba(235,94,40,0.08),_0_8px_32px_rgba(0,0,0,0.4)]"
          : "border-border bg-background/70 hover:bg-muted/40 dark:border-zinc-800/50 dark:bg-zinc-900/30 dark:hover:border-zinc-700/60 dark:hover:bg-zinc-900/50"
      }`}
      style={{
        transition: "box-shadow 0.35s ease, background 0.25s ease, border-color 0.25s ease",
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
      >
        <span
          className={`text-sm font-semibold leading-snug transition-colors duration-300 ${
            isOpen
              ? "text-foreground dark:text-white"
              : "text-foreground/80 group-hover:text-foreground dark:text-zinc-300 dark:group-hover:text-white"
          }`}
          style={{
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {item.question}
        </span>

        <span
          className={`transition-colors duration-300 ${
            isOpen
              ? "text-[#eb5e28]"
              : "text-muted-foreground group-hover:text-foreground/70 dark:text-zinc-500 dark:group-hover:text-zinc-300"
          }`}
        >
          <ChevronIcon open={isOpen} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.3, ease: "easeOut" },
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ filter: "blur(6px)", y: -4 }}
              animate={{ filter: "blur(0px)", y: 0 }}
              exit={{ filter: "blur(6px)", y: -4 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="px-5 pb-5"
            >
              <div className="mb-4 h-px rounded-full bg-border/80 dark:bg-zinc-800/80" />
              <p
                className="text-sm leading-relaxed text-muted-foreground dark:text-zinc-400"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item.answer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({
  items = DEFAULT_ITEMS,
  allowMultiple = false,
  className = "",
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string | number>>(new Set());

  const toggle = (id: string | number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={`flex flex-col gap-3 w-full max-w-2xl mx-auto ${className}`}>
      {items.map((item) => (
        <AccordionRow
          key={item.id}
          item={item}
          isOpen={openIds.has(item.id)}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  );
}
