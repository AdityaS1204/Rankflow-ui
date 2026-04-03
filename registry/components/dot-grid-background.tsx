"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DotGridBackgroundProps {
    /** Size of each dot in pixels */
    dotSize?: number;
    /** Gap between dots in pixels */
    gap?: number;
    /** Probability of a dot starting to blink [0, 1] */
    blinkProbability?: number;
    /** Speed at which dots fade in/out [0, 1] */
    blinkSpeed?: number;
    /** Base color of the dots */
    dotColor?: string;
    /** Color of the glow effect */
    glowColor?: string;
    /** Radius around the cursor where dots light up */
    cursorRadius?: number;
    /** Maximum additional opacity from cursor proximity */
    cursorStrength?: number;
    /** Additional CSS classes */
    className?: string;
}

export const DotGridBackground: React.FC<DotGridBackgroundProps> = ({
    dotSize = 1.0,
    gap = 12,
    blinkProbability = 0.005,
    blinkSpeed = 0.04,
    dotColor = "rgba(255, 255, 255, 0.2)",
    glowColor = "rgba(100, 150, 255, 1)", // Subtle blue tint for the miracle vibe
    cursorRadius = 120,
    cursorStrength = 0.6,
    className,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let dots: {
            x: number;
            y: number;
            opacity: number;
            targetOpacity: number;
            size: number;
            isStray?: boolean;
        }[] = [];

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { 
                x: e.clientX - rect.left, 
                y: e.clientY - rect.top 
            };
        };

        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (!parent) return;

            const width = parent.clientWidth;
            const height = parent.clientHeight;
            const dpr = window.devicePixelRatio || 1;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
            
            initDots(width, height);
        };

        const initDots = (width: number, height: number) => {
            dots = [];
            const cols = Math.ceil(width / gap);
            const rows = Math.ceil(height / gap);

            // Grid dots
            for (let i = 0; i <= cols; i++) {
                for (let j = 0; j <= rows; j++) {
                    const x = i * gap;
                    const y = j * gap;
                    const initialOpacity = Math.random() * 0.15;
                    
                    dots.push({
                        x,
                        y,
                        opacity: initialOpacity,
                        targetOpacity: initialOpacity,
                        size: dotSize * (0.8 + Math.random() * 0.4),
                    });
                }
            }

            // Stray dots
            const strayCount = Math.floor((cols * rows) * 0.05);
            for (let k = 0; k < strayCount; k++) {
                const initialOpacity = Math.random() * 0.2;
                dots.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    opacity: initialOpacity,
                    targetOpacity: initialOpacity,
                    size: dotSize * (0.5 + Math.random() * 0.5),
                    isStray: true,
                });
            }
        };

        const draw = () => {
            const width = canvas.width / (window.devicePixelRatio || 1);
            const height = canvas.height / (window.devicePixelRatio || 1);
            ctx.clearRect(0, 0, width, height);

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            dots.forEach((dot) => {
                if (Math.random() < blinkProbability) {
                    dot.targetOpacity = Math.random() > 0.5 ? 0.5 + Math.random() * 0.3 : 0.05 + Math.random() * 0.1;
                }

                dot.opacity += (dot.targetOpacity - dot.opacity) * blinkSpeed;

                const dx = dot.x - mx;
                const dy = dot.y - my;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                let highlightLevel = 0;
                if (distance < cursorRadius) {
                    highlightLevel = (1 - distance / cursorRadius) * cursorStrength;
                }

                const finalOpacity = Math.min(1, dot.opacity + highlightLevel);

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
                
                if (highlightLevel > 0) {
                    ctx.fillStyle = `rgba(${150 + 105 * (1-highlightLevel)}, ${180 + 75 * (1-highlightLevel)}, 255, ${finalOpacity})`;
                } else {
                    ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
                }
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas();
        });

        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }

        window.addEventListener("mousemove", handleMouseMove);
        resizeCanvas();
        draw();

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [dotSize, gap, blinkProbability, blinkSpeed, cursorRadius, cursorStrength, glowColor]);

    return (
        <div className={cn("absolute inset-0 z-0 overflow-hidden bg-[#020202]", className)}>
            <canvas
                ref={canvasRef}
                className="block"
            />
            {/* Vignette effect for depth */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
        </div>
    );
};
