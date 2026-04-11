"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon } from "@radix-ui/react-icons";

// ── Tool Definitions ────────────────────────────────────────────────────────

type ToolId = "cursor" | "lovable" | "bolt";

interface AiTool {
  id: ToolId;
  name: string;
  logo: string;
  /** Apply CSS invert filter to the logo (e.g. for dark-on-dark PNGs) */
  invertColors?: boolean;
  promptTemplate: (
    componentName: string,
    componentCode: string,
    dependencies: string
  ) => string;
}

const AI_TOOLS: AiTool[] = [
  {
    id: "cursor",
    name: "Cursor",
    logo: "/cursor-logo-icon.png",
    promptTemplate: (name, code, deps) =>
      `I want to add a "${name}" component to my existing Next.js / React project. Please replicate this component exactly as-is, preserving all logic, animations, and styles.

${deps ? `First install the required dependencies:\n\`\`\`bash\nnpm install ${deps}\n\`\`\`\n` : ""}
Create a new file at \`components/ui/${name.toLowerCase().replace(/\s+/g, "-")}.tsx\` with the following source code:

\`\`\`tsx
${code}
\`\`\`

After creating the file, show me how to import and use it in my page.`,
  },
  {
    id: "lovable",
    name: "Lovable",
    logo: "/lovable-logo-icon.svg",
    promptTemplate: (name, code, deps) =>
      `Add the following premade UI component called "${name}" to my Lovable project. Do not change any logic, styles, or animations — replicate it exactly.

${deps ? `Required npm packages to install: ${deps}\n` : ""}
Component source code:

\`\`\`tsx
${code}
\`\`\`

Place it at \`src/components/ui/${name.toLowerCase().replace(/\s+/g, "-")}.tsx\` and provide an example of how to use it on a page.`,
  },
  {
    id: "bolt",
    name: "Bolt",
    logo: "/bolt-logo-icon.png",
    invertColors: true,
    promptTemplate: (name, code, deps) =>
      `Please integrate this "${name}" component into my project. Replicate it exactly — preserve every animation, class, and behavior.

${deps ? `Install dependencies via:\n\`\`\`bash\nnpm install ${deps}\n\`\`\`\n` : ""}
Here is the full component code:

\`\`\`tsx
${code}
\`\`\`

Save the file to \`components/${name.toLowerCase().replace(/\s+/g, "-")}.tsx\` and show me how to import and render it.`,
  },
];

// ── Tooltip ─────────────────────────────────────────────────────────────────

function Tooltip({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.94 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-full left-1/2 mb-2.5 -translate-x-1/2 pointer-events-none z-50"
    >
      <div className="whitespace-nowrap rounded-md bg-neutral-900 dark:bg-neutral-800 border border-white/10 px-2.5 py-1.5 text-[11px] font-medium text-white shadow-xl">
        {label}
      </div>
      {/* Arrow */}
      <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-px">
        <div className="h-0 w-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-neutral-900 dark:border-t-neutral-800" />
      </div>
    </motion.div>
  );
}

// ── Single Tool Button ───────────────────────────────────────────────────────

function ToolButton({
  tool,
  componentName,
  sourceCode,
  dependencies,
}: {
  tool: AiTool;
  componentName: string;
  sourceCode: string;
  dependencies: string[];
}) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const deps = dependencies.filter((d) => d !== "react").join(" ");

  const handleCopy = async () => {
    const prompt = tool.promptTemplate(componentName, sourceCode, deps);
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tooltipLabel = copied
    ? "Copied!"
    : `Copy prompt for ${tool.name}`;

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <Tooltip label={tooltipLabel} />
        )}
      </AnimatePresence>

      {/* Button */}
      <button
        onClick={handleCopy}
        className={`
          relative flex items-center justify-center w-8 h-8 rounded-md
          border transition-all duration-200 overflow-hidden
          ${copied
            ? "border-emerald-500/40 bg-emerald-500/10"
            : "border-border bg-transparent hover:bg-muted hover:border-border/80"
          }
        `}
        aria-label={`Copy prompt for ${tool.name}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
            >
              <CheckIcon className="h-3.5 w-3.5 text-emerald-500" />
            </motion.span>
          ) : (
            <motion.span
              key="logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              <Image
                src={tool.logo}
                alt={tool.name}
                width={18}
                height={18}
                className="object-contain"
                style={tool.invertColors ? { filter: "invert(1)" } : undefined}
              />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

// ── Public Export ────────────────────────────────────────────────────────────

interface CopyPromptButtonsProps {
  componentName: string;
  sourceCode: string;
  dependencies?: string[];
}

export function CopyPromptButtons({
  componentName,
  sourceCode,
  dependencies = [],
}: CopyPromptButtonsProps) {
  return (
    <>
      {AI_TOOLS.map((tool) => (
        <ToolButton
          key={tool.id}
          tool={tool}
          componentName={componentName}
          sourceCode={sourceCode}
          dependencies={dependencies}
        />
      ))}
    </>
  );
}
