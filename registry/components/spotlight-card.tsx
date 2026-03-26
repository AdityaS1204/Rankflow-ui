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
            className={`group relative rounded-2xl bg-[#0d0d0d] overflow-hidden border border-neutral-800 transition-colors hover:border-neutral-700 ${className || ""}`}
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
                        <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">
                            Interactive Discovery
                        </h3>
                        <p className="text-neutral-400 leading-relaxed mb-6 text-sm">
                            Experience the power of dynamic spotlight effects that respond to your every move. Perfect for feature highlights and premium interfaces.
                        </p>
                        <div className="mt-auto">
                            <button className="text-xs font-bold text-white uppercase tracking-widest px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                Explore More
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
