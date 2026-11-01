"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "@/components/shared/ThemeToggle";
import { CommandPalette, ActionItem } from "@/registry/components/command-palette";
import { registry } from "@/registry/index";
import { FiCode, FiZap, FiBox } from "react-icons/fi";

const navLinks = [
  { label: "Skills", href: "https://skills.rankflow.in" },
  { label: "Components", href: "/docs/components/scroll-velocity" },
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
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const actions: ActionItem[] = [
    {
      id: "intro",
      title: "Introduction",
      icon: <FiZap />,
      group: "Getting Started",
      perform: () => router.push("/docs")
    },
    {
      id: "install",
      title: "Installation",
      icon: <FiCode />,
      group: "Getting Started",
      perform: () => router.push("/docs/installation")
    },
    {
      id: "tmpl",
      title: "Templates",
      icon: <FiCode />,
      group: "Getting Started",
      perform: () => router.push("/templates")
    },
    {
      id: "skills",
      title: "Skills",
      icon: <FiZap />,
      group: "Getting Started",
      perform: () => {
        window.location.href = "https://skills.rankflow.in";
      }
    },
    ...registry
      .filter(item => item.type === "components:ui")
      .map(item => ({
        id: item.name,
        title: item.title,
        icon: <FiBox />,
        group: "Components",
        perform: () => router.push(`/docs/components/${item.name}`)
      }))
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 15) {
        setIsVisible(true);
        setScrolled(false);
      } else {
        setScrolled(true);
        // Scrolling down past threshold -> hide navbar
        if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
          setIsVisible(false);
        }
        // Scrolling up -> show navbar
        else if (currentScrollY < lastScrollY.current) {
          setIsVisible(true);
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showNavbar = isVisible || isOpen;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: showNavbar ? 0 : -80, opacity: showNavbar ? 1 : 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled
          ? "border-b border-border/40 bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-background/50 backdrop-blur-xs"
        }`}
    >
      <div className="flex w-full items-center justify-between px-6 lg:px-8 xl:px-12 py-1.5">
        {/* Left aligned items: Logo + Links */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
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
                  className={`group relative px-2.5 py-1 text-sm font-semibold transition-colors duration-200 ${isActive || isHovered ? "text-foreground" : "text-muted-foreground"
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

        {/* Right aligned: Search + Theme Toggle + Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <CommandPalette actions={actions} />
          </div>

          <div className="hidden md:block">
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden flex-col gap-1.5 p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 rounded-full bg-foreground transition-colors"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="h-0.5 w-6 rounded-full bg-foreground transition-colors"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 rounded-full bg-foreground transition-colors"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="flex w-full items-center py-2 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-4 pt-4 border-t border-border flex items-center justify-between"
              >
                <span className="text-sm font-medium text-muted-foreground">Theme</span>
                <ModeToggle />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

