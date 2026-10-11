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

      <div className="relative z-10 max-w-sm p-3 rounded-xl bg-zinc-950/70 backdrop-blur-md border border-white/10 shadow-2xl text-center space-y-2 pointer-events-none select-none">
        <h3 className="text-lg font-medium text-white">
          Move your cursor
        </h3>
       
      </div>
    </div>
  );
}

export default DotTrailBackgroundDemo;
