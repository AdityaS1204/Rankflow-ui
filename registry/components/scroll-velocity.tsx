"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ScrollVelocityProps {
  texts?: string[];
  baseVelocity?: number;
  className?: string;
  textClassName?: string;
}

function ParallaxText({
  children,
  baseVelocity = 5,
  className,
}: {
  children: React.ReactNode;
  baseVelocity: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const copies = 10;
  const wrapPercent = 100 / copies;
  
  const x = useTransform(baseX, (v) => `${wrap(-wrapPercent, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap w-full">
      <motion.div
        className="flex whitespace-nowrap text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.9]"
        style={{ x }}
      >
        {Array.from({ length: copies }).map((_, i) => (
          <span className={`block mr-12 ${className ?? ""}`} key={i}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ScrollVelocity({
  texts = ["Rankflow UI is a react component library", "Rankflow UI is a react component library"],
  baseVelocity = 1,
  className = "",
  textClassName = "",
}: ScrollVelocityProps) {
  return (
    <div className={`relative flex flex-col gap-4 py-10 overflow-hidden w-full ${className}`}>
      {texts.map((text, index) => (
        <ParallaxText
          key={index}
          baseVelocity={index % 2 === 0 ? baseVelocity : -baseVelocity}
          className={textClassName}
        >
          {text}
        </ParallaxText>
      ))}
    </div>
  );
}
