"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { AnimatedBorderButton } from "@/registry/animated-border";
import { ArrowRightIcon } from "@radix-ui/react-icons";

// ── Live previews of available components ─────────────────────────────────

function AnimatedBorderPreview() {
  return (
    <div className="flex items-center justify-center p-6 bg-zinc-950/50 rounded-lg border border-zinc-800">
      <AnimatedBorderButton color="var(--primary)" duration={3}>
        Rankflow UI
      </AnimatedBorderButton>
    </div>
  );
}

const components = [
  {
    id: "animated-border",
    name: "Animated Border Button",
    description: "A button with a moving gradient border that traces the edges using CSS offset-path.",
    tags: ["Button", "Animation"],
    href: "/components/animated-border",
    preview: <AnimatedBorderPreview />,
  },
  {
    id: "marquee",
    name: "Marquee",
    description: "Infinitely scrolling horizontal ticker for logos, text, or any content.",
    tags: ["Motion", "Display"],
    href: "#",
    preview: (
      <div className="flex items-center justify-center p-12 bg-zinc-950/50 rounded-lg border border-zinc-800 text-zinc-500 text-sm">
        Preview coming soon
      </div>
    ),
  },
  {
    id: "spotlight",
    name: "Spotlight Card",
    description: "A card that follows the cursor with a radiant spotlight hover effect.",
    tags: ["Card", "Interactive"],
    href: "#",
    preview: (
      <div className="flex items-center justify-center p-12 bg-zinc-950/50 rounded-lg border border-zinc-800 text-zinc-500 text-sm">
        Preview coming soon
      </div>
    ),
  },
  {
    id: "magnetic",
    name: "Magnetic Icon",
    description: "An interactive icon that attracts the cursor within a specific range.",
    tags: ["Interaction", "Physics"],
    href: "#",
    preview: (
      <div className="flex items-center justify-center p-12 bg-zinc-950/50 rounded-lg border border-zinc-800 text-zinc-500 text-sm">
        Preview coming soon
      </div>
    ),
  },
];

export default function ComponentsShowcase() {
  const [hoveredId, setHoveredId] = useState<string | null>(components[0].id);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 min-h-[600px]">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left: Interactive List */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              Component Library
            </p>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Browse our blocks
            </h2>
          </motion.div>

          <div className="space-y-1">
            {components.map((comp) => (
              <Link
                key={comp.id}
                href={comp.href}
                onMouseEnter={() => setHoveredId(comp.id)}
                className="group relative flex items-center justify-between py-6 border-b border-zinc-800/50 transition-colors"
              >
                <div className="relative z-10 flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <h3 className={`text-xl font-semibold transition-all duration-300 ${
                      hoveredId === comp.id ? "text-primary translate-x-2" : "text-zinc-400"
                    }`}>
                      {comp.name}
                    </h3>
                  </div>
                  <p className={`text-sm transition-opacity duration-300 max-w-md ${
                    hoveredId === comp.id ? "opacity-100 translate-x-2" : "opacity-0"
                  }`}>
                    {comp.description}
                  </p>
                </div>

                <div className={`transition-all duration-300 ${
                  hoveredId === comp.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x--4"
                }`}>
                  <ArrowRightIcon className="w-5 h-5 text-primary" />
                </div>

                {/* Hover effect background */}
                {hoveredId === comp.id && (
                  <motion.div
                    layoutId="list-hover"
                    className="absolute inset-0 bg-zinc-900/40 z-0 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Preview Area */}
        <div className="hidden lg:block w-[450px]">
          <div className="sticky top-32">
            <AnimatePresence mode="wait">
              {hoveredId && (
                <motion.div
                  key={hoveredId}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full aspect-square flex flex-col gap-6"
                >
                  <div className="flex-1">
                    {components.find(c => c.id === hoveredId)?.preview}
                  </div>
                  
                  <div className="p-6 bg-zinc-900/30 rounded-lg border border-zinc-800/50">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {components.find(c => c.id === hoveredId)?.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-zinc-800 text-zinc-400 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-zinc-400 italic">
                      "Clean, modular, and ready for production use."
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
