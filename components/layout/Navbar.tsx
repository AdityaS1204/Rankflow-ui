"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/shared/ThemeToggle";

const navLinks = [
  { label: "Components", href: "/components" },
  { label: "Templates", href: "/templates" },
  { label: "Docs", href: "/docs" },
  { label: "GitHub", href: "https://github.com/AdityaS1204/Rankflow-ui", external: true },
];

function RankFlowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="3" y="3" width="48" height="48" rx="12" fill="#0c0a04" />
 
      {/* Bottom chevron — deep burnt amber, barely visible */}
      <polyline
        points="15,41 27,32 39,41"
        stroke="#78350f"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
 
      {/* Mid chevron — warm amber */}
      <polyline
        points="15,31 27,22 39,31"
        stroke="#d97706"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
 
      {/* Top chevron — bright gold, thickest */}
      <polyline
        points="15,21 27,12 39,21"
        stroke="#fbbf24"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur-md"
          : "border-b border-border/50 bg-background/90"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Left aligned items: Logo + Links */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <RankFlowIcon className="shrink-0 transition-transform duration-300 group-hover:scale-105" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              RankFlow{" "}UI
            </span>
          </Link>

          {/* Nav links */}
          <nav 
            className="hidden md:flex items-center gap-1"
            onMouseLeave={() => setHoveredPath(null)}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isHovered = hoveredPath === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  className={`group relative px-3 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                    isActive || isHovered ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  
                  {(isHovered || (isActive && !hoveredPath)) && (
                    <motion.div
                      layoutId="navbar-hover"
                      className="absolute inset-0 z-0 rounded-md bg-accent/50"
                      initial={false}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.4
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right aligned: Theme Toggle */}
        <div className="flex items-center">
          <ModeToggle />
        </div>
      </div>
    </motion.header>
  );
}
