"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CodeBlock } from "./CodeBlock";
import { registryComponents } from "@/registry/registry-ui";

interface ComponentPreviewProps {
  slug: string;
  code: string;
  filename?: string;
}

export function ComponentPreview({ slug, code, filename }: ComponentPreviewProps) {

  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const Component = registryComponents[slug];

  return (
    <div className="group relative my-10 flex flex-col space-y-4">
      <div className="flex items-center gap-2 border-b border-border pb-px">
        <button
          onClick={() => setActiveTab("preview")}
          className={`relative px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "preview" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {activeTab === "preview" && (
            <motion.div
              layoutId="active-tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
          Preview
        </button>
        <button
          onClick={() => setActiveTab("code")}
          className={`relative px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "code" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {activeTab === "code" && (
            <motion.div
              layoutId="active-tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
          Code
        </button>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border bg-[#0d0d0d] shadow-sm">
        <AnimatePresence mode="wait">
          {activeTab === "preview" ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative flex min-h-[400px] w-full items-center justify-center p-12"
            >
              {/* Dotted Background */}
              <div className="absolute inset-0 z-0 opacity-[0.4] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[24px_24px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />
              <div className="relative z-10 w-full flex justify-center items-center">
                {Component ? (
                  <Component fadeColor="#0d0d0d" />
                ) : (
                  <p className="text-muted-foreground">Component "{slug}" not found in registry.</p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative rounded-none border-none"
            >
              <CodeBlock code={code} language="tsx" filename={filename} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
