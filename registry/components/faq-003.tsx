"use client";

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: "1",
    question: "What is Rankflow UI?",
    answer: "Rankflow UI is a premium collection of React components built for modern web applications. Every component is crafted with smooth animations, clean aesthetics, and full copy-paste support — so you ship faster without sacrificing quality.",
  },
  {
    id: "2",
    question: "Do I need to install any dependencies?",
    answer: "Most components rely on motion/react for animations and tailwind-merge / clsx for class management. Each component page lists its exact dependencies so you can install only what you need.",
  },
  {
    id: "3",
    question: "Can I copy components without the CLI?",
    answer: "Absolutely. Every component page has a source-code tab. Copy the file, drop it into your project, install the listed dependencies, and you're done. No configuration required.",
  },
  {
    id: "4",
    question: "Is Rankflow UI free to use?",
    answer: "Yes — Rankflow UI is completely free for personal and commercial projects. We believe great tooling should be accessible to every developer.",
  },
  {
    id: "5",
    question: "How often are new components added?",
    answer: "We ship new components regularly. Follow us on X or star the GitHub repo to get notified when new components land.",
  },
  {
    id: "6",
    question: "Does it support dark mode?",
    answer: "Yes. All components are built with Tailwind CSS and respect your application's color scheme. They work seamlessly with next-themes or any other theming solution.",
  },
];

export interface FAQ003Props {
  title?: string;
  items?: FAQItem[];
  className?: string;
}

export function FAQ003({
  title = "Frequently asked questions",
  items = DEFAULT_FAQS,
  className,
}: FAQ003Props) {
  return (
    <section className={cn("w-full bg-background px-4 py-12 sm:px-6 sm:py-16 md:py-24", className)}>
      <div className="mx-auto w-full min-w-0 max-w-3xl">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground sm:mb-12 sm:text-3xl md:text-4xl">
          {title}
        </h2>

        <Accordion.Root type="single" collapsible className="w-full">
          {items.map((item) => (
            <Accordion.Item
              key={item.id}
              value={item.id}
              className="group border-b border-border last:border-b"
            >
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full min-w-0 items-start justify-between gap-3 py-4 text-left focus:outline-none sm:items-center sm:py-5">
                  <span className="min-w-0 flex-1 pr-4 text-sm font-medium leading-snug text-foreground transition-colors sm:pr-6 sm:text-base md:text-lg">
                    {item.question}
                  </span>
                  <span className="shrink-0 text-muted-foreground transition-colors group-data-[state=open]:text-foreground">
                    <Plus className="h-4 w-4 transition-all duration-300 group-data-[state=open]:hidden" />
                    <Minus className="hidden h-4 w-4 transition-all duration-300 group-data-[state=open]:block" />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-faq-up data-[state=open]:animate-faq-down">
                <p className="pb-5 text-xs leading-relaxed text-muted-foreground sm:pb-6 sm:text-sm md:text-base">
                  {item.answer}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>

      <style jsx global>{`
        @keyframes faq-down {
          from { height: 0; opacity: 0; }
          to { height: var(--radix-accordion-content-height); opacity: 1; }
        }
        @keyframes faq-up {
          from { height: var(--radix-accordion-content-height); opacity: 1; }
          to { height: 0; opacity: 0; }
        }
        .animate-faq-down {
          animation: faq-down 280ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-faq-up {
          animation: faq-up 280ms cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
}
