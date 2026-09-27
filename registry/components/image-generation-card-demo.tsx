"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageGenerationCard } from "./image-generation-card";

const DEMO_PROMPT = "Stingrays gliding through turquoise shallows, shot from above";
const DEMO_IMAGE =
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1470&auto=format&fit=crop";
const GENERATION_MS = 4000;

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function RegenerateIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

export function ImageGenerationCardDemo() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [finalTime, setFinalTime] = useState(0);
  const startRef = useRef<number>(0);

  const startGeneration = () => {
    setFinalTime(0);
    startRef.current = Date.now();
    setState("loading");
    setTimeout(() => {
      setFinalTime(Math.round((Date.now() - startRef.current) / 1000));
      setState("done");
    }, GENERATION_MS);
  };

  const reset = () => {
    setState("idle");
    setFinalTime(0);
  };

  const CARD_W = 250;
  const CARD_H = Math.round((CARD_W * 16) / 9);

  return (
    <div className="w-full flex items-center justify-center py-10 px-4">
      {/* Chat container — uses theme bg/border tokens */}
      <div style={{ width: 360 }}>
        <div className="px-5 pt-6 pb-5 flex flex-col gap-3">

          {/* User prompt bubble — inverted foreground/background so it flips correctly in both themes */}
          <div className="flex justify-end">
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-[85%] px-4 py-2.5 rounded-[18px] rounded-tr-[5px] text-[13px] leading-snug font-medium bg-foreground text-background"
            >
              {DEMO_PROMPT}
            </motion.div>
          </div>

          {/* Status label */}
          <AnimatePresence mode="wait">
            {state === "loading" && (
              <motion.div
                key="loading"
                className="flex items-center gap-2 pl-0.5"
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-1">
                  {[0, 0.15, 0.3].map((delay, i) => (
                    <motion.span
                      key={i}
                      className="w-1 h-1 rounded-full bg-muted-foreground"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, delay, ease: "easeInOut" }}
                    />
                  ))}
                </div>
                <span className="text-[12px] text-muted-foreground">
                  Generating
                </span>
              </motion.div>
            )}
            {state === "done" && (
              <motion.p
                key="done"
                className="text-[12px] pl-0.5 text-muted-foreground"
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                Generated in {finalTime}s
              </motion.p>
            )}
            {state === "idle" && (
              <div key="spacer" className="h-[18px]" />
            )}
          </AnimatePresence>

          {/* Image card — 9:16 */}
          <ImageGenerationCard
            src={state === "done" ? DEMO_IMAGE : undefined}
            isLoading={state === "loading"}
            width={CARD_W}
            height={CARD_H}
          />

          {/* Action row */}
          <div className="flex items-center gap-1 pt-0.5 pl-0.5">
            <AnimatePresence>
              {state === "done" && (
                <>
                  <motion.button
                    key="dl"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center w-7 h-7 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Download"
                    onClick={() => window.open(DEMO_IMAGE, "_blank")}
                  >
                    <DownloadIcon />
                  </motion.button>

                  <motion.button
                    key="regen"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                    className="flex items-center justify-center w-7 h-7 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Regenerate"
                    onClick={reset}
                  >
                    <RegenerateIcon />
                  </motion.button>
                </>
              )}
            </AnimatePresence>

            {/* Generate button */}
            <AnimatePresence>
              {state === "idle" && (
                <motion.button
                  key="gen"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={startGeneration}
                  className="ml-auto px-4 py-1.5 rounded-full text-[12px] font-medium bg-foreground text-background hover:opacity-80 active:scale-95 transition-all"
                >
                  Generate
                </motion.button>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ImageGenerationCardDemo;
