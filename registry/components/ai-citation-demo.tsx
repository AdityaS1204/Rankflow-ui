"use client";

import React, { useState } from "react";
import { AICitations, InlineCitation, CitationItem } from "./ai-citations";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const SAMPLE_SOURCES: CitationItem[] = [
  {
    id: 1,
    url: "https://nextjs.org/docs/app/building-your-application/routing/server-components",
    title: "Server Components & Data Fetching Patterns in Next.js App Router",
    snippet: "React Server Components allow developers to build applications that span the server and client, combining rich interactivity with efficient server rendering.",
    siteName: "Next.js Documentation",
  },
  {
    id: 2,
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled",
    title: "Promise.allSettled() - JavaScript reference on MDN Web Docs",
    snippet: "Returns a promise that fulfills after all of the given promises have either fulfilled or rejected, with an array of objects describing the outcome of each.",
    siteName: "MDN Web Docs",
  },
  {
    id: 3,
    url: "https://stripe.com/docs/api/payment_intents/create?lang=node#create_payment_intent-amount",
    title: "Create a Payment Intent - Stripe API Reference Guide",
    snippet: "Creates a PaymentIntent object to track and manage customer transactions across multiple payment methods seamlessly.",
    siteName: "Stripe Docs",
  },
];

export function AICitationDemo() {
  const [variant, setVariant] = useState<"grid" | "list" | "pills" | "popover">("grid");
  const [hoveredSourceId, setHoveredSourceId] = useState<string | number | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 flex flex-col gap-5 select-none">
      {/* Demo Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-200/70 dark:border-neutral-800">
        {/* <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-300" />
          <span>AI Response with Citations</span>
        </div> */}

        {/* Layout Variant Selector */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/90 text-[11px] font-medium">
          {(["grid", "list", "pills", "popover"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVariant(v)}
              className={cn(
                "px-2.5 py-1 rounded-md capitalize transition-all duration-150 cursor-pointer",
                variant === v
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs font-semibold"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Main AI Response Container */}
      <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800/80 shadow-xs">
        {/* Response Body Text with Inline Citations */}
        <div className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
          <p className="mb-3">
            To optimize high-throughput data fetching in modern React applications, leveraging React Server Components
            allows direct database streaming directly at the edge
            <InlineCitation
              source={SAMPLE_SOURCES[0]}
              index={1}
              showHoverCard={variant === "popover"}
              onHover={(isHovered) => setHoveredSourceId(isHovered ? 1 : null)}
            />
            . When managing parallel network calls safely, utilizing standard concurrency primitives prevents single-point request failures
            <InlineCitation
              source={SAMPLE_SOURCES[1]}
              index={2}
              showHoverCard={variant === "popover"}
              onHover={(isHovered) => setHoveredSourceId(isHovered ? 2 : null)}
            />
            .
          </p>
          <p>
            For subscription checkout flows, initializing state securely on the server ensures strict idempotency token generation and compliance
            <InlineCitation
              source={SAMPLE_SOURCES[2]}
              index={3}
              showHoverCard={variant === "popover"}
              onHover={(isHovered) => setHoveredSourceId(isHovered ? 3 : null)}
            />
            .
          </p>
        </div>

        {/* Sources Section Below Response Text */}
        <AICitations
          sources={SAMPLE_SOURCES}
          title="Sources"
          variant={variant}
          activeId={hoveredSourceId}
          onSourceHover={(id) => setHoveredSourceId(id)}
        />
      </div>
    </div>
  );
}

export default AICitationDemo;
