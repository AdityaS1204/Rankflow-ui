"use client";

import React, { useState, useEffect } from "react";
import { Share, Heart, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MusicPlayerCardProps {
  artistName?: string;
  artistHandle?: string;
  artistAvatar?: string;
  coverArt?: string;
  songName?: string;
  duration?: number; // in seconds
  className?: string;
}

export function MusicPlayerCard({
  artistName = "Diljit Dosanjh",
  artistHandle = "@diljitdosanjh",
  artistAvatar = "https://i.pinimg.com/736x/ba/15/b1/ba15b1246843889f478fd123ecd83699.jpg",
  coverArt = "https://i.pinimg.com/736x/ff/4a/09/ff4a09ed6b060a756b1d1292f0453b8a.jpg",
  songName = "GOAT",
  duration = 133,
  className,
}: MusicPlayerCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(33); 
  const [isLiked, setIsLiked] = useState(false); 

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent = (progress / duration) * 100;
  const remaining = duration - progress;

  return (
    <div className="w-full flex items-center justify-center p-8 font-sans">
      <div className={cn("relative w-[340px] h-[360px] rounded-[2.5rem] p-2 bg-[#2A2A2A] shadow-2xl", className)}>
        <div className="relative w-full h-full rounded-4xl overflow-hidden group">
          
          {/* Background Cover */}
          <img 
            src={coverArt} 
            alt={artistName} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 select-none pointer-events-none" 
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/90 pointer-events-none" />

          {/* Top Controls */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
            {/* Artist Pill */}
            <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md rounded-full p-1.5 sm:pr-4 border border-white/10 shadow-sm cursor-pointer hover:bg-black/50 transition-colors">
              <img src={artistAvatar} alt={artistName} className="w-8 h-8 rounded-full object-cover" />
              <div className="hidden sm:flex flex-col">
                <span className="text-white text-[13px] font-medium leading-tight">{artistName}</span>
                <span className="text-white/60 text-[11px] leading-tight mt-0.5">{artistHandle}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 text-white hover:bg-black/60 transition-colors shadow-sm">
                <Share className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </button>
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/60 transition-colors shadow-sm"
              >
                <Heart className={cn(
                  "w-[18px] h-[18px] transition-all", 
                  isLiked ? "fill-white text-white drop-shadow-md scale-105" : "text-white fill-transparent"
                )} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-6 left-0 right-0 px-6 z-10">
            
            {/* Song Name */}
            <h2 className="text-white text-2xl font-bold tracking-tight drop-shadow-lg mb-4">{songName}</h2>

            {/* Progress Info */}
            <div className="flex items-center justify-between text-white text-[13px] font-semibold mb-3 drop-shadow-md tracking-wide">
              <span>{formatTime(progress)}</span>
              <span>-{formatTime(remaining)}</span>
            </div>

            {/* Progress Bar */}
            <div 
              className="w-full h-1 bg-white/20 rounded-full mb-6 overflow-hidden backdrop-blur-md cursor-pointer relative" 
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                setProgress(Math.max(0, Math.min(duration, percent * duration)));
              }}
            >
              <motion.div 
                className="absolute top-0 left-0 h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                initial={{ width: `${progressPercent}%` }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ ease: "linear", duration: isPlaying ? 1 : 0.2 }}
              />
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-5">
              <button className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/50 transition-colors shadow-sm">
                <SkipBack className="w-5 h-5 fill-white text-white" />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/50 hover:scale-105 active:scale-95 transition-all shadow-sm group"
              >
                {isPlaying 
                  ? <Pause className="w-6 h-6 fill-white text-white transition-transform group-hover:scale-110" /> 
                  : <Play className="w-6 h-6 fill-white text-white ml-1 transition-transform group-hover:scale-110" />
                }
              </button>
              <button className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/50 transition-colors shadow-sm">
                <SkipForward className="w-5 h-5 fill-white text-white" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
