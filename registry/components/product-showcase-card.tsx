"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductShowcaseCardProps {
  title?: string;
  subtitle?: string;
  price?: string;
  images?: string[];
  className?: string;
}

export function ProductShowcaseCard({
  title = "Nike Air Max 270",
  subtitle = "Men's Everyday Sneakers laid back style with maximum comfort.",
  price = "$150",
  images = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop",
  ],
  className,
}: ProductShowcaseCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const slideVariants: Variants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <div className="w-full flex items-center justify-center p-8 font-sans">
      <div
        className={cn(
          "w-full max-w-[320px] sm:max-w-[340px] bg-white rounded-2xl shadow-2xl border border-neutral-50 flex flex-col p-2 sm:p-3 overflow-hidden",
          className
        )}
      >
        {/* Carousel Section */}
        <div className="relative w-full aspect-square bg-neutral-100 rounded-xl overflow-hidden group">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              custom={direction}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 w-full h-full object-cover"
              alt={`${title} view ${currentIndex + 1}`}
            />
          </AnimatePresence>

          {/* Hover Arrow Controls */}
          <div className="absolute inset-x-0 inset-y-1/2 -mt-6 flex justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button
              onClick={prevImage}
              className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center text-neutral-900 hover:bg-white/70 hover:scale-105 active:scale-95 transition-all shadow-sm pointer-events-auto"
            >
              <ChevronLeft className="w-6 h-6 mr-0.5" />
            </button>
            <button
              onClick={nextImage}
              className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center text-neutral-900 hover:bg-white/70 hover:scale-105 active:scale-95 transition-all shadow-sm pointer-events-auto"
            >
              <ChevronRight className="w-6 h-6 ml-0.5" />
            </button>
          </div>

          {/* Merged Pill Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2 p-1.5 bg-black/30 backdrop-blur-md rounded-full shadow-md border border-white/10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  className="relative group focus:outline-none"
                >
                  {/* Invisible hit area for easier tapping */}
                  <span className="absolute inset-[-4px]" />
                  <motion.div
                    layout
                    className={cn(
                      "h-1.5 rounded-full transition-colors",
                      i === currentIndex
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/50 group-hover:bg-white/80"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="pt-3 pb-2 px-3 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-xl text-neutral-900 tracking-tight leading-none mt-1">
                {title}
              </h3>
              <div className="font-bold text-sm text-neutral-900 bg-neutral-100 px-3 py-1.5 rounded-full tracking-tight">
                {price}
              </div>
            </div>
            <p className="text-neutral-500 text-sm font-medium leading-relaxed pr-2">
              {subtitle}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3">
            <button className="flex-1 bg-black text-white h-12 rounded-full flex items-center justify-center gap-2 font-semibold text-[15px] shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Buy Now
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={cn(
                "w-12 h-12 shrink-0 rounded-full flex items-center justify-center hover:scale-[1.05] active:scale-[0.95] transition-all border",
                isBookmarked 
                  ? "bg-neutral-100 border-neutral-200" 
                  : "bg-white border-neutral-200 shadow-sm"
              )}
            >
              <Bookmark
                className={cn(
                  "w-5 h-5 transition-all",
                  isBookmarked
                    ? "fill-black text-black scale-105"
                    : "text-neutral-600 fill-transparent"
                )}
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
