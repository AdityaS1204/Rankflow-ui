"use client";

import { motion } from "motion/react";

export default function GlowFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 pb-10 pt-20 text-center">
      {/* Big wordmark with neon glitch effect */}
      <div className="relative inline-block cursor-default">
        <motion.p 
          initial={{ 
            opacity: 0, 
            textShadow: "0 0 0px rgba(255,255,255,0)", 
            color: "rgba(255,255,255,0.05)" 
          }}
          whileInView={{ 
            opacity: [0, 1, 0, 1, 0.5, 1],
            textShadow: [
              "0 0 0px rgba(255,255,255,0)",
              "0 0 40px rgba(255,255,255,0.8)",
              "0 0 0px rgba(255,255,255,0)",
              "0 0 50px rgba(255,255,255,1)",
              "0 0 10px rgba(255,255,255,0.3)",
              "0 0 20px rgba(255,255,255,0.5)"
            ],
            color: [
              "rgba(255,255,255,0)",
              "rgba(255,255,255,1)",
              "rgba(255,255,255,0.05)",
              "rgba(255,255,255,1)",
              "rgba(255,255,255,0.5)",
              "rgba(255,255,255,0.8)"
            ]
          }}
          viewport={{ once: true, margin: "-10px" }}
          transition={{ 
            duration: 1.2, 
            times: [0, 0.1, 0.15, 0.3, 0.5, 1], 
            ease: "circOut" 
          }}
          className="select-none font-geist text-[clamp(3rem,12vw,9rem)] font-extrabold leading-none tracking-tighter"
        >
          RankFlow UI
        </motion.p>
      </div>

      {/* Copyright */}
      <p className="mt-6 text-xs text-neutral-600">
        &copy; {new Date().getFullYear()} RankFlow UI. Open source under MIT.
      </p>
    </footer>
  );
}
