"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { AnimatedBorderButton } from "@/registry/components/animated-border";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white overflow-hidden relative">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <main className="relative z-10 flex flex-col items-center text-center px-6">
        {/* The glitchy 404 */}
        <div className="relative group">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 1, 0.8, 1, 0.5, 1],
              scale: [0.8, 1.1, 0.95, 1],
              textShadow: [
                "0 0 0px rgba(59,130,246,0)",
                "0 0 40px rgba(59,130,246,0.8)",
                "0 0 0px rgba(59,130,246,0)",
                "0 0 80px rgba(59,130,246,1)",
                "0 0 20px rgba(59,130,246,0.3)",
                "0 0 40px rgba(59,130,246,0.5)"
              ]
            }}
            transition={{
              duration: 1.5,
              times: [0, 0.2, 0.3, 0.5, 0.7, 1],
              ease: "easeInOut"
            }}
            className="text-[clamp(6rem,20vw,15rem)] tracking-tighter leading-none select-none font-semibold"
          >
            404
          </motion.h1>

          {/* Glitch layers */}
          <motion.h1
            animate={{
              x: [-2, 2, -1, 1, 0],
              opacity: [0, 0.3, 0, 0.2, 0]
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatType: "mirror",
              repeatDelay: 2
            }}
            className="absolute inset-0 text-[clamp(6rem,20vw,15rem)] font-black tracking-tighter leading-none text-red-500/30 mix-blend-screen pointer-events-none"
          >
            404
          </motion.h1>
          <motion.h1
            animate={{
              x: [2, -2, 1, -1, 0],
              opacity: [0, 0.3, 0, 0.2, 0]
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatType: "mirror",
              repeatDelay: 2.5
            }}
            className="absolute inset-0 text-[clamp(6rem,20vw,15rem)] font-black tracking-tighter leading-none text-blue-500/30 mix-blend-screen pointer-events-none"
          >
            404
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-200">
            Lost in the glow?
          </h2>
          <p className="text-zinc-500 max-w-md mx-auto">
            The page you are looking for might have been moved, deleted, or never existed in the first place.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12"
        >
          <Link href="/">
            <AnimatedBorderButton color="#3b82f6" duration={3} className="px-8 py-3 text-base rounded-xl">
              Return to Safety
            </AnimatedBorderButton>
          </Link>
        </motion.div>
      </main>

      {/* Floating 404s in background */}
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          initial={{
            opacity: 0,
            x: Math.random() * 100 - 50 + "%",
            y: Math.random() * 100 - 50 + "%",
            scale: Math.random() * 0.5 + 0.8
          }}
          animate={{
            opacity: [0, 0.05, 0],
            y: ["-12%", "12%"]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className="absolute text-9xl font-black text-white/20 pointer-events-none select-none blur-sm"
        >
          404
        </motion.span>
      ))}
    </div>
  );
}
