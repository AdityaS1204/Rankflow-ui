"use client";

import { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "motion/react";

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
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const fullCommand = getCommand(active, command, isExecute);
    await navigator.clipboard.writeText(fullCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative rounded-2xl bg-[#111111] border border-white/5 p-3 md:p-4 font-mono shadow-2xl transition-all hover:border-white/10">
      {/* Tab bar / Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex gap-1">
          {PM_LABELS.map((pm) => (
            <button
              key={pm}
              onClick={() => setActive(pm)}
              className={`relative px-3 py-1.5 text-[13px] font-mono transition-colors duration-200 ${
                active === pm
                  ? "text-white"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {pm}
              {active === pm && (
                <motion.div
                  layoutId="pm-active-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500/80 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Copy Button (matching CodeBlock style) */}
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg border border-white/5 bg-white/2 hover:bg-white/8 hover:border-white/10 text-neutral-500 hover:text-white transition-all backdrop-blur-md"
          aria-label="Copy command"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.div
                key="check"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1 }}
              >
                <CheckIcon className="h-4 w-4 text-emerald-500" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1 }}
              >
                <CopyIcon className="h-4 w-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Inner Code Container */}
      <div className="relative rounded-xl bg-[#080808] border border-white/5 overflow-hidden">
        <CodeBlock 
          code={getCommand(active, command, isExecute)} 
          language="bash" 
          hideLabel 
        />
      </div>
    </div>
  );
}


