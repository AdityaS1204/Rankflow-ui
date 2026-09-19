"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { DitherLoader } from "./dither-loader";

export interface AgentThinkingProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The thinking text content to stream or display.
   */
  thought?: string;
  /**
   * Whether the thinking process is actively streaming.
   * When true, shows active dither indicator and live streaming cursor.
   * @default true
   */
  isStreaming?: boolean;
  /**
   * Speed of simulated streaming in milliseconds per character if `thought` is passed all at once.
   * Set to 0 to disable simulated chunking and display immediately.
   * @default 24
   */
  streamSpeed?: number;
  /**
   * Custom label displayed while the agent is thinking.
   * @default "Thinking"
   */
  streamingLabel?: string;
  /**
   * Custom label displayed after thinking completes.
   * If a function is provided, receives the duration in seconds.
   * @default "Thought for {duration}s"
   */
  completedLabel?: string | ((durationSec: number) => string);
  /**
   * Whether to show the elapsed duration counter (e.g. "4s").
   * @default true
   */
  showDuration?: boolean;
  /**
   * Initial open state of the thinking dropdown.
   * @default true
   */
  defaultOpen?: boolean;
  /**
   * Controlled open state.
   */
  open?: boolean;
  /**
   * Callback fired when open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Whether to automatically collapse the dropdown when streaming concludes.
   * @default false
   */
  autoCollapseOnComplete?: boolean;
  /**
   * Callback fired when streaming finishes.
   */
  onStreamComplete?: () => void;
  /**
   * Custom icon or indicator. Defaults to the compact DitherLoader.
   */
  icon?: React.ReactNode;
  /**
   * Maximum height of the thoughts scroll area in pixels.
   * @default 240
   */
  maxHeight?: number;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

export function AgentThinking({
  thought = "The user is requesting an analysis of the dependency graph across microservices to isolate circular references. Looking into the session lifecycle and token rotation pipeline, the AuthSession holds a reference to ActiveWorkspace while TokenProvider requests token rotation on invalidation. Refactoring this into a decoupled SharedAuthContext will eliminate the circular loop while maintaining seamless concurrency and thread safety.",
  isStreaming = true,
  streamSpeed = 22,
  streamingLabel = "Thinking",
  completedLabel = (sec) => `Thought for ${sec}s`,
  showDuration = true,
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  autoCollapseOnComplete = false,
  onStreamComplete,
  icon,
  maxHeight = 240,
  className,
  ...props
}: AgentThinkingProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const [displayedText, setDisplayedText] = useState("");
  const [isActuallyStreaming, setIsActuallyStreaming] = useState(isStreaming);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const setOpenState = (next: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  };

  // Elapsed timer tracking
  useEffect(() => {
    if (isActuallyStreaming) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActuallyStreaming]);

  // Streaming text simulation if speed > 0 and streaming is active
  useEffect(() => {
    if (!isStreaming) {
      setDisplayedText(thought);
      setIsActuallyStreaming(false);
      return;
    }

    if (streamSpeed <= 0) {
      setDisplayedText(thought);
      setIsActuallyStreaming(false);
      onStreamComplete?.();
      return;
    }

    setDisplayedText("");
    setIsActuallyStreaming(true);
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < thought.length) {
        // Stream in natural bursts of 1-3 characters
        const step = Math.min(
          thought.length - currentIndex,
          thought[currentIndex] === " " || thought[currentIndex] === "\n" ? 1 : Math.floor(Math.random() * 2) + 1
        );
        currentIndex += step;
        setDisplayedText(thought.slice(0, currentIndex));

        // Auto-scroll downward subtly as text streams
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setIsActuallyStreaming(false);
        onStreamComplete?.();
        if (autoCollapseOnComplete) {
          setOpenState(false);
        }
      }
    }, streamSpeed);

    return () => clearInterval(interval);
  }, [thought, isStreaming, streamSpeed, autoCollapseOnComplete, onStreamComplete]);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!displayedText) return;
    navigator.clipboard.writeText(displayedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1600);
  };

  const formattedCompleted =
    typeof completedLabel === "function"
      ? completedLabel(elapsedSeconds || 1)
      : completedLabel.replace("{duration}", String(elapsedSeconds || 1));

  return (
    <div
      className={cn("w-full bg-transparent select-none", className)}
      {...props}
    >
      {/* Clickable Header Trigger - No background box */}
      <button
        type="button"
        onClick={() => setOpenState(!isOpen)}
        aria-expanded={isOpen}
        className={cn(
          "inline-flex items-center gap-2 py-1 text-left select-none group cursor-pointer bg-transparent",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 rounded-md"
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          {/* Subtle Indicator: Dither icon while streaming, subtle check when done */}
          {icon ? (
            icon
          ) : isActuallyStreaming ? (
            <div className="shrink-0 scale-90 opacity-85 transition-transform">
              <DitherLoader boxClassName="w-4 h-4 rounded-md" />
            </div>
          ) : (
            <div className="w-4 h-4 rounded-md bg-neutral-200/80 dark:bg-neutral-800 flex items-center justify-center shrink-0 text-neutral-500 dark:text-neutral-400">
              <Check className="w-2.5 h-2.5 stroke-[2.5]" />
            </div>
          )}

          {/* Thinking Label */}
          <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400 tracking-tight transition-colors group-hover:text-neutral-900 dark:group-hover:text-neutral-200">
            {isActuallyStreaming ? streamingLabel : formattedCompleted}
          </span>

          {/* Elapsed Duration Badge */}
          {showDuration && isActuallyStreaming && (
            <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 tabular-nums">
              ({elapsedSeconds}s)
            </span>
          )}
        </div>

        {/* Chevron Icon */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </button>

      {/* Dropdown Animated Body - Clean border-left, zero card background */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="thinking-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.16, delay: 0.04 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.1 },
              },
            }}
            className="overflow-hidden bg-transparent"
          >
            <div className="pt-2 pb-1 pl-2">
              <div
                className="relative pl-3.5 border-l-2 border-neutral-200/80 dark:border-neutral-800/80 group/body"
              >
                <div
                  ref={scrollRef}
                  style={{ maxHeight }}
                  className={cn(
                    "overflow-y-auto pr-6",
                    "text-[12.5px] leading-relaxed",
                    "text-neutral-500 dark:text-neutral-400 font-normal",
                    "whitespace-pre-wrap selection:bg-neutral-200 dark:selection:bg-neutral-800",
                    "scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800"
                  )}
                >
                  {displayedText}
                  {isActuallyStreaming && (
                    <motion.span
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.75, ease: "easeInOut" }}
                      className="inline-block w-1.5 h-3 ml-0.5 align-middle bg-neutral-400 dark:bg-neutral-500 rounded-2xs"
                    />
                  )}
                </div>

                {/* Subtle Copy Button */}
                {displayedText && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="absolute top-0 right-0 p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 opacity-0 group-hover/body:opacity-100 transition-opacity"
                    title="Copy thinking"
                  >
                    {isCopied ? (
                      <Check className="w-3 h-3 text-emerald-500 stroke-[2.5]" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AgentThinking;
