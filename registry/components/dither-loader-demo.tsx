"use client";

import React from "react";
import { DitherLoader } from "./dither-loader";

export function DitherLoaderDemo() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-8 min-h-[180px] w-full select-none">
      {/* Pill Loader with Label */}
      <DitherLoader label="Synthesizing graph pathways..." />

      {/* Standalone Dither Icon Loader */}
      <DitherLoader />
    </div>
  );
}

export default DitherLoaderDemo;
