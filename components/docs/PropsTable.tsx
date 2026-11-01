"use client";

import React, { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import { cn } from "@/lib/utils";

interface Prop {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface PropsTableProps {
  props: Prop[];
  componentName?: string;
}

function generateTypeScriptInterface(componentName: string | undefined, props: Prop[]): string {
  const cleanName = (componentName || "Component")
    .replace(/[^a-zA-Z0-9]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  const interfaceName = `${cleanName}Props`;

  const fields = props
    .map((prop) => {
      const isOptional =
        prop.default &&
        prop.default !== "-" &&
        prop.default.toLowerCase() !== "required";

      const commentLines: string[] = [];
      if (prop.description) {
        commentLines.push(prop.description);
      }
      if (prop.default && prop.default !== "-") {
        commentLines.push(`@default ${prop.default}`);
      }

      const comment =
        commentLines.length > 0
          ? `  /**\n   * ${commentLines.join("\n   * ")}\n   */\n`
          : "";

      return `${comment}  ${prop.name}${isOptional ? "?" : ""}: ${prop.type};`;
    })
    .join("\n\n");

  return `interface ${interfaceName} {\n${fields}\n}`;
}

export function PropsTable({ props, componentName }: PropsTableProps) {
  const [viewMode, setViewMode] = useState<"typescript" | "table">("typescript");

  if (!props || props.length === 0) return null;

  const tsCode = generateTypeScriptInterface(componentName, props);

  return (
    <div className="my-10 w-full space-y-4">
      {/* Section Header with Minimal Toggle */}
      <div className="flex items-center justify-between">
        <h2 id="props" className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
          Props
        </h2>
        <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-muted/40 p-0.5 text-xs font-medium">
          <button
            type="button"
            onClick={() => setViewMode("typescript")}
            className={cn(
              "px-2.5 py-1 rounded-md transition-colors cursor-pointer",
              viewMode === "typescript"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            TypeScript
          </button>
          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={cn(
              "px-2.5 py-1 rounded-md transition-colors cursor-pointer",
              viewMode === "table"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Table
          </button>
        </div>
      </div>

      {/* Content Rendering based on selected view mode */}
      {viewMode === "typescript" ? (
        <CodeBlock
          code={tsCode}
          language="typescript"
          hideLabel
          showCopy
        />
      ) : (
        <div className="w-full overflow-x-auto no-scrollbar sm:[scrollbar-width:auto] pb-2 -mx-4 sm:mx-0 px-4 sm:px-0">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-xl border border-border/60 bg-card/60 overflow-hidden shadow-xs">
              <table className="min-w-[540px] w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border/70 bg-muted/40">
                    <th className="px-4 py-3 text-xs font-semibold tracking-wider text-muted-foreground">Prop</th>
                    <th className="px-4 py-3 text-xs font-semibold tracking-wider text-muted-foreground">Type</th>
                    <th className="px-4 py-3 text-xs font-semibold tracking-wider text-muted-foreground">Default</th>
                    <th className="px-4 py-3 text-xs font-semibold tracking-wider text-muted-foreground">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {props.map((prop) => (
                    <tr key={prop.name} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3.5 font-mono text-xs font-semibold text-amber-500 whitespace-nowrap">
                        {prop.name}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-blue-400 whitespace-nowrap">
                        {prop.type}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-muted-foreground whitespace-nowrap">
                        {prop.default}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-muted-foreground leading-relaxed min-w-[200px]">
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
