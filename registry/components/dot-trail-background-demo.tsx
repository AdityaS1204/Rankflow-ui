"use client";

import React from "react";
import { DotTrailBackground } from "./dot-trail-background";

export function DotTrailBackgroundDemo() {
  return (
    <div className="relative w-full h-[500px] min-h-[450px] overflow-hidden rounded-2xl border border-zinc-800 bg-black flex items-center justify-center">
      <DotTrailBackground
        bgColor="#000000"
        dotColor="#ffffff"
        glowColor="rgba(255, 255, 255, 0.45)"
        strokeWidth={55}
        maxDotSize={6}
        fadeDuration={400}
        gap={22}
        glow={true}
      />

      <div className="relative z-10 max-w-sm p-6 rounded-2xl bg-zinc-950/70 backdrop-blur-md border border-white/10 shadow-2xl text-center space-y-2 pointer-events-none select-none">
        <h3 className="text-xl font-bold tracking-tight text-white">
          Dot Trail Background
        </h3>
        <p className="text-xs text-zinc-400">
          Move your cursor anywhere across the frame to reveal the dynamic glowing dot trail.
        </p>
      </div>
    </div>
  );
}

export default DotTrailBackgroundDemo;
