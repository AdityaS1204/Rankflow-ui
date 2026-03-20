"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";

export function GradientRingCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(120);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const deg = ((Math.atan2(dy, dx) * 180) / Math.PI + 90 + 360) % 360;
    setAngle(deg);
  }, []);

  const ringGradient = `conic-gradient(
    from ${angle}deg,
    transparent 0%,
    transparent 55%,
    #FF8C42 62%,
    #E040A8 72%,
    #8B5CF6 80%,
    transparent 87%,
    transparent 100%
  ), #000`;

  return (
    <div
      ref={containerRef}
      className="inline-flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* Outer gradient ring — 30% arc follows cursor */}
      <div
        className="relative p-[8px] rounded-[32px]"
        style={{
          background: ringGradient,
          filter: "drop-shadow(0 0 0px rgba(224,64,168,0.30))",
        }}
      >
        {/* Frosted glass overlay on the ring */}
        <div className="absolute inset-0 rounded-[32px] bg-white/10 backdrop-blur-4px pointer-events-none z-10" />

        {/* Inner card — neomorphic shadow creates the gap illusion */}
        <div
          className="relative z-20 w-[360px] rounded-[26px] bg-[#eaeaec] px-6 pt-5 pb-6"
          style={{
            boxShadow: [
              /* bottom-right dark — primary depth */
              "1px 1px 2px rgba(0,0,0,0.45)",
              /* top-left light — reflected highlight */
              "-1px -1px 2px rgba(0,0,0,0.45)",
              /* top-right subtle — depth from top */
              "1px -1px 2px rgba(0,0,0,0.45)",
              /* bottom-left subtle — depth from left */
              "-1px 1px 2px rgba(0,0,0,0.45)",
              /* inner edge highlight for crispness */
              "inset 0 0 0 1px rgba(255,255,255,0.45)",
            ].join(", "),
          }}
        >
          <div className="flex flex-col gap-2 justify-between mb-4">
            <Image src={'https://res.cloudinary.com/dp5tdrmf8/image/upload/v1774034371/neo-robot_ufqzoc.avif'} alt="Image" width={150} height={150} className="rounded-xl w-full h-full" />
            <div>
              <p className="text-2xl text-black font-semibold">Neo Robot</p>
              <p className="text-md text-gray-500  tracking-tight">NEO is a humanoid robot developed by the robotics company 1X (formerly Halodi Robotics) and is designed specifically for domestic use.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
