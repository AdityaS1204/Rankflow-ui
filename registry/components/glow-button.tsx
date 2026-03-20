"use client";

import React from 'react';
import { ChevronDownIcon, FileTextIcon } from '@radix-ui/react-icons';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'orange' | 'red' | 'blue' | 'green';
  disableChevron?: boolean;
}

export const GlowButton = ({ 
  children = "NoteBook", 
  variant = 'orange', 
  disableChevron = false, 
  className = '',
  ...props 
}: GlowButtonProps) => {
    const variantStyles = {
        orange: '[box-shadow:0_0_100px_-10px_#DE732C] before:[box-shadow:0_0_4px_-1px_#fff_inset] bg-[#DE732C] border-[#f8d4b3]/80',
        red: '[box-shadow:0_0_100px_-10px_#ff0000] before:[box-shadow:0_0_4px_-1px_#ffffff_inset] bg-[#ff0000] border-[#ff4d4d]/90',
        blue: '[box-shadow:0_0_100px_-10px_#0165FF] before:[box-shadow:0_0_7px_-1px_#d5e5ff_inset] bg-[#126fff] border-[#9ec4ff]/90',
        green: '[box-shadow:0_0_100px_-10px_#21924c] before:[box-shadow:0_0_7px_-1px_#91e6b2_inset] bg-[#176635] border-[#c0f1d3]/70',
    };

    return (
        <button 
          className={`hover:opacity-[0.90] rounded-2xl border font-extralight relative overflow-hidden text-white transition-all after:absolute after:content-[''] after:inset-0 after:[box-shadow:0_0_15px_-1px_#ffffff90_inset] after:rounded-2xl before:absolute before:content-[''] before:inset-0 before:rounded-2xl flex items-center before:z-20 after:z-10 ${variantStyles[variant] || variantStyles.orange} ${className}`}
          {...props}
        >
            <div className="flex items-center gap-2 border-r border-white/40 px-4 py-3 z-0">
                <FileTextIcon className='w-5 h-5' />
                <p className="text-sm font-medium">{children}</p>
            </div>
            <div className={`px-3 ${disableChevron ? 'hidden' : ''}`}>
                <ChevronDownIcon className='w-5 h-5' />
            </div>
        </button>
    );
};
