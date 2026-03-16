"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { AnimatedBorderButton } from "@/registry/animated-border";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 text-center pt-20">
      {/* Background: Dot grid only */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.15] dark:opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-6 flex items-center gap-2"
      >
        <div className="relative overflow-hidden rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 2 }}
          />
          <span className="relative">✦ Build Modern UIs</span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-3xl text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl"
      >
        Modern UI library{" "}
        {/* <span className="text-primary italic">handcrafted</span> */}
        <br />
        For effortless design.
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}

        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 max-w-2xl text-base text-foreground font-medium md:text-lg bg-black/50 dark:bg-transparent px-4 py-2 rounded-lg"
      >
        RankFlow UI is a curated collection of high-performance, animated
        React components. Ready to use, highly customizable, and optimized for speed.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <AnimatedBorderButton color="var(--primary)" duration={3} className="px-6 py-2.5 text-sm font-semibold rounded-full border-none">
          Browse Components
        </AnimatedBorderButton>

        <Link
          href="https://github.com/AdityaS1204/Rankflow-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
        >
          <GitHubLogoIcon className="h-4 w-4" />
          Star on GitHub
        </Link>
      </motion.div>
    </section>
  );
}
