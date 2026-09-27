"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring, animate, PanInfo } from "motion/react";
import { cn } from "@/lib/utils";

export interface ImageWheelItem {
  id?: string | number;
  src: string;
  alt?: string;
  title?: string;
}

export interface ImageWheelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of image items or URLs */
  images?: (string | ImageWheelItem)[];
  /** Width of each card in pixels */
  cardWidth?: number;
  /** Height of each card in pixels */
  cardHeight?: number;
  /** Radius of the 3D wheel curvature */
  radius?: number;
  /** Angular spacing between cards in degrees */
  angleStep?: number;
  /** Initial active item index */
  defaultIndex?: number;
  /** Whether the wheel loops continuously or has bounds */
  loop?: boolean;
  /** Callback fired when the active center card changes */
  onIndexChange?: (index: number) => void;
  /** Additional CSS classes for outer container */
  className?: string;
}

const DEFAULT_IMAGES: ImageWheelItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    alt: "Tropical beach resort",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
    alt: "Beach aerial view with huts",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    alt: "Rocky ocean coast",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=800&auto=format&fit=crop",
    alt: "Kite surfing in open water",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=800&auto=format&fit=crop",
    alt: "Red phone booth on beach with palm trees",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
    alt: "Cruise deck railing with life ring",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop",
    alt: "Boat moored in turquoise ocean",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800&auto=format&fit=crop",
    alt: "Coastal cliff sunset",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=800&auto=format&fit=crop",
    alt: "Vintage ferris wheel cabins against blue sky",
  },
];

export function ImageWheel({
  images = DEFAULT_IMAGES,
  cardWidth = 220,
  cardHeight = 220,
  radius = 520,
  angleStep = 24,
  defaultIndex = 4,
  loop = false,
  onIndexChange,
  className,
  ...props
}: ImageWheelProps) {
  const normalizedItems = useMemo<ImageWheelItem[]>(() => {
    return images.map((item, idx) =>
      typeof item === "string" ? { id: idx, src: item, alt: `Image ${idx + 1}` } : item
    );
  }, [images]);

  const total = normalizedItems.length;
  const initialRotation = defaultIndex * angleStep;

  // Rotation in degrees
  const rotation = useMotionValue(initialRotation);
  const smoothRotation = useSpring(rotation, { stiffness: 350, damping: 35, mass: 0.8 });
  const [currentAngle, setCurrentAngle] = useState(initialRotation);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartAngle = useRef(initialRotation);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state with spring updates for fluid rendering
  useEffect(() => {
    const unsubscribe = smoothRotation.on("change", (latest) => {
      setCurrentAngle(latest);
      const activeIdx = Math.round(latest / angleStep);
      const boundedIdx = loop
        ? ((activeIdx % total) + total) % total
        : Math.max(0, Math.min(total - 1, activeIdx));
      onIndexChange?.(boundedIdx);
    });
    return () => unsubscribe();
  }, [smoothRotation, angleStep, loop, total, onIndexChange]);

  const snapToNearest = useCallback(
    (velocity = 0) => {
      const current = rotation.get();
      // Add velocity impulse for realistic flick inertia
      const projected = current + velocity * 0.15;
      let targetIndex = Math.round(projected / angleStep);

      if (!loop) {
        targetIndex = Math.max(0, Math.min(total - 1, targetIndex));
      }

      const targetAngle = targetIndex * angleStep;
      animate(rotation, targetAngle, {
        type: "spring",
        stiffness: 300,
        damping: 32,
      });
    },
    [rotation, angleStep, loop, total]
  );

  const handlePanStart = () => {
    setIsDragging(true);
    dragStartAngle.current = rotation.get();
  };

  const handlePan = (_: any, info: PanInfo) => {
    // Only track horizontal delta
    const deltaX = info.offset.x;
    // Map horizontal pixels to rotational degrees
    const degreesPerPixel = 0.22;
    let newAngle = dragStartAngle.current - deltaX * degreesPerPixel;

    if (!loop) {
      const minAngle = 0;
      const maxAngle = (total - 1) * angleStep;
      if (newAngle < minAngle) {
        // Elastic resistance at the left boundary
        const overscroll = minAngle - newAngle;
        newAngle = minAngle - Math.pow(overscroll, 0.75) * 1.5;
      } else if (newAngle > maxAngle) {
        // Elastic resistance at the right boundary
        const overscroll = newAngle - maxAngle;
        newAngle = maxAngle + Math.pow(overscroll, 0.75) * 1.5;
      }
    }

    rotation.set(newAngle);
  };

  const handlePanEnd = (_: any, info: PanInfo) => {
    setIsDragging(false);
    snapToNearest(-info.velocity.x);
  };

  const handleCardClick = (index: number) => {
    if (isDragging) return;
    const targetAngle = index * angleStep;
    animate(rotation, targetAngle, {
      type: "spring",
      stiffness: 320,
      damping: 32,
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        const currentIdx = Math.round(rotation.get() / angleStep);
        const nextIdx = loop ? currentIdx - 1 : Math.max(0, currentIdx - 1);
        animate(rotation, nextIdx * angleStep, { type: "spring", stiffness: 350, damping: 35 });
      } else if (e.key === "ArrowRight") {
        const currentIdx = Math.round(rotation.get() / angleStep);
        const nextIdx = loop ? currentIdx + 1 : Math.min(total - 1, currentIdx + 1);
        animate(rotation, nextIdx * angleStep, { type: "spring", stiffness: 350, damping: 35 });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [rotation, angleStep, loop, total]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-[480px] flex items-center justify-center overflow-hidden select-none touch-none",
        "bg-transparent cursor-grab active:cursor-grabbing",
        className
      )}
      style={{ perspective: "1200px" }}
      {...props}
    >
      {/* 3D Wheel Stage */}
      <motion.div
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        className="relative w-full h-full flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {normalizedItems.map((item, idx) => {
          // Angle offset from the front-center focal point
          const itemAngle = idx * angleStep;
          let delta = itemAngle - currentAngle;

          if (loop) {
            const wheelCircumference = total * angleStep;
            delta = ((((delta + wheelCircumference / 2) % wheelCircumference) + wheelCircumference) % wheelCircumference) - wheelCircumference / 2;
          }

          // Compute 3D Cylindrical Coordinates
          const rad = (delta * Math.PI) / 180;
          const x = Math.sin(rad) * radius;
          const z = Math.cos(rad) * radius - radius;
          const rotateY = delta;

          // Parabolic subtle vertical curve for depth perspective
          const absDelta = Math.abs(delta);
          const y = Math.pow(absDelta / 20, 1.8) * 1.5;

          // Depth-of-Field Blur Calculation:
          // Front-center: 0px blur
          // Adjacent card (1 step): ~2.5px blur
          // Distant cards (2+ steps): 6px - 14px blur
          const blurAmount = Math.min(14, Math.pow(absDelta / angleStep, 1.4) * 2.2);

          // Opacity & scale falloff with distance
          const opacity = Math.max(0.2, 1 - Math.pow(absDelta / 90, 1.5) * 0.7);
          const scale = Math.max(0.68, 1 - Math.pow(absDelta / 100, 1.3) * 0.28);

          // Stacking order: Front-most items always on top
          const zIndex = Math.round(1000 - absDelta * 10);

          // Active center card indicator
          const isCenter = absDelta < angleStep * 0.45;

          return (
            <motion.div
              key={item.id ?? idx}
              onClick={() => handleCardClick(idx)}
              className={cn(
                "absolute rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-300",
                "border border-black/10 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 cursor-pointer",
                isCenter
                  ? "ring-1 ring-black/20 dark:ring-white/20 shadow-2xl shadow-black/40 dark:shadow-black/90"
                  : "hover:border-black/20 dark:hover:border-white/25"
              )}
              style={{
                width: cardWidth,
                height: cardHeight,
                transformStyle: "preserve-3d",
                transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                opacity,
                filter: `blur(${blurAmount}px)`,
                willChange: "transform, filter, opacity",
              }}
            >
              <img
                src={item.src}
                alt={item.alt || `Wheel item ${idx + 1}`}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
              />

              {/* Edge gradient overlay for cinematic contrast */}
              <div
                className={cn(
                  "absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300",
                  isCenter ? "bg-transparent" : "bg-black/10 dark:bg-black/25"
                )}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default ImageWheel;
