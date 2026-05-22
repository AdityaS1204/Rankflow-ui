"use client";

import React, { useState } from 'react';

/**
 * SpotlightCard
 * A premium card component with a dynamic spotlight effect that follows the mouse cursor.
 * Optimized for dark-themed layouts.
 */
export const SpotlightCard = ({ 
    children, 
    className,
    color = "#3b82f6",
    spotlightSize = 600,
    width = "50%",
    height = "auto"
}: { 
    children?: React.ReactNode, 
    className?: string,
    color?: string,
    spotlightSize?: number,
    width?: string | number,
    height?: string | number
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className={`group relative overflow-hidden rounded-2xl border border-border bg-background transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-[#0d0d0d] dark:hover:border-neutral-700 ${className || ""}`}
            style={{ 
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
            }}
        >
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${color}15, transparent 40%)`
                }}
            />
            <div className="relative z-10 h-full p-8 flex flex-col">
                {children || (
                    <>
                        <h3 className="mb-2 text-xl font-semibold tracking-tight text-foreground dark:text-white">
                            Interactive Discovery
                        </h3>
                        <p className="mb-6 text-sm leading-relaxed text-muted-foreground dark:text-neutral-400">
                            Experience the power of dynamic spotlight effects that respond to your every move. Perfect for feature highlights and premium interfaces.
                        </p>
                        <div className="mt-auto">
                            <button className="rounded-lg border border-border bg-muted/40 px-4 py-2 text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-muted dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                                Explore More
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
