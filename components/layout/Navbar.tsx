"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ModeToggle } from "@/components/shared/ThemeToggle";

const navLinks = [
  { label: "Components", href: "/components" },
  { label: "Templates", href: "/templates" },
  { label: "Docs", href: "/docs" },
  { label: "GitHub", href: "https://github.com/AdityaS1204/Rankflow-ui", external: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-foreground">
              Rankflow{" "}
              <span className="text-primary tracking-tighter">UI</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group relative px-3 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
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
