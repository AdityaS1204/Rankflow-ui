"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { SpotlightCard } from "@/registry/components/spotlight-card";
import { GlowButton } from "@/registry/components/glow-button";
import { AnimatedBorderButton } from "@/registry/components/animated-border";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Marquee } from "@/registry/components/marquee";
import { NoiseButton } from "@/registry/components/noise-button";
import { GradientButton } from "@/registry/components/gradient-button";
import { TweetCard } from "@/registry/components/tweet-card";
import { PricingPlan } from "@/registry/components/pricing-plan";
import { SignUpForm } from "@/registry/components/sign-up-form";
import { AiInput } from "@/registry/components/ai-input";
import { StackCard } from "@/registry/components/stack-card";
import { CommandPalette } from "@/registry/components/command-palette";
import { GradientRingCard } from "@/registry/components/gradient-ring-card";
import { SocialShareButton } from "@/registry/components/social-share-button";
import { DotGridBackground } from "@/registry/components/dot-grid-background";
import { AiInput03 } from "@/registry/components/ai-input-03";
import {ParallaxText  } from "@/registry/components/parallax-text";
import {ScrollVelocity  } from "@/registry/components/scroll-velocity";
import { PixelFallEffect } from "@/registry/components/pixel-fall-effect";
import { ExpandableCards } from "@/registry/components/expandable-cards";

// Live previews of available components

function AnimatedBorderPreview() {
  return (
    <div className="flex items-center justify-center p-6 bg-zinc-950/50">
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
    <div className="flex items-center justify-center p-4 bg-zinc-950/50 h-full w-full">
      <SpotlightCard className="w-80 h-44">
        <div className="p-8 h-full flex flex-col justify-center">
          <span className="text-foreground/90 text-xl font-bold">Spotlight Effect</span>
          <p className="text-zinc-500 text-xs mt-3 leading-relaxed">
            Beautiful radiant glow that follows your cursor movements with precision.
          </p>
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
    <div className="flex flex-col items-center justify-center gap-8 h-full w-full p-6 bg-zinc-950/50">
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

function NoiseButtonPreview() {
  return (
    <NoiseButton>Generate</NoiseButton>
  );
}

function GradientButtonPreview() {
  return (
    <GradientButton>Explore More</GradientButton>
  );
}

function TweetCardPreview() {
  return (
    <div className="scale-75 w-full flex justify-center">
      <TweetCard
        authorName="Aditya Singh"
        authorUsername="@Adityas1204"
        authorAvatar="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=880&auto=format&fit=crop"
        content="Building Landing pages has never been easier. Check out these components from Rankflow UI! 🚀 #frontend #ui"
      />
    </div>
  );
}

function PricingPlanPreview() {
  return (
    <div className="scale-50 w-[800px] h-[400px] flex items-center justify-center -m-40">
      <PricingPlan />
    </div>
  );
}

function AiInputPreview() {
  return (
    <div className="w-full px-4">
      <AiInput />
    </div>
  );
}

function CommandPalettePreview() {
  return (
    <div className="scale-75">
      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
        <div className="flex items-center gap-3 px-3 py-2 border-b border-zinc-800">
          <div className="w-4 h-4 rounded bg-zinc-800" />
          <div className="text-zinc-500 text-xs">Search components...</div>
        </div>
        <div className="p-2 space-y-1">
          <div className="px-2 py-1.5 bg-primary/10 text-primary text-xs rounded">Buttons</div>
          <div className="px-2 py-1.5 text-zinc-400 text-xs">Cards</div>
        </div>
      </div>
    </div>
  );
}

function GradientRingCardPreview() {
  return (
    <div className="scale-50 -m-20">
      <GradientRingCard />
    </div>
  );
}

function SocialShareButtonPreview() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <SocialShareButton />
    </div>
  );
}

function StackCardPreview() {
  return (
    <div className="scale-[0.6] lg:scale-[0.8] w-84 h-80 flex items-center justify-center">
      <div className="w-full h-full">
        <StackCard />
      </div>
    </div>
  );
}

function DotGridPreview() {
  return (
    <div className="relative w-full h-full min-h-[220px] overflow-hidden rounded-3xl">
      <DotGridBackground />
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5">
          Grid Interaction
        </span>
      </div>
    </div>
  );
}

function AiInput03Preview() {
  return (
    <div className="w-full px-4">
      <AiInput03 />
    </div>
  )
}

function ParallaxTextPreview() {
  return (
    <div className="w-full px-1">

      <ParallaxText text="Rankflow ui" className="text-xl" />
    </div>
  )
}

function PixelFallPreview() {
  return (
    <div className="w-full px-1 flex justify-center">
      <PixelFallEffect />
    </div>
  )
}

function ScrollVelocityPreview() {
  return (
    <div className="w-full px-1">
      <ScrollVelocity />
    </div>
  )
}

function ExpandableCardPreview() {
  return (
    <div className="w-full px-1">
      <ExpandableCards />
    </div>
  )
}


const components = [
  {
    id: "sign-up-form",
    name: "Sign Up Form",
    href: "/docs/components/sign-up-form",
    preview: (
      <div className="scale-[0.35] w-[900px] -m-64 overflow-hidden rounded-3xl">
        <SignUpForm />
      </div>
    ),
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
  },
  {
    id: "pricing-plan",
    name: "Pricing Plan",
    href: "/docs/components/pricing-plan",
    preview: <PricingPlanPreview />,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
  },
  {
    id: "stack-card",
    name: "Stack Card",
    href: "/docs/components/stack-card",
    preview: <StackCardPreview />,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
  },
  {
    id: "ai-input",
    name: "AI Input",
    href: "/docs/components/ai-input",
    preview: <AiInputPreview />,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
  },
  {
    id: "spotlight",
    name: "Spotlight Card",
    href: "/docs/components/spotlight-card",
    preview: <SpotlightPreview />,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
  },
  {
    id: "marquee",
    name: "Marquee",
    href: "/docs/components/marquee",
    preview: <MarqueePreview />,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
  },
  {
    id: "tweet-card",
    name: "Tweet Card",
    href: "/docs/components/tweet-card",
    preview: <TweetCardPreview />,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
  },
  {
    id: "glow-button",
    name: "Glow Button",
    href: "/docs/components/glow-button",
    preview: <GlowButtonPreview />,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-2",
  },
  {
    id: "animated-border",
    name: "Animated Border Button",
    href: "/docs/components/animated-border",
    preview: <AnimatedBorderPreview />,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
  },
  {
    id: "command-palette",
    name: "Command Palette",
    href: "/docs/components/command-palette",
    preview: <CommandPalettePreview />,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
  },
  {
    id: "gradient-ring-card",
    name: "Gradient Ring Card",
    href: "/docs/components/gradient-ring-card",
    preview: <GradientRingCardPreview />,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
  },
  {
    id: "noise-button",
    name: "Noise Button",
    href: "/docs/components/noise-button",
    preview: <NoiseButtonPreview />,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
  },
  {
    id: "gradient-button",
    name: "Gradient Button",
    href: "/docs/components/gradient-button",
    preview: <GradientButtonPreview />,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
  },
  {
    id: "social-share-button",
    name: "Social Share Button",
    href: "/docs/components/social-share-button",
    preview: <SocialShareButtonPreview />,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
  },
  {
    id: "dot-grid-background",
    name: "Dot Grid Background",
    href: "/docs/components/dot-grid-background",
    preview: <DotGridPreview />,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
  },
  {
    id: "ai-input-03",
    name: "AI Input 03",
    href: "/docs/components/ai-input-03",
    preview: <AiInput03Preview />,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
  },
  {
    id: "parallax-text",
    name: "Parallax Text",
    href: "/docs/components/parallax-text",
    preview: <ParallaxTextPreview />,
    colSpan: "md:col-span-4",
    rowSpan: "md:row-span-2",
  },
  {
    id: "scroll-velocity",
    name: "Scroll Velocity",
    href: "/docs/components/scroll-velocity",
    preview: <ScrollVelocityPreview />,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-4",
  },
  {
    id: "pixel-fall-effect",
    name: " Effect",
    href: "/docs/components/",
    preview: <PixelFallPreview />,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-4",
  },
  {
    id: "expandable-cards",
    name: " Expandable cards",
    href: "/docs/components/expandable-cards",
    preview: <ExpandableCardPreview />,
    colSpan: "md:col-span-3",
    rowSpan: "md:row-span-4",
  }
];

export default function ComponentsShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#eb5e28]">
          Component Library
        </p>
        <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Browse our blocks
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-flow-dense gap-4">
        {components.map((comp) => (
          <div
            key={comp.id}
            className={`relative flex flex-col group p-2 rounded-3xl border border-zinc-800/10 bg-[#0d0d0d] transition-all hover:bg-[#111] hover:shadow-2xl hover:shadow-black/40 ${comp.colSpan} ${comp.rowSpan}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="flex-1 flex min-h-[220px] items-center justify-center border border-zinc-800 rounded-3xl p-4 bg-zinc-950 overflow-hidden relative z-10"
            >
              {comp.preview}
            </motion.div>
            <div className="px-4 py-4 mt-auto flex items-center gap-4 relative z-20">
              <div className="h-px bg-zinc-800 flex-1 opacity-50 transition-colors group-hover:bg-[#eb5e28]/40" />
              <Link
                href={comp.href}
                className="text-xs font-bold uppercase tracking-widest text-zinc-500 transition-colors group-hover:text-[#eb5e28] whitespace-nowrap after:absolute after:inset-0"
              >
                {comp.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

