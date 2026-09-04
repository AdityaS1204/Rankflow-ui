"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { CodeBlock } from "./CodeBlock";
import { registryComponents } from "@/registry/registry-ui";
import { registry } from "@/registry/index";
import { cn } from "@/lib/utils";
import { RotateCw, Frame, Monitor, Tablet, Smartphone } from "lucide-react";
import { CopyPromptButtons } from "./CopyPromptButton";


interface ComponentPreviewProps {
  slug: string;
  code: string;
  usageCode?: string;
  filename?: string;
  usageFilename?: string;
  componentName?: string;
  dependencies?: string[];
}

export function ComponentPreview({
  slug,
  code,
  usageCode,
  filename,
  usageFilename,
  componentName,
  dependencies = [],
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "usage">("preview");
  const [previewKey, setPreviewKey] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [previewWidth, setPreviewWidth] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const { resolvedTheme } = useTheme();


  useEffect(() => {
    setMounted(true);
  }, []);

  const Component = registryComponents[slug];
  const metadata = registry.find(c => c.name === slug);
  const isLarge = metadata?.size === "lg";
  const isPageSection = metadata?.tags.includes("page-sections");

  // Use resolvedTheme, default to dark on server
  const isDark = !mounted || resolvedTheme !== "light";
  const fadeColor = isDark ? "#0d0d0d" : "#ffffff";

  const widthClasses = {
    desktop: "max-w-full",
    tablet: "max-w-[768px]",
    mobile: "max-w-[375px]",
  };


  return (
    <div className={cn(
      "group relative my-10 flex flex-col space-y-4",
      isLarge ? "max-w-6xl" : "max-w-3xl"
    )}>
      <div className="flex items-center justify-between border-b border-border pb-px">
        {/* Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("preview")}
            className={`relative px-4 py-2 text-sm font-medium transition-colors ${activeTab === "preview" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
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
            className={`relative px-4 py-2 text-sm font-medium transition-colors ${activeTab === "code" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
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
          {usageCode && (
            <button
              onClick={() => setActiveTab("usage")}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${activeTab === "usage" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {activeTab === "usage" && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              Usage
            </button>
          )}
        </div>


        <div className="flex items-center gap-1.5 pb-px">
          {activeTab === "preview" && isPageSection && (
            <>
              <div className="flex items-center gap-1 rounded-md border border-border bg-muted/30 p-0.5">
                <button
                  onClick={() => setPreviewWidth("desktop")}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-sm transition-all",
                    previewWidth === "desktop"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  title="Desktop View"
                >
                  <Monitor className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setPreviewWidth("tablet")}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-sm transition-all",
                    previewWidth === "tablet"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  title="Tablet View"
                >
                  <Tablet className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setPreviewWidth("mobile")}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-sm transition-all",
                    previewWidth === "mobile"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  title="Mobile View"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mx-1 h-4 w-px bg-border" />
            </>
          )}

          <CopyPromptButtons
            componentName={componentName ?? slug}
            sourceCode={activeTab === "usage" && usageCode ? usageCode : code}
            dependencies={dependencies}
          />


          <div className="mx-1 h-4 w-px bg-border" />

          {activeTab === "preview" && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPreviewKey((prev) => prev + 1)}
                className="flex items-center justify-center p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md"
                title="Reload preview"
              >
                <RotateCw className="h-4 w-4" />
              </button>
              {((metadata as any)?.fullScreenPreview || isPageSection) && (
                <a
                  href={`/preview/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md"
                  title="Open in Fullscreen"
                >
                  <Frame className="h-4 w-4" />
                </a>
              )}

            </div>
          )}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border bg-background shadow-sm">
        <AnimatePresence mode="wait">
          {activeTab === "preview" ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "relative flex w-full items-center justify-center p-4 md:p-12",
                slug === "spotlight-text" && "bg-neutral-950 rounded-xl",
                isLarge ? "min-h-[500px] lg:min-h-[600px]" : "min-h-[400px]"
              )}
            >
              {Component ? (
                <motion.div 
                  layout
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  className={cn("w-full flex items-center justify-center font-[inherit] transition-all duration-500", widthClasses[previewWidth])}
                >
                  <Component key={previewKey} fadeColor={fadeColor} />
                </motion.div>
              ) : (

                <p className="text-muted-foreground">Component "{slug}" not found in registry.</p>
              )}
            </motion.div>
          ) : activeTab === "code" ? (
            <motion.div
              key="code"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative w-full"
            >
              <CodeBlock code={code} filename={filename} />
            </motion.div>
          ) : (
            <motion.div
              key="usage"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative w-full"
            >
              <CodeBlock code={usageCode || ""} filename={usageFilename || "example.tsx"} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
