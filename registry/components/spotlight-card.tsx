"use client";

import React, { useState } from 'react';

export const SpotlightCard = ({ 
    children, 
    className,
    color = "#3b82f6",
    border = "#262626", // neutral-800
    spotlightSize = 600
}: { 
    children?: React.ReactNode, 
    className?: string,
    color?: string,
    border?: string,
    spotlightSize?: number
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
            className={`relative w-full h-full rounded-2xl bg-neutral-900 overflow-hidden ${className || ""}`}
            style={{ borderColor: border, borderWidth: '1px', borderStyle: 'solid' }}
        >
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${color}26, transparent 40%)`
                }}
            />
            {children}
        </div>
    );
};
