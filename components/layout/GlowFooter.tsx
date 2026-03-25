"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function GlowFooter() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";
  const baseColor = isDark ? "255, 255, 255" : "0, 0, 0";

  return (
    <footer className="relative overflow-hidden border-t border-border/50 pb-10 pt-20 text-center">
      <div className="relative inline-block cursor-default">
        {mounted ? (
          <motion.p 
            initial={{ 
              opacity: 0, 
              textShadow: `0 0 0px rgba(${baseColor}, 0)`, 
              color: `rgba(${baseColor}, 0.05)` 
            }}
            whileInView={{ 
              opacity: [0, 1, 0, 1, 0.5, 1],
              textShadow: [
                `0 0 0px rgba(${baseColor}, 0)`,
                `0 0 40px rgba(${baseColor}, 0.8)`,
                `0 0 0px rgba(${baseColor}, 0)`,
                `0 0 50px rgba(${baseColor}, 1)`,
                `0 0 10px rgba(${baseColor}, 0.3)`,
                `0 0 20px rgba(${baseColor}, 0.5)`
              ],
              color: [
                `rgba(${baseColor}, 0)`,
                `rgba(${baseColor}, 1)`,
                `rgba(${baseColor}, 0.05)`,
                `rgba(${baseColor}, 1)`,
                `rgba(${baseColor}, 0.5)`,
                `rgba(${baseColor}, 0.8)`
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
        ) : (
          <p className="select-none font-geist text-[clamp(3rem,12vw,9rem)] font-extrabold leading-none tracking-tighter opacity-0">
            RankFlow UI
          </p>
        )}
      </div>

      <p className="mt-6 text-xs text-muted-foreground/60">
        &copy; {mounted ? new Date().getFullYear() : "2026"} RankFlow UI. Open source under MIT.
      </p>
    </footer>
  );
}
