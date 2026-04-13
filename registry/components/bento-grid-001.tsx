"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const COLORS = [
  { id: 1, name: "Radiant Orange", hex: "#FF4F18", text: "white" },
  { id: 2, name: "Pure White", hex: "#FFFFFF", text: "black", border: true },
  { id: 3, name: "Fog Gray", hex: "#F2F4F7", text: "black", border: true },
  { id: 4, name: "Coal Black", hex: "#141517", text: "white" },
];

export function BentoGrid001() {
  const [bigCardId, setBigCardId] = useState<number>(1);
  const [bigCardSide, setBigCardSide] = useState<"left" | "right">("left");

  const leftCol = bigCardSide === "left" 
    ? COLORS.filter((c) => c.id === bigCardId) 
    : COLORS.filter((c) => c.id !== bigCardId);
    
  const rightCol = bigCardSide === "right" 
    ? COLORS.filter((c) => c.id === bigCardId) 
    : COLORS.filter((c) => c.id !== bigCardId);

  const handleCardClick = (id: number, column: "left" | "right") => {
    if (id === bigCardId) return;
    setBigCardId(id);
    setBigCardSide(column);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 py-12 md:p-8 font-sans">
      <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 h-[800px] sm:h-[500px]">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-4 relative">
          {leftCol.map((color) => (
            <ColorCard
              key={color.id}
              color={color}
              isBig={bigCardId === color.id}
              onClick={() => handleCardClick(color.id, "left")}
            />
          ))}
        </div>
        
        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-4 relative">
          {rightCol.map((color) => (
            <ColorCard
              key={color.id}
              color={color}
              isBig={bigCardId === color.id}
              onClick={() => handleCardClick(color.id, "right")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ColorCard({ 
  color, 
  isBig, 
  onClick 
}: { 
  color: typeof COLORS[0], 
  isBig: boolean, 
  onClick: () => void 
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layoutId={`card-${color.id}`}
      layout
      onClick={onClick}
      style={{ backgroundColor: color.hex }}
      className={cn(
        "rounded-3xl cursor-pointer relative overflow-hidden flex flex-col justify-between p-6 flex-1 transition-shadow",
        color.text === "white" ? "text-white" : "text-neutral-900",
        color.border ? "border border-neutral-200" : "border border-transparent",
        !isBig && "hover:shadow-lg"
      )}
      whileHover={{ scale: isBig ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
    >
      <motion.h3 
        layout="position"
        className={cn(
          "font-medium tracking-tight",
          isBig ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
        )}
      >
        {color.name.split(" ").map((word, i) => (
          <span key={i} className={cn(isBig ? "block" : "inline-block mr-1.5")}>
            {word}
          </span>
        ))}
      </motion.h3>

      <div className="flex justify-end mt-4">
        <motion.button
          layout="position"
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
             "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors backdrop-blur-sm",
            color.text === "white" 
              ? "bg-white/20 hover:bg-white/30 text-white" 
              : "bg-black/5 hover:bg-black/10 text-black"
          )}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 opacity-50" />}
          {copied ? "Copied" : color.hex}
        </motion.button>
      </div>
    </motion.div>
  );
}
