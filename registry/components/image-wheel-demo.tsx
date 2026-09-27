"use client";

import React, { useState } from "react";
import { ImageWheel } from "./image-wheel";

export function ImageWheelDemo() {
  const [activeIndex, setActiveIndex] = useState(4);

  return (
    <div className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden py-4">
      <ImageWheel
        defaultIndex={4}
        cardWidth={230}
        cardHeight={230}
        radius={540}
        angleStep={24}
        onIndexChange={setActiveIndex}
      />
    </div>
  );
}

export default ImageWheelDemo;
