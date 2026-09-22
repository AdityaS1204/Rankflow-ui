"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface SpringAccordionProps {
  items: AccordionItem[];
  className?: string;
  multiple?: boolean;
}

export function SpringAccordion({ items, className, multiple = false }: SpringAccordionProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (multiple) {
      setExpandedIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setExpandedIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("flex flex-col w-sm mx-auto", className)}>
      {items.map((item, index) => {
        const isExpanded = expandedIds.includes(item.id);
        const prevExpanded = index > 0 && expandedIds.includes(items[index - 1].id);
        const nextExpanded = index < items.length - 1 && expandedIds.includes(items[index + 1].id);

        const isTop = index === 0 || prevExpanded;
        const isBottom = index === items.length - 1 || nextExpanded;

        return (
          <motion.div
            key={item.id}
            layout
            initial={false}
            animate={{
              marginTop: index === 0 ? 0 : isExpanded || prevExpanded ? 10 : -1,
              borderTopLeftRadius: isExpanded || isTop ? 26 : 0,
              borderTopRightRadius: isExpanded || isTop ? 26 : 0,
              borderBottomLeftRadius: isExpanded || isBottom ? 26 : 0,
              borderBottomRightRadius: isExpanded || isBottom ? 26 : 0,
              backgroundColor: isExpanded ? "var(--bg-expanded)" : "var(--bg-collapsed)",
            }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 25,
              mass: 1,
            }}
            className={cn(
              "overflow-hidden border bg-card text-card-foreground relative z-10",
              "transition-colors duration-300 ease-in-out",
              isExpanded 
                ? "border-zinc-200 dark:border-zinc-700 shadow-md shadow-zinc-200/50 dark:shadow-none z-20" 
                : "border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700"
            )}
            style={{
              "--bg-expanded": "var(--background)",
              "--bg-collapsed": "var(--background)",
            } as React.CSSProperties}
          >
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between p-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
              aria-expanded={isExpanded}
            >
              <span className="font-medium text-zinc-900 dark:text-zinc-100 text-lg tracking-tight">
                {item.title}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors",
                  isExpanded 
                    ? "text-zinc-900 dark:text-zinc-100" 
                    : "bg-transparent text-zinc-500"
                )}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { type: "spring", stiffness: 350, damping: 25, mass: 1 },
                    opacity: { duration: 0.2, ease: "linear" },
                  }}
                >
                  <div className="px-5 pb-5 pt-0 text-zinc-600 dark:text-zinc-400 text-[15px] leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
