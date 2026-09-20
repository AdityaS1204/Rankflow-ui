"use client";

import React from "react";
import { StackedImageCards } from "./stacked-image-cards";

export function StackedImageCardsDemo() {
  return (
    <div className="w-full max-w-full overflow-x-auto mx-auto p-4 sm:p-6 flex flex-col items-center justify-center select-none">
      {/* Main Container Box */}
      <div className="w-full flex items-center justify-center p-2 sm:p-4 overflow-visible min-h-[260px]">
        <StackedImageCards
          cardSize={180}
          flattenGap={18}
        />
      </div>
    </div>
  );
}

export default StackedImageCardsDemo;
