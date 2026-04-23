"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DeleteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onDelete?: () => void;
  holdTime?: number; // in ms
}

export const DeleteButton = ({
  onDelete,
  holdTime = 2000,
  className,
  ...props
}: DeleteButtonProps) => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  const startHolding = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDeleted) return;
    setIsHolding(true);
    startTimeRef.current = Date.now();
    
    // Smoothly start progress
    const interval = 16; // ~60fps updates
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / holdTime) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsDeleted(true);
        setIsHolding(false);
        onDelete?.();
      }
    }, interval);
  };

  const stopHolding = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsHolding(false);
    if (!isDeleted) {
      setProgress(0);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <button
      className={cn(
        "relative min-w-[200px] h-12 rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden group transition-all duration-500 select-none",
        isDeleted ? "border-emerald-500/50 bg-emerald-500/10 cursor-default" : "hover:border-zinc-700 active:scale-[0.98] cursor-pointer",
        className
      )}
      onMouseDown={startHolding}
      onMouseUp={stopHolding}
      onMouseLeave={stopHolding}
      onTouchStart={startHolding}
      onTouchEnd={stopHolding}
      {...props}
    >
      {/* Background Progress Layer */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ x: "-100%" }}
        animate={{
          x: `${progress - 100}%`,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      />

      {/* Button Text */}
      <span className="relative z-10 w-full h-full flex items-center justify-center font-medium">
        <AnimatePresence mode="wait">
          {!isDeleted ? (
            <motion.span
              key="hold-to-delete"
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              animate={{
                color: progress > 50 ? "#000" : "#fff",
              }}
              className="text-sm tracking-wide uppercase font-semibold"
            >
              Hold to Delete
            </motion.span>
          ) : (
            <motion.span
              key="deleted"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              className="text-sm font-bold text-emerald-500 flex items-center gap-2"
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-5 h-5 stroke-current stroke-3"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path 
                  d="M20 6L9 17L4 12" 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                />
              </svg>
              Deleted Successfully
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      {/* Aesthetic Overlay */}
      {!isDeleted && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}
    </button>
  );
};
