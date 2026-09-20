"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StackedImageItem {
  id?: string | number;
  src: string;
  alt?: string;
}

export interface StackedImageCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of image URLs or image objects to display.
   */
  images?: (string | StackedImageItem)[];
  /**
   * Width and height of the squarish cards in pixels.
   * @default 160
   */
  cardSize?: number;
  /**
   * Horizontal gap between cards when flattened on hover.
   * @default 14
   */
  flattenGap?: number;
  /**
   * Border radius class for the cards.
   * @default "rounded-2xl"
   */
  borderRadius?: string;
  /**
   * Stagger delay during spring animation.
   * @default 0.04
   */
  staggerDelay?: number;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

const DEFAULT_IMAGES: StackedImageItem[] = [
  {
    id: 1,
    src: "https://i.pinimg.com/736x/96/29/bc/9629bcd13496f8fa64f38d70dde19384.jpg",
    alt: "Abstract Fluid Art 1",
  },
  {
    id: 2,
    src: "https://i.pinimg.com/1200x/f5/57/ac/f557ace3d954787da6a37461a2de03a4.jpg",
    alt: "Neon Cyberpunk Art 2",
  },
  {
    id: 3,
    src: "https://i.pinimg.com/736x/6d/17/e7/6d17e70e69d9c4eef013a327c7cdb1d1.jpg",
    alt: "Prismatic Wave Art 3",
  },
  {
    id: 4,
    src: "https://i.pinimg.com/1200x/7a/99/b4/7a99b4e87386cfbc58ffd19fe07542ae.jpg",
    alt: "Quantum Prism Art 4",
  },
];

export function StackedImageCards({
  images = DEFAULT_IMAGES,
  cardSize = 160,
  flattenGap = 14,
  borderRadius = "rounded-2xl",
  staggerDelay = 0.04,
  className,
  ...props
}: StackedImageCardsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  // Normalize images array to StackedImageItem[]
  const items: StackedImageItem[] = images.map((item, index) =>
    typeof item === "string" ? { id: index, src: item } : { id: item.id ?? index, ...item }
  );

  const count = items.length;
  const centerIndex = (count - 1) / 2;
  const totalFlattenedWidth = count * cardSize + (count - 1) * flattenGap;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredCardIndex(null);
      }}
      className={cn(
        "relative flex items-center justify-center p-4 sm:p-8 min-h-[260px] w-full overflow-visible select-none",
        className
      )}
      {...props}
    >
      {/* Container layout transition */}
      <motion.div
        animate={{
          width: isHovered ? totalFlattenedWidth : cardSize,
        }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 25,
          mass: 0.9,
        }}
        className="relative flex items-center justify-center"
        style={{ height: cardSize }}
      >
        <AnimatePresence>
          {items.map((item, index) => {
            const offsetFromCenter = index - centerIndex;
            const isSingleHovered = hoveredCardIndex === index;

            // Flattened position when section is hovered
            const flattenedX = offsetFromCenter * (cardSize + flattenGap);

            // Target spring values:
            // When unhovered: ALL cards sit at x:0, y:0, rotate:0 so it looks strictly like ONE single card!
            const targetX = isHovered ? flattenedX : 0;
            const targetY = isHovered ? (isSingleHovered ? -8 : 0) : 0;
            const targetRotate = 0;
            const targetScale = isHovered ? (isSingleHovered ? 1.04 : 1) : 1;
            const zIndex = isSingleHovered ? 40 : count - index;

            return (
              <motion.div
                key={item.id ?? index}
                initial={{
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  opacity: 1,
                }}
                animate={{
                  x: targetX,
                  y: targetY,
                  rotate: targetRotate,
                  scale: targetScale,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: isHovered ? 260 : 220,
                  damping: isHovered ? 22 : 24,
                  mass: 0.8,
                  delay: isHovered ? index * staggerDelay : (count - 1 - index) * (staggerDelay * 0.6),
                }}
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                style={{
                  width: cardSize,
                  height: cardSize,
                  zIndex,
                }}
                className={cn(
                  "absolute overflow-hidden cursor-pointer shadow-lg transition-shadow duration-300 p-0 border-0 outline-none",
                  borderRadius,
                  isSingleHovered ? "shadow-2xl shadow-black/40 dark:shadow-black/70" : "shadow-md shadow-black/20"
                )}
              >
                {/* Pure Image Card - No Padding, No Border, No Text */}
                <img
                  src={item.src}
                  alt={item.alt || `Card ${index + 1}`}
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default StackedImageCards;
