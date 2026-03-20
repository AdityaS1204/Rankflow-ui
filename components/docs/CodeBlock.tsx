"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "motion/react";
import { Highlight, themes, type Language } from "prism-react-renderer";

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

  const shouldShowCopy = showCopy !== undefined ? showCopy : !hideLabel;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lang = (language?.toLowerCase() === "typescript" ? "tsx" : language?.toLowerCase() || "tsx") as Language;

  return (
    <div className="group relative rounded-xl bg-[#111111] border border-white/5 p-0 md:p-3 font-mono shadow-2xl transition-all hover:border-white/10">
      {/* Header Label (Filename or Language) */}
      {!hideLabel && (filename || language) && (
        <div className="mb-3 flex items-center px-1">
          <span className="text-[13px] font-medium text-neutral-400/90 tracking-tight">
            {filename || language}
          </span>
        </div>
      )}

      {/* Inner Code Container */}
      <div className="relative rounded-xl bg-[#080808] border border-white/5 overflow-hidden">
        <Highlight
          theme={themes.vsDark}
          code={code.trim()}
          language={lang}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre 
              className={`${className} max-h-[500px] overflow-auto p-4 md:p-4 text-[14px] leading-relaxed 
                scrollbar-thin scrollbar-thumb-neutral-800/80 scrollbar-track-transparent font-mono`} 
              style={{ ...style, backgroundColor: 'transparent' }}
            >
              <div className="min-w-full inline-block font-mono">
                {tokens.map((line, i) => {
                  const { key: lineKey, ...lineProps } = getLineProps({ line, key: i }) as any;
                  return (
                    <div key={lineKey} {...lineProps} className="table-row group/line font-mono">
                      <span className="table-cell select-none pr-6 text-right text-neutral-700 w-12 border-r border-neutral-800/30 mr-4 transition-colors group-hover/line:text-neutral-500 font-mono italic">
                        {i + 1}
                      </span>
                      <span className="table-cell pl-6 font-mono">
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

        {/* Minimalist Copy Button (Matching image) */}
        {shouldShowCopy && (
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 rounded-lg border border-white/5 bg-white/2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/8 hover:border-white/10 text-neutral-500 hover:text-white backdrop-blur-md z-10"
            aria-label="Copy code"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <CheckIcon className="h-4 w-4 text-emerald-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <CopyIcon className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        )}
      </div>
    </div>
  );
}


