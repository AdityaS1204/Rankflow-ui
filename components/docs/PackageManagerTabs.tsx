"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { Highlight, themes, type Language } from "prism-react-renderer";

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
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  // Hydration guard
  useState(() => { setMounted(true); });

  const isDark = !mounted || resolvedTheme !== "light";
  const prismTheme = isDark ? themes.vsDark : themes.github;

  const handleCopy = async () => {
    const fullCommand = getCommand(active, command, isExecute);
    await navigator.clipboard.writeText(fullCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentCommand = getCommand(active, command, isExecute);

  return (
    <div className="group relative rounded-lg border border-neutral-300/80 dark:border-white/10 bg-neutral-200/80 dark:bg-zinc-800/80 overflow-hidden font-mono transition-colors">
      {/* Header bar: tabs left, copy right */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-neutral-300/70 dark:border-white/8 bg-neutral-300/35 dark:bg-zinc-900/35">
        <div className="flex items-center gap-0.5">
          {PM_LABELS.map((pm) => (
            <button
              key={pm}
              onClick={() => setActive(pm)}
              className="relative px-2.5 py-1 text-[12.5px] font-mono transition-colors duration-150 rounded-md cursor-pointer select-none"
            >
              <span className={`relative z-10 transition-colors duration-150 ${
                active === pm
                  ? "text-neutral-950 dark:text-white font-medium"
                  : "text-neutral-600 dark:text-zinc-400 hover:text-neutral-950 dark:hover:text-white"
              }`}>
                {pm}
              </span>

              {active === pm && (
                <motion.div
                  layoutId="pm-pill"
                  className="absolute inset-0 z-0 rounded-md bg-white dark:bg-zinc-700/80 shadow-[0_1px_2px_rgba(0,0,0,0.06)] border border-neutral-300/70 dark:border-white/10"
                  transition={{
                    type: "spring",
                    bounce: 0.15,
                    duration: 0.35,
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-300/60 dark:hover:bg-white/[0.08] transition-colors duration-150 cursor-pointer"
          aria-label="Copy command"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.div
                key="check"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.12 }}
              >
                <CheckIcon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.12 }}
              >
                <CopyIcon className="h-3.5 w-3.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Command display with smooth blur-crossfade */}
      <div className="relative px-4 py-3 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 4, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -4, filter: "blur(3px)" }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
          >
            <Highlight
              theme={prismTheme}
              code={currentCommand}
              language={"bash" as Language}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={`${className} text-[13.5px] leading-relaxed font-mono whitespace-pre`}
                  style={{ ...style, backgroundColor: "transparent" }}
                >
                  {tokens.map((line, i) => {
                    const { key: lineKey, ...lineProps } = getLineProps({ line, key: i }) as any;
                    return (
                      <div key={lineKey} {...lineProps} className="font-mono">
                        {line.map((token, key) => {
                          const { key: tokenKey, ...tokenProps } = getTokenProps({ token, key }) as any;
                          return <span key={tokenKey} {...tokenProps} className="font-mono" />;
                        })}
                      </div>
                    );
                  })}
                </pre>
              )}
            </Highlight>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
