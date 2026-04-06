"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Point {
  x: number;
  y: number;
  timestamp: number;
}

interface DrawingCursorProps extends React.HTMLAttributes<HTMLDivElement> {
  lineColor?: string;
  lineWidth?: number;
  fadeDuration?: number; 
  children?: React.ReactNode;
}

export function DrawingCursor({
  lineColor = "#b6eb00",
  lineWidth = 2,
  fadeDuration = 1000,
  className,
  children,
  ...props
}: DrawingCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      pointsRef.current = pointsRef.current.filter(
        (p) => now - p.timestamp < fadeDuration
      );

      if (pointsRef.current.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = lineWidth;

        for (let i = 1; i < pointsRef.current.length; i++) {
          const p1 = pointsRef.current[i - 1];
          const p2 = pointsRef.current[i];

          const dist = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
          if (dist > 150) continue;

          const age = now - p2.timestamp;
          const opacity = Math.max(0, 1 - age / fadeDuration);

          ctx.beginPath();
          ctx.strokeStyle = lineColor;
          ctx.globalAlpha = opacity;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        pointsRef.current.push({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          timestamp: Date.now(),
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [lineColor, lineWidth, fadeDuration]);

  return (
    <div className={cn("relative w-full min-h-screen overflow-hidden", className)} {...props}>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
