"use client";

import React, { useState } from "react";
import { AvatarDropdown } from "./avatar-dropdown";

export function AvatarDropdownDemo() {
  const [lastAction, setLastAction] = useState<string | null>(null);

  const handleSelect = (itemId: string) => {
    setLastAction(`Selected: ${itemId}`);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-[380px] p-6 flex flex-col items-center justify-start">

      <AvatarDropdown onSelect={handleSelect} />
      <p className="text-sm text-gray-500 mt-10">Click on Avatar to open the dropdown menu</p>

    </div>
  );
}

export default AvatarDropdownDemo;
