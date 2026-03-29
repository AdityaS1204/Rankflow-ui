"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { AnimatedBorderButton } from "@/registry/components/animated-border";
import { GitHubLogoIcon, BoxIcon,ArrowRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

function CornerBracket({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const posClass = {
    "top-left":    "top-[-2px] left-[-2px]",
    "top-right":   "top-[-2px] right-[-2px] rotate-90",
    "bottom-left": "bottom-[-2px] left-[-2px] -rotate-90",
    "bottom-right":"bottom-[-2px] right-[-2px] rotate-180",
  }[position];

  return (
    <span className={`absolute ${posClass} z-10`} style={{ width: 24, height: 24 }}>
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* vertical arm */}
        <rect x="0" y="0" width="3" height="16" fill="#f59e0b" rx="1" />
        {/* horizontal arm */}
        <rect x="0" y="0" width="16" height="3" fill="#f59e0b" rx="1" />
      </svg>
    </span>
  );
}

export default function Hero() {
  const router = useRouter();
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 text-center pt-20">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-6 flex items-center gap-2"
      >
        <Link href="/docs/components/hero-section" className="relative overflow-hidden rounded-full border  border-zinc-300/30 shadow-2xs px-4 py-1.5 text-xs font-medium text-foreground cursor-pointer">
          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
            style={{skewX:"-45deg"}}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 2 }}
          />
          <div className="relative group flex gap-1">✦ Introducing new<span className="group-hover:text-amber-500 flex gap-1 transition-all duration-150">Hero section <ArrowRightIcon className="group-hover:translate-x-1 transition-all duration-150"/> </span></div>
        </Link>
      </motion.div>

      {/* Headline — styled box */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative mb-2 w-full max-w-4xl"
      >
        {/* Corner brackets — amber, 24px */}
        <CornerBracket position="top-left" />
        <CornerBracket position="top-right" />
        <CornerBracket position="bottom-left" />
        <CornerBracket position="bottom-right" />

        {/* Box: amber border + dense amber dot grid */}
        <h1
          className="relative w-full px-10 py-8 text-5xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl"
          style={{
            border: "1.5px solid #f59e0b",
            backgroundImage:
              "radial-gradient(circle, rgba(245,158,11,0.30) 1.2px, transparent 1.2px)",
            backgroundSize: "14px 14px",
          }}
        >
          Modern UI library{" "}
          <br />
          For effortless design.
        </h1>
      </motion.div>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 max-w-2xl text-base text-foreground font-medium md:text-lg bg-black/50 dark:bg-transparent px-4 py-2 rounded-lg"
      >
        RankFlow UI is a curated collection of high-performance, animated React
        components. Ready to use, highly customizable, and optimized for speed.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <AnimatedBorderButton
          onClick={() => router.push("/docs/components/animated-border")}
          color="var(--primary)"
          duration={3}
          className="px-6 py-2.5 text-sm font-semibold rounded-full border-none"
        >
          Browse Components
        </AnimatedBorderButton>

        <Link
          href="https://github.com/AdityaS1204/Rankflow-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
        >
          <GitHubLogoIcon className="h-4 w-4" />
          Star on GitHub
        </Link>
      </motion.div>
    </section>
  );
}
