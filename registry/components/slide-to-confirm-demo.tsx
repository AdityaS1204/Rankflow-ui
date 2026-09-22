"use client";

import React, { useState } from "react";
import { SlideToConfirm } from "./slide-to-confirm";

export function SlideToConfirmDemo() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="w-full max-w-xs mx-auto p-4">
      <SlideToConfirm
        text="Slide to confirm"
        confirmedText="Confirmed"
        isConfirmed={confirmed}
        onConfirm={() => setConfirmed(true)}
        onReset={() => setConfirmed(false)}
      />
    </div>
  );
}

export default SlideToConfirmDemo;
