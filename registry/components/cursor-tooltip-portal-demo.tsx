"use client";

import React, { useState, useRef } from "react";
import { CursorTooltipPortal } from "@/registry/components/cursor-tooltip-portal";

export function CursorTooltipPortalDemo() {
  const [activeText, setActiveText] = useState<string | undefined>(undefined);

  const videoCards = [
    {
      id: "video-1",
      videoUrl:
        "https://res.cloudinary.com/dp5tdrmf8/video/upload/v1788369094/From_Klickpin.com-_Ocean-inspired_summer_coast_inspiration_with_charm_and_ideas_for_thoughtful_sharing_for_ocean_lovers-pin-id-11118330334466426_lvyrku.mp4",
      hoverText: "A simple Microinteraction",
    },
    {
      id: "video-2",
      videoUrl:
        "https://res.cloudinary.com/dp5tdrmf8/video/upload/v1788369925/From_Klickpin.com-_Meditation_Space_Ideas_Ideas_Youll_Keep_Coming_Back_To_94644-pin-id-4785143351113625_dpnwrb.mp4",
      hoverText: "Whatever Happens, Happens for a reason.",
    },
  ];

  return (
    <CursorTooltipPortal
      text={activeText}
      defaultText="Hover over card"
      maxWidth={220}
      maxHeight={110}
      maxLines={3}
      className="w-full flex items-center justify-center py-10 px-4 min-h-[380px]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl place-items-center">
        {videoCards.map((card) => (
          <VideoCardItem
            key={card.id}
            videoUrl={card.videoUrl}
            hoverText={card.hoverText}
            onHoverStart={() => setActiveText(card.hoverText)}
            onHoverEnd={() => setActiveText(undefined)}
          />
        ))}
      </div>
    </CursorTooltipPortal>
  );
}

function VideoCardItem({
  videoUrl,
  hoverText,
  onHoverStart,
  onHoverEnd,
}: {
  videoUrl: string;
  hoverText: string;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    onHoverStart();
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    onHoverEnd();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full max-w-[240px] aspect-4/3 overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-900 transition-all duration-300 hover:border-neutral-700 hover:shadow-2xl cursor-pointer"
    >
      <video
        ref={videoRef}
        src={videoUrl}
        loop
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
}
