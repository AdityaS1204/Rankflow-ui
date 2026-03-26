"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

export interface StackCardItem {
  id: string | number;
  heading: string;
  description: string;
  image: string;
  imagePosition?: "top" | "bottom";
}

const defaultItems: StackCardItem[] = [
  {
    id: 1,
    heading: "Phase 1: Planning",
    description: "We will definitely finish this over the weekend.",
    image: "https://images.unsplash.com/photo-1773751392423-212463aa28c2?q=80&w=711&auto=format&fit=crop", 
    imagePosition: "top",
  },
  {
    id: 2,
    heading: "Phase 2: Coding",
    description: "99 bugs in the code. Patch one down... 127 bugs around.",
    image: "https://images.unsplash.com/photo-1773751392380-94b3eddea80b?q=80&w=711&auto=format&fit=crop", 
    imagePosition: "bottom",
  },
  {
    id: 3,
    heading: "Phase 3: Deployment",
    description: "Nothing crashed! ...Did anyone actually test this?",
    image: "https://images.unsplash.com/photo-1773761193273-fc6eaacf9392?q=80&w=711&auto=format&fit=crop", 
    imagePosition: "top",
  },
];

export function StackCard({ items = defaultItems }: { items?: StackCardItem[] }) {
  const [cards, setCards] = useState(items);

  // Auto-rotate the deck
  useEffect(() => {
    const timer = setInterval(() => {
      setCards((prev) => {
        const newArray = [...prev];
        const first = newArray.shift();
        if (first) newArray.push(first);
        return newArray;
      });
    }, 4000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[320px] aspect-3/4 mx-auto perspective-1000">
      {cards.map((card, index) => {
        const isFront = index === 0;
        const scale = 1 - index * 0.04;
        const yOffset = index * 24; 
        const zIndex = cards.length - index;
        const opacity = index > 2 ? 0 : 1;

        return (
          <motion.div
            key={card.id}
            layout
            initial={false}
            animate={{
              scale: scale,
              y: yOffset,
              zIndex: zIndex,
              opacity: opacity,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 24,
              mass: 0.8,
            }}
            className={`absolute inset-0 w-full h-full rounded-[36px] overflow-hidden flex shadow-2xl will-change-transform ${
              "bg-white/10 dark:bg-black/30 backdrop-blur-[32px] border border-white/30 dark:border-white/10"
            }`}
          >
            <div
              className={`flex w-full h-full p-4 gap-4 ${
                card.imagePosition === "top" ? "flex-col" : "flex-col-reverse"
              }`}
            >
              <div
                className={`flex-1 w-full rounded-[24px] overflow-hidden relative shadow-inner ${
                  "border border-black/5 dark:border-white/5 bg-white/20 dark:bg-black/20"
                }`}
              >
                <img
                  src={card.image}
                  alt={card.heading}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>

              <div
                className={`flex-none px-2 ${
                  card.imagePosition === "top" ? "pb-2 pt-1" : "pt-2 pb-1"
                } text-neutral-800 dark:text-neutral-50 text-left`}
              >
                <h3 className="text-[22px] leading-tight font-bold tracking-tight">
                  {card.heading}
                </h3>
                <p className="text-[15px] font-medium opacity-70 mt-1 line-clamp-2">
                  {card.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
