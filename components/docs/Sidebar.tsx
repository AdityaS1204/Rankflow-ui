"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDocsNavigation } from "@/config/docs";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: open ? 0 : -90 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="shrink-0 text-muted-foreground"
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

export default function DocsSidebar() {
  const pathname = usePathname();
  const sections = getDocsNavigation();
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(sections.map((s) => [s.label, true]))
  );

  const toggleSection = (label: string) =>
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <aside className="w-60 shrink-0 h-[calc(100vh-3.5rem)] flex flex-col bg-transparent border-r border-border/40 pr-3">
      <div className="w-full h-full overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pl-1 pr-1 pb-8">
        <nav
          className="flex flex-col gap-1"
          onMouseLeave={() => setHoveredHref(null)}
        >
          {sections.map((section) => {
            const isOpen = !!openSections[section.label];

            return (
              <div key={section.label} className="mb-3">
                <button
                  onClick={() => toggleSection(section.label)}
                  className="w-full flex items-center justify-between px-2 py-1 mb-1 rounded-md text-xs font-semibold tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  <span>{section.label}</span>
                  <ChevronIcon open={isOpen} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="section-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                        opacity: { duration: 0.2, ease: "easeOut" },
                      }}
                      className="overflow-hidden"
                    >
                      <ul className="flex flex-col gap-0.5 mt-0.5">
                        {section.items.map((item) => {
                          const isActive = pathname === item.href;
                          const isHovered = hoveredHref === item.href;

                          return (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onMouseEnter={() => setHoveredHref(item.href)}
                                className={`group relative flex items-center justify-between px-2.5 py-1 text-sm rounded-md transition-colors duration-150 ${isActive
                                  ? "text-neutral-950 dark:text-white font-medium"
                                  : "text-neutral-600 dark:text-zinc-400 hover:text-neutral-950 dark:hover:text-white"
                                  }`}
                              >
                                <span className="relative z-10 flex items-center gap-2">
                                  {item.title}
                                  {item.isNew && (
                                    <span className="px-1.5 py-0.5 text-[9px] font-medium tracking-tight bg-muted text-muted-foreground border border-border/60 rounded">
                                      New
                                    </span>
                                  )}
                                </span>

                                {(isHovered || (isActive && !hoveredHref)) && (
                                  <motion.div
                                    layoutId="docs-sidebar-hover"
                                    className="absolute inset-0 z-0 rounded-md bg-neutral-200/80 dark:bg-zinc-800/80 shadow-xs"
                                    initial={false}
                                    transition={{
                                      type: "spring",
                                      bounce: 0.15,
                                      duration: 0.35,
                                    }}
                                  />
                                )}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Minimal Footer metadata matching reference image */}
        <div className="mt-6 pt-5 border-t border-border/40 flex flex-col gap-1.5 px-2 text-xs text-muted-foreground/75">
          <div>v0.1.0 · MIT licensed</div>
          <div>
            Made by{" "}
            <a
              href="https://github.com/AdityaS1204/Rankflow-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-foreground underline underline-offset-3 transition-colors"
            >
              Aditya
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
