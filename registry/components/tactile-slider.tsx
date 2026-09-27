"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "motion/react";
import { cn } from "@/lib/utils";

// ── Rolling Odometer Digit ───────────────────────────────────────────────────

function RollingDigit({ digit }: { digit: string }) {
  const num = parseInt(digit, 10);
  if (isNaN(num)) {
    return <span className="inline-block">{digit}</span>;
  }

  return (
    <span className="inline-block h-[1.25em] overflow-hidden align-middle leading-none relative w-[0.62em]">
      <motion.span
        className="flex flex-col absolute left-0 top-0 w-full"
        animate={{ y: `-${num * 10}%` }}
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span
            key={n}
            className="h-[1.25em] flex items-center justify-center select-none"
          >
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function RollingValue({
  value,
  unit = "%",
}: {
  value: number;
  unit?: string;
}) {
  const rounded = Math.round(value);
  const str = rounded.toString();

  return (
    <div className="inline-flex items-center font-mono font-semibold tracking-tight text-xs">
      {str.split("").map((ch, idx) => (
        <RollingDigit key={`${str.length - idx}-${ch}`} digit={ch} />
      ))}
      {unit && (
        <span className="ml-0.5 text-[10px] font-sans font-medium text-zinc-400">
          {unit}
        </span>
      )}
    </div>
  );
}

// ── Tactile Slider Constants & Types ──────────────────────────────────────────

const TRACK_PADDING = 6; // px inner padding
const THUMB_WIDTH = 22; // px thumb width
const THUMB_HALF = THUMB_WIDTH / 2;

export interface TactileSliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Current value of the slider (0 - 100 by default) */
  value?: number;
  /** Default initial value */
  defaultValue?: number;
  /** Minimum slider value */
  min?: number;
  /** Maximum slider value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Number of tick marks rendered along track */
  ticks?: number;
  /** Unit displayed next to the rolling number (e.g. "%") */
  unit?: string;
  /** Whether to show the floating rolling percentage badge */
  showValueBadge?: boolean;
  /** Callback fired when value changes */
  onChange?: (value: number) => void;
  /** Callback fired when dragging completes */
  onChangeEnd?: (value: number) => void;
  /** Disable slider interactions */
  disabled?: boolean;
  /** Additional wrapper CSS classes */
  className?: string;
}

export function TactileSlider({
  value: controlledValue,
  defaultValue = 38,
  min = 0,
  max = 100,
  step = 1,
  ticks = 9,
  unit = "%",
  showValueBadge = true,
  onChange,
  onChangeEnd,
  disabled = false,
  className,
  ...props
}: TactileSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const [internalValue, setInternalValue] = useState(
    controlledValue ?? defaultValue
  );
  const [isDragging, setIsDragging] = useState(false);

  const currentValue = controlledValue ?? internalValue;
  const clampedValue = Math.max(min, Math.min(max, currentValue));
  const normalizedProgress = (clampedValue - min) / (max - min || 1);

  // Controller moves 1:1 directly with drag cursor
  const x = useMotionValue(0);

  // Floating number box moves with smooth inertia spring lag effect
  const badgeX = useSpring(x, {
    stiffness: 220,
    damping: 22,
    mass: 0.5,
  });

  const getUsableWidth = useCallback(() => {
    if (!trackRef.current) return 0;
    const width = trackRef.current.clientWidth;
    return Math.max(0, width - 2 * TRACK_PADDING - THUMB_WIDTH);
  }, []);

  // Sync motion value when external value changes or on initial layout
  useEffect(() => {
    if (!isDraggingRef.current) {
      const usable = getUsableWidth();
      if (usable > 0) {
        const targetPixel = normalizedProgress * usable;
        animate(x, targetPixel, {
          type: "spring",
          stiffness: 400,
          damping: 35,
        });
      }
    }
  }, [normalizedProgress, getUsableWidth, x]);

  // Window resize listener
  useEffect(() => {
    const handleResize = () => {
      const usable = getUsableWidth();
      if (usable > 0 && !isDraggingRef.current) {
        x.set(normalizedProgress * usable);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getUsableWidth, normalizedProgress, x]);

  const calculateValueFromPointer = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const usableWidth = Math.max(0, rect.width - 2 * TRACK_PADDING - THUMB_WIDTH);
      const pointerOffset = clientX - rect.left - TRACK_PADDING - THUMB_HALF;
      const clampedPixel = Math.max(0, Math.min(usableWidth, pointerOffset));

      // Direct 1:1 motion value update
      x.set(clampedPixel);

      const fraction = usableWidth > 0 ? clampedPixel / usableWidth : 0;
      const rawVal = min + fraction * (max - min);
      const steppedVal =
        Math.round((rawVal - min) / step) * step + min;
      const clampedSteppedVal = Math.max(min, Math.min(max, steppedVal));

      if (controlledValue === undefined) {
        setInternalValue(clampedSteppedVal);
      }
      onChange?.(clampedSteppedVal);
      return clampedSteppedVal;
    },
    [min, max, step, controlledValue, onChange, x]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);

    calculateValueFromPointer(e.clientX);

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!isDraggingRef.current) return;
      moveEvent.preventDefault();
      calculateValueFromPointer(moveEvent.clientX);
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);

      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);

      const finalVal = calculateValueFromPointer(upEvent.clientX);
      if (finalVal !== undefined) {
        onChangeEnd?.(finalVal);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUp, { passive: false });
    window.addEventListener("pointercancel", onPointerUp, { passive: false });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    let nextVal = clampedValue;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      nextVal = Math.min(max, clampedValue + step);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      nextVal = Math.max(min, clampedValue - step);
    } else if (e.key === "Home") {
      nextVal = min;
    } else if (e.key === "End") {
      nextVal = max;
    } else {
      return;
    }

    e.preventDefault();
    if (controlledValue === undefined) {
      setInternalValue(nextVal);
    }
    onChange?.(nextVal);
    onChangeEnd?.(nextVal);
  };

  // Fill bar expands with the thumb position
  const fillWidth = useTransform(
    x,
    (currentX) => `${Math.max(0, currentX + THUMB_HALF)}px`
  );

  return (
    <div
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={clampedValue}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative w-full flex flex-col items-center select-none touch-none py-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-2xl",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    >
      {/* Track & Thumb Container with Neomorphic Sunken Inset Shadows */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        className={cn(
          "relative w-full h-12 rounded-2xl cursor-grab active:cursor-grabbing",
          "bg-[#e5ecf4] dark:bg-[#141417]",
          "shadow-[inset_3px_3px_6px_rgba(163,177,198,0.7),inset_-3px_-3px_6px_rgba(255,255,255,0.9),0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[inset_3px_3px_7px_rgba(0,0,0,0.9),inset_-2px_-2px_6px_rgba(255,255,255,0.06),0_2px_4px_rgba(0,0,0,0.5)]",
          "border border-black/5 dark:border-white/5 overflow-visible flex items-center",
          isDragging && "cursor-grabbing"
        )}
      >
        {/* Floating Neomorphic Value Badge moving with INERTIAL SPRING effect */}
        {showValueBadge && (
          <motion.div
            style={{
              x: badgeX,
              left: `${TRACK_PADDING + THUMB_HALF}px`,
            }}
            className="absolute -top-11 -translate-x-1/2 z-30 pointer-events-none will-change-transform"
          >
            <div
              className={cn(
                "relative px-2.5 py-1 rounded-lg flex items-center justify-center",
                "text-zinc-800 dark:text-white",
                "bg-gradient-to-b from-[#ffffff] to-[#e4e9f2] dark:from-[#24242a] dark:to-[#1a1a1f]",
                "shadow-[4px_4px_10px_rgba(163,177,198,0.7),-2px_-2px_6px_rgba(255,255,255,0.9)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.7),-2px_-2px_6px_rgba(255,255,255,0.09)]",
                "border border-black/5 dark:border-white/10 backdrop-blur-md",
                isDragging ? "scale-105 ring-1 ring-black/10 dark:ring-white/20" : "",
                "transition-all duration-200"
              )}
            >
              <RollingValue value={clampedValue} unit={unit} />

              {/* Triangle pointer arrow */}
              <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#e4e9f2] dark:bg-[#1a1a1f] border-r border-b border-black/5 dark:border-white/10 shadow-sm" />
            </div>
          </motion.div>
        )}

        {/* Filled Track Segment (Neomorphic Embossed Gradient) */}
        <motion.div
          className={cn(
            "absolute top-[6px] bottom-[6px] rounded-l-xl overflow-hidden pointer-events-none",
            "bg-gradient-to-r from-[#b8c2d1] to-[#98a5b8] dark:from-[#323238] dark:to-[#484852]",
            "shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.4)]",
            "border-r border-black/5 dark:border-white/10"
          )}
          style={{
            left: `${TRACK_PADDING}px`,
            width: fillWidth,
          }}
        />

        {/* Inset Notched Tick Marks */}
        <div className="absolute inset-0 flex items-center justify-between px-7 pointer-events-none z-10">
          {Array.from({ length: ticks }).map((_, idx) => (
            <span
              key={idx}
              className="w-[1.5px] h-3.5 rounded-full bg-zinc-400/80 dark:bg-black/60 shadow-[0.5px_0.5px_1px_rgba(255,255,255,0.9)] dark:shadow-[0.5px_0.5px_1px_rgba(255,255,255,0.12)] transition-colors"
            />
          ))}
        </div>

        {/* Convex Neomorphic Tactile Thumb (Moves normally 1:1 with pointer) */}
        <motion.div
          style={{
            x,
            left: `${TRACK_PADDING}px`,
            width: `${THUMB_WIDTH}px`,
          }}
          className={cn(
            "absolute top-[6px] bottom-[6px] z-20 rounded-xl",
            "bg-gradient-to-b from-[#ffffff] to-[#d6ddea] dark:from-[#ededf0] dark:to-[#c2c2c6]",
            "shadow-[3px_3px_7px_rgba(163,177,198,0.75),-2px_-2px_6px_rgba(255,255,255,0.95)] dark:shadow-[3px_3px_8px_rgba(0,0,0,0.75),-2px_-2px_5px_rgba(255,255,255,0.3)]",
            "border border-white/90 dark:border-white/50",
            "flex items-center justify-center pointer-events-none transition-transform duration-100 will-change-transform",
            isDragging
              ? "scale-y-105 brightness-105 shadow-[4px_4px_10px_rgba(163,177,198,0.85),-2px_-2px_6px_rgba(255,255,255,1)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.85),-2px_-2px_6px_rgba(255,255,255,0.35)]"
              : "hover:brightness-105"
          )}
        >
          {/* Inset tactile center ridge */}
          <div className="w-[2px] h-3.5 bg-zinc-400/80 shadow-[inset_0.5px_0.5px_1px_rgba(0,0,0,0.3)] rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}

export default TactileSlider;

