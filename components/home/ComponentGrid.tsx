"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { SpotlightCard } from "@/registry/spotlight-card";
import { GlowButton } from "@/registry/glow-button";
import { AnimatedBorderButton } from "@/registry/animated-border";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { Marquee } from "@/registry/marquee";

// Live previews of available components 

function AnimatedBorderPreview() {
  return (
    <div className="flex items-center justify-center p-6 bg-zinc-950/50 rounded-lg border border-zinc-800">
      <AnimatedBorderButton color="var(--primary)" duration={3}>
        Rankflow UI
      </AnimatedBorderButton>
    </div>
  );
}

function TestimonialCard({ name, role, content, avatar }: { name: string, role: string, content: string, avatar: string }) {
  return (
    <div className="flex flex-col gap-3 p-4 w-64 bg-zinc-900/50 border border-zinc-800 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
          {avatar}
        </div>
        <div>
          <p className="text-xs font-semibold text-zinc-200">{name}</p>
          <p className="text-[10px] text-zinc-500">{role}</p>
        </div>
      </div>
      <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">
        {content}
      </p>
    </div>
  );
}

function MarqueePreview() {
  const testimonials = [
    { name: "Alex Rivera", role: "Frontend Lead", content: "The best UI library I've used in years. Period.", avatar: "AR" },
    { name: "Sarah Chen", role: "Product Designer", content: "Animations are buttery smooth. Setup took seconds.", avatar: "SC" },
    { name: "James Wilson", role: "CTO @ TechFlow", content: "Cleanest codebase I've seen in a registry-style library.", avatar: "JW" },
    { name: "Leo Zhang", role: "Indie Hacker", content: "RankFlow saved me at least 40 hours of work.", avatar: "LZ" },
  ];

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/50 p-6">
      <Marquee speed={40} className="[--gap:1.5rem]">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </Marquee>
      <Marquee reverse speed={30} className="[--gap:1.5rem]">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </Marquee>
      
      {/* Gradients to fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-zinc-950/50"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-zinc-950/50"></div>
    </div>
  );
}

function SpotlightPreview() {
  return (
    <div className="flex items-center justify-center p-6 bg-zinc-950/50 rounded-lg border border-zinc-800 h-full w-full">
      <SpotlightCard className="w-64 h-32">
        <div className="p-6 h-full flex flex-col justify-center">
          <span className="text-foreground/80 text-sm font-medium">Spotlight Effect</span>
        </div>
      </SpotlightCard>
    </div>
  );
}

function GlowButtonPreview() {
  const [variant, setVariant] = useState<'orange' | 'red' | 'blue' | 'green'>('orange');
  const colors = [
    { name: 'orange', class: 'bg-[#DE732C]' },
    { name: 'red', class: 'bg-[#ff0000]' },
    { name: 'blue', class: 'bg-[#126fff]' },
    { name: 'green', class: 'bg-[#176635]' },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-8 h-full w-full p-6 bg-zinc-950/50 rounded-lg border border-zinc-800">
      <GlowButton variant={variant}>
        Interactive Glow
      </GlowButton>

      <div className="flex gap-3 p-2 bg-zinc-900/50 rounded-full border border-zinc-800">
        {colors.map((c) => (
          <button
            key={c.name}
            onClick={() => setVariant(c.name as any)}
            className={`w-5 h-5 rounded-full border border-white/10 transition-transform hover:scale-125 ${c.class} ${variant === c.name ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110' : ''
              }`}
          />
        ))}
      </div>
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
    description: "Infinitely scrolling horizontal ticker for professional testimonials or logos.",
    tags: ["Motion", "Display"],
    href: "#",
    preview: <MarqueePreview />,
  },
  {
    id: "spotlight",
    name: "Spotlight Card",
    description: "A card that follows the cursor with a radiant spotlight hover effect.",
    tags: ["Card", "Interactive"],
    href: "#",
    preview: <SpotlightPreview />,
  },
  {
    id: "glow-button",
    name: "Glow Button",
    description: "A vibrant button with a deep neon glow and customizable color variants.",
    tags: ["Button", "Neon", "Glow"],
    href: "#",
    preview: <GlowButtonPreview />,
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
                    <h3 className={`text-xl font-semibold transition-all duration-300 ${hoveredId === comp.id ? "text-primary translate-x-2" : "text-zinc-400"
                      }`}>
                      {comp.name}
                    </h3>
                  </div>
                  <p className={`text-sm transition-opacity duration-300 max-w-md ${hoveredId === comp.id ? "opacity-100 translate-x-2" : "opacity-0"
                    }`}>
                    {comp.description}
                  </p>
                </div>

                <div className={`transition-all duration-300 ${hoveredId === comp.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x--4"
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
