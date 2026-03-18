"use client";

import { useState } from "react";
import { CodeBlock } from "./CodeBlock";

type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

interface PackageManagerTabsProps {
  command: string;
  isExecute?: boolean;
}

const PM_LABELS: PackageManager[] = ["npm", "pnpm", "yarn", "bun"];

function getCommand(pm: PackageManager, command: string, isExecute: boolean): string {
  if (isExecute) {
    const execMap: Record<PackageManager, string> = {
      npm: "npx",
      pnpm: "pnpm dlx",
      yarn: "yarn dlx",
      bun: "bunx",
    };
    return `${execMap[pm]} ${command}`;
  }

  const installMap: Record<PackageManager, string> = {
    npm: `npm install ${command}`,
    pnpm: `pnpm add ${command}`,
    yarn: `yarn add ${command}`,
    bun: `bun add ${command}`,
  };
  return installMap[pm];
}

export function PackageManagerTabs({ command, isExecute = false }: PackageManagerTabsProps) {
  const [active, setActive] = useState<PackageManager>("npm");

  return (
    <div className="rounded-lg border border-neutral-800 overflow-hidden bg-neutral-950">
      {/* Tab bar */}
      <div className="flex border-b border-neutral-800 bg-neutral-900/50">
        {PM_LABELS.map((pm) => (
          <button
            key={pm}
            onClick={() => setActive(pm)}
            className={`relative px-4 py-2 text-xs font-mono transition-colors duration-150 ${
              active === pm
                ? "text-foreground"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            {pm}
            {active === pm && (
              <span className="absolute bottom-0 left-0 right-0 h-px bg-amber-500" />
            )}
          </button>
        ))}
      </div>

      {/* Code */}
      <CodeBlock code={getCommand(active, command, isExecute)} language="bash" hideLabel />
    </div>
  );
}
