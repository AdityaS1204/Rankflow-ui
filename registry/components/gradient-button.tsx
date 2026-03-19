"use client";

import React, { useState } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { motion } from "motion/react";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const GradientButton = ({ children = "Get Started", className = "", ...props }: GradientButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`group relative flex items-center justify-between overflow-hidden rounded-xl bg-slate-100 w-44 h-12 pl-6 pr-2 font-medium text-slate-800 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-slate-900 dark:text-slate-100 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span className="relative z-10 w-full text-left transition-colors duration-300 group-hover:text-white">{children}</span>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes random-pan {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 50% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-bg-animate {
          background-size: 300% 300%;
          animation: random-pan 2s ease-in-out infinite;
        }
      `}} />

      <motion.div
        className="absolute right-1 top-1 bottom-1 z-0 overflow-hidden rounded-lg"
        initial={{ width: "2.5rem" }}
        animate={{ width: isHovered ? "10.5rem" : "2.5rem" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-yellow-400 via-blue-500 to-yellow-400 gradient-bg-animate" />
      </motion.div>

      <motion.div
        className="absolute right-1 top-1 bottom-1 z-0 rounded-lg blur-md opacity-60"
        initial={{ width: "2.5rem" }}
        animate={{ width: isHovered ? "10.5rem" : "2.5rem" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-yellow-400 via-blue-500 to-yellow-400 gradient-bg-animate" />
      </motion.div>

      <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-white">
        <ArrowRightIcon className="h-5 w-5" />
      </div>
    </button>
  );
};
