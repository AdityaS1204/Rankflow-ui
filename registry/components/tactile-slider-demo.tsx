"use client";

import React, { useState } from "react";
import { TactileSlider } from "./tactile-slider";

export function TactileSliderDemo() {
  const [val, setVal] = useState(38);

  return (
    <div className="w-full max-w-xl mx-auto min-h-[320px] p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-3xl bg-[#ebf0f7] dark:bg-[#141416] border border-black/5 dark:border-white/5 shadow-[10px_10px_24px_rgba(163,177,198,0.7),-10px_-10px_24px_rgba(255,255,255,0.9)] dark:shadow-[8px_8px_20px_rgba(0,0,0,0.8),-4px_-4px_14px_rgba(255,255,255,0.04)]">
        <TactileSlider
          value={val}
          onChange={setVal}
          min={0}
          max={100}
          step={1}
          ticks={9}
          unit="%"
        />
      </div>
    </div>
  );
}

export default TactileSliderDemo;
