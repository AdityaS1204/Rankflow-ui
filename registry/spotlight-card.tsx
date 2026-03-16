"use client";

import React, { useState } from 'react';

export const SpotlightCard = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
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
            className={`relative w-full h-full rounded-2xl bg-card border border-border overflow-hidden ${className || ""}`}
        >
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, color-mix(in srgb, var(--primary) 15%, transparent), transparent 40%)`
                }}
            />
            {children}
        </div>
    );
};
