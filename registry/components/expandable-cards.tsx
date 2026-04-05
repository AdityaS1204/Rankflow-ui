"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface Card {
  id: number;
  title: string;
  image: string;
  description: string;
}

const DEFAULT_CARDS: Card[] = [
  {
    id: 1,
    title: "Mountain Retreat",
    description: "Experience the ultimate peace at the peak of the world.",
    image: "https://i.pinimg.com/1200x/ee/9e/c4/ee9ec4b4571418e4caa16c9c56a59f6d.jpg?&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Deep Forest",
    description: "Lose yourself in the lush greenery and ancient trees.",
    image: "https://i.pinimg.com/1200x/4f/c8/78/4fc878b19548e5841ca138d4cc0c8223.jpg",
  },
  {
    id: 3,
    title: "Ocean Breeze",
    description: "Feel the salty spray and listen to the rhythmic waves.",
    image: "https://i.pinimg.com/1200x/8f/5f/8e/8f5f8e1b4a9375867a609d2005f2e023.jpg",
  },
  {
    id: 4,
    title: "Golden Desert",
    description: "Stretches of endless sand and mesmerizing dunes.",
    image: "https://i.pinimg.com/736x/4e/bb/ea/4ebbea2302f547e645e1e10f790b02ce.jpg",
  },
];

interface ExpandableCardsProps {
  cards?: Card[];
  className?: string;
}

export function ExpandableCards({ cards = DEFAULT_CARDS, className }: ExpandableCardsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("flex flex-col md:flex-row gap-4 w-full h-[600px] p-4", className)}>
      {cards.map((card, index) => {
        const isHovered = hoveredIndex === index;
        const isNoneHovered = hoveredIndex === null;

        return (
          <motion.div
            key={card.id}
            layout
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              "relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 ease-out",
              isHovered ? "md:flex-4 flex-4" : "md:flex-1 flex-1",
              !isHovered && !isNoneHovered && "opacity-60 grayscale-[0.5]"
            )}
          >
            <motion.img
              layout
              src={card.image}
              alt={card.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 pointer-events-none" />

            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full text-white pointer-events-none overflow-hidden">
              <motion.h3 
                layout
                className="text-2xl font-bold truncate mb-2"
              >
                {card.title}
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0, 
                  y: isHovered ? 0 : 20 
                }}
                transition={{ duration: 0.3, delay: isHovered ? 0.2 : 0 }}
                className={cn(
                  "text-sm text-neutral-200 line-clamp-2 max-w-[400px]",
                  !isHovered && "hidden"
                )}
              >
                {card.description}
              </motion.p>
            </div>

            <div className="absolute inset-0 ring-1 ring-white/10 rounded-3xl pointer-events-none" />
          </motion.div>
        );
      })}
    </div>
  );
}
