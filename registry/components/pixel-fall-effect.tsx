"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface PixelFallEffectProps {
  className?: string;
  children?: React.ReactNode;
  defaultColor?: string;
  hoverColor?: string;
  pixelSize?: number;
  direction?: "random" | "up" | "down" | "center";
}

export function PixelFallEffect({
  className,
  children,
  defaultColor = "#2563eb", 
  hoverColor = "#e6b400", 
  pixelSize = 4,    
  direction = "center",
}: PixelFallEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isHoveredRef = useRef(false);
  const timeActiveBase = useRef(0); 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let pixels: any[] = [];

    const initPixels = (width: number, height: number) => {
      pixels = [];
      
      const rows = Math.ceil(height / pixelSize) + 2;
      const cols = Math.ceil(width / pixelSize) + 2;

      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const x = c * pixelSize;
          const y = r * pixelSize;
          
          let delay = 0;
          switch (direction) {
            case "random":
              delay = Math.random() * 600;
              break;
            case "up":
              delay = (r * 25) + (Math.random() * 200);
              break;
            case "down":
              delay = ((rows - r) * 25) + (Math.random() * 200);
              break;
            case "center":
              const centerR = rows / 2;
              const centerC = cols / 2;
              const dist = Math.sqrt(Math.pow(r - centerR, 2) + Math.pow(c - centerC, 2));
              delay = (dist * 20) + (Math.random() * 150);
              break;
          }
          
          pixels.push({
            x,
            y,
            originalY: y,
            delay,
          });
        }
      }
    };

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout: NodeJS.Timeout;
    const resize = () => {
      const rect = parent.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);

      initPixels(rect.width, rect.height);
    };

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 50); // Debounce resize to prevent stuttering
    });
    resizeObserver.observe(parent);
    
    // Initial call
    resize();

    let lastTime = performance.now();

    const render = (time: number) => {
      if (!canvas || !ctx) return;
      
      const dt = time - lastTime;
      lastTime = time;

      if (isHoveredRef.current) {
        timeActiveBase.current += dt;
      } else {
        timeActiveBase.current -= dt * 1.5; 
        if (timeActiveBase.current < 0) timeActiveBase.current = 0;
      }

      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      ctx.fillStyle = defaultColor;

      const dpr = window.devicePixelRatio || 1;
      const logicalHeight = canvas.height / dpr;

      for (let p of pixels) {
        if (timeActiveBase.current > p.delay) {
           const activeTime = timeActiveBase.current - p.delay;
           const t = activeTime / 30; 
           p.y = p.originalY + (0.5 * 1.2 * t * t);
        } else {
           p.y = p.originalY;
        }

        if (p.y < logicalHeight + pixelSize) {
           ctx.fillRect(p.x, p.y, pixelSize + 0.5, pixelSize + 0.5);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [defaultColor, pixelSize, direction]);

  return (
    <div
      onMouseEnter={() => (isHoveredRef.current = true)}
      onMouseLeave={() => (isHoveredRef.current = false)}
      className={cn(
        "group relative overflow-hidden transition-colors duration-1000 min-h-[350px] w-full max-w-sm rounded-3xl",
        className
      )}
      style={{ backgroundColor: hoverColor }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full block"
      />
      <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between">
        {children || (
           <>
            <div className="flex justify-between items-start">
              <div className="font-mono text-white/80 drop-shadow-md bg-black/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <p className="text-xs font-bold tracking-widest uppercase">Canvas Effect</p>
              </div>
            </div>
            
            <div className="flex flex-col grow justify-end pb-4 mt-12">
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-[0.9] mix-blend-overlay">
                <span className="block drop-shadow-sm">Digital</span>
                <span className="block drop-shadow-sm text-transparent [-webkit-text-stroke:1px_#fff]">Shatter</span>
              </h2>
              <p className="text-white/80 text-sm mt-3 font-medium max-w-[200px]">
                Interactive structural physics built natively.
              </p>
            </div>
            
            <div className="flex justify-between items-center border-t border-white/20 pt-4 mt-auto">
               <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Hover to reveal</span>
               <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-transform hover:scale-110 shadow-lg cursor-pointer">
                 <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
               </div>
            </div>
           </>
        )}
      </div>
    </div>
  );
}
