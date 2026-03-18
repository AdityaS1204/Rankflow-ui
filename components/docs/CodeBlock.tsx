"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "motion/react";
import { Highlight, themes, type Language } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language?: string;
  hideLabel?: boolean;
}

export function CodeBlock({ code, language = "tsx", hideLabel = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Ensure language is compatible with prism
  const lang = (language?.toLowerCase() === "typescript" ? "tsx" : language?.toLowerCase() || "tsx") as Language;

  return (
    <div className="group relative rounded-lg bg-[#0d0d0d] border border-neutral-800 overflow-hidden font-mono">
      {!hideLabel && language && (
        <div className="px-4 py-2 border-b border-neutral-800 flex items-center justify-between bg-[#1a1a1a]">
          <span className="text-[11px] text-neutral-500 uppercase tracking-widest font-bold font-mono">
            {language}
          </span>
        </div>
      )}
      <div className="relative flex">
        <Highlight
          theme={themes.vsDark}
          code={code.trim()}
          language={lang}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre 
              className={`${className} flex-1 overflow-x-auto p-4 text-[16px] leading-relaxed scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent`} 
              style={{ ...style, backgroundColor: 'transparent' }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })} className="table-row">
                  <span className="table-cell select-none pr-6 text-right text-neutral-600 w-12 border-r border-neutral-800/50 mr-4">
                    {i + 1}
                  </span>
                  <span className="table-cell pl-4">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>

        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 flex items-center gap-1.5 rounded-md border border-neutral-700 bg-neutral-900/80 backdrop-blur-sm px-2.5 py-1.5 text-xs text-neutral-400 transition-all duration-200 hover:text-neutral-200 hover:border-neutral-600 z-10"
          aria-label="Copy code"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1 text-emerald-400"
              >
                <CheckIcon className="h-3 w-3" />
                Copied
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1"
              >
                <CopyIcon className="h-3 w-3" />
                Copy
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
