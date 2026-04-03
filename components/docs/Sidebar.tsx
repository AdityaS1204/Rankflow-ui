"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDocsNavigation } from "@/config/docs";

export default function DocsSidebar() {
  const pathname = usePathname();
  const sections = getDocsNavigation();
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  return (
    <aside className="w-56 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 pr-4 hidden lg:block">
      <nav
        className="flex flex-col gap-6"
        onMouseLeave={() => setHoveredHref(null)}
      >
        {sections.map((section) => (
          <div key={section.label}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2 px-3">
              {section.label}
            </h4>
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const isHovered = hoveredHref === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onMouseEnter={() => setHoveredHref(item.href)}
                      className={`relative flex items-center justify-between px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
                        isActive
                          ? "text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {item.title}
                        {item.isNew && (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-tight bg-amber-500 text-black rounded-lg shadow-[0_0_10px_rgba(245,158,11,0.3)]">
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
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
