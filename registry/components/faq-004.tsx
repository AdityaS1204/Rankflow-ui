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
    answer: "Rankflow UI is a premium collection of React components built for modern web applications. Every component is crafted with smooth animations, clean aesthetics, and full copy-paste support.",
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
    question: "Does it support dark mode?",
    answer: "Yes. All components are built with Tailwind CSS and respect your application's color scheme. They work seamlessly with next-themes or any other theming solution.",
  },
  {
    id: "6",
    question: "How often are new components added?",
    answer: "We ship new components regularly. Follow us on X or star the GitHub repo to get notified when new components land.",
  },
];

export interface FAQ004Props {
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
  className?: string;
}

export function FAQ004({
  title = "Frequently asked questions",
  subtitle = "Everything you need to know about Rankflow UI. Can't find the answer you're looking for? Reach out to our team.",
  items = DEFAULT_FAQS,
  className,
}: FAQ004Props) {
  return (
    <section className={cn("w-full bg-background px-3 py-10 sm:px-6 sm:py-16 md:py-20 lg:py-24", className)}>

      <div className="mx-auto w-full min-w-0 max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">


          {/* Left — Sticky title column */}
          <div className="text-center lg:sticky lg:top-22 lg:self-start lg:text-left">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl xl:text-5xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-muted-foreground sm:mt-6 sm:max-w-none sm:text-sm md:text-base lg:mx-0 lg:text-lg">
                {subtitle}
              </p>
            )}
          </div>


          {/* Right — Accordion */}
          <div className="min-w-0">
            <Accordion.Root type="single" collapsible className="w-full min-w-0 divide-y divide-border">
              {items.map((item) => (
                <Accordion.Item key={item.id} value={item.id} className="group py-1">
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full min-w-0 items-start justify-between gap-3 py-3.5 text-left focus:outline-none sm:items-center sm:py-4">
                      <span className="min-w-0 flex-1 pr-3 text-[13px] font-semibold leading-snug text-foreground transition-colors group-data-[state=open]:text-foreground sm:pr-6 sm:text-sm md:text-base">
                        {item.question}
                      </span>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 text-muted-foreground transition-all group-data-[state=open]:border-foreground/20 group-data-[state=open]:bg-foreground group-data-[state=open]:text-background sm:h-7 sm:w-7">
                        <Plus className="h-3 w-3 transition-all duration-200 group-data-[state=open]:hidden sm:h-3.5 sm:w-3.5" />
                        <Minus className="hidden h-3 w-3 transition-all duration-200 group-data-[state=open]:block sm:h-3.5 sm:w-3.5" />
                      </span>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-faq004-up data-[state=open]:animate-faq004-down">
                    <p className="pb-4 pr-2 text-xs leading-relaxed text-muted-foreground sm:pb-5 sm:pr-10 sm:text-sm md:text-[15px]">
                      {item.answer}
                    </p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes faq004-down {
          from { height: 0; opacity: 0; }
          to { height: var(--radix-accordion-content-height); opacity: 1; }
        }
        @keyframes faq004-up {
          from { height: var(--radix-accordion-content-height); opacity: 1; }
          to { height: 0; opacity: 0; }
        }
        .animate-faq004-down {
          animation: faq004-down 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-faq004-up {
          animation: faq004-up 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
}
