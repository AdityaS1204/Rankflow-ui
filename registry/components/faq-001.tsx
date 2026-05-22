"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export interface FAQItem {
  id: string | number;
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 1,
    question: "What makes Rankflow UI different?",
    answer: "Rankflow UI focuses on premium aesthetics and smooth motion. Unlike generic libraries, every component is hand-crafted with attention to detail, using modern animations that feel natural and high-end.",
  },
  {
    id: 2,
    question: "Is it easy to customize the components?",
    answer: "Absolutely. Every component is built with Tailwind CSS and Framer Motion. You can easily change colors, spacing, and animation timing by modifying the source code directly in your project.",
  },
  {
    id: 3,
    question: "Do I need to pay for a license?",
    answer: "Rankflow UI is completely free for both personal and commercial projects. You can use it in your portfolio, client work, or SaaS products without any attribution required, though we appreciate the support!",
  },
  {
    id: 4,
    question: "How do I install new components?",
    answer: "You can use our CLI tool to add components instantly, or simply copy and paste the source code into your project. Each component page lists all necessary dependencies.",
  },
  {
    id: 5,
    question: "Are the components accessible?",
    answer: "Yes, we prioritize accessibility by using semantic HTML, ARIA attributes, and keyboard navigation support to ensure your application is usable by everyone.",
  },
];

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem = ({ item, isOpen, onToggle }: AccordionItemProps) => {
  return (
    <div
      className={cn(
        "group overflow-hidden rounded-xl border transition-all duration-300 sm:rounded-2xl",
        isOpen
          ? "border-zinc-500/30 bg-zinc-500/3 dark:border-zinc-500/20 dark:bg-zinc-500/2"
          : "border-border bg-background/50 hover:border-zinc-500/20 hover:bg-muted/30 dark:border-zinc-800 dark:bg-zinc-900/30 dark:hover:border-zinc-700"
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full min-w-0 items-start justify-between gap-3 px-4 py-4 text-left transition-colors sm:items-center sm:gap-4 sm:px-6 sm:py-5"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "min-w-0 flex-1 pr-2 text-sm font-semibold leading-snug tracking-tight transition-colors sm:pr-0 sm:text-lg",
            isOpen ? "text-foreground" : "text-foreground/90 group-hover:text-foreground"
          )}
        >
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0, color: isOpen ? "currentColor" : "#71717a" }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.3, ease: "linear" },
            }}
          >
            <div className="px-4 pb-5 sm:px-6 sm:pb-6">
              <motion.div
                initial={{ y: -10, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -10, opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-xs leading-relaxed text-muted-foreground sm:text-[15px]"
              >
                {item.answer}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export interface FAQ001Props {
  title?: string;
  subheading?: string;
  items?: FAQItem[];
  className?: string;
}

export function FAQ001({
  title = "Frequently asked questions",
  subheading = "Find answers to the most common questions about Rankflow UI and how to build amazing interfaces faster.",
  items = DEFAULT_FAQS,
  className,
}: FAQ001Props) {
  const [openId, setOpenId] = useState<string | number | null>(items[0]?.id || null);

  const toggle = (id: string | number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={cn("flex w-full flex-col items-center bg-background px-3 py-10 sm:px-4 sm:py-16 md:py-20", className)}>
      <div className="mx-auto w-full min-w-0 max-w-7xl">
        <div className="rounded-xl bg-background px-3 py-6 sm:rounded-[1.25rem] sm:px-8 sm:py-12 md:px-12 md:py-16">
          <div className="mx-auto w-full min-w-0 max-w-3xl">
            <div className="mb-8 sm:mb-12 flex flex-col items-center text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-3 sm:mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              >
                {title}
              </motion.h2>
              {subheading && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="max-w-xl text-sm sm:text-lg text-muted-foreground"
                >
                  {subheading}
                </motion.p>
              )}
            </div>

            <div className="flex w-full min-w-0 flex-col gap-3 sm:gap-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <AccordionItem
                    item={item}
                    isOpen={openId === item.id}
                    onToggle={() => toggle(item.id)}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:mt-16 sm:flex-row sm:gap-6 sm:pt-10"
            >
              <div className="text-center sm:text-left">
                <h4 className="text-sm font-semibold text-foreground sm:text-base">Still have questions?</h4>
                <p className="text-xs text-muted-foreground sm:text-sm">We're here to help you build better.</p>
              </div>
              <button className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:bg-foreground/90 active:scale-[0.98] sm:w-auto sm:px-6 sm:py-3">
                Contact Support
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  &rarr;
                </motion.span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
