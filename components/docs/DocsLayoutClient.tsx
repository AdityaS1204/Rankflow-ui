"use client";

import { useState, useEffect } from "react";
import DocsSidebar from "@/components/docs/Sidebar";
import AuthorFooter from "@/components/layout/AuthorFooter";
import { PanelLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function DocsLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // When user wheels down on the sidebar at top of page, scroll the page up so the sidebar docks to the top immediately
  const handleSidebarWheel = (e: React.WheelEvent) => {
    if (window.scrollY < 80 && e.deltaY > 0) {
      window.scrollBy({ top: e.deltaY, behavior: "auto" });
    }
  };

  return (
    <div className="w-full pt-20 lg:pt-24 min-h-screen relative">
      {/* Fixed Top Mask across whole screen (sidebar + main content) */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-28 pointer-events-none z-30 fixed-top-mask"
      />

      {/* Fixed Bottom Mask across whole screen (sidebar + main content) */}
      <div
        aria-hidden="true"
        className="fixed bottom-0 left-0 right-0 h-20 pointer-events-none z-30 fixed-bottom-mask"
      />

      {/* Floating Open Button when Sidebar is Closed */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{
              opacity: 1,
              x: 0,
              top: isScrolled ? 16 : 88,
            }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-[24px] z-40 hidden lg:block"
          >
            <button
              id="open-sidebar-btn"
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg border border-border/60 dark:border-white/10 bg-background/80 dark:bg-zinc-900/80 backdrop-blur-md text-muted-foreground hover:text-foreground hover:bg-neutral-200/80 dark:hover:bg-zinc-800/80 hover:border-neutral-400 dark:hover:border-white/20 shadow-xs transition-colors flex items-center justify-center cursor-pointer"
              title="Open sidebar"
              aria-label="Open sidebar"
            >
              <PanelLeft className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex w-full">
        {/* Sidebar Container: Sticky at top-4 so scrolling moves it upward, filling the gap */}
        <motion.div
          initial={false}
          animate={{
            width: isSidebarOpen ? 256 : 0,
            marginLeft: isSidebarOpen ? 24 : 0,
            opacity: isSidebarOpen ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.895, 0.03, 0.45, 0.53],
          }}
          onWheel={handleSidebarWheel}
          className="shrink-0 hidden lg:block overflow-hidden sticky top-4 self-start transition-all"
          style={{ pointerEvents: isSidebarOpen ? "auto" : "none" }}
        >
          <motion.div
            initial={false}
            animate={{
              x: isSidebarOpen ? 0 : -20,
            }}
            transition={{
              duration: 0.4,
              ease: [0.895, 0.03, 0.45, 0.53],
            }}
            className="w-64 flex flex-col pr-2"
          >
            {/* Close Icon Button with border, padding, and subtle shadow */}
            <div className="flex items-center justify-between mb-3 px-1">
              <button
                id="close-sidebar-btn"
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-lg border border-border/60 dark:border-white/10 bg-background/80 dark:bg-zinc-900/80 backdrop-blur-md text-muted-foreground hover:text-foreground hover:bg-neutral-200/80 dark:hover:bg-zinc-800/80 hover:border-neutral-400 dark:hover:border-white/20 shadow-xs transition-colors flex items-center justify-center cursor-pointer"
                title="Close sidebar"
                aria-label="Close sidebar"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
            </div>

            {/* Sidebar Content */}
            <DocsSidebar />
          </motion.div>
        </motion.div>

        {/* Main Content Area: Centered horizontally on screen when sidebar is closed */}
        <main
          className="min-w-0 flex-1 pt-2 pb-16 px-4 sm:px-6 lg:px-12 flex flex-col items-center"
        >
          <div className="w-full max-w-4xl">
            {children}
            <AuthorFooter />
          </div>
        </main>
      </div>
    </div>
  );
}
