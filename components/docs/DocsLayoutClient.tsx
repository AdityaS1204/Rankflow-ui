"use client";

import { useState } from "react";
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

  return (
    <div className="w-full pt-24 min-h-screen">
      {/* Floating Open Button when Sidebar is Closed */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.35, ease: [0.895, 0.03, 0.45, 0.53] }}
            className="fixed top-[96px] left-[24px] z-40 hidden lg:block"
          >
            <button
              id="open-sidebar-btn"
              onClick={() => setIsSidebarOpen(true)}
              className="p-1.5 rounded-md border border-border/40 bg-background/80 backdrop-blur-md text-muted-foreground hover:text-foreground hover:bg-accent/40 shadow-xs transition-colors flex items-center justify-center cursor-pointer"
              title="Open sidebar"
              aria-label="Open sidebar"
            >
              <PanelLeft className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex w-full">
        {/* Sidebar Container with smooth custom easing */}
        <motion.div
          initial={false}
          animate={{
            width: isSidebarOpen ? 240 : 0,
            marginLeft: isSidebarOpen ? 24 : 0,
            opacity: isSidebarOpen ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.895, 0.03, 0.45, 0.53],
          }}
          className="shrink-0 hidden lg:block overflow-hidden sticky top-[96px] self-start"
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
            className="w-60 flex flex-col"
          >
            {/* Minimal Close Icon directly above the sidebar navigation */}
            <div className="flex items-center justify-between mb-2 px-1">
              <button
                id="close-sidebar-btn"
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/40 transition-colors flex items-center justify-center cursor-pointer"
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

        {/* Main Content Area: Centered horizontally on screen when sidebar is closed with top and bottom masking */}
        <main
          className="content-mask min-w-0 flex-1 pt-2 pb-16 px-4 sm:px-6 lg:px-12 flex flex-col items-center"
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
