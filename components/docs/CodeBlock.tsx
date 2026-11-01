"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "motion/react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  hideLabel?: boolean;
  showCopy?: boolean;
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  hideLabel = false,
  showCopy
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme !== "light";
  const prismTheme = isDark ? themes.vsDark : themes.github;

  const shouldShowCopy = showCopy !== undefined ? showCopy : !hideLabel;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lang = (language?.toLowerCase() === "typescript" ? "tsx" : language?.toLowerCase() || "tsx") as Language;

  return (
    <div className={cn(
      "group relative font-mono overflow-hidden rounded-lg border border-neutral-300/80 dark:border-white/10 bg-neutral-200/80 dark:bg-zinc-800/80 transition-colors",
      hideLabel ? "p-0" : ""
    )}>
      {/* Header bar: filename left, copy right */}
      {!hideLabel && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-300/70 dark:border-white/[0.08] bg-neutral-300/35 dark:bg-zinc-900/35">
          <span className="text-[12.5px] font-medium text-neutral-700 dark:text-neutral-300 tracking-tight select-none">
            {filename || language}
          </span>

          {shouldShowCopy && (
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-300/60 dark:hover:bg-white/[0.08] transition-colors duration-150 cursor-pointer"
              aria-label="Copy code"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.12 }}
                  >
                    <CheckIcon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.12 }}
                  >
                    <CopyIcon className="h-3.5 w-3.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          )}
        </div>
      )}

      {/* Code area */}
      <div className="relative">
        <Highlight
          theme={prismTheme}
          code={code.trim()}
          language={lang}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} max-h-[500px] overflow-auto px-4 py-3.5 text-[13.5px] leading-[1.7]
                scrollbar-thin scrollbar-thumb-neutral-400/60 dark:scrollbar-thumb-neutral-600/60 scrollbar-track-transparent font-mono`}
              style={{ ...style, backgroundColor: 'transparent' }}
            >
              <div className="min-w-full inline-block font-mono">
                {tokens.map((line, i) => {
                  const { key: lineKey, ...lineProps } = getLineProps({ line, key: i }) as any;
                  return (
                    <div key={lineKey} {...lineProps} className="table-row group/line font-mono">
                      <span className="table-cell select-none pr-5 text-right text-neutral-400 dark:text-neutral-500 w-8 transition-colors group-hover/line:text-neutral-700 dark:group-hover/line:text-neutral-300 font-mono text-[12px]">
                        {i + 1}
                      </span>
                      <span className="table-cell pl-5 font-mono">
                        {line.map((token, key) => {
                          const { key: tokenKey, ...tokenProps } = getTokenProps({ token, key }) as any;
                          return <span key={tokenKey} {...tokenProps} className="font-mono" />;
                        })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </pre>
          )}
        </Highlight>

        {/* Floating copy for hideLabel mode */}
        {hideLabel && shouldShowCopy && (
          <button
            onClick={handleCopy}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-300/70 dark:hover:bg-white/[0.08] opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 cursor-pointer"
            aria-label="Copy code"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.12 }}
                >
                  <CheckIcon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.12 }}
                >
                  <CopyIcon className="h-3.5 w-3.5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        )}
      </div>
    </div>
  );
}
