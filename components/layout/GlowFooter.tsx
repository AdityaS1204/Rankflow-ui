"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

const FOOTER_LINKS = {
  Buttons: [
    { title: "Animated Border Button", slug: "animated-border" },
    { title: "Noise Button", slug: "noise-button" },
    { title: "Glow Button", slug: "glow-button" },
    { title: "Gradient Button", slug: "gradient-button" },
    { title: "Social Share Button", slug: "social-share-button" },
    { title: "Delete Button", slug: "delete-button" },
    { title: "Brutalist Button", slug: "brutalist-button" },
    { title: "Brutalist Key", slug: "brutalist-key" },
  ],
  Cards: [
    { title: "Spotlight Card", slug: "spotlight-card" },
    { title: "Gradient Ring Card", slug: "gradient-ring-card" },
    { title: "Stack Card", slug: "stack-card" },
    { title: "Tweet Card", slug: "tweet-card" },
    { title: "Expandable Cards", slug: "expandable-cards" },
    { title: "Pixel Fall Effect", slug: "pixel-fall-effect" },
    { title: "Product Showcase Card", slug: "product-showcase-card" },
    { title: "Music Player Card", slug: "music-player-card" },
  ],
  "Inputs & Forms": [
    { title: "AI Input", slug: "ai-input" },
    { title: "AI Input 02", slug: "ai-input-02" },
    { title: "AI Input 03", slug: "ai-input-03" },
    { title: "Sign Up Form", slug: "sign-up-form" },
    { title: "File Upload", slug: "file-upload" },
    { title: "Command Palette", slug: "command-palette" },
  ],
  "Text & Animation": [
    { title: "Marquee", slug: "marquee" },
    { title: "Scroll Velocity", slug: "scroll-velocity" },
    { title: "Text Generate Effect", slug: "text-generate-effect" },
    { title: "Parallax Text", slug: "parallax-text" },
    { title: "Text Reveal", slug: "text-reveal" },
    { title: "Accordion", slug: "accordion" },
  ],
  Backgrounds: [
    { title: "Dot Grid Background", slug: "dot-grid-background" },
    { title: "Drawing Cursor", slug: "drawing-cursor" },
    { title: "Dither Image", slug: "dither" },
  ],
  Blocks: [
    { title: "Hero Section", slug: "hero-section" },
    { title: "Ecosystem Hero", slug: "ecosystem-hero" },
    { title: "Pricing Plan", slug: "pricing-plan" },
    { title: "Bento Grid 001", slug: "bento-grid-001" },
  ],
};

export default function GlowFooter() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";
  const baseColor = isDark ? "255, 255, 255" : "0, 0, 0";

  return (
    <footer className="relative overflow-hidden border-t border-border/50 pb-10 pt-16 text-center">
      {/* Component Links Grid */}
      <div className="mx-auto mb-16 max-w-6xl px-6 text-left">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
          {Object.entries(FOOTER_LINKS).map(([category, links], colIdx) => (
            <div key={category}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground/50">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.slug}>
                    <Link
                      href={`/docs/components/${link.slug}`}
                      className="text-sm text-muted-foreground/70 transition-colors duration-150 hover:text-foreground"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-14 h-px w-full bg-border/40" />
      </div>

      {/* Big Glow Logo */}
      <div className="relative inline-block cursor-default">
        {mounted ? (
          <motion.p
            initial={{
              opacity: 0,
              textShadow: `0 0 0px rgba(${baseColor}, 0)`,
              color: `rgba(${baseColor}, 0.05)`,
            }}
            whileInView={{
              opacity: [0, 1, 0, 1, 0.5, 1],
              textShadow: [
                `0 0 0px rgba(${baseColor}, 0)`,
                `0 0 40px rgba(${baseColor}, 0.8)`,
                `0 0 0px rgba(${baseColor}, 0)`,
                `0 0 50px rgba(${baseColor}, 1)`,
                `0 0 10px rgba(${baseColor}, 0.3)`,
                `0 0 20px rgba(${baseColor}, 0.5)`,
              ],
              color: [
                `rgba(${baseColor}, 0)`,
                `rgba(${baseColor}, 1)`,
                `rgba(${baseColor}, 0.05)`,
                `rgba(${baseColor}, 1)`,
                `rgba(${baseColor}, 0.5)`,
                `rgba(${baseColor}, 0.8)`,
              ],
            }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{
              duration: 1.2,
              times: [0, 0.1, 0.15, 0.3, 0.5, 1],
              ease: "circOut",
            }}
            className="select-none font-geist text-[clamp(3rem,12vw,9rem)] font-extrabold leading-none tracking-tighter"
          >
            RankFlow UI
          </motion.p>
        ) : (
          <p className="select-none font-geist text-[clamp(3rem,12vw,9rem)] font-extrabold leading-none tracking-tighter opacity-0">
            RankFlow UI
          </p>
        )}
      </div>

      <p className="mt-6 text-xs text-muted-foreground/60">
        &copy; {mounted ? new Date().getFullYear() : "2026"} RankFlow UI. Open source under MIT.
      </p>
    </footer>
  );
}
