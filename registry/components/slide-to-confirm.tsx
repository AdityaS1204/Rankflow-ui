"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate, PanInfo } from "motion/react";
import { ChevronsRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SlideToConfirmProps {
  text?: string;
  confirmedText?: string;
  onConfirm?: () => void | Promise<void>;
  onReset?: () => void;
  isConfirmed?: boolean;
  disabled?: boolean;
  className?: string;
}

export function SlideToConfirm({
  text = "Slide to confirm",
  confirmedText = "Confirmed",
  onConfirm,
  onReset,
  isConfirmed: controlledIsConfirmed,
  disabled = false,
  className,
}: SlideToConfirmProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const [internalConfirmed, setInternalConfirmed] = useState(false);
  const [maxDragDistance, setMaxDragDistance] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);

  const isConfirmed = controlledIsConfirmed ?? internalConfirmed;
  const x = useMotionValue(0);

  const THUMB_SIZE = 48; // w-12
  const PADDING = 4;

  const updateDragDistance = useCallback(() => {
    if (containerRef.current && handleRef.current) {
      const cw = containerRef.current.clientWidth;
      const hw = handleRef.current.clientWidth;
      const distance = Math.max(1, cw - hw - PADDING * 2);
      setMaxDragDistance(distance);
      setContainerWidth(cw);
      if (isConfirmed && distance > 0) x.set(distance);
    }
  }, [isConfirmed, x]);

  useEffect(() => {
    updateDragDistance();
    window.addEventListener("resize", updateDragDistance);
    return () => window.removeEventListener("resize", updateDragDistance);
  }, [updateDragDistance]);

  useEffect(() => {
    if (isConfirmed && maxDragDistance > 0) {
      animate(x, maxDragDistance, { type: "spring", stiffness: 400, damping: 35 });
    } else if (!isConfirmed) {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 35 });
    }
  }, [isConfirmed, maxDragDistance, x]);

  // Fill starts at thumb width and grows rightward as thumb moves
  // Anchored left — grows from the thumb's starting side
  const fillWidth = useTransform(
    x,
    [0, maxDragDistance],
    [THUMB_SIZE + PADDING * 2, containerWidth - PADDING * 2]
  );

  const textOpacity = useTransform(x, [0, maxDragDistance * 0.55], [1, 0]);

  const handleDragEnd = async (_: any, info: PanInfo) => {
    if (disabled || isConfirmed) return;
    const currentX = x.get();
    if (currentX >= maxDragDistance * 0.85) {
      animate(x, maxDragDistance, { type: "spring", stiffness: 400, damping: 35 });
      setInternalConfirmed(true);
      try {
        await onConfirm?.();
      } catch {
        setInternalConfirmed(false);
        animate(x, 0, { type: "spring", stiffness: 400, damping: 35 });
      }
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  };

  const handleReset = () => {
    setInternalConfirmed(false);
    animate(x, 0, { type: "spring", stiffness: 400, damping: 35 });
    onReset?.();
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center h-14 p-1 rounded-full select-none overflow-hidden touch-none",
        "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      {/* Fill — anchored LEFT, expands rightward from the thumb side */}
      <motion.div
        className="absolute left-1 top-1 bottom-1 z-0 rounded-full bg-black dark:bg-white"
        style={{ width: fillWidth }}
      />

      {/* Label text */}
      <motion.span
        style={{ opacity: isConfirmed ? 0 : textOpacity }}
        className="absolute inset-0 flex items-center justify-center text-sm font-semibold tracking-wider uppercase pointer-events-none z-10 text-zinc-400 dark:text-zinc-500"
      >
        {text}
      </motion.span>

      {/* Confirmed label */}
      {isConfirmed && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={handleReset}
          className="absolute inset-0 flex items-center justify-center text-sm font-semibold tracking-wider cursor-pointer z-10 gap-2 text-white dark:text-black"
        >
          {confirmedText}
        </motion.span>
      )}

      {/* Draggable thumb */}
      <motion.div
        ref={handleRef}
        drag={disabled || isConfirmed ? false : "x"}
        dragConstraints={{ left: 0, right: maxDragDistance }}
        dragElastic={0.05}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ x }}
        whileHover={disabled || isConfirmed ? {} : { scale: 1.05 }}
        whileTap={disabled || isConfirmed ? {} : { scale: 0.96 }}
        className="relative z-20 flex items-center justify-center w-11 h-11 rounded-full cursor-grab active:cursor-grabbing bg-black dark:bg-white text-white dark:text-black"
      >
        {isConfirmed ? (
          <Check className="w-5 h-5 stroke-[2.5]" />
        ) : (
          <ChevronsRight className="ml-3.5 w-5 h-5 stroke-[2.5]" />
        )}
      </motion.div>
    </div>
  );
}

export default SlideToConfirm;
