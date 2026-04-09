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
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
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
    <aside className="w-56 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 pr-4 hidden lg:block">
      <nav
        className="flex flex-col gap-1"
        onMouseLeave={() => setHoveredHref(null)}
      >
        {sections.map((section) => {
          const isOpen = !!openSections[section.label];

          return (
            <div key={section.label} className="mb-4">
              <button
                onClick={() => toggleSection(section.label)}
                className="w-full flex items-center justify-between px-3 py-1 mb-1 rounded-md
                           group hover:bg-accent/30 transition-colors duration-200"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground
                                 group-hover:text-foreground/80 transition-colors duration-200">
                  {section.label}
                </span>
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
                      height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.25, ease: "easeOut" },
                    }}
                    className="overflow-hidden"
                  >
                    <motion.ul
                      initial={{ filter: "blur(4px)", y: -4 }}
                      animate={{ filter: "blur(0px)", y: 0 }}
                      exit={{ filter: "blur(4px)", y: -4 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="flex flex-col gap-0.5"
                    >
                      {section.items.map((item) => {
                        const isActive = pathname === item.href;
                        const isHovered = hoveredHref === item.href;

                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onMouseEnter={() => setHoveredHref(item.href)}
                              className={`relative flex items-center justify-between px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${isActive
                                ? "text-foreground font-medium"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                              <span className="relative z-10 flex items-center gap-2">
                                {item.title}
                                {item.isNew && (
                                  <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-tight bg-amber-500 text-black rounded-xl shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                                    New
                                  </span>
                                )}
                              </span>

                              {(isHovered || (isActive && !hoveredHref)) && (
                                <motion.div
                                  layoutId="docs-sidebar-hover"
                                  className="absolute inset-0 z-0 rounded-md bg-accent/50"
                                  initial={false}
                                  transition={{
                                    type: "spring",
                                    bounce: 0.2,
                                    duration: 0.4,
                                  }}
                                />
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </motion.ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
